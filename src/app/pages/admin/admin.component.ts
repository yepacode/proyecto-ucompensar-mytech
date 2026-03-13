import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  menuAbierto = false;

  secciones = [
    { ruta: '/admin/servicios', nombre: 'Servicios', icono: '⚙️' },
    { ruta: '/admin/proyectos', nombre: 'Proyectos', icono: '📁' },
    { ruta: '/admin/tecnologias', nombre: 'Tecnologias', icono: '💻' },
    { ruta: '/admin/estadisticas', nombre: 'Estadisticas', icono: '📊' },
    { ruta: '/admin/contactos', nombre: 'Contactos', icono: '✉️' },
    { ruta: '/admin/categorias', nombre: 'Categorias', icono: '🏷️' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
      }
    });
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }
}
