import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['../../../../styles/_admin-shared.scss']
})
export class AdminCategoriasComponent implements OnInit {
  categorias: any[] = [];
  mostrarModal = false;
  editando = false;
  cargando = false;
  mensaje = '';
  tipoMensaje = '';
  form: any = {};

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.categoriaService.obtenerCategorias(true).subscribe({
      next: (res) => { if (res.success) this.categorias = res.data; },
      error: () => this.mostrarMensaje('Error al cargar categorias', 'error')
    });
  }

  abrirCrear(): void {
    this.editando = false;
    this.form = { nombre: '', descripcion: '', orden: 0, activo: true };
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
      ? this.categoriaService.actualizarCategoria(this.form.id, this.form)
      : this.categoriaService.crearCategoria(this.form);

    obs.subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.success) {
          this.mostrarModal = false;
          this.cargar();
          this.mostrarMensaje(this.editando ? 'Categoria actualizada' : 'Categoria creada', 'exito');
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error CRUD categoria:', err);
        const validationErrors = err.error?.errors ? Object.values(err.error.errors).flat().join(', ') : '';
        this.mostrarMensaje(validationErrors || err.error?.message || `Error ${err.status}: ${err.statusText}`, 'error');
      }
    });
  }

  eliminar(item: any): void {
    if (!confirm(`¿Eliminar "${item.nombre}"?`)) return;
    this.categoriaService.eliminarCategoria(item.id).subscribe({
      next: () => { this.cargar(); this.mostrarMensaje('Categoria eliminada', 'exito'); },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
