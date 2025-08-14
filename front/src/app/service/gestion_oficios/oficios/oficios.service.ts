import { Injectable } from '@angular/core';
import { Nuevooficios } from '../../../interfaces/gestion_oficios/oficios/oficios-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { oficiosTable } from '../../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class oficiosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/oficios';
  }
  newoficios(oficios:Nuevooficios):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,oficios);
  }

  getAlloficios(id_usuario:number):Observable<oficiosTable[]>{
    return this.http.get<oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAlloficios/${id_usuario}`);
  }

  getoficios(id:number,id_usuario:number):Observable<oficiosTable>{
    return this.http.get<oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updateoficios(oficios:oficiosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,oficios);
  }

  deleteoficios(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFileoficios(body:FormData,ruta:any,id_gestion_oficios:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_gestion_oficios}`,body);
  }

  getOficio_by_id_oficio(id_oficios:number):Observable<oficiosTable>{
    return this.http.get<oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/getOficio_by_id_oficio/${id_oficios}`);
  }
}
