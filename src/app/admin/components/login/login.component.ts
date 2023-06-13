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
          this.status = 'success'
          this.userDataService.setUserData(res.data.user)
          this.router.navigate(['/admin']);
          this.evaluateIfTerapeutExist()
          
        },error: () => {
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

  evaluateIfTerapeutExist(){
    this.terapeutasService.getTerapeutas()
      .subscribe((res:any) => {
        if (res.result) {
          if(res.data.length == 0){
            Swal.fire({
              title: 'Dese agregar el terapeuta?',
              showDenyButton: true,
              confirmButtonText: 'Si',
              denyButtonText: `Despues`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.router.navigate(['/admin/terapeutas'])
              } else if (result.isDenied) {
                Swal.fire('Aviso', 'Para poder crear expedientes es necesario dar  de  alta al terapeuta', 'warning')
              }
            })
          }
        }
      })
  }







}
