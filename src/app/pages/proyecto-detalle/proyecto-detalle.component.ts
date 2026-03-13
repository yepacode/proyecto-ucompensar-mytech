import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  categoria_id: number;
  tecnologias: string[];
  color_fondo: string;
  icono: string;
  imagen: string;
  orden: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-proyecto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-detalle.component.html',
  styleUrls: ['./proyecto-detalle.component.scss']
})
export class ProyectoDetalleComponent implements OnInit {
  proyecto: Proyecto | null = null;
  cargando: boolean = true;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarProyecto(id);
    } else {
      this.error = true;
      this.cargando = false;
    }
  }

  cargarProyecto(id: number): void {
    this.proyectoService.obtenerProyecto(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.proyecto = response.data;
        } else {
          this.error = true;
        }
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }
}
