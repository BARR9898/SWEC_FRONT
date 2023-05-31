import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUrl = enviroment.API_URL

  constructor(private http:HttpClient) { 
  }
  
  public getUsuarios(){
    return this.http.get(`${this.apiUrl}/api/usuarios`,{context:checkToken()})
  }

  public getUsuario(id:any){
    return this.http.get(`${this.apiUrl}/api/usuarios/${id}`,{context:checkToken()})
  }

  public createUsuario(data:any){
    return this.http.post(`${this.apiUrl}/api/usuarios`,data,{context:checkToken()})
  }

  public updateUsuario(id:any,data:any){
    return this.http.put(`${this.apiUrl}/api/usuarios/${id}`,data,{context:checkToken()})
  }

  public deleteUsuario(id:any){
    return this.http.delete(`${this.apiUrl}/api/usuarios/${id}`,{context:checkToken()})

  }

}
