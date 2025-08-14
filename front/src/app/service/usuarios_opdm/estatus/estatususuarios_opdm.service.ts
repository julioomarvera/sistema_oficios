import { Injectable } from '@angular/core';
import { Nuevoestatususuarios_opdm } from '../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatususuarios_opdmTable } from '../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatususuarios_opdmService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatususuarios_opdm';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatususuarios_opdm(estatus:Nuevoestatususuarios_opdm):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdusuarios_opdm(id:number , id_usuario:number):Observable<estatususuarios_opdmTable>{
    return this.http.get<estatususuarios_opdmTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatususuarios_opdm/${id}/${id_usuario}`);
  }
  getAllestatususuarios_opdm(id_usuario:number):Observable<estatususuarios_opdmTable[]>{
    return this.http.get<estatususuarios_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatususuarios_opdm/${id_usuario}`);
  }
   updateestatususuarios_opdm(usuarios_opdm: estatususuarios_opdmTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,usuarios_opdm);
  }
   deleteusuarios_opdm(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatususuarios_opdm(id_usuario:number):Observable<estatususuarios_opdmTable>{
    return this.http.get<estatususuarios_opdmTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatususuarios_opdm/${id_usuario}`);
  }

}
