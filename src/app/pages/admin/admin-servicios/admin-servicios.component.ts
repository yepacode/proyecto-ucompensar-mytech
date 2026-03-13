import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-servicios.component.html',
  styleUrls: ['../../../../styles/_admin-shared.scss']
})
export class AdminServiciosComponent implements OnInit {
  servicios: any[] = [];
  mostrarModal = false;
  editando = false;
  cargando = false;
  mensaje = '';
  tipoMensaje = '';
  form: any = {};
  caracteristicasTexto = '';

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicioService.obtenerServicios(true).subscribe({
      next: (res) => { if (res.success) this.servicios = res.data; },
      error: () => this.mostrarMensaje('Error al cargar servicios', 'error')
    });
  }

  abrirCrear(): void {
    this.editando = false;
    this.form = { titulo: '', descripcion: '', icono: '', color_fondo: '#00f0ff', orden: 0, activo: true };
    this.caracteristicasTexto = '';
    this.mostrarModal = true;
  }

  abrirEditar(item: any): void {
    this.editando = true;
    this.form = { ...item };
    const caract = item.caracteristicas;
    this.caracteristicasTexto = Array.isArray(caract) ? caract.join('\n') : (caract || '');
    this.mostrarModal = true;
  }

  guardar(): void {
    this.cargando = true;
    const data = {
      ...this.form,
      caracteristicas: this.caracteristicasTexto.split('\n').map((c: string) => c.trim()).filter((c: string) => c)
    };

    const obs = this.editando
      ? this.servicioService.actualizarServicio(this.form.id, data)
      : this.servicioService.crearServicio(data);

    obs.subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.success) {
          this.mostrarModal = false;
          this.cargar();
          this.mostrarMensaje(this.editando ? 'Servicio actualizado' : 'Servicio creado', 'exito');
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error CRUD servicio:', err);
        const validationErrors = err.error?.errors ? Object.values(err.error.errors).flat().join(', ') : '';
        this.mostrarMensaje(validationErrors || err.error?.message || `Error ${err.status}: ${err.statusText}`, 'error');
      }
    });
  }

  eliminar(item: any): void {
    if (!confirm(`¿Eliminar "${item.titulo}"?`)) return;
    this.servicioService.eliminarServicio(item.id).subscribe({
      next: () => { this.cargar(); this.mostrarMensaje('Servicio eliminado', 'exito'); },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
