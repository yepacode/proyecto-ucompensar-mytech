import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService, Contacto } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  // Datos del formulario
  formData: Contacto = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };

  // Estados
  enviando = false;
  mensajeExito = false;
  mensajeError = false;
  mensajeTexto = '';

  constructor(private contactoService: ContactoService) {}

  // Enviar formulario
  enviarFormulario(): void {
    // Validar campos
    if (!this.formData.nombre || !this.formData.email || !this.formData.mensaje) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar email
    if (!this.validarEmail(this.formData.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    this.enviando = true;
    this.mensajeExito = false;
    this.mensajeError = false;

    // Enviar a la API
    this.contactoService.enviarContacto(this.formData).subscribe({
      next: (response) => {
        console.log('✅ Respuesta del servidor:', response);
        
        if (response.success) {
          this.mensajeExito = true;
          this.mensajeTexto = response.message || '¡Mensaje enviado con éxito!';
          this.limpiarFormulario();
          
          // Ocultar mensaje después de 5 segundos
          setTimeout(() => {
            this.mensajeExito = false;
          }, 5000);
        } else {
          this.mostrarError(response.message || 'Error al enviar el mensaje');
        }
        
        this.enviando = false;
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.mostrarError('Error al conectar con el servidor. Asegúrate de que el backend esté corriendo.');
        this.enviando = false;
      }
    });
  }

  // Validar email
  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Mostrar error
  mostrarError(mensaje: string): void {
    this.mensajeError = true;
    this.mensajeTexto = mensaje;
    
    setTimeout(() => {
      this.mensajeError = false;
    }, 5000);
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    this.formData = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };
  }
}     