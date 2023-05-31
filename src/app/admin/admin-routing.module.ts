import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CreacionComponent } from './components/expedientes/creacion/creacion.component';
import { ListaComponent } from './components/expedientes/lista/lista.component';
import { AuthGuard } from './guards/auth.guard';
import { DetalleComponent } from './components/expedientes/detalle/detalle.component';
import { ExportarComponent } from './components/expedientes/exportar/exportar.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { DetalleNotaComponent } from './components/notas/detalle-nota/detalle-nota.component';
import { MainComponent } from './components/expedientes/main/main.component';
import { TerapeutasComponent } from './components/terapeutas/terapeutas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'expedientes/main/:id',
    component: MainComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'expedientes/lista',
    component: ListaComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'expedientes/creacion',
    component: CreacionComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'expedientes/detalle/:id',
    component: DetalleComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'agenda',
    component: AgendaComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'notas/detalle/:id_expediente/:index_nota',
    component: DetalleNotaComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'terapeutas',
    component: TerapeutasComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    canActivate: [AuthGuard],
    path: '',
    component: AgendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
