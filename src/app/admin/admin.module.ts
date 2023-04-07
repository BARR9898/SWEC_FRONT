import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { CreacionComponent } from './components/expedientes/creacion/creacion.component';
import { ListaComponent } from './components/expedientes/lista/lista.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DetalleComponent } from './components/expedientes/detalle/detalle.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { DetalleNotaComponent } from './components/notas/detalle-nota/detalle-nota.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CreacionComponent,
    ListaComponent,
    LoginComponent,
    DetalleComponent,
    AgendaComponent,
    DetalleNotaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AdminModule { }
