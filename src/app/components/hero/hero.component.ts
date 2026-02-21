import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticaService } from '../../services/estadistica.service';

interface Particula {
  x: number;
  delay: number;
  duration: number;
}

interface Estadistica {
  id?: number;
  numero: string;
  texto: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  particulas: Particula[] = [];
  estadisticas: Estadistica[] = [];

  constructor(private estadisticaService: EstadisticaService) {}

  ngOnInit() {
    this.generarParticulas();
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.estadisticaService.obtenerEstadisticas().subscribe({
      next: (response) => {
        if (response.success) {
          this.estadisticas = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }

  generarParticulas(): void {
    for (let i = 0; i < 20; i++) {
      this.particulas.push({
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      });
    }
  }
}
