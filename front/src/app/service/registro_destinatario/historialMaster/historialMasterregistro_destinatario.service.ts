import { Injectable } from '@angular/core';
import { NuevohistorialMasterregistro_destinatario } from '../../../interfaces/registro_destinatario/historialMaster/historialMasterregistro_destinatario-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasterregistro_destinatarioTable } from '../../../interfaces/registro_destinatario/historialMaster/historialMasterregistro_destinatario-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasterregistro_destinatarioService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasterregistro_destinatario';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasterregistro_destinatario(historialMaster:NuevohistorialMasterregistro_destinatario):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdregistro_destinatario(id:number , id_usuario:number):Observable<historialMasterregistro_destinatarioTable[]>{
    return this.http.get<historialMasterregistro_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasterregistro_destinatario/${id}/${id_usuario}`);
  }
  getAllhistorialMasterregistro_destinatario(id_usuario:number):Observable<historialMasterregistro_destinatarioTable[]>{
    return this.http.get<historialMasterregistro_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasterregistro_destinatario/${id_usuario}`);
  }
   updatehistorialMasterregistro_destinatario(registro_destinatario: historialMasterregistro_destinatarioTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,registro_destinatario);
  }
   deleteregistro_destinatario(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
