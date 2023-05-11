import { Component,OnInit } from '@angular/core';
import { Expediente } from 'src/app/admin/interfaces/expediente';
import { HttpClient } from '@angular/common/http';
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportarService } from 'src/app/admin/services/exportar.service';
import moment from 'moment';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{

  constructor(private expedientesService:ExpedientesService, private routerServices:Router, private exportarcionService:ExportarService){

  }

  expedientes:any;

  filtros = {
    nombre: '',
    apellido_paterno:  '',
    apellido_materno:  ''
  }

  ngOnInit(): void {
    this.getExpedientData()

  }

  deleteExpedient(id:string){

    Swal.fire({
      title: 'Desea eliminar éste expedientes?',
      text: "No será posible revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expedientesService.elminiarExpediente(id)
        .subscribe(res => {
          Swal.fire(
            'Elimnado!',
            'El expediente a sido eliminado.',
            'success'
          ).then(() => {
            this.getExpedientData()
          })
        })

      }
    })



  }

  getLastCita(index:number){
    let expediente = this.expedientes[index]

    let length = expediente.citas.length
    let ultima_cita = expediente.citas[length-1]
    return ultima_cita.fecha
  }

  exportar(id:string){
    this.exportarcionService.main(id)
  }

  getExpedientData(){
    this.expedientesService.obtenerExpedientes(this.filtros)
    .subscribe((res:any) => {
      console.log('obtenerExpedientes', res);
      
      if(res.data.length == 0){
        this.expedientes = []
        return
      }
      this.expedientes = res.data;

    })
  }

  aplicarFiltros(){
    this.expedientesService.obtenerExpedientes(this.filtros)
      .subscribe((res:any) => {
        if (res.result) {
            this.expedientes = res.data
        }
      })
  }



}
