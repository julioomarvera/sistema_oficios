import { Injectable } from '@angular/core';
import { NuevohistorialMasterseguimiento_tecnico } from '../../../interfaces/seguimiento_tecnico/historialMaster/historialMasterseguimiento_tecnico-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasterseguimiento_tecnicoTable } from '../../../interfaces/seguimiento_tecnico/historialMaster/historialMasterseguimiento_tecnico-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasterseguimiento_tecnicoService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasterseguimiento_tecnico';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasterseguimiento_tecnico(historialMaster:NuevohistorialMasterseguimiento_tecnico):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdseguimiento_tecnico(id:number , id_usuario:number):Observable<historialMasterseguimiento_tecnicoTable[]>{
    return this.http.get<historialMasterseguimiento_tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasterseguimiento_tecnico/${id}/${id_usuario}`);
  }
  getAllhistorialMasterseguimiento_tecnico(id_usuario:number):Observable<historialMasterseguimiento_tecnicoTable[]>{
    return this.http.get<historialMasterseguimiento_tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasterseguimiento_tecnico/${id_usuario}`);
  }
   updatehistorialMasterseguimiento_tecnico(seguimiento_tecnico: historialMasterseguimiento_tecnicoTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,seguimiento_tecnico);
  }
   deleteseguimiento_tecnico(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
