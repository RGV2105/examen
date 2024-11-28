import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Loki } from '../interface/loki';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { LokiService } from '../services/Loki.service';

@Component({
  selector: 'app-modal-creacion',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-creacion.component.html',
  styleUrls: ['./modal-creacion.component.css'] // Corrección en styleUrl -> styleUrls
})
export class ModalCreacionComponent {
  @Input() ejemplo: Loki = {
    _id: { $oid: '' },
    nombre: '',
    alias: [],
    especie: '',
    genero: '',
    origen: '',
    poderes: [],
    afiliaciones: [],
    apariciones: [],
    descripcion: '',
    imagen: ''
  };

  private bootstrapModal: any;
  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    private _srvLoki: LokiService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open(ejemplo: Loki): void {
    this.ejemplo = ejemplo;
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  editarLoki(
    nombre: string,
    alias: string,
    especie: string,
    genero: string,
    origen: string,
    poderes: string,
    afiliaciones: string,
    apariciones: string,
    descripcion: string,
    imagen: string,
    id: string
  ): void {
    // Convertir alias, poderes, afiliaciones y apariciones a arrays
    const aliasArray = alias.split(',').map((item) => item.trim());
    const poderesArray = poderes.split(',').map((item) => item.trim());
    const afiliacionesArray = afiliaciones.split(',').map((item) => item.trim());
    const aparicionesArray = apariciones.split(',').map((item) => item.trim());

    const updatedLoki: Loki = {
      _id: { $oid: id },
      nombre: nombre,
      alias: aliasArray,
      especie: especie,
      genero: genero,
      origen: origen,
      poderes: poderesArray,
      afiliaciones: afiliacionesArray,
      apariciones: aparicionesArray,
      descripcion: descripcion,
      imagen: imagen
    };

    this._srvLoki.putLoki(id, updatedLoki).subscribe({
      next: (response) => {
        console.log('Loki actualizado correctamente:', response);
        window.location.reload();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al actualizar Loki:', err);
      }
    });
  }
}