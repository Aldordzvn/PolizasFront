import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PolizasService } from '../../core/services/polizas.service';
import { Poliza } from '../../shared/models/poliza.model';
import { Observable } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-polizas',
  imports: [RouterLink, CommonModule],
  templateUrl: './polizas.component.html',
  styleUrl: './polizas.component.scss'
})
export class PolizasComponent {
  modalEstatus: boolean = false;
  idPoliza: number | null = null;
  private polizasService = inject  (PolizasService);
  polizas$: Observable<Poliza[]> = this.polizasService.polizas$;

  ngOnInit() {
    this.polizasService.getPolizas().subscribe();
  }

  abrirModalEliminar(id: number) {
    this.modalEstatus = true;
    this.idPoliza = id;
  }

  cerrarModalEliminar() {
    this.modalEstatus = false;
    this.idPoliza = null;
  }

  eliminarPoliza() {
    if (!this.idPoliza) return;

    this.polizasService.eliminarPoliza(this.idPoliza).subscribe({
      next: () => {
        this.cerrarModalEliminar();
      },
      error: () => {
        console.error("Ocurrio un error", errorContext);
      }
    });
  }
}
