import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          localStorage.setItem(this.tokenKey, response.data.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.apiUrl}/register`, {
      name, email, password, password_confirmation
    }).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          localStorage.setItem(this.tokenKey, response.data.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): Observable<RespuestaAPI> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post<RespuestaAPI>(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.loggedIn.next(false);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
