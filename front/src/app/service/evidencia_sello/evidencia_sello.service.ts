import { Injectable } from '@angular/core';
import { Nuevoevidencia_sello } from '../../interfaces/evidencia_sello/evidencia_sello-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { evidencia_selloTable } from '../../interfaces/evidencia_sello/evidencia_sello-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class evidencia_selloService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/evidencia_sello';
  }
  newevidencia_sello(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllevidencia_sello(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<evidencia_selloTable[]>{
    return this.http.get<evidencia_selloTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllevidencia_sello/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getevidencia_sello(id:number,id_usuario:number,id_rol:number):Observable<evidencia_selloTable>{
    return this.http.get<evidencia_selloTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updevidencia_sello_id_sello(evidencia_sello:evidencia_selloTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updevidencia_sello_id_sello`,evidencia_sello);
  }

   delevidencia_sello(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delevidencia_sello/${id}/${id_usuario}`);
   }
   actualizarEstatusevidencia_sello(id_evidencia_sello:any,id_usuario:any,estatus:any,descripcion:any):Observable<evidencia_selloTable[]>{
    return this.http.get<evidencia_selloTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusevidencia_sello/${id_evidencia_sello}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
