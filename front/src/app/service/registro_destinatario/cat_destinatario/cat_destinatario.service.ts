import { Injectable } from '@angular/core';
import { Nuevocat_destinatario } from '../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_destinatarioTable } from '../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
import { gestion_oficiosTable } from '../../../interfaces/gestion_oficios/gestion_oficios-table.interface';
import { registro_destinatarioTable } from '../../../interfaces/registro_destinatario/registro_destinatario-table.interface';
@Injectable({
  providedIn: 'root'
})

export class cat_destinatarioService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_destinatario';
  }
  newcat_destinatario(cat_destinatario:Nuevocat_destinatario):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_destinatario);
  }

  getAllcat_destinatario(id_usuario:number):Observable<cat_destinatarioTable[]>{
    return this.http.get<cat_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_destinatario/${id_usuario}`);
  }

  getcat_destinatario(id:number,id_usuario:number):Observable<cat_destinatarioTable>{
    return this.http.get<cat_destinatarioTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_destinatario(cat_destinatario:cat_destinatarioTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_destinatario);
  }

  deletecat_destinatario(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_destinatario(body:FormData,ruta:any,id_registro_destinatario:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_registro_destinatario}`,body);
  }

  getregistro_destinatarioByid_gestion_oficios(id_gestion_oficios: number): Observable<cat_destinatarioTable[]> {
    return this.http.get<cat_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getregistro_destinatarioByid_gestion_oficios/${id_gestion_oficios}`);
  }

  cancelar_destinatario(id_cat_destinatario:number, id_gestion_oficios:number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/cancelarDestinatario/${id_cat_destinatario}/${id_gestion_oficios}`);
  }

  ccp_destinatario(id_cat_destinatario:number, id_gestion_oficios:number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/ccp_destinatario/${id_cat_destinatario}/${id_gestion_oficios}`);
  }

  get_id_gestion_oficiosByArea(id_direcion:number, id_area:number):Observable<gestion_oficiosTable[]>{
    return this.http.get<gestion_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/get_id_gestion_oficiosByArea/${id_direcion}/${id_area}`);
  }

  actualizarEstatusDestinatario(id_gestion_oficios:string,id_direccion:number, id_area:number,estatus:number):Observable<void>{
    return this.http.get<void>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusDestinatario/${id_gestion_oficios}/${id_direccion}/${id_area}/${estatus}`);
  }

  getEstatusDestinatario(id_gestion_oficios:string,id_direccion:number, id_area:number):Observable<registro_destinatarioTable>{
    return this.http.get<registro_destinatarioTable>(`${this.myAppUrl}${this.myApiUrl}/getEstatusDestinatario/${id_gestion_oficios}/${id_direccion}/${id_area}`);
  }

}
