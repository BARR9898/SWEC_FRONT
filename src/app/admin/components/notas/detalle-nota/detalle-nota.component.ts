import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';

@Component({
  selector: 'app-detalle-nota',
  templateUrl: './detalle-nota.component.html',
  styleUrls: ['./detalle-nota.component.css']
})
export class DetalleNotaComponent implements OnInit{

  constructor(
    private expedienteService: ExpedientesService,
    private activatedRoute: ActivatedRoute,
    private routerService: Router,
    private fb:FormBuilder
  ){
    this.fb =  fb
  }

  _id:string
  expediente:any
  nota:any
  indice_nota: number

  notaClinicaForm = this.fb.group({
    fecha: this.fb.control(''),
    nota: this.fb.control('')
  })




  ngOnInit(): void {
        //Obtiene el expediente en base al id mandado y setea los forms con el valor corrrespondiente
        this.activatedRoute.params.subscribe((params: Params) => {
          this._id = this.activatedRoute.snapshot.paramMap.get('id_expediente')
          this.indice_nota = parseInt(this.activatedRoute.snapshot.paramMap.get('index_nota'))
          this.expedienteService.obtenerExpediente(this._id)
            .subscribe((expedientGeted:any) => {
              this.expediente = expedientGeted.data
              this.nota = this.expediente.notas_clinicas[this.indice_nota]
              this.formDatSetControls()


            });
        });
  }

  formDatSetControls(){
    this.notaClinicaForm.controls.fecha.setValue(this.nota.fecha)
    this.notaClinicaForm.controls.nota.setValue(this.nota.nota)
  }

}
