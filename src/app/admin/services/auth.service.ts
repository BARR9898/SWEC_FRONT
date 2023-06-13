import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { switchMap,tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth';
import { getCookie,setCookie,removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = enviroment.API_URL;

  constructor(private http:HttpClient,private tokenService:TokenService) { }

  login(email:string,password:string){
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`,{
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.data.token)
      })
    )
  }

  logout(){
    this.tokenService.removeToken();
    enviroment.user =  null
  }
  
  verifyUserExist(email:string){
    let data = {
      email: email
    }
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`,data)
  }

  resetPassword(data:any){
    return this.http.post(`${this.apiUrl}/api/auth/set-password`,data)
  }

}
