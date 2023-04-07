import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { LayoutComponent } from './admin/components/layout/layout.component';
import { LoginComponent } from './admin/components/login/login.component';
import { AuthGuard } from './admin/guards/auth.guard';
import { RedirectGuard } from './admin/guards/redirect.guard';
const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectGuard],
    component: LayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
