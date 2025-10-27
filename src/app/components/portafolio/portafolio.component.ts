import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Proyecto {
  titulo: string;
  descripcion: string;
  categoria: string;
  tecnologias: string[];
  colorFondo: string;
  icono: string;
  imagen: string;
}

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})
export class PortafolioComponent {
  proyectos: Proyecto[] = [
    {
      titulo: 'Plataforma de Viajes Compartidos',
      descripcion: 'Sistema completo de gestión de viajes con seguimiento en tiempo real y pagos integrados',
      categoria: 'E-commerce',
      tecnologias: ['Angular', 'Node.js', 'MongoDB'],
      colorFondo: 'linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)',
      icono: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
      imagen: 'assets/images/proyectos/viajes-app.jpg'
    },
    {
      titulo: 'Sistema Hotelero Integral',
      descripcion: 'Gestión completa de reservas, check-in/out digital y panel administrativo avanzado',
      categoria: 'Sistema Web',
      tecnologias: ['React', 'Python', 'PostgreSQL'],
      colorFondo: 'linear-gradient(135deg, #6366f1 0%, #f59e0b 100%)',
      icono: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      imagen: 'assets/images/proyectos/hotel-app.jpg'
    },
    {
      titulo: 'E-commerce de Moda',
      descripcion: 'Tienda online con catálogo dinámico, carrito inteligente y múltiples métodos de pago',
      categoria: 'E-commerce',
      tecnologias: ['Vue.js', 'Laravel', 'MySQL'],
      colorFondo: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
      icono: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      imagen: 'assets/images/proyectos/moda-app.jpg'
    },
    {
      titulo: 'Dashboard Analítico',
      descripcion: 'Panel de control con visualización de datos en tiempo real y reportes automáticos',
      categoria: 'Aplicación Web',
      tecnologias: ['Angular', 'Express', 'Redis'],
      colorFondo: 'linear-gradient(135deg, #10b981 0%, #00d4ff 100%)',
      icono: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      imagen: 'assets/images/proyectos/hola-app.jpg'
    }
  ];
}
