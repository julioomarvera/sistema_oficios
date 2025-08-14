import { Injectable } from '@angular/core';
import { Nuevoestatuscatalogo_empleados } from '../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatuscatalogo_empleadosTable } from '../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatuscatalogo_empleadosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatuscatalogo_empleados';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatuscatalogo_empleados(estatus:Nuevoestatuscatalogo_empleados):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdcatalogo_empleados(id:number , id_usuario:number):Observable<estatuscatalogo_empleadosTable>{
    return this.http.get<estatuscatalogo_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatuscatalogo_empleados/${id}/${id_usuario}`);
  }
  getAllestatuscatalogo_empleados(id_usuario:number):Observable<estatuscatalogo_empleadosTable[]>{
    return this.http.get<estatuscatalogo_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatuscatalogo_empleados/${id_usuario}`);
  }
   updateestatuscatalogo_empleados(catalogo_empleados: estatuscatalogo_empleadosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,catalogo_empleados);
  }
   deletecatalogo_empleados(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatuscatalogo_empleados(id_usuario:number):Observable<estatuscatalogo_empleadosTable>{
    return this.http.get<estatuscatalogo_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatuscatalogo_empleados/${id_usuario}`);
  }

}
