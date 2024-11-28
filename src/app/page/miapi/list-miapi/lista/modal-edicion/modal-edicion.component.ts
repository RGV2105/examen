import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Loki } from '../../interface/loki';
import { LokiService } from '../../services/Loki.service';

@Component({
  selector: 'app-modal-edicion',
  standalone: true,
  imports: [],
  templateUrl: './modal-edicion.component.html',
  styleUrls: ['./modal-edicion.component.css'] // Corrección en styleUrl -> styleUrls
})
export class ModalEdicionComponent {

  private bootstrapModal: any;
  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private plataformId: object,
    private _srvLoki: LokiService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open() {
    if (isPlatformBrowser(this.plataformId)) {
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

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  Agregar(
    nombre: string,
    alias: string,
    especie: string,
    genero: string,
    origen: string,
    poderes: string,
    afiliaciones: string,
    apariciones: string,
    descripcion: string,
    imagen: string
  ) {
    const newLoki: Loki = {
      _id: { '$oid': '' }, // Se generará en el backend
      nombre: String(nombre),
      alias: alias.split(',').map(a => a.trim()),
      especie: String(especie),
      genero: String(genero),
      origen: String(origen),
      poderes: poderes.split(',').map(p => p.trim()),
      afiliaciones: afiliaciones.split(',').map(af => af.trim()),
      apariciones: apariciones.split(',').map(ap => ap.trim()),
      descripcion: String(descripcion),
      imagen: String(imagen)
    };

    this._srvLoki.postLoki(newLoki).subscribe({
      next: (res) => {
        console.log('Elemento agregado');
        this.closeModal();
        window.location.reload();
      },
      error: (error) => {
        console.error(`Error al agregar un nuevo elemento: ${error}`);
      }
    });
  }
}