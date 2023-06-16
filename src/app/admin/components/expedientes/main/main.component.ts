import { Component, OnInit } from '@angular/core';
import { Citas } from 'src/app/admin/interfaces/citas';
import { CitasService } from 'src/app/admin/services/citas.service';
import { Params,ActivatedRoute, Router } from '@angular/router';
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NuevaCitaDialogComponent } from '../../dialogs/nueva-cita-dialog/nueva-cita-dialog.component';
import { Form, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { NotasService } from 'src/app/admin/services/notas.service';
import { NuevaNotaDialogComponent } from '../../dialogs/nueva-nota-dialog/nueva-nota-dialog.component';
import { VerNotaDialogComponent } from '../../dialogs/ver-nota-dialog/ver-nota-dialog.component';
import { ExportarService } from 'src/app/admin/services/exportar.service';
import { enviroment } from 'src/app/enviroments/enviroment';
import { UserDataService } from 'src/app/admin/services/user-data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {



  constructor(
    private activatedRoute: ActivatedRoute,
    private citasService: CitasService,
    private routerService: Router,
    private expedienteService: ExpedientesService,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private notasService:NotasService,
    private exportatService:ExportarService,
    private userDataService:UserDataService
  ){}

  paciente_id:any = null
  expediente_id:any = null
  expediente:any
  citas:any = []
  notas:any = []
  
  citas_desde: any
  citas_hasta: any

  notas_desde: any
  notas_hasta: any
  
  
  ngOnInit(): void {
    this.getData()
  }

  openDialogNewCita(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NuevaCitaDialogComponent, {
      data: {paciente_id:this.paciente_id},
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      let filtros = {
        desde: '',
        hasta: ''
      }
      this.searchCita()

    })
  }

  changeStatusCita(id:any,action:string,data:any){
    switch (action) {
      case 'confirm':
        data.estatus = true
        this.citasService.updateCita(id,data)
        .subscribe((res:any) => {
          if (res.result) {
            console.log('changeStatusCita res',res);
            
            Swal.fire('Cita confirmada','La cita esta confirmada','success')
              .then( () => {
                this.getData()
              })

          }
          
        })
        break;
      case 'cancel':
        data.estatus = false
        this.citasService.updateCita(id,data)
        .subscribe((res:any)=> {

          if (res.result) {
            
            Swal.fire('Cita cancelada','La cita esta cancelada','success')
            .then( () => {
              this.getData()
            })

          }

        })
        break;
    
      default:
        break;
    }
  }

  searchCita(){
    if (this.citas_desde != null) {
      this.citas_desde = moment(this.citas_desde).format('YYYY-MM-DD 00:00:00')
    } 

    if (this.citas_hasta != null) {
      this.citas_hasta = moment(this.citas_hasta).format('YYYY-MM-DD 23:59:59')
    } 

    if (this.citas_desde == null) {
      this.citas_desde = ''
    } 

    if (this.citas_hasta == null) {
      this.citas_hasta = ''
    } 



    let filters = {
      fecha_inicio: this.citas_desde,
      fecha_fin: this.citas_hasta,
      id_usuario: this.userDataService.getUserData().id
    }

    
    this.citasService.getCitas(this.paciente_id,filters)
    .subscribe((res:any) => {
      
      this.citas = res.data
      this.citas.forEach((cita:any)=> {
        let date = cita.fecha
        cita.fecha_formated = `${new Date(date).toLocaleDateString('es-MX')} ${new Date(date).toLocaleTimeString('es-MX')}`
        cita.fecha = moment(cita.fecha).format('YYYY-MM-DD h:mm:ss')
        
      })  
      
      this.citas_desde = null
      this.citas_hasta = null

      
    }) 
    
  }

  deleteCita(id:any){

    Swal.fire({
      title: '¿Desea eliminar la cita?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.citasService.deleteCita(id)
        .subscribe((res:any) => {
          if (res.result) {
            Swal.fire('Cita eliminada!', '', 'success') 
              .then(() => {
                this.getData()
              })
          }
        })
      } else if (result.isDenied) {
      }
    })

  }

  getData(){


    this.activatedRoute.params.subscribe((params: Params) => {
      this.expediente_id = this.activatedRoute.snapshot.paramMap.get('id')
      this.expedienteService.obtenerExpediente(this.expediente_id)
        .subscribe((expedientGeted:any) => {      
              
          this.expediente = expedientGeted[0]
          console.log("expediente",this.expediente);

          this.paciente_id = this.expediente.paciente.id

          let filtros = {
            fecha_inicio: '',
            fecha_fin:'',
            id_usuario: this.userDataService.getUserData().id
          }
          

          this.getCitas(filtros)

          let filtros_notas = {
            fecha_inicio: '',
            fecha_fin:'',
            id_usuario: this.userDataService.getUserData().id
          }

          this.getNotas(filtros_notas)



        });
    })
  }



  searchNote(){
    if (this.notas_desde != null) {
      this.notas_desde = moment(this.notas_desde).format('YYYY-MM-DD 00:00:00')
    } 

    if (this.notas_hasta != null) {
      this.notas_hasta = moment(this.notas_hasta).format('YYYY-MM-DD 23:59:59')
    } 

    if (this.notas_desde == null) {
      this.notas_desde = ''
    } 

    if (this.notas_hasta == null) {
      this.notas_hasta = ''
    } 



    let filters = {
      fecha_inicio: this.notas_desde,
      fecha_fin: this.notas_hasta,
    }

    
    this.notasService.getNotas(this.expediente_id,filters)
    .subscribe((res:any) => {
      
      this.notas = res.data
      this.notas.forEach((nota:any) => {
        nota.fecha_creacion_formateada = moment(nota.fecha_creacion).format('YYYY-MM-DD h:mm:ss')
      })
      
      this.notas_hasta = null
      this.notas_desde = null

      
    }) 
    
  }


  openDialogNewNote(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NuevaNotaDialogComponent, {
      data: {
        expediente_id:this.expediente_id,
        id_paciente: this.paciente_id
      },
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getData()
    })

  }


  getCitas(filtros:any){


    this.citasService.getCitas(this.paciente_id,filtros)
    .subscribe((res:any) => {
      console.log('entra');
      console.log('citas',res);
      
        this.citas = res.data
        this.citas.forEach((cita:any)=> {
          let date = cita.fecha
          cita.fecha_formated = `${new Date(date).toLocaleDateString('es-MX')} ${new Date(date).toLocaleTimeString('es-MX')}`
          cita.fecha = moment(cita.fecha).format('YYYY-MM-DD h:mm:ss')
          
        })              

    })
  }

  getNotas(filtros:any){
    
    this.notasService.getNotas(this.expediente_id,filtros)
    .subscribe((res:any) => {
      
      if (res.result) {
        this.notas = res.data
        this.notas.forEach((nota:any) => {
          nota.fecha_creacion_formateada = moment(nota.fecha_creacion).format('YYYY-MM-DD h:mm:ss')
        })
      }
    })
  }


  openDialogViewNote(enterAnimationDuration: string, exitAnimationDuration: string,nota_id:number): void {
    this.dialog.open(VerNotaDialogComponent, {
      data: {
        nota_id: nota_id
      },
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getData()
    })

  }

  export(nota:any){
    
    let data =  {
      paciente: `${this.expediente.paciente.nombre} ${this.expediente.paciente.apellido_paterno} ${this.expediente.paciente.apellido_materno}`,
      numero_de_nota: nota.id,
      fecha: nota.fecha_creacion_formateada,
      nota: nota.nota
    }
    
    this.exportatService.notaClinica(data)
  }

  




}

