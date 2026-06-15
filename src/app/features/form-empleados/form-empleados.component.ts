import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../core/services/empleado.service';
import { ActualizarEmpleadoRequest, CrearEmpleadoRequest, Empleado } from '../../shared/models/empleado.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-empleados',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-empleados.component.html',
  styleUrl: './form-empleados.component.scss'
})
export class FormEmpleadosComponent {
  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  modoEdicion = false;
  idEmpleado: number | null = null;

  empleadoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    puesto: ['', [Validators.required]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modoEdicion = true;
      this.idEmpleado = Number(id);
      this.cargarEmpleado(this.idEmpleado);
    }
  }

  cargarEmpleado(id: number) {
    this.empleadoService.empleados$.subscribe(empleados => {
      const empleado = empleados.find(e => e.idEmpleado === id);
      if (empleado) {
        this.empleadoForm.patchValue({
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          puesto: empleado.puesto
        });
      }
    });
  }

  guardar() {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    if(this.modoEdicion && !this.empleadoForm.dirty){
      this.router.navigate(['/empleados']);
      return;
    }

    if (this.modoEdicion && this.idEmpleado) {
      const empleadoActualizado: ActualizarEmpleadoRequest = {
        nombre: this.empleadoForm.value.nombre,
        apellido: this.empleadoForm.value.apellido
      }

      this.empleadoService.modificarEmpleado(this.idEmpleado, empleadoActualizado).subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: () => console.error('Error al actualizar empleado')
      });
    } else {
      const empleadoNuevo: CrearEmpleadoRequest = {
        nombre: this.empleadoForm.value.nombre,
        apellido: this.empleadoForm.value.apellido,
        puesto: this.empleadoForm.value.puesto
      };

      this.empleadoService.addEmpleado(empleadoNuevo).subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: () => console.error('Error al crear empleado')
      });
    }



  }

  cancelar() {
    this.router.navigate(['/empleados']);
  }

  get nombre() {
    return this.empleadoForm.get('nombre');
  }

  get apellido() {
    return this.empleadoForm.get('apellido');
  }

  get puesto() {
    return this.empleadoForm.get('puesto');
  }

}
