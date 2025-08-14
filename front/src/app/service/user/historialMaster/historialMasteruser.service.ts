import { Injectable } from '@angular/core';
import { NuevohistorialMasteruser } from '../../../interfaces/user/historialMaster/historialMasteruser-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMasteruserTable } from '../../../interfaces/user/historialMaster/historialMasteruser-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMasteruserService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMasteruser';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMasteruser(historialMaster:NuevohistorialMasteruser):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIduser(id:number , id_usuario:number):Observable<historialMasteruserTable[]>{
    return this.http.get<historialMasteruserTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMasteruser/${id}/${id_usuario}`);
  }
  getAllhistorialMasteruser(id_usuario:number):Observable<historialMasteruserTable[]>{
    return this.http.get<historialMasteruserTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMasteruser/${id_usuario}`);
  }
   updatehistorialMasteruser(user: historialMasteruserTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,user);
  }
   deleteuser(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
