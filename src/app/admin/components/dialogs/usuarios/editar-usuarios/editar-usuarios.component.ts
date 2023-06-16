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
   apellido_paterno =  this.fb.control('',[Validators.required,Validators.minLength(5)])
   apellido_materno =  this.fb.control('',[Validators.required,Validators.minLength(5)])
   rol =  this.fb.control('',[Validators.required])
   estatus =  this.fb.control('',[Validators.required])
   user_id =  this.data.id
   
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

   estatus_array = [
    {
      value: 1,
      descripcion: 'Activo'
    },
    {
      value: 0,
      descripcion: 'Inactivo'
    }
   ]
   registerUser(){

     let  data = {
       name: this.nombre.value,
       lastname: this.apellido_materno.value,
       second_lastname: this.apellido_paterno.value,
       email: this.email.value,  
       rol: this.rol.value,
       estatus: this.estatus.value
     }
 
     this.usuariosService.updateUsuario(this.user_id,data).subscribe((res:any) => { 
      console.log('updateUsuario',res);     
       if (res.result) {
         Swal.fire('Terapeuta actualizado','Terapeuta actualizado con exito','success')
           .then((res:any) => {
             this.dialogRef.close()
           })
       }else if(res.result == false && res.message ){
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
            this.email.setValue(res.data[0].correo)
            this.nombre.setValue(res.data[0].nombre)
            this.apellido_materno.setValue(res.data[0].apellido_materno)
            this.apellido_paterno.setValue(res.data[0].apellido_paterno)
            this.rol.setValue(res.data[0].rol)
            this.estatus.setValue(res.data[0].estatus)

        }
      })
   }
}
