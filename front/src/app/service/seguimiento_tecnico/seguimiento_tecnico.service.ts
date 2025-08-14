import { Injectable } from '@angular/core';
import { Nuevoseguimiento_tecnico } from '../../interfaces/seguimiento_tecnico/seguimiento_tecnico-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { seguimiento_tecnicoTable } from '../../interfaces/seguimiento_tecnico/seguimiento_tecnico-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class seguimiento_tecnicoService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/seguimiento_tecnico';
  }
  newseguimiento_tecnico(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllseguimiento_tecnico(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<seguimiento_tecnicoTable[]>{
    return this.http.get<seguimiento_tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllseguimiento_tecnico/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getseguimiento_tecnico(id:number,id_usuario:number,id_rol:number):Observable<seguimiento_tecnicoTable>{
    return this.http.get<seguimiento_tecnicoTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updseguimiento_tecnico_id_tecnico(seguimiento_tecnico:seguimiento_tecnicoTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updseguimiento_tecnico_id_tecnico`,seguimiento_tecnico);
  }

   delseguimiento_tecnico(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delseguimiento_tecnico/${id}/${id_usuario}`);
   }
   actualizarEstatusseguimiento_tecnico(id_seguimiento_tecnico:any,id_usuario:any,estatus:any,descripcion:any):Observable<seguimiento_tecnicoTable[]>{
    return this.http.get<seguimiento_tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusseguimiento_tecnico/${id_seguimiento_tecnico}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
