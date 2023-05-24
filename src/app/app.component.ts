import { Component, OnInit } from '@angular/core';
import { TerapeutasService } from './admin/services/terapeutas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'SWEC';

  constructor(private terapeutasService:TerapeutasService,private router:Router){

  }


}
