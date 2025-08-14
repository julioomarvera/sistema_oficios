import { Injectable } from '@angular/core';
import { Nuevogestion_oficios } from '../../interfaces/gestion_oficios/gestion_oficios-response.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gestion_oficiosTable } from '../../interfaces/gestion_oficios/gestion_oficios-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class gestion_oficiosService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/gestion_oficios';
  }
  newgestion_oficios(id_usuario: number): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllgestion_oficios(id_usuario: number, id_rol: number, estatus: number, activo: number): Observable<gestion_oficiosTable[]> {
    return this.http.get<gestion_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllgestion_oficios/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getgestion_oficios(id: number, id_usuario: number, id_rol: number): Observable<gestion_oficiosTable> {
    return this.http.get<gestion_oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

  updgestion_oficios_id_oficios(gestion_oficios: gestion_oficiosTable): Observable<string> {
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updgestion_oficios_id_oficios`, gestion_oficios);
  }

  delgestion_oficios(id: number, id_usuario: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delgestion_oficios/${id}/${id_usuario}`);
  }
  actualizarEstatusgestion_oficios(id_gestion_oficios: any, id_usuario: any, estatus: any, descripcion: any): Observable<gestion_oficiosTable[]> {
    return this.http.get<gestion_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusgestion_oficios/${id_gestion_oficios}/${id_usuario}/${estatus}/${descripcion}`);
  }

  getOficiosByDireccion(list_id_gestion_oficios: any[]): Observable<gestion_oficiosTable[]> {
    return this.http.post<gestion_oficiosTable[]>( `${this.myAppUrl}${this.myApiUrl}/getOficiosByDireccion`,{ids: list_id_gestion_oficios });
  }

  getId_gestion_oficios(id_oficios: any): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/getId_gestion_oficio/${id_oficios}`);
  }


}
