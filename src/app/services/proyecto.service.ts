import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${environment.apiUrl}/proyectos`;

  constructor(private http: HttpClient) { }

  obtenerProyectos(todos = false): Observable<RespuestaAPI> {
    const url = todos ? `${this.apiUrl}?all` : this.apiUrl;
    return this.http.get<RespuestaAPI>(url);
  }

  obtenerProyecto(id: number): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(data: any): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(this.apiUrl, data);
  }

  actualizarProyecto(id: number, data: any): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: number): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }
}
