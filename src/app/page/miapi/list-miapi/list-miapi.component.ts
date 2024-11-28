import { Component, ViewChild } from '@angular/core';
import { ListaComponent } from './lista/lista.component';
import { ModalEdicionComponent } from './lista/modal-edicion/modal-edicion.component';
import { allLoki } from './interface/loki';
import { LokiService } from './services/Loki.service';


@Component({
  selector: 'app-list-miapi',
  standalone: true,
  imports: [ListaComponent, ModalEdicionComponent],
  templateUrl: './list-miapi.component.html',
  styleUrl: './list-miapi.component.css'
})
export class ListMiapiComponent {
  Loki :allLoki | undefined

  @ViewChild(ModalEdicionComponent) public modal!:ModalEdicionComponent
  constructor(private _srvLoki:LokiService){}

  ngOnInit(): void {
    this._srvLoki.getAllLoki().subscribe(k => {
      this.Loki 
    })
  }

  openmodal(){
    if(this.modal){
      this.modal.open()
    }
  }
}
