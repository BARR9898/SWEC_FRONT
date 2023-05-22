import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { checkToken } from '../interceptors/token.interceptor';
import { textTransform } from 'html2canvas/dist/types/css/property-descriptors/text-transform';
@Injectable({
  providedIn: 'root'
})
export class TerapeutasService {

  apiUrl = enviroment.API_URL

  constructor(private http:HttpClient) { 
  }


  public getTerapeutas(){
    return this.http.get(`${this.apiUrl}/api/terapeutas`,{context:checkToken()})
  }

  public insertTerapeut(data:any){
    return this.http.post(`${this.apiUrl}/api/terapeutas`,data,{context:checkToken()})
  }


}
