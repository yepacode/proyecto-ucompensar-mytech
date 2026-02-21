import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoService } from '../../services/proyecto.service';

interface Proyecto {
  id?: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  tecnologias: string[];
  color_fondo: string;
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
export class PortafolioComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (response) => {
        if (response.success) {
          this.proyectos = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    });
  }
}
