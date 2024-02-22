import { Component, OnInit } from '@angular/core';
//import Swal from 'sweetalert2';
import { map, Observable, zip } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';


declare const $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.component.html',
  styleUrls: ['reportes.component.css']
})
export class ReportesComponent implements OnInit {
/**
 * Grafica
 */
view: [number,number] = [600,500];
// options
xAxis: boolean = true;
yAxis: boolean = true;
  message: string[] = [];

  fileInfos?: Observable<any>;

  //CPM
  proyectos: boolean;
  tickets: boolean;
  resumen: boolean;
  grafica: boolean;
  proyecto: any;

  classBotonProyecto: string;
  classBotonTickets: string;
  classBotonResumen: string;
  classBotonGrafica: string;

  constructor(private httpClient: HttpClient) { }

  multi = []

  multidos = []
  /*Valores matriz de cuentas*/


  /* fin valores matriz de cuentas*/
  ngOnInit() {
    this.classBotonProyecto = 'btn btn-success'
    this.classBotonTickets = 'btn btn-success mx-2'
    this.classBotonResumen = 'btn btn-success'
    this.classBotonGrafica = 'btn btn-success mx-2'
    this.proyectos = false;
    this.tickets = false;
    this.resumen = false;
    this.grafica = true;
    this.proyecto = [
      {
        nombre:'Hrs Semana',
        value: 10
      },
      {
        nombre: 'En Tiempo',
        value: 29,
      },
      {
        name: 'Documentación',
        value: 28,
      },
    ]
    this.multi = [
      {
        name: 'Proyectos',
        series: [
          {
            name: 'Hrs Semana',
            value: this.proyecto[0].value,
          },
          {
            name: 'En Tiempo',
            value: this.proyecto[1].value,
          },
          {
            name: 'Documentación',
            value: this.proyecto[2].value,
          },
        ],
      },
    ]
    this.multidos = [
      {
        name: 'Tickets',
        series: [
          {
            name: 'Hrs Semana',
            value: 10,
          },
          {
            name: 'Bloqueante',
            value: 29,
          },
          {
            name: 'Controlado',
            value: 28,
          },
          {
            name: 'Recurrente',
            value: 28,
          },
        ],
      },
    ]
  }

  showProyectos(){
    this.classBotonProyecto = 'btn btn-success shadow'
    this.classBotonTickets = 'btn btn-success mx-2'
    this.classBotonResumen = 'btn btn-success'
    this.classBotonGrafica = 'btn btn-success mx-2'
    this.proyectos = true;
    this.tickets = false;
    this.resumen = false;
  }
  showTickets(){
    this.classBotonTickets = 'btn btn-success mx-2 shadow'
    this.classBotonProyecto = 'btn btn-success'
    this.classBotonResumen = 'btn btn-success'
    this.classBotonGrafica = 'btn btn-success mx-2'
    this.proyectos = false;
    this.tickets = true;
    this.resumen = false;
  }
  showReportes(){
    this.classBotonResumen = 'btn btn-success shadow'
    this.classBotonProyecto = 'btn btn-success'
    this.classBotonTickets = 'btn btn-success mx-2'
    this.classBotonGrafica = 'btn btn-success mx-2'
    this.proyectos = false;
    this.tickets = false;
    this.resumen = true;
  }

  showGrafica(){
    this.classBotonGrafica = 'btn btn-success mx-2 shadow'
    this.classBotonProyecto = 'btn btn-success'
    this.classBotonTickets = 'btn btn-success mx-2'
    this.classBotonResumen = 'btn btn-success'
    this.proyectos = false;
    this.tickets = false;
    this.resumen = false;
    this.grafica = true;
  }
}




