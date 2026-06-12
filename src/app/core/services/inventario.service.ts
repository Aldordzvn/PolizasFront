import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { ActualizarInventarioRequest, CrearInventarioRequest, Inventario } from "../../shared/models/inventario.model";
import { ApiResponse } from "../../shared/models/api-response.model";

@Injectable({providedIn: 'root'})
export class InventarioService{
    private readonly apiUrl = `${environment.apiUrl}/v1/inventario`;
    private http = inject(HttpClient);
    private datos$ = new BehaviorSubject<Inventario[]>([]);
    readonly inventarios$ = this.datos$.asObservable();


    getInventarios(): Observable<ApiResponse<Inventario[]>>{
        return this.http.get<ApiResponse<Inventario[]>>(this.apiUrl).pipe(
            tap(res => this.datos$.next(res.datos))
        );
    }

    addInventario(inventario: CrearInventarioRequest): Observable<ApiResponse<Inventario[]>>{
        return this.http.post<ApiResponse<Inventario>>(this.apiUrl, inventario).pipe(
            switchMap(()=> this.getInventarios())
        );
    }

    modificarInventario(sku: string, inventario: ActualizarInventarioRequest): Observable<ApiResponse<Inventario[]>>{
        return this.http.put<ApiResponse<Inventario>>(`${this.apiUrl}/${sku}`, inventario).pipe(
            switchMap(()=> this.getInventarios())
        );
    }

    eliminarInventario(sku: string): Observable<ApiResponse<Inventario[]>>{
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${sku}`).pipe(
            switchMap(()=> this.getInventarios())
        );
    }
}