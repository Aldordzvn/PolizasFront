import { Component, inject } from '@angular/core';
import { Poliza } from '../../shared/models/poliza.model';
import { PolizasService } from '../../core/services/polizas.service';
import { EmpleadoService } from '../../core/services/empleado.service';
import { InventarioService } from '../../core/services/inventario.service';
import { map, Observable } from 'rxjs';
import { Empleado } from '../../shared/models/empleado.model';
import { Inventario } from '../../shared/models/inventario.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
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




}
