import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { checkToken } from '../interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})
export class NotasService {

  apiUrl = enviroment.API_URL

  constructor(private http:HttpClient) { 



  }

  
  public getNotas(id_expediente:number,filtros?:any){
    filtros as HttpParams
    return this.http.get(`${this.apiUrl}/api/notas/all/${id_expediente}`,{context:checkToken(),params:filtros})
  }

  public getNota(nota_id:number){
    return this.http.get(`${this.apiUrl}/api/notas/${nota_id}`,{context:checkToken()})
  }


  public createNota(data:any){
    return this.http.post(`${this.apiUrl}/api/notas`,data,{context:checkToken()})
  }

  public updateCita(id:any,data:any){
    return this.http.put(`${this.apiUrl}/api/citas/${id}`,data,{context:checkToken()})
  }

  public deleteCita(id:any){
    return this.http.delete(`${this.apiUrl}/api/citas/${id}`,{context:checkToken()})

  }
}
