import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})
export class PortafolioComponent implements OnInit {
  proyectos: Proyecto[] = [];
  proyectosFiltrados: Proyecto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  terminoBusqueda: string = '';

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (response) => {
        if (response.success) {
          this.proyectos = response.data;
          this.categorias = [...new Set(this.proyectos.map(p => p.categoria))];
          this.filtrarProyectos();
        }
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    });
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.filtrarProyectos();
  }

  filtrarProyectos(): void {
    let resultado = this.proyectos;

    if (this.categoriaSeleccionada) {
      resultado = resultado.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultado = resultado.filter(p =>
        p.titulo.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
      );
    }

    this.proyectosFiltrados = resultado;
  }
}
