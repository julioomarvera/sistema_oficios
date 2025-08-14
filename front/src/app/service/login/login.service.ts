import { Injectable } from '@angular/core';
import {LoginResponse} from '../../interfaces/login/login-response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl:string;
  private myAppiUrl:string;

  constructor( private http:HttpClient) { 
    this.myAppUrl = GlobalConstants.appURL;
    this.myAppiUrl = "api/users_opdm"
  }


  loginUser(LoginResponse :LoginResponse ):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myAppiUrl}/login`,LoginResponse);
  }

  
 
}
