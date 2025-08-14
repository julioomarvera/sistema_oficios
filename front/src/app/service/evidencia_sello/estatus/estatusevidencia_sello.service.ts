import { Injectable } from '@angular/core';
import { Nuevoestatusevidencia_sello } from '../../../interfaces/evidencia_sello/estatus/estatusevidencia_sello-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatusevidencia_selloTable } from '../../../interfaces/evidencia_sello/estatus/estatusevidencia_sello-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatusevidencia_selloService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatusevidencia_sello';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatusevidencia_sello(estatus:Nuevoestatusevidencia_sello):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdevidencia_sello(id:number , id_usuario:number):Observable<estatusevidencia_selloTable>{
    return this.http.get<estatusevidencia_selloTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatusevidencia_sello/${id}/${id_usuario}`);
  }
  getAllestatusevidencia_sello(id_usuario:number):Observable<estatusevidencia_selloTable[]>{
    return this.http.get<estatusevidencia_selloTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusevidencia_sello/${id_usuario}`);
  }
   updateestatusevidencia_sello(evidencia_sello: estatusevidencia_selloTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,evidencia_sello);
  }
   deleteevidencia_sello(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatusevidencia_sello(id_usuario:number):Observable<estatusevidencia_selloTable>{
    return this.http.get<estatusevidencia_selloTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusevidencia_sello/${id_usuario}`);
  }

}
