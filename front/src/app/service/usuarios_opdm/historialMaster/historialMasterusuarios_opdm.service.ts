import { Injectable } from '@angular/core';
import { NuevohistorialMasterusuarios_opdm } from '../../../interfaces/usuarios_opdm/historialMaster/historialMasterusuarios_opdm-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasterusuarios_opdmTable } from '../../../interfaces/usuarios_opdm/historialMaster/historialMasterusuarios_opdm-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasterusuarios_opdmService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasterusuarios_opdm';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasterusuarios_opdm(historialMaster:NuevohistorialMasterusuarios_opdm):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdusuarios_opdm(id:number , id_usuario:number):Observable<historialMasterusuarios_opdmTable[]>{
    return this.http.get<historialMasterusuarios_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasterusuarios_opdm/${id}/${id_usuario}`);
  }
  getAllhistorialMasterusuarios_opdm(id_usuario:number):Observable<historialMasterusuarios_opdmTable[]>{
    return this.http.get<historialMasterusuarios_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasterusuarios_opdm/${id_usuario}`);
  }
   updatehistorialMasterusuarios_opdm(usuarios_opdm: historialMasterusuarios_opdmTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,usuarios_opdm);
  }
   deleteusuarios_opdm(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
