import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { ActualizarPolizaRequest, CrearPolizaRequest, Poliza } from "../../shared/models/poliza.model";
import { ApiResponse } from "../../shared/models/api-response.model";

@Injectable({providedIn: 'root'})
export class PolizasService{
    private readonly apiUrl = `${environment.apiUrl}/v1/polizas`;
    private http = inject(HttpClient);
    private datos$ = new BehaviorSubject<Poliza[]>([]);
    readonly polizas$ = this.datos$.asObservable();


    getPolizas(): Observable<ApiResponse<Poliza[]>>{
        return this.http.get<ApiResponse<Poliza[]>>(this.apiUrl).pipe(
            tap(res => this.datos$.next(res.datos))
        );
    }

    addPoliza(poliza: CrearPolizaRequest): Observable<ApiResponse<Poliza[]>>{
        return this.http.post<ApiResponse<Poliza>>(this.apiUrl, poliza).pipe(
            switchMap(()=> this.getPolizas())
        );
    }

    modificarPoliza(id: number, poliza: ActualizarPolizaRequest ): Observable<ApiResponse<Poliza[]>>{
        let urlEditar = `${this.apiUrl}/${id}`
        return this.http.put<ApiResponse<Poliza>>(urlEditar, poliza).pipe(
            switchMap(()=> this.getPolizas())
        );
    }

    eliminarPoliza(id: number): Observable<ApiResponse<Poliza[]>>{
        let urlEliminar = `${this.apiUrl}/${id}`;
        return this.http.delete<ApiResponse<void>>(urlEliminar).pipe(
            switchMap(()=> this.getPolizas())
        );
    }
}