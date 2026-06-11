import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { ActualizarEmpleadoRequest, CrearEmpleadoRequest, Empleado } from "../../shared/models/empleado.model";
import { ApiResponse } from "../../shared/models/api-response.model";

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
    private readonly apiUrl = `${environment.apiUrl}/v1/empleados`;
    private datos$: BehaviorSubject<Empleado[]> = new BehaviorSubject<Empleado[]>([]);
    private http = inject(HttpClient);
    readonly empleados$ = this.datos$.asObservable();

    getEmpleados(): Observable<ApiResponse<Empleado[]>> {
        return this.http.get<ApiResponse<Empleado[]>>(this.apiUrl).pipe(
            tap(res => this.datos$.next(res.datos))
        );
    }

    addEmpleado(empleado: CrearEmpleadoRequest): Observable<ApiResponse<Empleado[]>> {
        return this.http.post<ApiResponse<Empleado>>(this.apiUrl, empleado).pipe(
            switchMap(() => this.getEmpleados())
        );
    }

    modificarEmpleado(id: number, empleado: ActualizarEmpleadoRequest): Observable<ApiResponse<Empleado[]>> {
        return this.http.put<ApiResponse<Empleado>>(`${this.apiUrl}/${id}`, empleado).pipe(
            switchMap(() => this.getEmpleados())
        );
    }

    eliminarEmpleado(id: number): Observable<ApiResponse<Empleado[]>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
            switchMap(() => this.getEmpleados())
        );
    }

}