import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../services/servicio.service';
import { TecnologiaService } from '../../services/tecnologia.service';

interface Servicio {
  id?: number;
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
  icono: string;
  color_fondo: string;
}

interface Tecnologia {
  id?: number;
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
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  tecnologias: Tecnologia[] = [];

  constructor(
    private servicioService: ServicioService,
    private tecnologiaService: TecnologiaService
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarTecnologias();
  }

  cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (response) => {
        if (response.success) {
          this.servicios = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  cargarTecnologias(): void {
    this.tecnologiaService.obtenerTecnologias().subscribe({
      next: (response) => {
        if (response.success) {
          this.tecnologias = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar tecnologías:', error);
      }
    });
  }
}
