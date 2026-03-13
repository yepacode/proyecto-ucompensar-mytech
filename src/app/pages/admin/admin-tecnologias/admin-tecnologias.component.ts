import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnologiaService } from '../../../services/tecnologia.service';

@Component({
  selector: 'app-admin-tecnologias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tecnologias.component.html',
  styleUrls: ['../../../../styles/_admin-shared.scss']
})
export class AdminTecnologiasComponent implements OnInit {
  tecnologias: any[] = [];
  mostrarModal = false;
  editando = false;
  cargando = false;
  mensaje = '';
  tipoMensaje = '';
  form: any = {};

  constructor(private tecnologiaService: TecnologiaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.tecnologiaService.obtenerTecnologias(true).subscribe({
      next: (res) => { if (res.success) this.tecnologias = res.data; },
      error: () => this.mostrarMensaje('Error al cargar tecnologias', 'error')
    });
  }

  abrirCrear(): void {
    this.editando = false;
    this.form = { nombre: '', logo: '', orden: 0, activo: true };
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
      ? this.tecnologiaService.actualizarTecnologia(this.form.id, this.form)
      : this.tecnologiaService.crearTecnologia(this.form);

    obs.subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.success) {
          this.mostrarModal = false;
          this.cargar();
          this.mostrarMensaje(this.editando ? 'Tecnologia actualizada' : 'Tecnologia creada', 'exito');
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error CRUD tecnologia:', err);
        const validationErrors = err.error?.errors ? Object.values(err.error.errors).flat().join(', ') : '';
        this.mostrarMensaje(validationErrors || err.error?.message || `Error ${err.status}: ${err.statusText}`, 'error');
      }
    });
  }

  eliminar(item: any): void {
    if (!confirm(`¿Eliminar "${item.nombre}"?`)) return;
    this.tecnologiaService.eliminarTecnologia(item.id).subscribe({
      next: () => { this.cargar(); this.mostrarMensaje('Tecnologia eliminada', 'exito'); },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
