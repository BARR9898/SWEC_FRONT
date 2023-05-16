import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../interfaces/expediente';
import { ExpedientesService } from '../../services/expedientes.service';
import Swal from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
import moment from 'moment';
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
      value: 'todas'
    }
  ]



  constructor(
    private citasService:CitasService
  ){}


  ngOnInit(): void {
    this.obtenerProximasCitas();

  }

  public obtenerProximasCitas(){
    let filtros = {
      desde: moment(new Date()).format('YYYY-MM-DD 00:00:00'),
      hasta: moment(new Date()).format('YYYY-MM-DD 23:59:59')

    }
    this.citasService.getAllCitas_agenda(filtros)
    .subscribe((res:any) => {
      if (res.result) {
        console.log(res);
        this.proximas_citas = res.data
        this.proximas_citas.forEach((cita:any) => {
          cita.fecha = moment(cita.fecha).format('YYYY-MM-DD h:mm:ss')
        })
      }
    })
    

  }

  public marcarAsistencia(id:number,cita:any,status:boolean){
  

    
    if(status == true){
      cita.asistencia = true
      this.citasService.updateCita(id,cita)
      .subscribe((res:any) => {
        if (res.result) {
            Swal.fire('Asistencia Confirmada','Se a confirmado la asistencia','success')
        }
        
      })
    }else{
      cita.asistencia = false
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
      desde:'',
      hasta:'',
      asistencia:this.filtro.asistencia
    }

    if(this.filtro.desde != ''  && this.filtro.hasta == ''){
      filters.desde = moment(this.filtro.desde).format('YYYY-MM-DD 00:00:00')
    }else if(this.filtro.desde == ''  && this.filtro.hasta != ''){
      filters.hasta = moment(this.filtro.hasta).format('YYYY-MM-DD 23:59:59')
    }else if(this.filtro.desde == ''  && this.filtro.hasta == ''){
      filters.desde = ''
      filters.hasta = ''
    }else{
      filters.desde = moment(this.filtro.desde).format('YYYY-MM-DD 00:00:00')
      filters.hasta = moment(this.filtro.hasta).format('YYYY-MM-DD 23:59:59')
    }

    console.log('f',filters);
    
    

    this.citasService.getAllCitas_agenda(filters)
    .subscribe((res:any) => {
      if(res.result){
        console.log('res',res);
        this.proximas_citas = res.data
        this.proximas_citas.forEach((cita) => {
          cita.fecha =  moment(cita.fecha).format('YYYY-MM-DD h:mm:ss')
        })

        
      }
    })


    
  }


  

}
