import { Injectable } from '@angular/core';
import { Nuevocatalogo_empleados } from '../../interfaces/catalogo_empleados/catalogo_empleados-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catalogo_empleadosTable } from '../../interfaces/catalogo_empleados/catalogo_empleados-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class catalogo_empleadosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/catalogo_empleados';
  }
  newcatalogo_empleados(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllcatalogo_empleados(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<catalogo_empleadosTable[]>{
    return this.http.get<catalogo_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcatalogo_empleados/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getcatalogo_empleados(id:number,id_usuario:number,id_rol:number):Observable<catalogo_empleadosTable>{
    return this.http.get<catalogo_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updcatalogo_empleados_id_cat_empleados(catalogo_empleados:catalogo_empleadosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updcatalogo_empleados_id_cat_empleados`,catalogo_empleados);
  }

   delcatalogo_empleados(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delcatalogo_empleados/${id}/${id_usuario}`);
   }
   actualizarEstatuscatalogo_empleados(id_catalogo_empleados:any,id_usuario:any,estatus:any,descripcion:any):Observable<catalogo_empleadosTable[]>{
    return this.http.get<catalogo_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatuscatalogo_empleados/${id_catalogo_empleados}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
