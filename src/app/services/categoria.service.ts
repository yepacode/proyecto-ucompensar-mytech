import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  obtenerCategorias(todos = false): Observable<RespuestaAPI> {
    const url = todos ? `${this.apiUrl}?all` : this.apiUrl;
    return this.http.get<RespuestaAPI>(url);
  }

  obtenerCategoria(id: number): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  crearCategoria(data: any): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(this.apiUrl, data);
  }

  actualizarCategoria(id: number, data: any): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.apiUrl}/${id}`, data);
  }

  eliminarCategoria(id: number): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }
}
