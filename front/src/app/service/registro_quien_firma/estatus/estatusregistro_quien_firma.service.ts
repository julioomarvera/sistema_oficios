import { Injectable } from '@angular/core';
import { Nuevoestatusregistro_quien_firma } from '../../../interfaces/registro_quien_firma/estatus/estatusregistro_quien_firma-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatusregistro_quien_firmaTable } from '../../../interfaces/registro_quien_firma/estatus/estatusregistro_quien_firma-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatusregistro_quien_firmaService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatusregistro_quien_firma';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatusregistro_quien_firma(estatus:Nuevoestatusregistro_quien_firma):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdregistro_quien_firma(id:number , id_usuario:number):Observable<estatusregistro_quien_firmaTable>{
    return this.http.get<estatusregistro_quien_firmaTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatusregistro_quien_firma/${id}/${id_usuario}`);
  }
  getAllestatusregistro_quien_firma(id_usuario:number):Observable<estatusregistro_quien_firmaTable[]>{
    return this.http.get<estatusregistro_quien_firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusregistro_quien_firma/${id_usuario}`);
  }
   updateestatusregistro_quien_firma(registro_quien_firma: estatusregistro_quien_firmaTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,registro_quien_firma);
  }
   deleteregistro_quien_firma(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatusregistro_quien_firma(id_usuario:number):Observable<estatusregistro_quien_firmaTable>{
    return this.http.get<estatusregistro_quien_firmaTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusregistro_quien_firma/${id_usuario}`);
  }

}
