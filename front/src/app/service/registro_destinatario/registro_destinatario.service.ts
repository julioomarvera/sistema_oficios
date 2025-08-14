import { Injectable } from '@angular/core';
import { Nuevoregistro_destinatario } from '../../interfaces/registro_destinatario/registro_destinatario-response.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registro_destinatarioTable } from '../../interfaces/registro_destinatario/registro_destinatario-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class registro_destinatarioService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/registro_destinatario';
  }
  newregistro_destinatario(id_usuario: number): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllregistro_destinatario(id_usuario: number, id_rol: number, estatus: number, activo: number): Observable<registro_destinatarioTable[]> {
    return this.http.get<registro_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllregistro_destinatario/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getregistro_destinatario(id: number, id_usuario: number, id_rol: number): Observable<registro_destinatarioTable> {
    return this.http.get<registro_destinatarioTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

  updregistro_destinatario_id_cat_destinatario(registro_destinatario: registro_destinatarioTable): Observable<string> {
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updregistro_destinatario_id_cat_destinatario`, registro_destinatario);
  }

  delregistro_destinatario(id: number, id_usuario: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delregistro_destinatario/${id}/${id_usuario}`);
  }
  actualizarEstatusregistro_destinatario(id_registro_destinatario: any, id_usuario: any, estatus: any, descripcion: any): Observable<registro_destinatarioTable[]> {
    return this.http.get<registro_destinatarioTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusregistro_destinatario/${id_registro_destinatario}/${id_usuario}/${estatus}/${descripcion}`);
  }


}
