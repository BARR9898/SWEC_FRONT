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
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { TerapeutasComponent } from './components/terapeutas/terapeutas.component';
import { NuevoTerapeutaComponent } from './components/dialogs/terapeutas/nuevo-terapeuta/nuevo-terapeuta.component';
import { EditarTerapeutaComponent } from './components/dialogs/terapeutas/editar-terapeuta/editar-terapeuta.component';
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
    VerNotaDialogComponent,
    ResetPasswordComponent,
    TerapeutasComponent,
    NuevoTerapeutaComponent,
    EditarTerapeutaComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents: [NuevaCitaDialogComponent]
})
export class AdminModule { }
