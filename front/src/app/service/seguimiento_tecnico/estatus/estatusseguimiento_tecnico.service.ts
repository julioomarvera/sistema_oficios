import { Injectable } from '@angular/core';
import { Nuevoestatusseguimiento_tecnico } from '../../../interfaces/seguimiento_tecnico/estatus/estatusseguimiento_tecnico-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatusseguimiento_tecnicoTable } from '../../../interfaces/seguimiento_tecnico/estatus/estatusseguimiento_tecnico-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatusseguimiento_tecnicoService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatusseguimiento_tecnico';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatusseguimiento_tecnico(estatus:Nuevoestatusseguimiento_tecnico):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdseguimiento_tecnico(id:number , id_usuario:number):Observable<estatusseguimiento_tecnicoTable>{
    return this.http.get<estatusseguimiento_tecnicoTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatusseguimiento_tecnico/${id}/${id_usuario}`);
  }
  getAllestatusseguimiento_tecnico(id_usuario:number):Observable<estatusseguimiento_tecnicoTable[]>{
    return this.http.get<estatusseguimiento_tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusseguimiento_tecnico/${id_usuario}`);
  }
   updateestatusseguimiento_tecnico(seguimiento_tecnico: estatusseguimiento_tecnicoTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,seguimiento_tecnico);
  }
   deleteseguimiento_tecnico(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatusseguimiento_tecnico(id_usuario:number):Observable<estatusseguimiento_tecnicoTable>{
    return this.http.get<estatusseguimiento_tecnicoTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatusseguimiento_tecnico/${id_usuario}`);
  }

}
