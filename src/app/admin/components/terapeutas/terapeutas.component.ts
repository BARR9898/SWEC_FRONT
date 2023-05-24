import { Component, OnInit } from '@angular/core';
import { TerapeutasService } from '../../services/terapeutas';
import { MatDialog } from '@angular/material/dialog';
import { NuevoTerapeutaComponent } from '../dialogs/terapeutas/nuevo-terapeuta/nuevo-terapeuta.component';
import { EditarTerapeutaComponent } from '../dialogs/terapeutas/editar-terapeuta/editar-terapeuta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terapeutas',
  templateUrl: './terapeutas.component.html',
  styleUrls: ['./terapeutas.component.css']
})
export class TerapeutasComponent  implements OnInit{
 

  terapeutas:any = []
  constructor(private terapeutasService:TerapeutasService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getTerapeutas()
  }

  openDialogNewTerapeuta(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NuevoTerapeutaComponent, {
      width: '600px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getTerapeutas()
    })

  }

  openDialogUpdateTerapeuta(enterAnimationDuration: string, exitAnimationDuration: string, id:number): void {
    this.dialog.open(EditarTerapeutaComponent, {
      data: {
        terapeuta_id:id
      },
      width: '600px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getTerapeutas()
    })

  }

  updateTerapeuta(id:number){

    Swal.fire({
      title: 'Desea eliminar al terapeuta?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.terapeutasService.updateTerapeuta(id)  
        .subscribe((res:any) =>  {
          console.log('res',res);
          
          if (res.result) {
            Swal.fire('Eliminado', 'Terapeuta eliminado con exito', 'success')
              .then(() => {
                  this.getTerapeutas()
              })
          }else{
            Swal.fire('Error', 'Algo salio mal', 'error')

          }
        })
      } else if (result.isDenied) {
      }
    })


      
  }

  getTerapeutas(){
    this.terapeutasService.getTerapeutas()
    .subscribe((res:any) => {
      this.terapeutas  =  res.data
    })
  }


  
}
