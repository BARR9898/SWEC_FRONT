import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getUserData(){
    let user_data  = {
      id: getCookie('user_id'),
      rol: getCookie('user_rol')
    }

    return user_data

    
    
  }

  setUserData(user:any){
    setCookie('user_rol',user.rol)
    setCookie('user_id',user.id)
    setCookie('user_name',user.nombre)
    setCookie('user_lastname',user.apellido_paterno)
  }
}
