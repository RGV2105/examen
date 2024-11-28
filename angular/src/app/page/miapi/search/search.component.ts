import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Id {
  '$oid': string;
}

export interface Loki {
  _id: Id;
  nombre: string;
  alias: string[];
  especie: string;
  genero: string;
  origen: string;
  poderes: string[];
  afiliaciones: string[];
  apariciones: string[];
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-loki-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class LokiSearchComponent implements OnInit {
  lokis: Loki[] = []; // Lista de Lokis
  filteredLokis: Loki[] = []; // Lista de Lokis filtrados según la búsqueda
  searchTerm: string = ''; // Término de búsqueda

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Realizar la solicitud HTTP para obtener los datos desde la API
    this.http.get<Loki[]>('http://localhost:3000/api/loki') // Suponiendo que tu API está en este endpoint
      .subscribe((data: Loki[]) => {
        this.lokis = data;
        this.filteredLokis = data; // Inicializar con todos los lokis
      });
  }

  // Función para filtrar los Lokis según el término de búsqueda
  searchLoki(searchTerm: string): void {
    this.filteredLokis = this.lokis.filter(loki => 
      loki.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      loki.alias.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
}