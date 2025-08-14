import { Injectable } from '@angular/core';
import { Nuevoestatusregistro_destinatario } from '../../../interfaces/registro_destinatario/estatus/estatusregistro_destinatario-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatusregistro_destinatarioTable } from '../../../interfaces/registro_destinatario/estatus/estatusregistro_destinatario-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatusregistro_destinatarioService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatusregistro_destinatario';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatusregistro_destinatario(estatus:Nuevoestatusregistro_destinatario):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdregistro_destinatario(id:number , id_usuario:number):Observable<estatusregistro_destinatarioTable>{
    return this.http.get<estatusregistro_destinatarioTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatusregistro_destinatario/${id}/${id_usuario}`);
  }
  getAllestatusregistro_destinatario(id_usuario:number):Observable<estatusregistro_destinatarioTable[]>{
    return this.http.get<estatusregistro_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusregistro_destinatario/${id_usuario}`);
  }
   updateestatusregistro_destinatario(registro_destinatario: estatusregistro_destinatarioTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,registro_destinatario);
  }
   deleteregistro_destinatario(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatusregistro_destinatario(id_usuario:number):Observable<estatusregistro_destinatarioTable>{
    return this.http.get<estatusregistro_destinatarioTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusregistro_destinatario/${id_usuario}`);
  }

}
