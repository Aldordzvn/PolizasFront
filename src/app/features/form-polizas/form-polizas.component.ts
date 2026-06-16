import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { PolizasService } from '../../core/services/polizas.service';
import { ActualizarPolizaRequest, CrearPolizaRequest } from '../../shared/models/poliza.model';
import { EmpleadoService } from '../../core/services/empleado.service';
import { Observable } from 'rxjs';
import { Empleado } from '../../shared/models/empleado.model';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../core/services/inventario.service';
import { Inventario } from '../../shared/models/inventario.model';

@Component({
  selector: 'app-form-polizas',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './form-polizas.component.html',
  styleUrl: './form-polizas.component.scss'
})
export class FormPolizasComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private polizasService = inject(PolizasService);
  private empleadoService = inject(EmpleadoService);
  private inventarioService = inject(InventarioService);
  empleados$: Observable<Empleado[]> = this.empleadoService.empleados$;
  inventarios$: Observable<Inventario[]> = this.inventarioService.inventarios$;
  modoEdicion: Boolean = false;
  idPoliza: number | null = null;
  error: string = '';
  cargando = false;

  polizaForm: FormGroup = this.fb.group({
    idEmpleado: ['', [Validators.required]],
    sku: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    cantidad: ['', [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.empleadoService.getEmpleados().subscribe();
    this.inventarioService.getInventarios().subscribe();

    if (id) {
      this.modoEdicion = true;
      this.idPoliza = Number(id);
      this.cargarPoliza(this.idPoliza);
    }
  }

  cargarPoliza(id: number) {
    this.polizasService.polizas$.subscribe(polizas => {
      const poliza = polizas.find(p => p.idPoliza === id);
      if (poliza) {
        this.polizaForm.patchValue({
          idEmpleado: poliza.idEmpleado,
          sku: poliza.sku,
          cantidad: poliza.cantidadFaltante
        });
      }
    });
  }

  guardar() {
    if (this.polizaForm.invalid) {
      this.polizaForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.cargando = true;

    if (this.modoEdicion && !this.polizaForm.dirty) {
      this.router.navigate(['/polizas']);
      return;
    }

    if (this.modoEdicion && this.idPoliza) {
      const polizaActualizada: ActualizarPolizaRequest = {
        idEmpleado: this.polizaForm.value.idEmpleado,
        sku: this.polizaForm.value.sku,
        cantidadFaltante: this.polizaForm.value.cantidad
      }

      this.polizasService.modificarPoliza(this.idPoliza, polizaActualizada).subscribe({
        next: () => this.router.navigate(['/polizas']),
        error: (err) => {
          this.cargando = false;
          this.error = err.error?.mensaje ?? 'Error al crear la Póliza';
        }
      });
    } else {
      const polizaNueva: CrearPolizaRequest = {
        idEmpleado: this.polizaForm.value.idEmpleado,
        sku: this.polizaForm.value.sku,
        cantidadFaltante: this.polizaForm.value.cantidad
      };

      this.polizasService.addPoliza(polizaNueva).subscribe({
        next: () => this.router.navigate(['/polizas']),
        error: (err) => {
          this.cargando = false;
          this.error = err.error?.mensaje ?? 'Error al crear la Póliza';
        }
      });
    }

  }

  cancelar() {
    this.router.navigate(['/polizas']);
  }

  get idEmpleado() {
    return this.polizaForm.get('idEmpleado')
  }

  get sku() {
    return this.polizaForm.get('sku')
  }

  get cantidad() {
    return this.polizaForm.get('cantidad')
  }
}
