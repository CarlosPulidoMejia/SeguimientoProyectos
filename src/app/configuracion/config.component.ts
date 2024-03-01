//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { listaDependencia, listaDocumentacion, listaEstado, listaFase, listaTipoProyecto, listaUsuarios, listaGerencias } from '../clases/configuracion/listaConfig';
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
  listaUsuario: listaUsuarios[];
  listaGerencia: listaGerencias[];
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
  idEditar: number;
  nombreEditar: string;
  apellidoEditar: string;
  statusEditar: string;
  requestEditar: any;
  requestAgregar: any;
  nombreCatAdd:any;
  tipoEdit:any;
  tipoCatalogo: number;

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

  getListaUsuarios(){
    this.ConfigService.getAllUsuario().subscribe({
      next: (data) => {
        this.listaUsuario = data;
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
    })
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

  getListaGer(){
    this.ConfigService.getAllGerencias().subscribe({
        next: (data) =>{
          this.listaGerencia = data
        },
        error: (e) => {
          console.log(e)
        }
      }
    )
  }

  getAllConfig() {
    this.getListaDpe();
    this.getListaDoc();
    this.getListaEst();
    this.getListaFas();
    this.getListaTip();
    this.getListaUsuarios();
    this.getListaGer();
  }

  clickEditar(editar,detalles){
    console.log(detalles);
    
    this.modalEditar = true;
    this.tituloEditar = editar;
    if(editar == 'Dependencias'){
      this.tipoEdit = 'dep'
      this.idEditar = detalles.idDependencia;
      this.nombreEditar = detalles.tipoDependencia;
      this.statusEditar = 'Activo'
    }if(editar == 'Documentación'){
      this.tipoEdit = 'doc'
      this.idEditar = detalles.idDocumentacion;
      this.nombreEditar = detalles.documentacion;
      this.statusEditar = 'Activo'
    }if(editar == 'Estado'){
      this.tipoEdit = 'est'
      this.idEditar = detalles.idTipoEstado;
      this.nombreEditar = detalles.tipoEstado;
      this.statusEditar = 'Activo'
    }if(editar == 'Fase'){
      this.tipoEdit = 'fas'
      this.idEditar = detalles.idFase;
      this.nombreEditar = detalles.fase;
      this.statusEditar = 'Activo'
    }if(editar == 'Tipo'){
      this.tipoEdit = 'tip'
      this.idEditar = detalles.idTipoProyecto;
      this.nombreEditar = detalles.tipoProyecto;
      this.statusEditar = 'Activo'
    }
    if(editar == 'Usuarios'){
      this.nombreEditar = detalles.nombre;
      this.apellidoEditar = detalles.apellido;
      this.statusEditar = detalles.status == true ? 'Activo' : 'Desactivado';
    }
  }

  change(tipo, id, nombre, apellido, estatus){
    this.guardarEdicion(tipo, id, nombre, apellido, estatus);
  }

  guardarEdicion(tipo, id, nombre, apellido, estatus){
    console.log(tipo, id, nombre, apellido, estatus);
    if(tipo == 'dep'){
      this.requestEditar = {
        id_dependencia: id,
        status: true,
        tipo_dependencia_vch: nombre
      }
      this.ConfigService.putEditarDependencia(id, this.requestEditar).subscribe(
        data => {
          this.getListaDpe();
        },
        err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo guardar la dependencia',
            showConfirmButton: false
          })
        },
      )
    }
    if(tipo == 'doc'){
      this.requestEditar = {
        id_documentacion: id,
        status: true,
        tipo_documentacion_vch: nombre
      }
      this.ConfigService.putEditarDocumentacion(id, this.requestEditar).subscribe(
        data => {
          this.getListaDoc();
        },
        err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo guardar la documentación',
            showConfirmButton: false
          })
        },
      )
    }
    if(tipo == 'est'){
      this.requestEditar = {
        id_estado: id,
        status: true,
        tipo_estado_vch: nombre
      }
      this.ConfigService.putEditarEstado(id, this.requestEditar).subscribe(
        data => {
          this.getListaEst();
        },
        err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo guardar el estado',
            showConfirmButton: false
          })
        },
      )
    }
    if(tipo == 'fas'){
      this.requestEditar = {
        id_fase: id,
        status: true,
        tipo_fase_vch: nombre
      }
      this.ConfigService.putEditarFase(id, this.requestEditar).subscribe(
        data => {
          this.getListaFas();
        },err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo guardar la fase',
            showConfirmButton: false
          })
        },
      )
    }
    if(tipo == 'tip'){
      this.requestEditar = {
        id_tipo_proyecto: id,
        status: true,
        tipo_proyecto_vch: nombre
      }
      this.ConfigService.putEditarTipo(id, this.requestEditar).subscribe(
        data => {
          this.getListaTip();
        },err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo guardar el tipo de proyecto',
            showConfirmButton: false
          })
        },
      )
    }
  }

  cerrarEditar(){
    this.nombreEditar = '';
    this.statusEditar = '';
    this.modalEditar = false;
  }

  agregarCatalogo(tipoCat,nombreCatAdd){
    console.log(tipoCat);
    if(tipoCat == 1){
      this.requestAgregar = {
        status: true,
        tipo_dependencia_vch: nombreCatAdd
      }
      this.ConfigService.postAgregarDependencia(this.requestAgregar).subscribe(
        data => {
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Dependencia agregada correctamente',
            showConfirmButton: false
          })
          this.tipoCatalogo = 0;
          this.nombreCatAdd = '';
          this.getListaDpe();
        },err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo agregar la dependencia',
            showConfirmButton: false
          })
        },
      )
    }
    if(tipoCat == 2){
      this.requestAgregar = {
        status: true,
        tipo_documentacion_vch: nombreCatAdd
      }
      this.ConfigService.postAgregarDocumentacion(this.requestAgregar).subscribe(
        data => {
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documentación agregada correctamente',
            showConfirmButton: false
          })
          this.tipoCatalogo = 0;
          this.nombreCatAdd = '';
          this.getListaDoc();
        },err => {
          console.log(err)
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo agregar la documentación',
            showConfirmButton: false
          })
        },
      )
    }

  }
}