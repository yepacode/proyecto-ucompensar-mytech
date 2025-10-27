import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para el contacto
export interface Contacto {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}

// Interface para la respuesta del backend
export interface RespuestaAPI {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // URL del backend
  private apiUrl = 'http://localhost:3000/api/contactos';

  constructor(private http: HttpClient) { }

  // Enviar mensaje de contacto
  enviarContacto(contacto: Contacto): Observable<RespuestaAPI> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<RespuestaAPI>(this.apiUrl, contacto, { headers });
  }

  // Obtener todos los contactos (opcional, para admin)
  obtenerContactos(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }
}