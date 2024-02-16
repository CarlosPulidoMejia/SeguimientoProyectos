import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { listaDependencia, listaDocumentacion, listaEstado } from '../clases/configuracion/listaConfig';
import { ConfigService } from '../servicios/config/config.service';
import { ProyectoBauService } from '../servicios/proyectos/proyectos.service';

declare const $: any;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor( private ConfigService:ConfigService, private ProyectoBauService:ProyectoBauService ) { }
/*********
 * Listas
 */
  listaDependencia: listaDependencia[];
  listaDocumentacion: listaDocumentacion[];
  listaEstadoProyecto: listaEstado[];

  //listaConfig: [];
  config: string;
  usuarios: boolean;
  perfiles: boolean;
  catalgos: boolean;
  mostrarAddUsr: boolean;
  mostrarAddPrf: boolean;
  mostrarAddCat: boolean;
  usrActivo: boolean;
  disabled: string;
  
  ngOnInit() {
    this.config = "Usuarios";
    this.usuarios = false;
    this.perfiles = false;
    this.catalgos = true;
    this.mostrarAddUsr = false;
    this.mostrarAddPrf = false;
    this.mostrarAddCat = false;
    this.usrActivo = false;
    this.disabled = 'bg-black bg-opacity-10';

    this.getListaDpe();
    this.getListaDoc();
    this.getListaEst();
  }

  clickUsuarios(){
    this.usuarios = true;
    this.perfiles = false;
    this.catalgos = false;
  }

  clickPerfiles(){
    this.usuarios = false;
    this.perfiles = true;
    this.catalgos = false;
  }

  clickCatalogos(){
    this.usuarios = false;
    this.perfiles = false;
    this.catalgos = true;
  }

  getListaDpe(){
    this.ProyectoBauService.getTipoDependencia().subscribe(
      data =>{
        this.listaDependencia = data.filter(data => data.tipoDependencia != '')
      },err => {
        console.log(err);
      }
    )
  }

  getListaDoc(){
    this.ProyectoBauService.getTipoDocumentacion().subscribe(
      data =>{
        this.listaDocumentacion = data.filter(data => data.documentacion != '')
      },err =>{
        console.log(err);
      }
    )
  }

  getListaEst(){
    this.ProyectoBauService.getTipoEstado().subscribe(
      data =>{
        this.listaEstadoProyecto = data.filter(data => data.tipoEstado != '')
      },err =>{
        console.log(err);
      }
    )
  }

  /*getAllTickets() {
    this.ConfigService.getAll().subscribe({
      next: (data) => {
        this.listaConfig = [];
        
        $('#tablaUsuarios').dataTable().fnDestroy();


        $('#tablaUsuarios tbody').on('click', 'tr', function () {
          $(this).toggleClass('selected');
        });

        setTimeout(() => {
          $('#tablaUsuarios').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
            pageLength: 10,
            responsive: true
          });
        }, 1);
      },
      error: (e) => {

        console.log(e)
      }
    });
    }*/
}