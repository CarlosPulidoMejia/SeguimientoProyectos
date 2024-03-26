import { Component, OnInit } from '@angular/core';
import { AppService } from '../app/servicios/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor( private AppService: AppService, private router: Router ) {    }
  
  clasetextoProyectos: string;
  clasetextoTicket: string;
  clasetextoReporte: string;
  clasetextoConfig: string;
  configuracion: boolean;
  iniciarSesion:boolean;
  ocultarOpciones: boolean;
  usuarioLogin: string;
  passwordLogin: string;
  nombreUsuario: string;
  bordeUsuario: boolean;
  bordePassword: boolean;
  bordeUsuarioI: boolean;
  bordePasswordM: boolean;

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
    console.log(this.usuarioLogin, this.passwordLogin);
    
    if(this.usuarioLogin != undefined && this.passwordLogin != undefined){
      if(this.usuarioLogin === 'v.pineda' || this.usuarioLogin === 'l.lozano' || this.usuarioLogin === 'admin'){
        this.iniciarSesion = false;
        if(this.usuarioLogin == 'v.pineda'){
          if(this.passwordLogin == '123456'){
            this.ocultarOpciones = false;
            this.nombreUsuario = 'Victor Pineda';
            let targetRoute = ['Proyectos'];
            this.router.navigate(targetRoute);
            this.clickProyectos()
          }else{
            this.bordePasswordM = true
          }
        }
        if(this.usuarioLogin == 'l.lozano'){
          if(this.passwordLogin == '123456'){
            this.ocultarOpciones = false;
            this.nombreUsuario = 'Luis Lozano'
            let targetRoute = ['Proyectos'];
            this.router.navigate(targetRoute);
            this.clickProyectos()
          }else{
            this.bordePasswordM = true
          }
        }
        if(this.usuarioLogin == 'admin'){
          if(this.passwordLogin == '123456'){
            this.ocultarOpciones = true;
            this.nombreUsuario = 'Administrador';
            let targetRoute = ['Configuracion'];
            this.router.navigate(targetRoute);
            this.clickConfig();
          }else{
            this.bordePasswordM = true
          }
        }
      }else{
        this.bordeUsuarioI = true
        this.bordeUsuario = false;
        this.bordePassword = false;
      }
    }else{
      if(this.usuarioLogin == undefined){
        this.bordeUsuario = true;
        this.bordeUsuarioI = false;
      }
      if(this.passwordLogin == undefined){
        this.bordePassword = true;
        this.bordeUsuarioI = false;
      }
    }
  }

  cerrarSesion(){
    this.iniciarSesion = true;
    this.usuarioLogin = undefined;
    this.passwordLogin = undefined;
    let targetRoute = [''];
    this.router.navigate(targetRoute);
  }
}
