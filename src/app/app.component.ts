import { Component, OnInit } from '@angular/core';
import { AppService } from '../app/servicios/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor( private AppService: AppService ) {    }
  
  clasetextoProyectos: string;
  clasetextoTicket: string;
  clasetextoReporte: string;
  clasetextoConfig: string;
  configuracion: boolean;
  iniciarSesion:boolean;
  paginaInicio: string;
  usuarioLogin: string;
  passwordLogin: string;

  ngOnInit() {
    window.location.href
    this.clasetextoProyectos = 'nav-link negrita';
    this.clasetextoTicket = 'nav-link';
    this.clasetextoReporte = 'nav-link';
    this.clasetextoConfig = 'nav-link';
    this.configuracion = false;
    this.iniciarSesion = true;
  }
  clickProyectos(){
    this.clasetextoProyectos = 'nav-link negrita';
    this.clasetextoReporte = 'nav-link';
    this.clasetextoTicket = 'nav-link';
    this.configuracion = false;
  }

  clickReporteDC(){
    this.clasetextoProyectos = 'nav-link';
    this.clasetextoTicket = 'nav-link';
    this.clasetextoReporte = 'nav-link negrita';
    this.configuracion = false;
  }

  clickTickets(){
    this.clasetextoProyectos = 'nav-link';
    this.clasetextoTicket = 'nav-link negrita';
    this.clasetextoReporte = 'nav-link';
    this.configuracion = false;
  }

  clickConfig(){
    this.clasetextoProyectos = 'nav-link';
    this.clasetextoTicket = 'nav-link';
    this.clasetextoReporte = 'nav-link';
    this.clasetextoConfig = 'nav-link negrita';
    this.configuracion = true;
  }

  IniciarSesion(){
    this.iniciarSesion = false;
    if(this.usuarioLogin == 'v.pineda'){
      this.paginaInicio = 'Proyectos';
    }
    if(this.usuarioLogin == 'l.lozano'){
      this.paginaInicio = 'Proyectos';
    }
    if(this.usuarioLogin == 'admin'){
      this.paginaInicio = 'Configuracion';
    }
  }

  cerrarSesion(){
    this.iniciarSesion = true;
  }
}
