import { Component } from '@angular/core';

@Component({
  selector: 'app-polizas',
  imports: [],
  templateUrl: './polizas.component.html',
  styleUrl: './polizas.component.scss'
})
export class PolizasComponent {
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
