import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from '../../../services/proyecto.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-admin-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-proyectos.component.html',
  styleUrls: ['../../../../styles/_admin-shared.scss']
})
export class AdminProyectosComponent implements OnInit {
  proyectos: any[] = [];
  categorias: any[] = [];
  mostrarModal = false;
  editando = false;
  cargando = false;
  mensaje = '';
  tipoMensaje = '';
  form: any = {};
  tecnologiasTexto = '';

  constructor(
    private proyectoService: ProyectoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarCategorias();
  }

  cargar(): void {
    this.proyectoService.obtenerProyectos(true).subscribe({
      next: (res) => { if (res.success) this.proyectos = res.data; },
      error: () => this.mostrarMensaje('Error al cargar proyectos', 'error')
    });
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias(true).subscribe({
      next: (res) => { if (res.success) this.categorias = res.data; }
    });
  }

  abrirCrear(): void {
    this.editando = false;
    this.form = { titulo: '', descripcion: '', categoria: '', categoria_id: null, color_fondo: '#00f0ff', icono: '', imagen: '', orden: 0, activo: true };
    this.tecnologiasTexto = '';
    this.mostrarModal = true;
  }

  abrirEditar(item: any): void {
    this.editando = true;
    this.form = { ...item };
    const tecs = item.tecnologias;
    this.tecnologiasTexto = Array.isArray(tecs) ? tecs.join('\n') : (tecs || '');
    this.mostrarModal = true;
  }

  guardar(): void {
    this.cargando = true;
    const data = {
      ...this.form,
      tecnologias: this.tecnologiasTexto.split('\n').map((t: string) => t.trim()).filter((t: string) => t)
    };

    const obs = this.editando
      ? this.proyectoService.actualizarProyecto(this.form.id, data)
      : this.proyectoService.crearProyecto(data);

    obs.subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.success) {
          this.mostrarModal = false;
          this.cargar();
          this.mostrarMensaje(this.editando ? 'Proyecto actualizado' : 'Proyecto creado', 'exito');
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error CRUD proyecto:', err);
        const validationErrors = err.error?.errors ? Object.values(err.error.errors).flat().join(', ') : '';
        this.mostrarMensaje(validationErrors || err.error?.message || `Error ${err.status}: ${err.statusText}`, 'error');
      }
    });
  }

  eliminar(item: any): void {
    if (!confirm(`¿Eliminar "${item.titulo}"?`)) return;
    this.proyectoService.eliminarProyecto(item.id).subscribe({
      next: () => { this.cargar(); this.mostrarMensaje('Proyecto eliminado', 'exito'); },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
