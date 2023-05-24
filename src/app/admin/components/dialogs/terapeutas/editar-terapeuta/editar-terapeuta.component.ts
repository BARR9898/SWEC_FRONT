import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { TerapeutasService } from 'src/app/admin/services/terapeutas';

@Component({
  selector: 'app-editar-terapeuta',
  templateUrl: './editar-terapeuta.component.html',
  styleUrls: ['./editar-terapeuta.component.css']
})
export class EditarTerapeutaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditarTerapeutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private  treapeutaService:TerapeutasService){

    }

  ngOnInit(): void {
    this.getTerapeutData()
  }


    terapeuta_id =  this.data.terapeuta_id
    apellido_paterno  = this.fb.control('',[Validators.required])
    apellido_materno  = this.fb.control('',[Validators.required])
    nombre = this.fb.control('',[Validators.required])
  
    registerTerapeut(){
      let  data = {
        nombre: this.nombre.value,
        apellido_materno: this.apellido_materno.value,
        apellido_paterno: this.apellido_paterno.value,
        id: this.terapeuta_id
  
      }
  
      this.treapeutaService.updateTerapeuta(data).subscribe((res:any) => {      
        if (res.result) {
          Swal.fire('Terapeuta actualizado','Terapeuta actualizado con exito','success')
            .then((res:any) => {
              this.dialogRef.close()
            })
        }else{
          Swal.fire('Error','Algo salio mal','error')
        }
      })
    }
  
    cerrarDialog(){
      this.dialogRef.close()
    }

    getTerapeutData(){
      this.treapeutaService.getTerapeuta(this.terapeuta_id)
      .subscribe((res:any) => {
        if (res.result) {
          this.nombre.setValue(res.data[0].nombre)
          this.apellido_materno.setValue(res.data[0].apellido_materno)
          this.apellido_paterno.setValue(res.data[0].apellido_paterno)

        }
        
      })
    }

}
