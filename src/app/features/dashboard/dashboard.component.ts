import { Component, inject } from '@angular/core';
import { Poliza } from '../../shared/models/poliza.model';
import { PolizasService } from '../../core/services/polizas.service';
import { EmpleadoService } from '../../core/services/empleado.service';
import { InventarioService } from '../../core/services/inventario.service';
import { filter, map, Observable, tap } from 'rxjs';
import { Empleado } from '../../shared/models/empleado.model';
import { Inventario } from '../../shared/models/inventario.model';
import { mapOneOrManyArgs } from 'rxjs/internal/util/mapOneOrManyArgs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private polizaService = inject(PolizasService);
  private empleadoService = inject(EmpleadoService);
  private inventarioService = inject(InventarioService);
  polizas$ : Observable<Poliza[]> = this.polizaService.polizas$;
  empleados$ : Observable<Empleado[]> = this.empleadoService.empleados$;
  inventarios$ : Observable<Inventario[]> = this.inventarioService.inventarios$;
  criticos$ = this.inventarios$.pipe(
    map(inventarios => inventarios.filter(i => i.cantidad <= 5))
  );

  ngOnInit(){
    this.polizaService.getPolizas().subscribe();
    this.empleadoService.getEmpleados().subscribe();
    this.inventarioService.getInventarios().subscribe();
  }
  
  
}
