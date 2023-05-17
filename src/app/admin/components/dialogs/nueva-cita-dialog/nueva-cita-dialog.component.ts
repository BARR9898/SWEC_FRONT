import { Component,Inject,inject,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Form, FormBuilder,Validators } from '@angular/forms';
import { CitasService } from 'src/app/admin/services/citas.service';
import Swal from 'sweetalert2';
import moment from 'moment';
@Component({
  selector: 'app-nueva-cita-dialog',
  templateUrl: './nueva-cita-dialog.component.html',
  styleUrls: ['./nueva-cita-dialog.component.css']
})
export class NuevaCitaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NuevaCitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_paciente: any,
    private fb:FormBuilder,
    private citasService:CitasService
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  registrar(): void {
    if(this.cita_fecha.value == ''){
       Swal.fire('Seleccione una fecha','La fecha no a sido seleccionada','warning')
       return
    }
    let cita_fecha_formated = moment(this.cita_fecha.value).format('YYYY-MM-DD h:mm:ss')
    
    let data = {
      fecha: cita_fecha_formated,
      status: true,
      asistencia: -1,
      id_paciente: this.data_paciente.paciente_id

    }
    
    
    this.citasService.createCita(data)
      .subscribe((res:any) => {
        
        if (res.result && !res.data.message) {
          Swal.fire('Cita Guardada','Cita registrada con exito','success')
            .then(() => {
              this.dialogRef.close();

            })
        }else if(res.result && res.data.message){
          Swal.fire('La cita ya existe','Ya existe una cita con esta fecha','warning')
          .then(() => {
            this.dialogRef.close();

          })
        }

      })
      
    
    
  }

  ngOnInit(): void {
  }

  eliminar(id_cita:number){
    
  }
  
  cita_fecha = this.fb.control('',Validators.required)

}
