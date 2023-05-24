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

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

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
