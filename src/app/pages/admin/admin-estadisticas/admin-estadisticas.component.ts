import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticaService } from '../../../services/estadistica.service';

@Component({
  selector: 'app-admin-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['../../../../styles/_admin-shared.scss']
})
export class AdminEstadisticasComponent implements OnInit {
  estadisticas: any[] = [];
  mostrarModal = false;
  editando = false;
  cargando = false;
  mensaje = '';
  tipoMensaje = '';
  form: any = {};

  constructor(private estadisticaService: EstadisticaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.estadisticaService.obtenerEstadisticas(true).subscribe({
      next: (res) => { if (res.success) this.estadisticas = res.data; },
      error: () => this.mostrarMensaje('Error al cargar estadisticas', 'error')
    });
  }

  abrirCrear(): void {
    this.editando = false;
    this.form = { numero: '', texto: '', orden: 0, activo: true };
    this.mostrarModal = true;
  }

  abrirEditar(item: any): void {
    this.editando = true;
    this.form = { ...item };
    this.mostrarModal = true;
  }

  guardar(): void {
    this.cargando = true;
    const obs = this.editando
      ? this.estadisticaService.actualizarEstadistica(this.form.id, this.form)
      : this.estadisticaService.crearEstadistica(this.form);

    obs.subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.success) {
          this.mostrarModal = false;
          this.cargar();
          this.mostrarMensaje(this.editando ? 'Estadistica actualizada' : 'Estadistica creada', 'exito');
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error CRUD estadistica:', err);
        const validationErrors = err.error?.errors ? Object.values(err.error.errors).flat().join(', ') : '';
        this.mostrarMensaje(validationErrors || err.error?.message || `Error ${err.status}: ${err.statusText}`, 'error');
      }
    });
  }

  eliminar(item: any): void {
    if (!confirm(`¿Eliminar "${item.texto}"?`)) return;
    this.estadisticaService.eliminarEstadistica(item.id).subscribe({
      next: () => { this.cargar(); this.mostrarMensaje('Estadistica eliminada', 'exito'); },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
