import { Injectable } from '@angular/core';
import { NuevohistorialMasterfirma } from '../../../interfaces/firma/historialMaster/historialMasterfirma-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasterfirmaTable } from '../../../interfaces/firma/historialMaster/historialMasterfirma-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasterfirmaService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasterfirma';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasterfirma(historialMaster:NuevohistorialMasterfirma):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdfirma(id:number , id_usuario:number):Observable<historialMasterfirmaTable[]>{
    return this.http.get<historialMasterfirmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasterfirma/${id}/${id_usuario}`);
  }
  getAllhistorialMasterfirma(id_usuario:number):Observable<historialMasterfirmaTable[]>{
    return this.http.get<historialMasterfirmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasterfirma/${id_usuario}`);
  }
   updatehistorialMasterfirma(firma: historialMasterfirmaTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,firma);
  }
   deletefirma(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
