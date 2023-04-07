import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expediente } from '../interfaces/expediente';
import { enviroment } from 'src/app/enviroments/enviroment';
import { checkToken } from '../interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {


  constructor(private http:HttpClient) {

  }

  apiUrl = enviroment.API_URL

  public crearExpediente(expediente:Expediente){
    return this.http.post(`${this.apiUrl}/expedientes`,expediente,{context:checkToken()})


  }

  public obtenerExpedientes(){
    return this.http.get(`${this.apiUrl}/expedientes`,{context:checkToken()})


  }

  public obtenerExpediente(id:string){

      return this.http.get(`${this.apiUrl}/expedientes/${id}`,{context:checkToken()})



  }

  public elminiarExpediente(id:string){
    return this.http.delete(`${enviroment.API_URL}/expedientes/${id}`,{context: checkToken()})
  }

  public actualizarExpediente(id:string,expedient_updated:any){
    return this.http.put(`${enviroment.API_URL}/expedientes/${id}`,expedient_updated,{context: checkToken()})

  }
}
