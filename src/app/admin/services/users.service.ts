import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = enviroment.API_URL
  constructor(
    private http:HttpClient,
    private tokenService:TokenService
  ) { }

  getUser(){
    const token = this.tokenService.getToken()
    return this.http.get(`${this.apiUrl}/users`,{
      headers:{
        Auth:`Barer ${token}`
      }
    })
  }
}
