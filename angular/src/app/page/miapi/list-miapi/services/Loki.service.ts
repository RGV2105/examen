import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loki } from '../interface/loki'; // Assuming the interface is named Loki

@Injectable({
  providedIn: 'root'
})
export class LokiService {
  private urlLoki = 'http://localhost:3000/api/loki';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los registros de Loki.
   */
  getAllLoki(): Observable<Loki[]> { // Array of Loki objects
    return this.http.get<Loki[]>(`${this.urlLoki}`);
  }

  /**
   * Crea un nuevo registro de Loki.
   * @param elemento Objeto de tipo Loki que se desea agregar.
   */
  postLoki(elemento: Loki): Observable<Loki> {
    return this.http.post<Loki>(`${this.urlLoki}`, elemento);
  }

  /**
   * Actualiza un registro de Loki por ID.
   * @param id ID del registro que se desea actualizar.
   * @param elemento Objeto Loki con los datos actualizados.
   */
  putLoki(id: string, elemento: Loki): Observable<Loki> {
    return this.http.put<Loki>(`${this.urlLoki}/${id}`, elemento);
  }

  /**
   * Elimina un registro de Loki por ID.
   * @param id ID del registro que se desea eliminar.
   */
  deleteLoki(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlLoki}/${id}`);
  }
}