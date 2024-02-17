import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { map, Observable, zip } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.component.html',
  styleUrls: ['reportes.component.css']
})
export class ReportesComponent implements OnInit {
/**
 * 
 */
  message: string[] = [];

  fileInfos?: Observable<any>;

  //CPM
  proyectos: boolean;
  tickets: boolean;
  resumen: boolean;

  constructor(private httpClient: HttpClient) { }

  /*Valores matriz de cuentas*/


  /* fin valores matriz de cuentas*/
  ngOnInit() {
    this.proyectos = true;
    this.tickets = false;
    this.resumen = false;
  }

  showProyectos(){
    this.proyectos = true;
    this.tickets = false;
    this.resumen = false;
  }
  showTickets(){
    this.proyectos = false;
    this.tickets = true;
    this.resumen = false;
  }
  showReportes(){
    this.proyectos = false;
    this.tickets = false;
    this.resumen = true;
  }
}




