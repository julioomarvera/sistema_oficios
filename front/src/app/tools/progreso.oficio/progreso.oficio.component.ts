import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-progreso-oficio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progreso.oficio.component.html',
  styleUrl: './progreso.oficio.component.scss'
})
export class ProgresoOficioComponent {
 @Input() porcentaje: number = 0;
  @Input() heartbeat: boolean = false;

  getColorClass(): string {
    if (this.porcentaje === 100) return 'bg-primary';   // Azul
    if (this.porcentaje >= 75) return 'bg-success';     // Verde
    if (this.porcentaje >= 50) return 'bg-warning';     // Amarillo
    return 'bg-danger';                                 // Rojo
  }

}
