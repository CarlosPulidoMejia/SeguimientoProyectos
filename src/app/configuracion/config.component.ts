import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { listaDependencia, listaDocumentacion, listaEstado, listaFase, listaTipoProyecto } from '../clases/configuracion/listaConfig';
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
  listaFaseProyecto: listaFase[];
  listaTipoProyecto: listaTipoProyecto[];
/*********
 * Variables
 */
  config: string;
  usuarios: boolean;
  perfiles: boolean;
  catalgos: boolean;
  mostrarAddUsr: boolean;
  mostrarAddPrf: boolean;
  mostrarAddCat: boolean;
  usrActivo: boolean;
  modalEditar: boolean;
  disabled: string;
  tituloEditar: string;
  nombreEditar: string;
  statusEditar: string;
  
  ngOnInit() {
    this.config = "Usuarios";
    this.usuarios = true;
    this.perfiles = false;
    this.catalgos = false;
    this.mostrarAddUsr = false;
    this.mostrarAddPrf = false;
    this.mostrarAddCat = false;
    this.usrActivo = false;
    this.modalEditar = false;
    this.disabled = 'bg-black bg-opacity-10';
    this.getAllConfig();
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

  getListaFas(){
    this.ProyectoBauService.getTipoFase().subscribe(
      data =>{
        this.listaFaseProyecto = data.filter(data => data.fase != '')
      },err =>{
        console.log(err);
        
      }
    )
  }

  getListaTip(){
    this.ProyectoBauService.getTipoProyecto().subscribe(
      data =>{
        this.listaTipoProyecto = data.filter(data => data.tipoProyecto != '')
      },err =>{
        console.log(err);
        
      }
    )
  }

  getAllConfig() {
    this.getListaDpe();
    this.getListaDoc();
    this.getListaEst();
    this.getListaFas();
    this.getListaTip();
  }

  clickEditar(editar,detalles){
    this.modalEditar = true;
    this.tituloEditar = editar;
    if(editar == 'Dependencias'){
      this.nombreEditar = detalles.tipoDependencia;
      this.statusEditar = 'Activo'
    }if(editar == 'Documentación'){
      this.nombreEditar = detalles.documentacion;
      this.statusEditar = 'Activo'
    }if(editar == 'Estado'){
      this.nombreEditar = detalles.tipoEstado;
      this.statusEditar = 'Activo'
    }if(editar == 'Fase'){
      this.nombreEditar = detalles.fase;
      this.statusEditar = 'Activo'
    }if(editar == 'Tipo'){
      this.nombreEditar = detalles.tipoProyecto;
      this.statusEditar = 'Activo'
    }
    if(editar == 'Usuarios'){

    }
    
  }

  cerrarEditar(){
    this.nombreEditar = '';
    this.statusEditar = '';
    this.modalEditar = false;
  }
}