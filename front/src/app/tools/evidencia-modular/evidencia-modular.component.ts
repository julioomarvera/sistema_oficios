import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-evidencia-modular',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './evidencia-modular.component.html',
  styleUrl: './evidencia-modular.component.scss'
})
export class EvidenciaModularComponent {
@Input() url: string = '';

  get tipo(): 'imagen' | 'pdf' | 'video' | 'otro' {
    if (!this.url) return 'otro';
    const ext = this.url.split('.').pop()?.toLowerCase();
    if (!ext) return 'otro';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'imagen';
    if (['pdf'].includes(ext)) return 'pdf';
    if (['mp4', 'webm', 'ogg'].includes(ext)) return 'video';
    return 'otro';
  }
  abrirDocumento() {
  if (this.url) {
    window.open(this.url, '_blank');
  }
}


}
