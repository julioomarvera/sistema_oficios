import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'estatusTecnico',
  standalone: true
})
export class EstatusTecnicoComponent implements PipeTransform {
  transform(value: number | string): string {
    switch (value) {
      case 1:
      case '1':
        return 'Visto';
      case 2:
      case '2':
        return 'En proceso';
      case 3:
      case '3':
        return 'Pausa';
      case 4:
      case '4':
        return 'Concluido';
      default:
        return 'Desconocido';
    }
  }
}
