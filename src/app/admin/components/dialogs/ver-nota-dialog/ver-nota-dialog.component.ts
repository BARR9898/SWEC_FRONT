import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { NotasService } from 'src/app/admin/services/notas.service';

@Component({
  selector: 'app-ver-nota-dialog',
  templateUrl: './ver-nota-dialog.component.html',
  styleUrls: ['./ver-nota-dialog.component.css']
})
export class VerNotaDialogComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<VerNotaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notasService: NotasService){

    }
  ngOnInit(): void {
    this.getNoteData()
  }

    nota = {
      nota: null,
      fecha_creacion: null,
      id: null
    }

    getNoteData(){
      this.notasService.getNota(this.data.nota_id)
      .subscribe((res:any) => {
        console.log('note id', res);
        if (res.result) {
            this.nota.nota = res.data[0].nota
            this.nota.fecha_creacion = res.data[0].fecha_creacion
            this.nota.id = res.data[0].id
            
            

        }
      })
    }

    cancelar(): void {
      this.dialogRef.close();
    }
  

}
