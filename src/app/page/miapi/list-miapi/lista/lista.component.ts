import { Component, Input, ViewChild } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';

import { allLoki, Loki } from '../interface/loki';
import { LokiService } from '../services/Loki.service';
import { ModalCreacionComponent } from '../modal-creacion/modal-creacion.component';


@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NgFor, CommonModule, ModalCreacionComponent],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'] // Corrección en styleUrl -> styleUrls
})
export class ListaComponent {
  @Input() lokiData: allLoki | undefined;

  @ViewChild(ModalCreacionComponent) public modal!: ModalCreacionComponent;

  constructor(private _srvLoki: LokiService) {}

  /**
   * Abre el modal para editar un registro de Loki.
   * @param drama Objeto Loki que se desea editar.
   */
  editarLoki(drama: Loki): void {
    if (this.modal) {
      this.modal.open(drama);
    }
  }

  /**
   * Elimina un registro de Loki por ID.
   * @param id ID del registro que se desea eliminar.
   */
  eliminarLoki(id: string): void {
    this._srvLoki.deleteLoki(id).subscribe({
      next: () => {
        console.log('Loki eliminado');
        if (this.lokiData) {
          this.lokiData.loki = this.lokiData.loki.filter((Loki) => Loki._id.$oid !== id);
        }
      },
      error: (err) => {
        console.error('Error al eliminar Loki:', err);
      }
    });
  }

  /**
   * Muestra información adicional de un registro de Loki.
   * @param drama Objeto Loki del que se desea ver más información.
   */
  verMas(drama: Loki): void {
    console.log('Descripción completa:', drama.descripcion);
  }
}