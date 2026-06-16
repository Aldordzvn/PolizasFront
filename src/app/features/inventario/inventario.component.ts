import { Component, inject } from '@angular/core';
import { InventarioService } from '../../core/services/inventario.service';
import { Inventario } from '../../shared/models/inventario.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-inventario',
  imports: [CommonModule, RouterLink],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  modalEstatus: boolean = false;
  skuSelected: string | null = null;
  private inventarioService = inject(InventarioService);
  inventarios$: Observable<Inventario[]> = this.inventarioService.inventarios$;

  ngOnInit() {
    this.inventarioService.getInventarios().subscribe();
  }

  abrirModalEliminar(sku: string) {
    this.modalEstatus = true;
    this.skuSelected = sku;
  }

  cerrarModalEliminar() {
    this.modalEstatus = false;
    this.skuSelected = null;
  }

  eliminarInventario() {
    if (!this.skuSelected) return;

    this.inventarioService.eliminarInventario(this.skuSelected).subscribe({
      next: () => {
        this.cerrarModalEliminar();
      },
      error: () => {
        console.error("Ocurrio un error", errorContext);
      }
    });
  }
}
