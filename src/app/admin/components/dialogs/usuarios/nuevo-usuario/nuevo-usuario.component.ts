import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/admin/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
    constructor(    
      public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private  usuariosService:UsuariosService
    ){

     }

     roles = [
      {
        descripcion: 'Seleccione un rol'
      },
      {
        descripcion: 'Superusuario'
      },
      {
        descripcion: 'Administrador'
      }
     ]

     email  = this.fb.control('',[Validators.required,Validators.email])
     nombre  = this.fb.control('',[Validators.required])
     password  = this.fb.control('',[Validators.required,Validators.minLength(5)])
     apellido_materno  = this.fb.control('',[Validators.required,Validators.minLength(5)])
     apellido_paterno  = this.fb.control('',[Validators.required,Validators.minLength(5)])
     rol = this.fb.control(this.roles[0].descripcion,[Validators.required])
   

     registerUser(){
       let  data = {
         name: this.nombre.value,
         lastname: this.apellido_paterno.value,
         second_lastname: this.apellido_materno.value,
         email: this.email.value,  
         password: this.password.value,
         rol: this.rol.value
       }
   
       this.usuariosService.createUsuario(data).subscribe((res:any) => {      
         if (res.result) {
           Swal.fire('Terapeuta creado','Terapeuta creado con exito','success')
             .then((res:any) => {
               this.dialogRef.close()
             })
         }else if(res.result == false   && res.message ){
           Swal.fire('Aviso',res.message,'warning')
         }
       })
     }
   
     cerrarDialog(){
       this.dialogRef.close()
     }
   
}
