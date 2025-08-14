import { Injectable } from '@angular/core';
import { NuevohistorialMastergestion_oficios } from '../../../interfaces/gestion_oficios/historialMaster/historialMastergestion_oficios-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMastergestion_oficiosTable } from '../../../interfaces/gestion_oficios/historialMaster/historialMastergestion_oficios-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMastergestion_oficiosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMastergestion_oficios';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMastergestion_oficios(historialMaster:NuevohistorialMastergestion_oficios):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdgestion_oficios(id:number , id_usuario:number):Observable<historialMastergestion_oficiosTable[]>{
    return this.http.get<historialMastergestion_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMastergestion_oficios/${id}/${id_usuario}`);
  }
  getAllhistorialMastergestion_oficios(id_usuario:number):Observable<historialMastergestion_oficiosTable[]>{
    return this.http.get<historialMastergestion_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMastergestion_oficios/${id_usuario}`);
  }
   updatehistorialMastergestion_oficios(gestion_oficios: historialMastergestion_oficiosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,gestion_oficios);
  }
   deletegestion_oficios(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
