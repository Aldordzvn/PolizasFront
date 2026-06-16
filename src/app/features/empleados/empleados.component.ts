import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { EmpleadoService } from '../../core/services/empleado.service';
import { map, Observable } from 'rxjs';
import { Empleado } from '../../shared/models/empleado.model';
import { CommonModule } from '@angular/common';
import { PolizasService } from '../../core/services/polizas.service';
import { Poliza } from '../../shared/models/poliza.model';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-empleados',
  imports: [RouterLink, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent {
  modalEstatus : boolean = false;
  idEmpleadoSelected: number | null = null;

  private empleadosService = inject(EmpleadoService);
  private polizasService = inject(PolizasService);
  polizas$ : Observable<Poliza[]> = this.polizasService.polizas$;
  empleados$ : Observable<Empleado[]> = this.empleadosService.empleados$;

  ngOnInit(){
    this.empleadosService.getEmpleados().subscribe();
    this.polizasService.getPolizas().subscribe();
  }

  contarPolizas(idEmpleado: number): Observable<number>{
    return this.polizasService.polizas$.pipe(
      map(polizs => polizs.filter(p => p.idEmpleado === idEmpleado).length)
    );
  }

  abrirModalEliminar(id: number){
    this.modalEstatus = true;
    this.idEmpleadoSelected = id;
  }

  cerrarModalEliminar(){
    this.modalEstatus = false;
    this.idEmpleadoSelected = null;

  }

  eliminarEmpleado(){
    if(!this.idEmpleadoSelected) return;

    this.empleadosService.eliminarEmpleado(this.idEmpleadoSelected).subscribe({
      next: () => {
        this.cerrarModalEliminar();
      },
      error: () => {
        console.error("Ocurrio un error", errorContext);
      }
    });
  }


}
