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
import { MainComponent } from './components/expedientes/main/main.component';
import { NuevaCitaDialogComponent } from './components/dialogs/nueva-cita-dialog/nueva-cita-dialog.component';
import { NuevaNotaDialogComponent } from './components/dialogs/nueva-nota-dialog/nueva-nota-dialog.component';
import { VerNotaDialogComponent } from './components/dialogs/ver-nota-dialog/ver-nota-dialog.component';
@NgModule({
  declarations: [
    LayoutComponent,
    CreacionComponent,
    ListaComponent,
    LoginComponent,
    DetalleComponent,
    AgendaComponent,
    DetalleNotaComponent,
    MainComponent,
    NuevaCitaDialogComponent,
    NuevaNotaDialogComponent,
    VerNotaDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [NuevaCitaDialogComponent]
})
export class AdminModule { }
