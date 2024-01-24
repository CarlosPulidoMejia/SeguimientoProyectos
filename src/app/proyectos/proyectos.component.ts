import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Base } from '../clases/baseDatos/base';
import { listaProyectos,listaTipoDocumentacion, listaTipoProyecto,listaTipoFase,listaTipoEstado,listaTipoDependencia } from '../clases/proyectos/listaProyectos';
import { TipoPago } from '../clases/pagos/Pagos';
import { DatosService } from '../servicios/datos/datos.service';
import { ProyectoBauService } from '../servicios/proyectos/proyectos.service';
import { PagosService } from '../servicios/pagos/pagos.service';

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

  //CPM
  ocultar: boolean;
  habilitarBoton: boolean;
  bordeFechas: boolean;
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


  constructor( private proyectoBauService: ProyectoBauService) {    }
  
  ngOnInit() {
    this.nombreProyecto = "";
    this.tipoProyecto = "";
    this.responsable = "";
    this.tipoDocumentacion = 1;
    this.habilitarFecha = true;
    this.ocultar = true;
    this.habilitarBoton = false;
    this.bordeFechas = false;
    this.fechasMal = false;
    this.habilitar();
    this.Repetir();
    this.getAllProyectos();
    this.getTipoDocumentacion();
    this.getTipoProyecto();
    this.getTipoFase();
    this.getTipoEstado();
    this.getTipoDependencia();
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
    if(this.nombreProyecto != "" && this.tipoProyecto != "" && this.responsable != "" && this.tipoDocumentacion != 1)
    {
      this.claseBoton = 'btn btn-success mt-3';
      this.habilitarBoton = true;     
    }
  }

  Repetir() {
    setInterval(() => this.habilitar(), 1000);
  }
  
  agregarProyecto(){
    console.log( this.nombreProyecto, this.tipoProyecto, this.responsable, this.tipoDocumentacion, this.fechaInicioProyecto, this.fechaFinProyecto );
    if(this.tipoDocumentacion > 2  && this.fechaInicioProyecto == undefined  && this.fechaFinProyecto == undefined )
    {
      this.bordeFechas = true;
    }else{
      this.bordeFechas = false;
      if(this.fechaInicioProyecto > this.fechaFinProyecto)
      {
        this.fechasMal = true;
      }else{
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
            console.log(data)
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
      }
    }
  }
  
  onChecked() {
    this.isChecked = true;
  }

  guardarCambio(proyecto,id){
    //console.log(proyecto,id);
      
    let filtroDoc = this.listatipoDocumentacion.filter( value => value.documentacion == proyecto.docProy ); 
    let filtroDep = this.listatipoDependencia.filter( value => value.tipoDependencia == proyecto.dependenciaProy);
    let filtroEst = this.listatipoEstado.filter( value => value.tipoEstado == proyecto.estadoProy );
    let filtroFas = this.listatipoFase.filter( value => value.fase == proyecto.faseProy );
    
    this.requestGuardar = {
      hrsAtencion: proyecto.hrsAtencion,
      fase: filtroFas[0].idFase,
      estado: filtroEst[0].idTipoEstado,
      dependencia: filtroDep[0].idDependencia,
      porcentaje: proyecto.avance,
      documentacion: filtroDoc[0].idDocumentacion,
      //fechaInicio: proyecto.fechaInicio,
      //fechaFin: proyecto.fechaFin
    }
    console.log('Guardar Cambio', this.requestGuardar, id);

    this.proyectoBauService.putEditrProyecto(this.requestGuardar, id).subscribe(
      data => {
        console.log("Complete function triggered.")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Proyecto guardado correctamente',
          showConfirmButton: false
        })
        this.getAllProyectos();
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
      },
      error: (e) => {

        console.log(e)
      }
    });
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
