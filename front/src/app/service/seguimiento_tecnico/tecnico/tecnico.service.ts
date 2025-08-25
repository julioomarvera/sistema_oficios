import { Injectable } from '@angular/core';
import { Nuevotecnico } from '../../../interfaces/seguimiento_tecnico/tecnico/tecnico-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tecnicoTable } from '../../../interfaces/seguimiento_tecnico/tecnico/tecnico-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class tecnicoService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/tecnico';
  }
  newtecnico(tecnico:Nuevotecnico):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,tecnico);
  }

  getAlltecnico(id_usuario:number):Observable<tecnicoTable[]>{
    return this.http.get<tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAlltecnico/${id_usuario}`);
  }

  gettecnico(id:number,id_usuario:number):Observable<tecnicoTable>{
    return this.http.get<tecnicoTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatetecnico(tecnico:tecnicoTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,tecnico);
  }

  deletetecnico(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFiletecnico(body:FormData,ruta:any,id_seguimiento_tecnico:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_seguimiento_tecnico}`,body);
  }
  get_oficio_tecnico_by_id_gestion_oficio_id_oficios(id_gestion_oficio : number,id_oficios: number):Observable<tecnicoTable>{
    return this.http.get<tecnicoTable>(`${this.myAppUrl}${this.myApiUrl}/get_oficio_tecnico_by_id_gestion_oficio_id_oficios/${id_gestion_oficio}/${id_oficios}`);
  }

  get_oficio_tecnico_by_id_gestion_oficio_id_oficios_arreglo(id_gestion_oficio : number,id_oficios: number):Observable<tecnicoTable[]>{
    return this.http.get<tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/get_oficio_tecnico_by_id_gestion_oficio_id_oficios_arreglo/${id_gestion_oficio}/${id_oficios}`);
  }

  get_oficio_tecnico_by_id_gestion_oficio_id_oficios_numero_empleado(id_gestion_oficio : number,id_oficios: number,numero_empleado:number):Observable<Nuevotecnico[]>{
    return this.http.get<Nuevotecnico[]>(`${this.myAppUrl}${this.myApiUrl}/get_oficio_tecnico_by_id_gestion_oficio_id_oficios_numero_empleado/${id_gestion_oficio}/${id_oficios}/${numero_empleado}`);
  }
  get_estatus_oficio(id_gestion_oficio : number,id_oficios: number):Observable<tecnicoTable>{
    return this.http.get<tecnicoTable>(`${this.myAppUrl}${this.myApiUrl}/get_estatus_oficio/${id_gestion_oficio}/${id_oficios}`);
  }

}
