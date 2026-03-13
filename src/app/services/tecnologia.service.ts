import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  private apiUrl = `${environment.apiUrl}/tecnologias`;

  constructor(private http: HttpClient) { }

  obtenerTecnologias(todos = false): Observable<RespuestaAPI> {
    const url = todos ? `${this.apiUrl}?all` : this.apiUrl;
    return this.http.get<RespuestaAPI>(url);
  }

  crearTecnologia(data: any): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(this.apiUrl, data);
  }

  actualizarTecnologia(id: number, data: any): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.apiUrl}/${id}`, data);
  }

  eliminarTecnologia(id: number): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }
}
