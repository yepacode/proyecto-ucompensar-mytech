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

  obtenerTecnologias(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }
}
