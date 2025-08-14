import { Injectable } from '@angular/core';
import { Nuevoestatususer } from '../../../interfaces/user/estatus/estatususer-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatususerTable } from '../../../interfaces/user/estatus/estatususer-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatususerService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatususer';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatususer(estatus:Nuevoestatususer):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIduser(id:number , id_usuario:number):Observable<estatususerTable>{
    return this.http.get<estatususerTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatususer/${id}/${id_usuario}`);
  }
  getAllestatususer(id_usuario:number):Observable<estatususerTable[]>{
    return this.http.get<estatususerTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatususer/${id_usuario}`);
  }
   updateestatususer(user: estatususerTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,user);
  }
   deleteuser(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatususer(id_usuario:number):Observable<estatususerTable>{
    return this.http.get<estatususerTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatususer/${id_usuario}`);
  }

}
