import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  public crearExpediente(expediente:any){
    return this.http.post(`${this.apiUrl}/api/expedientes`,expediente,{context:checkToken()})


  }

  public obtenerExpedientes(filtros?:any){
    filtros as HttpParams
    return this.http.get(`${this.apiUrl}/api/expedientes`,{context:checkToken(),params:filtros
    })
  }

  public obtenerExpediente(id:string){

      return this.http.get(`${this.apiUrl}/api/expedientes/${id}`,{context:checkToken()})



  }

  public elminiarExpediente(id:string){
    return this.http.delete(`${enviroment.API_URL}/api/expedientes/${id}`,{context: checkToken()})
  }

  public actualizarExpediente(id:string,expedient_updated:any){
    return this.http.put(`${enviroment.API_URL}/api/expedientes/${id}`,expedient_updated,{context: checkToken()})

  }


  public getNextId(){
    return this.http.get(`${this.apiUrl}/api/expedientes/getNextId`,{context:checkToken()})


  }
}
