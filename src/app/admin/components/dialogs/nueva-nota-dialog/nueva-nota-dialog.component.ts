import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { NotasService } from 'src/app/admin/services/notas.service';

@Component({
  selector: 'app-nueva-nota-dialog',
  templateUrl: './nueva-nota-dialog.component.html',
  styleUrls: ['./nueva-nota-dialog.component.css']
})
export class NuevaNotaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NuevaNotaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notasService: NotasService
  ) {



  }

  notaForm = this.fb.group({
    nota: this.fb.control('',[Validators.required,Validators.maxLength(1000)])
  })

  cancelar(): void {
    this.dialogRef.close();
  }

  registrar(): void {

    if ( this.notaForm.controls.nota.value == ''  ) {
        Swal.fire('Datos Faltandes','La fecha o la nota estan vacias','warning')
        return
    }

    let data = {
      fecha: moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
      nota: this.notaForm.controls.nota.value,
      id_paciente: this.data.id_paciente
    }

    this.notasService.createNota(data)
    .subscribe((res:any) => {
    
      
      if (res.result) {
          Swal.fire('Nota Creada','La nota se a creado con exito','success')
          .then(() => {
            this.dialogRef.close()
          })
      }
    })


  }
}
