import { Injectable } from '@angular/core';
import { Nuevoregistro_quien_firma } from '../../interfaces/registro_quien_firma/registro_quien_firma-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registro_quien_firmaTable } from '../../interfaces/registro_quien_firma/registro_quien_firma-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class registro_quien_firmaService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/registro_quien_firma';
  }
  newregistro_quien_firma(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllregistro_quien_firma(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<registro_quien_firmaTable[]>{
    return this.http.get<registro_quien_firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllregistro_quien_firma/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getregistro_quien_firma(id:number,id_usuario:number,id_rol:number):Observable<registro_quien_firmaTable>{
    return this.http.get<registro_quien_firmaTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updregistro_quien_firma_id_cat_firmante(registro_quien_firma:registro_quien_firmaTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updregistro_quien_firma_id_cat_firmante`,registro_quien_firma);
  }

   delregistro_quien_firma(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delregistro_quien_firma/${id}/${id_usuario}`);
   }
   actualizarEstatusregistro_quien_firma(id_registro_quien_firma:any,id_usuario:any,estatus:any,descripcion:any):Observable<registro_quien_firmaTable[]>{
    return this.http.get<registro_quien_firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusregistro_quien_firma/${id_registro_quien_firma}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
