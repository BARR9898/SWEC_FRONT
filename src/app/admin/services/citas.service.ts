import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { checkToken } from '../interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})
export class CitasService {

  apiUrl = enviroment.API_URL

  constructor(private http:HttpClient) { 



  }

  
  public getCitas(id_paciente:number,filtros?:any){
    filtros as HttpParams
    return this.http.get(`${this.apiUrl}/api/citas/all`,{context:checkToken(),params:filtros})
  }

  public createCita(data:any){
    return this.http.post(`${this.apiUrl}/api/citas`,data,{context:checkToken()})
  }

  public updateCita(id:any,data:any){
    return this.http.put(`${this.apiUrl}/api/citas/${id}`,data,{context:checkToken()})
  }

  public deleteCita(id:any){
    return this.http.delete(`${this.apiUrl}/api/citas/${id}`,{context:checkToken()})

  }

  public getAllCitas_agenda(filtros?:any){
    filtros as HttpParams
    return this.http.get(`${this.apiUrl}/api/citas/agenda`,{context: checkToken(),params:filtros})
  }
}
