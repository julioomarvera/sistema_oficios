import { Injectable } from '@angular/core';
import { Nueva_asignacion } from '../../interfaces/asignacion/asignacion.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { asignacion } from '../../interfaces/asignacion/asignacion_table.interface';
import { GlobalConstants } from '../../common/global-constants';
import { cat_empleadosTable } from '../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { oficiosTable } from '../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { users_opdmTable } from '../../interfaces/usuarios_opdm/users_opdm/users_opdm-table.interface';
import { DestinatariosDireccionAsignacion } from '../../interfaces/registro_destinatario/destinatario_direccion_asignacion.interface';
import { tecnicoTable } from '../../interfaces/seguimiento_tecnico/tecnico/tecnico-table.interface';

@Injectable({
  providedIn: 'root'
})

export class asigacionService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/asignacion';
  }
  new_asignacion(cat_firmante: Nueva_asignacion): Observable<Nueva_asignacion> {
    return this.http.post<Nueva_asignacion>(`${this.myAppUrl}${this.myApiUrl}/`, cat_firmante);
  }

  getEncargadoArea(id_direccion: number, id_area: number): Observable<cat_empleadosTable> {
    return this.http.get<cat_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/getEncargadoArea/${id_direccion}/${id_area}`);
  }

  getAllcat_empleadosByDireccionAreas(id_gestion_oficios: number, id_direccion: number, id_area: number): Observable<cat_empleadosTable[]> {
    return this.http.get<cat_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAsignacionByDireccionArea/${id_gestion_oficios}/${id_direccion}/${id_area}`);
  }

  getAllcat_empleadosByid_gestion_oficios(id_gestion_oficios: number): Observable<asignacion[]> {
    return this.http.get<asignacion[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_empleadosByid_gestion_oficios/${id_gestion_oficios}`);
  }

  delete_asignacion(id_usuario: number, id_gestion_oficios: number, numero_empleado: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/deleteAsignacion/${id_usuario}/${id_gestion_oficios}/${numero_empleado}`);
  }

  getOficiosByNumeroEmpleado(numero_empleado: string, id_direccion: number, id_area: number,estatus_seguimiento:number,roll : number): Observable<oficiosTable[]> {
    return this.http.get<oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getOficiosByNumeroEmpleado/${numero_empleado}/${id_direccion}/${id_area}/${estatus_seguimiento}/${roll}`);
  }

  update_firmante_instrucciones(id_asignacion: number , numero_empledo_asignacion: number,nuevaIntruccion:string): Observable<string> {
    const body = { id_asignacion, numero_empledo_asignacion,nuevaIntruccion };
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/update_firmante_instrucciones`, body);
  }

  getInfo_quien_solicito(id_gestion_oficios: number, numero_tecnico_asignado: number, id_rol:string): Observable<users_opdmTable> {
    return this.http.get<users_opdmTable>(`${this.myAppUrl}${this.myApiUrl}/getInfo_quien_solicito/${id_gestion_oficios}/${numero_tecnico_asignado}/${id_rol}`);
  }

  getInstruccion(id_gestion_oficios: number): Observable<Nueva_asignacion> {
    return this.http.get<Nueva_asignacion>(`${this.myAppUrl}${this.myApiUrl}/getInstrucciones/${id_gestion_oficios}`);
  }

  getEncargadosPorDireccionArea(id_direccion: number, id_area: number): Observable<DestinatariosDireccionAsignacion[]> {
    return this.http.get<DestinatariosDireccionAsignacion[]>(`${this.myAppUrl}${this.myApiUrl}/getEncargadosPorDireccionArea/${id_direccion}/${id_area}`);
  }

  getAsignacionesByNumeroEmpleado(numero_empleado: number): Observable<tecnicoTable[]> {
    return this.http.get<tecnicoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAsignacionesByNumeroEmpleado/${numero_empleado}`);
  }


  getSecretariasAsignadosByid_gestion_oficioBydireccion(id_gestion_oficio: number,id_oficios: number,id_direccion: number, id_area: number): Observable<users_opdmTable[]> {
    return this.http.get<users_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/getSecretariasAsignadosByid_gestion_oficioBydireccion/${id_gestion_oficio}/${id_oficios}/${id_direccion}/${id_area}`);
  }


  getTecnicosAsignadosByid_gestion_oficioBydireccion(id_gestion_oficio: number,id_oficios: number,id_direccion: number, id_area: number): Observable<asignacion[]> {
    return this.http.get<asignacion[]>(`${this.myAppUrl}${this.myApiUrl}/getTecnicosAsignadosByid_gestion_oficioBydireccion/${id_gestion_oficio}/${id_oficios}/${id_direccion}/${id_area}`);
  }

   getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado(id_gestion_oficio: number,id_oficios: number,id_direccion: number, id_area: number,numero_empleado:number): Observable<asignacion[]> {
    return this.http.get<asignacion[]>(`${this.myAppUrl}${this.myApiUrl}/getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado/${id_gestion_oficio}/${id_oficios}/${id_direccion}/${id_area}/${numero_empleado}`);
  }



  // getcat_firmante(id:number,id_usuario:number):Observable<cat_firmanteTable>{
  //   return this.http.get<cat_firmanteTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  // }

  // updatecat_firmante(cat_firmante:cat_firmanteTable):Observable<string>{
  //   return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_firmante);
  // }

  // deletecat_firmante(id:number,id_usuario:number):Observable<void>{
  //   return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  // }

  // sendFilecat_firmante(body:FormData,ruta:any,id_registro_quien_firma:any):Observable<any>{
  //   return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_registro_quien_firma}`,body);
  // }

  // getcat_firmanteByid_gestion_oficios(id_gestion_oficios:number):Observable<cat_firmanteTable>{
  //   return this.http.get<cat_firmanteTable>(`${this.myAppUrl}${this.myApiUrl}/getcat_firmanteByid_gestion_oficios/${id_gestion_oficios}`);
  // }

  // cancelFirmante(id_gestion_oficios:number):Observable<void>{
  //   return this.http.get<void>(`${this.myAppUrl}${this.myApiUrl}/cancelFirmante/${id_gestion_oficios}`);
  // }

}
