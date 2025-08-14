// src/app/service/pdf-extractor.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as pdfjsLib from 'pdfjs-dist';
// Importaciones arriba del archivo
import Tesseract from 'tesseract.js'

pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.min.mjs';
// REMOVE THIS LINE: import { pdfWorker } from 'pdfjs-dist/build/pdf.worker.mjs'; 

@Injectable({
  providedIn: 'root'
})
export class PdfExtractorService {
  private textSubject = new BehaviorSubject<string>(''); // 👈 Aquí van tus líneas
  text$ = this.textSubject.asObservable();

  constructor() { }

  updateText(newText: string) {
    this.textSubject.next(newText); // 👈 Método para actualizar
  }


  async extractTextHybrid(file: File): Promise<string> {
    if (!file || file.type !== 'application/pdf') {
      throw new Error('Archivo inválido. Solo se aceptan PDFs.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdfDocument.getPage(1);

    const textContent = await page.getTextContent();
    const embeddedText = textContent.items
      .filter((item: any) => typeof item.str === 'string')
      .map((item: any) => item.str)
      .join(' ');

    if (embeddedText.trim().length > 30) {
      this.updateText(embeddedText);
      return embeddedText;
    }


    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    const ocrResult = await Tesseract.recognize(canvas, 'eng', {
      logger: m => console.log('OCR:', m),

    });




    const ocrText = ocrResult.data.text;

    if (!ocrText.trim()) {
      throw new Error('No se pudo extraer texto ni por OCR.');
    }

    this.updateText(ocrText);
    
    const cleanText = ocrText.replace(/\s+/g, ' ').trim();
    this.updateText(cleanText);
    
    return cleanText;


  }
}
