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

  listaBase: Base[];
  listaPago: TipoPago[];
  listaPagoDev: TipoPago[];


  /*********
   * Datos
   */
  id_Data: number;
  ip_Data: string;
  port_Data: String;
  name_Data: String;
  catBases: any;


  /******
   * Parametros
   */

  selectedtipo: string;
  pago: string;
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

  selectedAct: any;
  enviarListaDevolucion: listaProyectos[];
  sendListaDevolucion: any;
  selectedAll: any;
  //CPM
  ocultar: boolean;
  habilitarBoton: boolean;
  nombreProyecto: string;
  tipoProyecto: string;
  responsable: string;
  fechaInicioProyecto: any;
  fechaFinProyecto: any;
  tipoDocumentacion: number;
  claseBoton: string;
  faseProyecto: any;
  estadoProy: any;
  dependenciaProy: any;
  docProy: any;
  hrsAtencion: any;


  constructor( private proyectoBauService: ProyectoBauService) {    }
  
  ngOnInit() {
    this.nombreProyecto = "";
    this.tipoProyecto = "";
    this.responsable = "";
    this.tipoDocumentacion = 1;
    this.habilitarFecha = true;
    this.ocultar = true;
    this.habilitarBoton = false;
    this.habilitar();
    this.Repetir();
    this.getAllProyectos();
    this.getTipoDocumentacion();
    this.getTipoProyecto();
    this.getTipoFase();
    this.getTipoEstado();
    this.getTipoDependencia();
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
  
  guardarCambio(){
    this.requestGuardar = {
      documentacion: this.docProy,
    }
    console.log('Guardar Cambio', this.requestGuardar);
    
  }

  cerrarSemana(){
    console.log('Cerrar Semana');
    
  }

  getTipoProyecto(){
    this.proyectoBauService.getTipoProyecto().subscribe(
      data => {
        this.listatipoProyecto = data
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoDocumentacion(){
    this.proyectoBauService.getTipoDocumentacion().subscribe(
      data => {
        this.listatipoDocumentacion = data;
        console.log(this.listatipoDocumentacion);
        
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoFase(){
    this.proyectoBauService.getTipoFase().subscribe(
      data => {
        this.listatipoFase = data;
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoEstado(){
    this.proyectoBauService.getTipoEstado().subscribe(
      data => {
        this.listatipoEstado = data;
        console.log(this.listatipoEstado);
        
      },
      err => {
        console.log(err)
      }
    )
  }

  getTipoDependencia(){
    this.proyectoBauService.getTipoDependencia().subscribe(
      data => {
        this.listatipoDependencia = data;
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
        console.log(this.listaProyectos);
        
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

  /*listaBD() {
    console.log("Bases Id")
    this.datosService.listaBase().subscribe({
      next: (data) => {
        this.listaBase = data;
        console.log(this.listaBase)

      },
      error: (e) => {
        console.log(e)
      }
    })
  }*/

  /*getPagosDevolucion() {
    this.pagosService.getAllPagos().subscribe({
      next: (data) => {
        this.listaPago = data;
        console.log(this.listaPago)
        this.listaPagoDev = this.listaPago.filter(x => x.tipo === 'D')
        this.listaPago = this.listaPago.filter(x => x.aplicadevolucion === 'S')
        console.log(this.listaPago)

      },
      error: (e) => {
        console.log(e)
      }
    })
  }*/

  selectBase() {
    let baseId = this.listaBase.find(x => x.id_Datasource === this.catBases)

    this.id_Data = baseId.id_Datasource;
    this.ip_Data = baseId.ip;
    this.port_Data = baseId.puerto;
    this.name_Data = baseId.nombre_Base;
    /*this.datoBases.base = baseId.base;
    this.datoBases.puerto = baseId.puerto;*/
  }

  catTipoRetorno() {
    console.log(this.selectedtipo)
    if (this.selectedtipo == "17" || this.selectedtipo == "23") {
      //this.tipoPagoDevolucion = "Normal"
      //this.selectedDateInicio = this.selectedDateInicio
      this.habilitarFecha = true;
    } else {
      //this.tipoPagoDevolucion = "Exptemporaneo"
      //this.selectedDateFin = this.selectedDateFin
      this.habilitarFecha = false;
    }
  }

  getOrdenesDevolucion() {

    if (this.selectedtipo == "17" || this.selectedtipo == "23") {
      this.tipoPagoDevolucion = "Normal"
      //this.habilitarFecha = false;
    } else {
      this.tipoPagoDevolucion = "Extemporaneo"
      //this.habilitarFecha = true;
    }

    this.requestBusqueda = {
      datasource: {
        id: this.id_Data
      },
      tipo: this.tipoPagoDevolucion,
      numeroRegistros: this.numRegistros,
      tipoPago: this.selectedTipoPago.clave,
      concepto: this.concepto,
      instancia: this.instancia,
      fechaInicio: this.selectedDateInicio,
      fechaFin: this.selectedDateFin,
      orpNumeroDev: this.orpNumeroDev,
      montoDev: this.montoDev
    }

    console.log(this.requestBusqueda)

    Swal.fire({
      title: "Buscando registros...",
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.proyectoBauService.getProyectos(this.requestBusqueda).subscribe(data => {
      console.log(data)

      this.listaProyectos = data;

      $('#tablaDevoluciones').dataTable().fnDestroy();


      $('#tablaDevoluciones tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
      });


    },
      err => {
        console.log(err)
      },
      () => {

        setTimeout(() => {
          $('#tablaDevoluciones').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
            pageLength: 10,
            responsive: true
          });
        }, 1);

        console.log("Complete function triggered.")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Busqueda completada',
          showConfirmButton: false
        })
      }
    );

  }

  /*selectAll() {
    for (var i = 0; i < this.listaProyectos.length; i++) {
      this.listaProyectos[i].seleccion = this.selectedAll;
    }
  }*/

  /*chkDevoluciones() {
    this.selectedAct = this.listaProyectos.filter(value => {
      return value.seleccion
    });

    this.enviarListaDevolucion = this.selectedAct;

    this.enviarListaDevolucion.map(x => {
      x.pagoDev = this.selectedtipo
    });

    this.sendListaDevolucion = {
      datasource: {
        id: this.id_Data
      },
      devoluciones: this.enviarListaDevolucion
    }

    Swal.fire({
      title: "Aplicando retornos...",
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.proyectoBauService.postListaProyectos(this.sendListaDevolucion).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Retornos aplicados correctamente',
          timer: 1000,
          showConfirmButton: false
        })
        this.limpiarTablas();
      },
      error: (e) => {
        console.log(e)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ocurrio un error al realizar retornos, verifique',
          timer: 1000,
          showConfirmButton: false
        })
      }
    })*/
    //this.listaDevolucion = this.listaDevolucion.filter(x => x.numero === this.enviarListaDevolucion.filter(d => d.numero));


    /*for(let i = 0; this.listaDevolucion.length;i++){
      if(this.listaDevolucion[i].numero==this.enviarListaDevolucion.filter(z => z.numero)){
        console.log(this.listaDevolucion.splice(i--,1))
      }
    }*/

    //this.listaDevolucion = this.listaDevolucion.filter(x => x.row != this.enviarListaDevolucion.filter( x = x.row));

    /*this.sendListaDevolucion.forEach(function (obj){
      this.listaDevolucion = this.listaDevolucion.
    })*/

    //console.log(this.sendListaDevolucion)
    //console.log("--")
    //console.log(this.listaDevolucion)


  //}

  /*limpiarTablas() {
    this.selectedAll = false;
    $('#tablaDevoluciones').dataTable().fnDestroy();

    setTimeout(() => {
      $('#tablaDevoluciones').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
        },
        pageLength: 10,
        responsive: true
      });
    }, 1);

    this.enviarListaDevolucion.forEach(dtx => {
      this.listaProyectos = this.listaProyectos.filter(item => item.numero !== dtx.numero)
    })
  }*/

  /**********
   * 25/04/2023 
   * Realizar varios retornos
   */
  /*getOrdenesDevolucionVarios() {

    if (this.selectedtipo == "17" || this.selectedtipo == "23") {
      this.tipoPagoDevolucion = "Normal"
      //this.habilitarFecha = false;
    } else {
      this.tipoPagoDevolucion = "Extemporaneo"
      //this.habilitarFecha = true;
    }

    this.requestBusqueda = {
      datasource: {
        id: this.id_Data
      },
      tipo: this.tipoPagoDevolucion,
      concepto: this.concepto,
      fechaInicio: this.selectedDateInicio,
      fechaFin: this.selectedDateFin,
      orpNumeroDev: this.orpNumeroDev,
      montoDev: this.montoDev
    }
    

    Swal.fire({
      title: "Buscando registros...",
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.proyectoBauService.getDevolucionesVarios(this.requestBusqueda).subscribe({
      next: (data) => {

        this.listaProyectos = data;

        $('#tablaDevoluciones').dataTable().fnDestroy();


        $('#tablaDevoluciones tbody').on('click', 'tr', function () {
          $(this).toggleClass('selected');
        });

        setTimeout(() => {
          $('#tablaDevoluciones').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
            pageLength: 10,
            responsive: true
          });
        }, 1);


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Busqueda completada varios',
          showConfirmButton: false
        })


      },
      error: (e) => {

        console.log(e)
      }
    })
  }*/

}
