import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/admin/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit{
  constructor(    
    public dialogRef: MatDialogRef<EditarUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private  usuariosService:UsuariosService
  ){

   }
  ngOnInit(): void {
    this.getUser()
  }


   email  = this.fb.control('',[Validators.required,Validators.email])
   nombre  = this.fb.control('',[Validators.required])
   password  = this.fb.control('',[Validators.required,Validators.minLength(5)])
   user_id =  this.data.id
   
 
   registerUser(){
     let  data = {
       name: this.nombre.value,
       email: this.email.value,  
       password: this.password.value,
       rol: 'Administrador'
     }
 
     this.usuariosService.updateUsuario(this.user_id,data).subscribe((res:any) => {      
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


   getUser(){
    this.usuariosService.getUsuario(this.user_id)
      .subscribe((res:any) => {
        console.log(res);
        
        if (res.result) {
            this.email.setValue(res.data[0].usuario)
            this.nombre.setValue(res.data[0].nombre)
        }
      })
   }
}
