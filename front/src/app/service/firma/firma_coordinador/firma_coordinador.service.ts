import { Injectable } from '@angular/core';
import { Nuevofirma_coordinador } from '../../../interfaces/firma/firma_coordinador/firma_coordinador-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firma_coordinadorTable } from '../../../interfaces/firma/firma_coordinador/firma_coordinador-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class firma_coordinadorService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/firma_coordinador';
  }
  newfirma_coordinador(firma_coordinador:Nuevofirma_coordinador):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,firma_coordinador);
  }

  getAllfirma_coordinador(id_usuario:number):Observable<firma_coordinadorTable[]>{
    return this.http.get<firma_coordinadorTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllfirma_coordinador/${id_usuario}`);
  }

  getfirma_coordinador(id:number,id_usuario:number):Observable<firma_coordinadorTable>{
    return this.http.get<firma_coordinadorTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatefirma_coordinador(firma_coordinador:firma_coordinadorTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,firma_coordinador);
  }

  deletefirma_coordinador(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilefirma_coordinador(body:FormData,ruta:any,id_firma:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_firma}`,body);
  }
}
