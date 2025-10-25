import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Servicio {
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
  icono: string;
  colorFondo: string;
}

interface Tecnologia {
  nombre: string;
  logo: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  servicios: Servicio[] = [
    {
      titulo: 'Desarrollo Web Frontend',
      descripcion: 'Interfaces modernas y responsivas que brindan experiencias excepcionales',
      caracteristicas: [
        'React, Angular, Vue.js',
        'Diseño responsive',
        'Optimización SEO',
        'Animaciones fluidas'
      ],
      icono: '<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      colorFondo: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(99, 102, 241, 0.1))'
    },
    {
      titulo: 'Desarrollo Backend',
      descripcion: 'Arquitecturas robustas y escalables para aplicaciones complejas',
      caracteristicas: [
        'Node.js, Python, PHP',
        'APIs REST y GraphQL',
        'Bases de datos SQL/NoSQL',
        'Microservicios'
      ],
      icono: '<path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" stroke-width="2"/>',
      colorFondo: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(245, 158, 11, 0.1))'
    },
    {
      titulo: 'E-commerce Solutions',
      descripcion: 'Tiendas en línea completas que aumentan tus ventas digitales',
      caracteristicas: [
        'Pasarelas de pago',
        'Gestión de inventario',
        'Panel administrativo',
        'Marketing integrado'
      ],
      icono: '<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="2"/>',
      colorFondo: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.1))'
    },
    {
      titulo: 'Aplicaciones Web',
      descripcion: 'Sistemas personalizados para automatizar y optimizar procesos',
      caracteristicas: [
        'CRM y ERP',
        'Dashboards interactivos',
        'Automatización',
        'Integraciones API'
      ],
      icono: '<path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" stroke="currentColor" stroke-width="2"/>',
      colorFondo: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(0, 212, 255, 0.1))'
    },
    {
      titulo: 'Diseño UX/UI',
      descripcion: 'Experiencias de usuario intuitivas y diseños visualmente impactantes',
      caracteristicas: [
        'Prototipado',
        'Investigación UX',
        'Design Systems',
        'Testing de usabilidad'
      ],
      icono: '<path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" stroke="currentColor" stroke-width="2"/>',
      colorFondo: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(0, 212, 255, 0.1))'
    },
    {
      titulo: 'Mantenimiento & Soporte',
      descripcion: 'Aseguramos que tu sitio funcione perfectamente 24/7',
      caracteristicas: [
        'Monitoreo constante',
        'Actualizaciones',
        'Soporte técnico',
        'Backups automáticos'
      ],
      icono: '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" stroke-width="2"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="2"/>',
      colorFondo: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(99, 102, 241, 0.1))'
    }
  ];

  tecnologias: Tecnologia[] = [
    { nombre: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { nombre: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { nombre: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { nombre: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { nombre: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { nombre: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { nombre: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { nombre: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
  ];
}
