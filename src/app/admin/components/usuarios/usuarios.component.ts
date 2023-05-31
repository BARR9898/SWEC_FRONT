import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoUsuarioComponent } from '../dialogs/usuarios/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuariosComponent } from '../dialogs/usuarios/editar-usuarios/editar-usuarios.component';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent  implements OnInit {

  usuarios:any = []

  constructor(
    private usuariosService:UsuariosService,
    public dialog: MatDialog,

  ){

  }

  ngOnInit(): void {
    this.getUsers()

  }

  

  showDialogCreateUser(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NuevoUsuarioComponent, {
      width: '600px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getUsers()
    })
  }

  showDialogEditUser(enterAnimationDuration: string, exitAnimationDuration: string, uiser_id: number): void {
    this.dialog.open(EditarUsuariosComponent, {
      data:{
        id : uiser_id
      },
      width: '600px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getUsers()
    })
  }


  deleteUser(id:number){
    this.usuariosService.deleteUsuario(id)
      .subscribe((res:any) => {
        if (res.result) {

          Swal.fire({
            title: 'Desea eliminar el usuario?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Usuario eliminado','Usuario eliminado con exito','success')
                .then(() => {
                  this.getUsers()
                })
            } else if (result.isDenied) {
              return
            }
          })

        }
      })
  }


  async getUsers(){
    await this.usuariosService.getUsuarios()
      .subscribe((res:any) => {
        if(res.result){
          this.usuarios  = res.data
        }
      })
  }



}
