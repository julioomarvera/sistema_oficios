import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from "@angular/material/chips";
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contador-chip',
  standalone: true,
  imports: [MatChip,CommonModule,MatTooltipModule,MatIconModule],
  templateUrl: './contador-chip.component.html',
  styleUrls: ['./contador-chip.component.scss']
})
export class ContadorChipComponent implements OnInit {
  @Input() fechaLimite!: string | Date;

  tiempoRestante: string = '';
  color: string = '';
  icono: string = '';

  ngOnInit(): void {
    this.actualizarEstado();
    setInterval(() => this.actualizarEstado(), 1000); // Actualiza cada segundo
  }

  actualizarEstado(): void {
    const fechaFinal = new Date(this.fechaLimite);
    fechaFinal.setHours(23, 59, 59, 999);
    const ahora = new Date();
    const msRestantes = fechaFinal.getTime() - ahora.getTime();
    let letreoDias = "";
    let letreroHora = "";
    let letreroMinutos = "";

    if (msRestantes < 0) {
      this.tiempoRestante = 'Ya venció';
      this.color = 'rojo';
      this.icono = 'error';
      return;
    }

    const dias = Math.floor(msRestantes / (1000 * 60 * 60 * 24));
    const horas = Math.floor((msRestantes / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((msRestantes / (1000 * 60)) % 60);
    const segundos = Math.floor((msRestantes / 1000) % 60);

    if(dias > 1){
        letreoDias = "días";
    }
    else{
        letreoDias = "día";
    }

    
    if(horas <= 1){
        letreroHora = "hora";
    }
    else{
        letreroHora = "horas";
    }

    if(minutos <= 2){
        letreroMinutos = "minuto";
    }
    else{
        letreroMinutos = "minutos";
    }



    this.tiempoRestante = `${dias} ${letreoDias} ${horas} ${letreroHora} ${minutos} ${letreroMinutos} ${segundos}`;
    if (dias > 3) {
      this.color = 'verde';
      this.icono = 'check_circle';
    } else if (dias >= 1  && dias < 3) {
      this.color = 'amarillo';
      this.icono = 'warning';
    } else {
      this.color = 'rojo';
      this.icono = 'error';
    }
  }
}