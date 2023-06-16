import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { TerapeutasService } from '../../services/terapeutas';
import { enviroment } from 'src/app/enviroments/enviroment';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private fb:FormBuilder,private authService:AuthService,private router:Router, private tokenService:TokenService,private terapeutasService:TerapeutasService,private userDataService:UserDataService) {

  }

  status: 'init' | 'loading' | 'success' | 'failed' = 'init';
  user = this.fb.group({
    email: this.fb.control('',[Validators.required,Validators.email]),
    password: this.fb.control('',[Validators.required,Validators.minLength(5)])
  })

  hasError(formControl:string,typeError:string){
    return this.user.get(formControl)?.hasError(typeError) && this.user.get(formControl)?.touched;
  }

  getWroteLength(formControl:string){
    return this.user.get(formControl)?.value.length

  }

  resetForm(){
    this.user.controls.email.setValue('');
    this.user.controls.password.setValue('')
  }

  login(){
    let email = this.user.controls.email.value!;
    let password = this.user.controls.password.value!
    this.authService.login(email,password)
      .subscribe({
        next: (res:any) => {          
          if ((res.result == false) && (res.message == 'USUARIO INACTIVO')) {
            Swal.fire({
              icon: 'error',
              title: 'Usuario Inactivo',
              showConfirmButton: true,
              timer: 3000
            })
          }else if((res.result == false) && (res.message == 'PASSWORD INCORRECT')){
            Swal.fire({
              icon: 'error',
              title: 'Usuario o contraseña invalidos!',
              showConfirmButton: true,
              timer: 3000
            })
          }else{
            this.status = 'success'
            this.userDataService.setUserData(res.data.user)
            this.router.navigate(['/admin']);
          }



          
        },
        error: (res:any) => {          
          this.status = 'failed';
          Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña invalidos!',
            showConfirmButton: true,
            timer: 3000
          })

        }
      });
  }









}
