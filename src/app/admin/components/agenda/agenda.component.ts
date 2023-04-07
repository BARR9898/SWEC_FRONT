import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../interfaces/expediente';
import { ExpedientesService } from '../../services/expedientes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit{


  expedientes:any
  proximas_citas:any[] = []

  constructor(
    private expedienteService:ExpedientesService
  ){}


  ngOnInit(): void {

    this.expedienteService.obtenerExpedientes()
    .subscribe((res:any) => {
      this.expedientes = res.data
      console.log(res.data);
      console.log(this.proximas_citas);

      this.obtenerProximasCitas();

    })

  }

  public obtenerProximasCitas(){

    this.expedientes.forEach((expediente:any) => {

      let size = expediente.citas.length

      let aux_paciente_cita = {
        id_expediente: expediente._id,
        paciente: `${expediente.paciente.nombre} ${expediente.paciente.apellido_paterno} ${expediente.paciente.apellido_materno}`,
        ultima_cita: expediente.citas[size-1].fecha,
        status: expediente.citas[size-1].status
      }

      if(aux_paciente_cita.status == true){
        this.proximas_citas.push(aux_paciente_cita)
      }

      console.log(this.proximas_citas);


    })

  }

  public marcarAsistencia(index:number,status:boolean){

    this.proximas_citas[index].asistencia = status
    if(status == true){
      this.showDialog('success','Asistencia confirmada')
    }else{
      this.showDialog('error','Falta confirmada')
    }

  }

  public showDialog(icon_param,title_param){
    Swal.fire({
      icon: icon_param,
      title: title_param,
      showConfirmButton: false,
      timer: 2500
    })
  }


}
