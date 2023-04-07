import { Component,OnInit } from '@angular/core';
import { Expediente } from 'src/app/admin/interfaces/expediente';
import { HttpClient } from '@angular/common/http';
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportarService } from 'src/app/admin/services/exportar.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{

  constructor(private expedientesService:ExpedientesService, private routerServices:Router, private exportarcionService:ExportarService){

  }

  expedientes:any;

  ngOnInit(): void {
    this.expedientesService.obtenerExpedientes()
    .subscribe((res:any) => {
      this.expedientes = res.data;
      console.log(this.expedientes);

    })

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
          )
          this.routerServices.navigate(['admin/expedientes/lista'])
        })

      }
    })



  }

  getLastCita(index:number){
    let expediente = this.expedientes[index]
    console.log(expediente);

    let length = expediente.citas.length
    let ultima_cita = expediente.citas[length-1]
    return ultima_cita.fecha
  }

  exportar(id:string){
    this.exportarcionService.main(id)
  }



}