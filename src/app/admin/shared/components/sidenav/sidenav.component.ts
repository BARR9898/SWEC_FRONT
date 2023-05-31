import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/admin/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/admin/services/token.service';
import { Token } from '@angular/compiler';
import { TerapeutasService } from 'src/app/admin/services/terapeutas';
import Swal from 'sweetalert2';
import { enviroment } from 'src/app/enviroments/enviroment';
import { getCookie, getCookies } from 'typescript-cookie';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {


  user =  {
    id: getCookie('user_id'),
    rol: getCookie('user_rol'),
    nombre: getCookie('user_name'),
    apellido_paterno: getCookie('user_lastname')


  } 
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService, private router:Router,private tokenService:TokenService,private terapeutasService:TerapeutasService) {}

  logOut(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }



  title = 'SWEC';

 





}
