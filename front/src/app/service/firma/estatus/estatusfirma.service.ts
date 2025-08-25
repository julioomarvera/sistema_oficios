import { Injectable } from '@angular/core';
import { Nuevoestatusfirma } from '../../../interfaces/firma/estatus/estatusfirma-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatusfirmaTable } from '../../../interfaces/firma/estatus/estatusfirma-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatusfirmaService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatusfirma';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatusfirma(estatus:Nuevoestatusfirma):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdfirma(id:number , id_usuario:number):Observable<estatusfirmaTable>{
    return this.http.get<estatusfirmaTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatusfirma/${id}/${id_usuario}`);
  }
  getAllestatusfirma(id_usuario:number):Observable<estatusfirmaTable[]>{
    return this.http.get<estatusfirmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusfirma/${id_usuario}`);
  }
   updateestatusfirma(firma: estatusfirmaTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,firma);
  }
   deletefirma(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatusfirma(id_usuario:number):Observable<estatusfirmaTable>{
    return this.http.get<estatusfirmaTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusfirma/${id_usuario}`);
  }

}
