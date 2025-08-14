import { Injectable } from '@angular/core';
import { NuevohistorialMasterregistro_quien_firma } from '../../../interfaces/registro_quien_firma/historialMaster/historialMasterregistro_quien_firma-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasterregistro_quien_firmaTable } from '../../../interfaces/registro_quien_firma/historialMaster/historialMasterregistro_quien_firma-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasterregistro_quien_firmaService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasterregistro_quien_firma';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasterregistro_quien_firma(historialMaster:NuevohistorialMasterregistro_quien_firma):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdregistro_quien_firma(id:number , id_usuario:number):Observable<historialMasterregistro_quien_firmaTable[]>{
    return this.http.get<historialMasterregistro_quien_firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasterregistro_quien_firma/${id}/${id_usuario}`);
  }
  getAllhistorialMasterregistro_quien_firma(id_usuario:number):Observable<historialMasterregistro_quien_firmaTable[]>{
    return this.http.get<historialMasterregistro_quien_firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasterregistro_quien_firma/${id_usuario}`);
  }
   updatehistorialMasterregistro_quien_firma(registro_quien_firma: historialMasterregistro_quien_firmaTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,registro_quien_firma);
  }
   deleteregistro_quien_firma(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
