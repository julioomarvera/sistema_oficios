import { Injectable } from '@angular/core';
import { Nuevosello } from '../../../interfaces/evidencia_sello/sello/sello-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selloTable } from '../../../interfaces/evidencia_sello/sello/sello-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class selloService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/sello';
  }
  newsello(sello:Nuevosello):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,sello);
  }

  getAllsello(id_usuario:number):Observable<selloTable[]>{
    return this.http.get<selloTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllsello/${id_usuario}`);
  }

  getselloByIdgestonOficios(id_gestion_oficios:number,id_usuario:number):Observable<selloTable>{
    return this.http.get<selloTable>(`${this.myAppUrl}${this.myApiUrl}/getselloByIdgestonOficios/${id_gestion_oficios}/${id_usuario}`);
  }

  updatesello(sello:selloTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,sello);
  }

  deletesello(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilesello(body:FormData,ruta:any,id_gestion_oficios:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_gestion_oficios}`,body);
  }

  getInformacionSello(id_gestion_oficio: number, id_direccion:number, id_area:number,numero_empleado:number):Observable<selloTable>{
    return this.http.get<selloTable>(`${this.myAppUrl}${this.myApiUrl}/getInformacionSello/${id_gestion_oficio}/${id_direccion}/${id_area}/${numero_empleado}`);
  }
}
