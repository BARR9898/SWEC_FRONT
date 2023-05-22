import { Component, OnInit } from '@angular/core';
import { TerapeutasService } from '../../services/terapeutas';
import { MatDialog } from '@angular/material/dialog';
import { NuevoTerapeutaComponent } from '../dialogs/terapeutas/nuevo-terapeuta/nuevo-terapeuta.component';

@Component({
  selector: 'app-terapeutas',
  templateUrl: './terapeutas.component.html',
  styleUrls: ['./terapeutas.component.css']
})
export class TerapeutasComponent  implements OnInit{
 

  terapeutas:any = []
  constructor(private terapeutasServoce:TerapeutasService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.terapeutasServoce.getTerapeutas()
    .subscribe((res:any) => {
      console.log('res',res);
      
      this.terapeutas  =  res.data
    })
  }

  openDialogNewTerapeuta(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NuevoTerapeutaComponent, {
      width: '600px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
    })

  }


  
}
