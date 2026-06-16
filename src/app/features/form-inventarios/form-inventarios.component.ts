import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { InventarioService } from '../../core/services/inventario.service';
import { ActualizarInventarioRequest, CrearInventarioRequest } from '../../shared/models/inventario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-inventarios',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './form-inventarios.component.html',
  styleUrl: './form-inventarios.component.scss'
})
export class FormInventariosComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private inventarioService = inject(InventarioService);
  modoEdicion: Boolean = false;
  skuParam: string | null = null;
  error: string = '';
  cargando: boolean = false;

  inventarioForm: FormGroup = this.fb.group({
    sku: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    cantidad: ['', [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    const sku = this.route.snapshot.paramMap.get('sku');

    if (sku) {
      this.modoEdicion = true;
      this.skuParam = sku;
      this.cargarInventario(this.skuParam);
    }
  }

  cargarInventario(sku: string) {
    this.inventarioService.inventarios$.subscribe(inventarios => {
      const inventario = inventarios.find(i => i.sku === sku);
      if (inventario) {
        this.inventarioForm.patchValue({
          sku: inventario.sku,
          nombre: inventario.nombre,
          cantidad: inventario.cantidad
        });
      }
    });
  }

  guardar() {
    if (this.inventarioForm.invalid) {
      this.inventarioForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.cargando = true;

    if (this.modoEdicion && !this.inventarioForm.dirty) {
      this.router.navigate(['/inventario']);
      return;
    }

    if (this.modoEdicion && this.skuParam) {
      const invetarioActualizado: ActualizarInventarioRequest = {
        nombre: this.inventarioForm.value.nombre,
        cantidad: this.inventarioForm.value.cantidad
      }

      this.inventarioService.modificarInventario(this.skuParam, invetarioActualizado ).subscribe({
        next: () => this.router.navigate(['/inventario']),
        error: (err) => {
          this.cargando = false;
          this.error = err.error?.mensaje ?? 'Error al crear la Póliza';
        }
      });
    } else {
      const inventarioNuevo: CrearInventarioRequest = {
        sku: this.inventarioForm.value.sku,
        nombre: this.inventarioForm.value.nombre,
        cantidad: this.inventarioForm.value.cantidad
      };

      this.inventarioService.addInventario(inventarioNuevo).subscribe({
        next: () => this.router.navigate(['/inventario']),
        error: (err) => {
          this.cargando = false;
          this.error = err.error?.mensaje ?? 'Error al crear la Póliza';
        }
      });
    }

  }

  cancelar() {
    this.router.navigate(['/inventario']);
  }

  get sku() {
    return this.inventarioForm.get('sku');
  }

  get nombre() {
    return this.inventarioForm.get('nombre');
  }

  get cantidad() {
    return this.inventarioForm.get('cantidad');
  }
}
