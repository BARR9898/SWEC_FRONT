import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../interfaces/expediente';
import { ExpedientesService } from '../../services/expedientes.service';
import Swal from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
import moment from 'moment';
import { UserDataService } from '../../services/user-data.service';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit{


  expedientes:any
  proximas_citas:any[] = []
  filtro:any =  {
    desde:new Date().toISOString(),
    hasta:new Date().toISOString(),
    asistencia: ''
  }

  estatusArray = [
    {
      description: 'Pendientes',
      value: 'pendientes'
    },
    {
      description: 'Sin Asistencia',
      value: 'sin asistencia'
    },
    {
      description: 'Con Asistencia',
      value: 'con asistencia'
    },
    {
      description: 'Todos',
      value: ''
    }
  ]



  constructor(
    private citasService:CitasService,
    private userDataService:UserDataService
  ){}


  ngOnInit(): void {
    this.obtenerProximasCitas();

  }

  public obtenerProximasCitas(){
    let filtros = {
      fecha_inicio: moment(new Date()).format('YYYY-MM-DD 00:00:00'),
      fecha_fin: moment(new Date()).format('YYYY-MM-DD 23:59:59'),
      id_usuario: this.userDataService.getUserData().id,
      asistencia: this.estatusArray[3].value
      
    }
    this.citasService.getAllCitas_agenda(filtros)
    .subscribe((res:any) => {
      if (res.result) {
        this.proximas_citas = res.data
        this.proximas_citas.forEach((cita:any) => {
          cita.fecha = moment(cita.fecha).format('YYYY-MM-DD h:mm:ss')
        })
      }
    })
    

  }

  public marcarAsistencia(id:number,cita:any,status:boolean){
  

    
    if(status == true){
      cita.asistencia = 1
      this.citasService.updateCita(id,cita)
      .subscribe((res:any) => {
        if (res.result) {
            Swal.fire('Asistencia Confirmada','Se a confirmado la asistencia','success')
        }
        
      })
    }else{
      cita.asistencia = 0
      this.citasService.updateCita(id,cita)
      .subscribe((res:any) => {
        if (res.result) {
          Swal.fire('Falta confirmada','Se a confirmado la falta','success')
      }

      })
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

  public searchCitas(){


    let filters = {
      fecha_inicio:'',
      fecha_fin:'',
      asistencia:this.filtro.asistencia,
      id_usuario: this.userDataService.getUserData().id
    }

    if(this.filtro.desde != ''  && this.filtro.hasta == ''){
      filters.fecha_inicio = moment(this.filtro.desde).format('YYYY-MM-DD 00:00:00')
    }else if(this.filtro.desde == ''  && this.filtro.hasta != ''){
      filters.fecha_fin = moment(this.filtro.hasta).format('YYYY-MM-DD 23:59:59')
    }else if(this.filtro.desde == ''  && this.filtro.hasta == ''){
      filters.fecha_inicio = ''
      filters.fecha_fin = ''
    }else{
      filters.fecha_inicio = moment(this.filtro.desde).format('YYYY-MM-DD 00:00:00')
      filters.fecha_fin = moment(this.filtro.hasta).format('YYYY-MM-DD 23:59:59')
    }

    
    

    this.citasService.getAllCitas_agenda(filters)
    .subscribe((res:any) => {      
      if((res.result) && (res.data.length > 0)){
        this.proximas_citas = res.data
        this.proximas_citas.forEach((cita) => {
          cita.fecha =  moment(cita.fecha).format('YYYY-MM-DD h:mm:ss')
        })
      }else{
        this.proximas_citas = []
      }
    })


    
  }


  

}
