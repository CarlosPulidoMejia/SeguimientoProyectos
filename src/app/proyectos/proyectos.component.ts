import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { listaProyectos,listaTipoDocumentacion, listaTipoProyecto,listaTipoFase,listaTipoEstado,listaTipoDependencia, listaDocumetnacionAvance, listaToDo } from '../clases/proyectos/listaProyectos';
import { listaUsuarios } from '../clases/configuracion/listaConfig';
import { ProyectoBauService } from '../servicios/proyectos/proyectos.service';
import { ConfigService } from '../servicios/config/config.service';

declare const $: any;

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosBauComponent implements OnInit {


  /******
   * Parametros
   */
  habilitarFecha: boolean;

  /*******
   * Consultar
   */
  requestBusqueda: any;
  requestAgregar: any;
  requestGuardar: any;

  //Datos
  numRegistros: any = 100;
  concepto = "";
  instancia: string;
  selectedDateInicio: any;
  selectedDateFin: any;
  orpNumeroDev: string;
  montoDev: number;
  selectedTipoPago: any;
  tipoPagoDevolucion: string;

  /******
   * Listas
   */
  listaProyectos: listaProyectos[];
  listatipoDocumentacion: listaTipoDocumentacion[];
  listatipoProyecto: listaTipoProyecto[];
  listatipoFase: listaTipoFase[];
  listatipoEstado: listaTipoEstado[];
  listatipoDependencia: listaTipoDependencia[];
  listaResponsables: listaUsuarios[];
  listaObjetivos: listaDocumetnacionAvance[];
  listaToDo: listaToDo[];
  //CPM
  ocultar: boolean;
  habilitarBoton: boolean;
  bordeFechaInicio: boolean;
  bordeFechaFin:boolean;
  fechasMal: boolean;
  nombreProyecto: string;
  tipoProyecto: string;
  responsable: string;
  fechaInicioProyecto: any;
  fechaFinProyecto: any;
  tipoDocumentacion: number;
  claseBoton: string;
  faseProy: number;
  estadoProy: number;
  dependenciaProy: number;
  documentacionProy: any;
  hrsAtencion: any;
  habilitarFechaTabla: boolean;
  isChecked: boolean;
  comentario: any;


  constructor( private proyectoBauService: ProyectoBauService, private configService: ConfigService) {    }
  
  ngOnInit() {
    this.nombreProyecto = "";
    this.tipoProyecto = "";
    this.responsable = "";
    this.tipoDocumentacion = 1;
    this.habilitarFecha = true;
    this.ocultar = true;
    this.habilitarBoton = false;
    this.bordeFechaInicio = false;
    this.bordeFechaFin = false;
    this.fechasMal = false;
    this.habilitar();
    this.getAllProyectos();
    this.getTipoDocumentacion();
    this.getTipoProyecto();
    this.getTipoFase();
    this.getTipoEstado();
    this.getTipoDependencia();
    this.getListaUsuario();
    this.isChecked = false
  }

  showData() {
    return (this.ocultar = false);
  }

  hideData() {
    return (this.ocultar = true);
  }

  habilitar(){
    this.habilitarBoton = false;
    this.claseBoton = 'btn btn-secondary mt-3';
    if(this.nombreProyecto != "" && this.tipoProyecto != "" && this.responsable != "" && this.tipoDocumentacion != 1 && this.bordeFechaInicio == false && this.bordeFechaFin == false && this.fechasMal == false)
    {
      this.claseBoton = 'btn btn-success mt-3';
      this.habilitarBoton = true;     
    }
  }
  
  cambiosDocumentacion(tipoDocumentacion){   
    this.bordeFechaInicio = false;
    this.bordeFechaFin = false;
    this.fechasMal = false;
    if(tipoDocumentacion != 2 && tipoDocumentacion != 5)
    {
      if(this.fechaInicioProyecto == undefined  && this.fechaFinProyecto == undefined || this.fechaInicioProyecto == ''  && this.fechaFinProyecto == ''){
        this.bordeFechaInicio = true;
        this.bordeFechaFin = true;
      }
      else if(this.fechaInicioProyecto != undefined  && this.fechaFinProyecto == undefined || this.fechaInicioProyecto != ''  && this.fechaFinProyecto == ''){
        this.bordeFechaFin = true;
      }
      else if(this.fechaInicioProyecto == undefined  && this.fechaFinProyecto != undefined || this.fechaInicioProyecto == ''  && this.fechaFinProyecto != ''){
        this.bordeFechaInicio = true;
      }
      else if(this.fechaInicioProyecto > this.fechaFinProyecto && this.fechaInicioProyecto != undefined && this.fechaInicioProyecto != undefined )
      {
        this.fechasMal = true;
      }
    }else{
      if(this.fechaInicioProyecto > this.fechaFinProyecto)
      {
        this.fechasMal = true;
      }
      this.bordeFechaInicio = false;
      this.bordeFechaFin = false;
    }
  }

  agregarProyecto(){
    //if(this.tipoDocumentacion != 2 && this.tipoDocumentacion != 5) {
      /*if(this.fechaInicioProyecto == undefined  || this.fechaFinProyecto == undefined || this.fechaInicioProyecto == ''  || this.fechaFinProyecto == '' ){
        this.bordeFechaInicio = true;
        this.bordeFechaFin = true;
      }else{*/
        this.bordeFechaInicio = false;
        this.bordeFechaFin = false;
        this.fechasMal = false;
        Swal.fire({
          title: "Agregando Proyecto...",
          text: "Espere un momento",
          imageUrl: "../../assets/progress.gif",
          imageWidth: 160,
          imageHeight: 160,
          showConfirmButton: false,
          allowOutsideClick: false
        });
        this.requestAgregar = {
          proyecto: this.nombreProyecto,
          tipoProyecto: this.tipoProyecto,
          responsable: this.responsable,
          fechaInicio: this.fechaInicioProyecto,
          fechaFin: this.fechaFinProyecto,
          tipoDoc: this.tipoDocumentacion
        }
        this.proyectoBauService.postAgregarProyectos(this.requestAgregar).subscribe(
          data => {
            console.log("Complete function triggered.")
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proyecto agregado correctamente',
              showConfirmButton: false
            })
            this.nombreProyecto = "";
            this.tipoProyecto = "";
            this.responsable = "";
            this.tipoDocumentacion = 1;
            this.fechaInicioProyecto = "";
            this.fechaFinProyecto = "";
            this.getAllProyectos();
          },
          err => {
            console.log(err)
            console.log("Complete function triggered.")
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No se pudo agregar el proyecto',
              showConfirmButton: false
            })
          },
          () => {}
        );
      //}
    //}
  }
  
  guardarDocumentarAvanceEdit(id,detalles) {
    console.log(id,detalles);
  }

  guardarCambio(proyecto,id){
    let filtroDoc = this.listatipoDocumentacion.filter( value => value.documentacion == proyecto.docProy ); 
    let filtroDep = this.listatipoDependencia.filter( value => value.tipoDependencia == proyecto.dependenciaProy);
    let filtroEst = this.listatipoEstado.filter( value => value.tipoEstado == proyecto.estadoProy );
    let filtroFas = this.listatipoFase.filter( value => value.fase == proyecto.faseProy );

    let docRequest = filtroDoc.length > 0 ? filtroDoc[0].idDocumentacion : 1 ;
    let depRequest = filtroDep.length > 0 ? filtroDep[0].idDependencia : 1;
    let estRequest = filtroEst.length > 0 ? filtroEst[0].idTipoEstado : 1;
    let fasRequest = filtroFas.length > 0 ? filtroFas[0].idFase : 1;

    this.requestGuardar = {
      hrsAtencion: proyecto.hrsAtencion,
      fase: fasRequest,
      estado: estRequest,
      dependencia: depRequest,
      porcentaje: proyecto.avance,
      documentacion: docRequest,
      fechaInicio: proyecto.fechaInicio,
      fechaFin: proyecto.fechaFin
    }    
    this.proyectoBauService.putEditrProyecto(this.requestGuardar, id).subscribe(
      data => {
        /*console.log("Complete function triggered.")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Proyecto guardado correctamente',
          showConfirmButton: false
        })
        this.getAllProyectos();*/
      },
      err => {
        console.log(err)
        console.log("Complete function triggered.")
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo guardar el proyecto',
          showConfirmButton: false
        })
      },
      () => {}
    );
  }

  cerrarSemana(){
    console.log('Cerrar Semana');
  }

  getListaUsuario(){
    this.configService.getAllUsuario().subscribe(
      data => {
        this.listaResponsables = data
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoProyecto(){
    this.proyectoBauService.getTipoProyecto().subscribe(
      data => {
        this.listatipoProyecto = data.filter(data => data.tipoProyecto != '');
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoDocumentacion(){
    this.proyectoBauService.getTipoDocumentacion().subscribe(
      data => {
        this.listatipoDocumentacion = data.filter(data => data.documentacion != '');
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoFase(){
    this.proyectoBauService.getTipoFase().subscribe(
      data => {
        this.listatipoFase = data.filter(data => data.fase != '');;
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoEstado(){
    this.proyectoBauService.getTipoEstado().subscribe(
      data => {
        this.listatipoEstado = data.filter(data => data.tipoEstado != '');;
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoDependencia(){
    this.proyectoBauService.getTipoDependencia().subscribe(
      data => {
        this.listatipoDependencia = data.filter(data => data.tipoDependencia != '');;
      },
      err => {
        console.log(err)
      }
    )
  }
  
  getAllProyectos(){
    this.proyectoBauService.getAllProyectos().subscribe({
      next: (data) => {
        console.log(data);
        
        this.listaProyectos = data;   
        $('#tablaProyectos').dataTable().fnDestroy(); 
        $('#tablaProyectos tbody').on('click', 'tr', function () {
          $(this).toggleClass('selected');
        });
        setTimeout(() => {
          $('#tablaProyectos').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
            pageLength: 10,
            responsive: true
          });
        }, 1);
      },error: (e) => {
        console.log(e)
      }
    });
  }

  change(e){
    this.guardarCambio(e.detalleProyectoResponse, e.proyectoResponse.idProyecto);
  }

  getDocumentacion(idProyecto, comentarioProyecto){
    this.comentario = comentarioProyecto
    this.proyectoBauService.getDocumentacionAvance(idProyecto).subscribe(
      data => {
        this.listaObjetivos = data
        this.getToDo(idProyecto)
      },err => {
        console.log(err)
      }
    )
  }

  getToDo(idProyecto){
    this.proyectoBauService.getListaToDo(idProyecto).subscribe(
      data => {
        this.listaToDo = data        
      },err => {
        console.log(err)
      }
    )
  }

  guardarComentarioDocumentacion(idObjetivo, detallesObjetivos){
    this.proyectoBauService.putComentarioDocumentacion(idObjetivo, detallesObjetivos).subscribe(
      data =>{
      }, err => {
        console.log(err)
      }
    )
  }

  /*  ELIMINAR SI NO SE OCUPA
  modelChangeDocumentacion(e) {
    //this.documentacionProy = e;
    let filtro = this.listatipoDocumentacion.filter( value => value.documentacion == e );
    this.documentacionProy = filtro[0].idDocumentacion
  }

  modelChangeDependencia(e){
    let filtro = this.listatipoDependencia.filter( value => value.tipoDependencia == e)
    this.dependenciaProy = filtro[0].idDependencia
  }

  modelChangeEstado(e){
    let filtro = this.listatipoEstado.filter( value => value.tipoEstado == e)
    this.estadoProy = filtro[0].idTipoEstado
  }

  modelChangeFase(e){
    let filtro = this.listatipoFase.filter( value => value.fase == e)
    this.faseProy = filtro[0].idFase
  }
  
  modelChangeHrs(e){
    this.hrsAtencion = e
  }*/
}
