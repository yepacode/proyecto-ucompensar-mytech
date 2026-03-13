import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {
  private apiUrl = `${environment.apiUrl}/estadisticas`;

  constructor(private http: HttpClient) { }

  obtenerEstadisticas(todos = false): Observable<RespuestaAPI> {
    const url = todos ? `${this.apiUrl}?all` : this.apiUrl;
    return this.http.get<RespuestaAPI>(url);
  }

  crearEstadistica(data: any): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(this.apiUrl, data);
  }

  actualizarEstadistica(id: number, data: any): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.apiUrl}/${id}`, data);
  }

  eliminarEstadistica(id: number): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }
}
