import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { TerapeutasService } from 'src/app/admin/services/terapeutas';

@Component({
  selector: 'app-nuevo-terapeuta',
  templateUrl: './nuevo-terapeuta.component.html',
  styleUrls: ['./nuevo-terapeuta.component.css']
})
export class NuevoTerapeutaComponent {

  constructor(
    public dialogRef: MatDialogRef<NuevoTerapeutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private  treapeutaService:TerapeutasService
  ) {

  }

  apellido_paterno  = this.fb.control('',[Validators.required])
  apellido_materno  = this.fb.control('',[Validators.required])
  nombre = this.fb.control('',[Validators.required])

  registerTerapeut(){
    let  data = {
      nombre: this.nombre.value,
      apellido_materno: this.apellido_materno.value,
      apellido_paterno: this.apellido_paterno.value

    }

    this.treapeutaService.insertTerapeut(data).subscribe((res:any) => {      
      if (res.result) {
        Swal.fire('Terapeuta registrado','Terapeuta registrado con exito','success')
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


