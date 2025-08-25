import { Pipe, PipeTransform } from '@angular/core';
import { interval, map, startWith } from 'rxjs';

@Pipe({
  name: 'tiempoRegresivo',
  standalone: true,
  pure: false // 👈 importante para que se actualice
})
export class TiempoRegresivoPipe implements PipeTransform {
  private value: string = '';
  private targetDate: Date | null = null;

  constructor() {
    interval(1000).pipe(
      startWith(0),
      map(() => this.updateValue())
    ).subscribe();
  }

  transform(fechaLimite: string | Date): string {
    if (!this.targetDate || this.targetDate.toString() !== fechaLimite.toString()) {
      this.targetDate = new Date(fechaLimite);
      this.targetDate.setHours(23, 59, 59, 999);
      this.updateValue();
    }
    return this.value;
  }

  private updateValue(): void {
    if (!this.targetDate) return;

    const ahora = new Date();
    const msRestantes = this.targetDate.getTime() - ahora.getTime();

    if (msRestantes < 0) {
      this.value = 'Ya venció';
      return;
    }

    const dias = Math.floor(msRestantes / (1000 * 60 * 60 * 24));
    const horas = Math.floor((msRestantes / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((msRestantes / (1000 * 60)) % 60);
    const segundos = Math.floor((msRestantes / 1000) % 60);

    this.value = `${dias} dias ${horas} horas ${minutos} minutos ${segundos} segundos`;
  }
}