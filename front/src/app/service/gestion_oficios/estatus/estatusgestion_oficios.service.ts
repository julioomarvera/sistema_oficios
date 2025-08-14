import { Injectable } from '@angular/core';
import { Nuevoestatusgestion_oficios } from '../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatusgestion_oficiosTable } from '../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatusgestion_oficiosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatusgestion_oficios';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatusgestion_oficios(estatus:Nuevoestatusgestion_oficios):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdgestion_oficios(id:number , id_usuario:number):Observable<estatusgestion_oficiosTable>{
    return this.http.get<estatusgestion_oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatusgestion_oficios/${id}/${id_usuario}`);
  }
  getAllestatusgestion_oficios(id_usuario:number):Observable<estatusgestion_oficiosTable[]>{
    return this.http.get<estatusgestion_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusgestion_oficios/${id_usuario}`);
  }
   updateestatusgestion_oficios(gestion_oficios: estatusgestion_oficiosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,gestion_oficios);
  }
   deletegestion_oficios(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatusgestion_oficios(id_usuario:number):Observable<estatusgestion_oficiosTable>{
    return this.http.get<estatusgestion_oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusgestion_oficios/${id_usuario}`);
  }

}
