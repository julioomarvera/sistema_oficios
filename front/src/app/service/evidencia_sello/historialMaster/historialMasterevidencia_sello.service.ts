import { Injectable } from '@angular/core';
import { NuevohistorialMasterevidencia_sello } from '../../../interfaces/evidencia_sello/historialMaster/historialMasterevidencia_sello-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasterevidencia_selloTable } from '../../../interfaces/evidencia_sello/historialMaster/historialMasterevidencia_sello-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasterevidencia_selloService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasterevidencia_sello';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasterevidencia_sello(historialMaster:NuevohistorialMasterevidencia_sello):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdevidencia_sello(id:number , id_usuario:number):Observable<historialMasterevidencia_selloTable[]>{
    return this.http.get<historialMasterevidencia_selloTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasterevidencia_sello/${id}/${id_usuario}`);
  }
  getAllhistorialMasterevidencia_sello(id_usuario:number):Observable<historialMasterevidencia_selloTable[]>{
    return this.http.get<historialMasterevidencia_selloTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasterevidencia_sello/${id_usuario}`);
  }
   updatehistorialMasterevidencia_sello(evidencia_sello: historialMasterevidencia_selloTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,evidencia_sello);
  }
   deleteevidencia_sello(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
