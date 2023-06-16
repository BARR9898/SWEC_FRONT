import { Component } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private fb:FormBuilder, private authServices:AuthService,private router:Router){

  }

  correo = this.fb.control('',[Validators.required,Validators.email])
  password = this.fb.control('',[Validators.required,Validators.minLength(5)])
  password_confirm = this.fb.control('',[Validators.required,Validators.minLength(5)])

  userIsRegisted = false
  userData:any = []

  verifyUser(){
    if (this.correo.value == '') {
      return
    }
    this.authServices.verifyUserExist(this.correo.value)
      .subscribe((res:any) => {
        if (res.result) {
          this.userIsRegisted = true
         this.userData = res.data
         
 
        }else{
          Swal.fire('Algo salio mal',res.message,'warning')
        }
        
      })
  }

  resetPassword(){
    let data = {
      user_id: `${this.userData.id}`,
      new_password: this.password.value
    }
    console.log('data',data);

    this.authServices.resetPassword(data)
    .subscribe((res:any) =>  {
      if (res.result) {
        Swal.fire('Contraseña','La contraseña fue modificada con exito','success')
        .then(res => {
            this.router.navigate(['/login'])
        })
      }
      
    })
  }

  
}
