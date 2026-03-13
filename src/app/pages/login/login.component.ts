import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getToken()) {
      this.router.navigate(['/admin']);
    }
  }

  login(): void {
    this.error = '';
    this.cargando = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.success) {
          this.router.navigate(['/admin']);
        } else {
          this.error = res.message || 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'Error al conectar con el servidor';
      }
    });
  }
}
