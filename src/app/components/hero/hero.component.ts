import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particula {
  x: number;
  delay: number;
  duration: number;
}

interface Estadistica {
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
  
  estadisticas: Estadistica[] = [
    { numero: '7+', texto: 'Países' },
    { numero: '50+', texto: 'Proyectos' },
    { numero: '98%', texto: 'Satisfacción' }
  ];

  ngOnInit() {
    this.generarParticulas();
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
