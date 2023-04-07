import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { switchMap,tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = enviroment.API_URL;

  constructor(private http:HttpClient,private tokenService:TokenService) { }

  login(email:string,password:string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/auth/login`,{
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.token)
      })
    )
  }

  logout(){
    this.tokenService.removeToken();
  }


}
