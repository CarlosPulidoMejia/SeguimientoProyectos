import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { listaEscenario } from '../clases/escenarios/escenarios';
import { TipoPago } from '../clases/pagos/Pagos';
import { EscenariosService } from '../servicios/escenarios/escenarios.service';
import { OrdenesService } from '../servicios/ordenes/ordenes.service';
import { PagosService } from '../servicios/pagos/pagos.service';

@Component({
  selector: 'app-envio-ordenes',
  templateUrl: './envio-ordenes.component.html',
  styleUrls: ['./envio-ordenes.component.css']
})
export class EnvioOrdenesComponent implements OnInit {

  constructor(private escenariosService:EscenariosService,private pagosService:PagosService,private ordenesService:OrdenesService) { }
/*********
 * Listas
 */
  listaEsc: listaEscenario[];
  listaPago: TipoPago[];

  selectedEnvio:any;

  /***********
   * Datos *
  ************/
   idBase: number;
   ipBase: string;
   portBase: string;
   nombreBase: string;
   claveBase: string;
   usuarioBase: string;
   passBase: string;
   estadoBase: number;


   /***********
   * Datos *
  ************/
  idFirma: number;
  ipFirma: string;
  portFirma: string;
  usuarioFirma: string;
  passFirma: string;

  /******Envio Ordens****/
  //Detalle Orden
  detalleIdDetalle: number;
  cantidadOrdenes: any = "";
  montoOrden: any = "";
  tiposPago: any;
  selectedTipoPago: any;
  conceptoOrden: any = "Prueba Concepto";
  modulo: any = "";
  segundos: any = "";
  //isCheckedRegistro = false;
  isCheckedAmpliado = false;
  isCheckedFirmador: boolean;

  //Ordenante
  //OBanco: any = '40150';
  OTipoCuenta: any = "";
  OCuenta: any = "";
  ONombre: any = "";
  ORFC: any = "";

  //Beneficiario
  BBanco: any = "";
  BTipoCuenta: any = "";
  BCuenta: any = "";
  BNombre: any = "";
  BRFC: any = "";

  /*********
   * Bton enviar orden
   */
   envio:any;



   /*******
    * Carga Masiva
    */

  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;
  selectedFiles?: FileList;

  envioCargaMasiva:any;
  currentFile?: File;



  /*********
   * Nuevos escenarios
   */
  
  btnSerNuevoEscenario: boolean
  detalleCatalogo = "Seleccione catalogos";


  /********
   * PIR
   ********/
  datosPir:boolean;
  OTipoCuentaPIR: any = "";
  OCuentaPIR: any = "";
  ONombrePIR: any = "";
  ORFCPIR: any = "";


  ngOnInit() {
    this.listaEscenarios();
    this.listaPagos();
    this.datosPir=false;
  }
  listaEscenarios() {
    this.escenariosService.getEscenarios().subscribe({
      next: (data) =>{
        this.listaEsc= data;
        console.log(data);
      },
      error: (e)=>{
        console.log(e)
      }
    })
  }

  listaPagos() {
    console.log("Pagos Id")
    this.pagosService.getAllPagos().subscribe({
      next: (data) => {
        this.listaPago = data;
        console.log(this.listaPago)

      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  EnvioCatalogo(){
    console.log(this.selectedEnvio);
    this.listaEscenarios()
    if (this.selectedEnvio >= 1) {
      //this.btnEditarEscenario = true;
      //this.modificacionEscenarios = true;

      let detalleEscenario = this.listaEsc.find(esc => esc.idEscenario === this.selectedEnvio)
      let baseId = detalleEscenario.dataSourceResponse;
      let firmaId = detalleEscenario.firmadorResponse;
      let detalleId = detalleEscenario.detalleOrdenResponse;
      let ordenanteId = detalleEscenario.ordenanteResponse;
      let beneficiarioId = detalleEscenario.beneficiarioResponse;
      console.log(detalleEscenario);

      this.idBase = baseId.id
      this.ipBase = baseId.ip;
      this.portBase = baseId.puerto;
      this.nombreBase = baseId.base;
      this.estadoBase = baseId.estado;

      this.idFirma = firmaId.id;
      this.ipFirma = firmaId.ip;
      this.portFirma = firmaId.puerto;

      this.detalleIdDetalle = detalleId.idDetalle;
      this.cantidadOrdenes = detalleId.cantidad;
      this.montoOrden = detalleId.monto;
      this.conceptoOrden = detalleId.concepto;
      this.segundos = detalleId.segundos;
      this.isCheckedFirmador = detalleId.firmador;
      //this.isCheckedRegistro = detalleId.registro;
      this.isCheckedAmpliado = detalleId.ampliado;

      //this.detalleIdOrdenante = ordenanteId.idOrdenante;
      this.claveBase = ordenanteId.banco;
      this.OTipoCuenta = ordenanteId.tipoCuenta;
      this.OCuenta = ordenanteId.cuenta;
      this.ONombre = ordenanteId.nombre;
      this.ORFC = ordenanteId.rfc;

      //this.detalleIdBeneficiario = beneficiarioId.idBeneficiario;
      this.BBanco = beneficiarioId.banco;
      this.BTipoCuenta = beneficiarioId.tipoCuenta;
      this.BCuenta = beneficiarioId.cuenta;
      this.BNombre = beneficiarioId.nombre;
      this.BRFC = beneficiarioId.rfc;

    }
  }

  /****Modulo****/
  consultaModulo() {
    if (this.isCheckedAmpliado == false) {
      //console.log("SPPPP")
      this.modulo = "SP";
    }

    if (this.isCheckedFirmador == false && this.isCheckedAmpliado == true) {
      if (this.selectedTipoPago.clave === "01" ||
        this.selectedTipoPago.clave === "02" ||
        this.selectedTipoPago.clave === "03" ||
        this.selectedTipoPago.clave === "04" ||
        this.selectedTipoPago.clave === "05" ||
        this.selectedTipoPago.clave === "06" ||
        this.selectedTipoPago.clave === "07"
      ) {
        this.modulo = "00";
      } else if (this.selectedTipoPago.clave === "19" ||
        this.selectedTipoPago.clave === "20" ||
        this.selectedTipoPago.clave === "21" ||
        this.selectedTipoPago.clave === "22") {
        this.modulo = "10";
      } else {
        //console.log("else modulo")
        this.modulo = "";
      }
    }

    if (this.isCheckedFirmador == true && this.isCheckedAmpliado == true) {
      if (this.selectedTipoPago.clave === "01" ||
        this.selectedTipoPago.clave === "02" ||
        this.selectedTipoPago.clave === "03" ||
        this.selectedTipoPago.clave === "04" ||
        this.selectedTipoPago.clave === "05" ||
        this.selectedTipoPago.clave === "06" ||
        this.selectedTipoPago.clave === "07" ||
        this.selectedTipoPago.clave === "30" ||
        this.selectedTipoPago.clave === "31" ||
        this.selectedTipoPago.clave === "35" ||
        this.selectedTipoPago.clave === "36"
      ) {
        this.modulo = "01";
      } else if (this.selectedTipoPago.clave === "19" ||
        this.selectedTipoPago.clave === "20" ||
        this.selectedTipoPago.clave === "21" ||
        this.selectedTipoPago.clave === "22" ||
        this.selectedTipoPago.clave === "32" ||
        this.selectedTipoPago.clave === "33" ||
        this.selectedTipoPago.clave === "34"
        ) {
        this.modulo = "11";
      } else {
        //console.log("else modulo")
        this.modulo = "";
      }
    }

    if(this.selectedTipoPago.clave ==="29" || this.selectedTipoPago.clave ==="30"
    || this.selectedTipoPago.clave ==="31" || this.selectedTipoPago.clave ==="32"
    || this.selectedTipoPago.clave ==="33"
    || this.selectedTipoPago.clave ==="34"
    || this.selectedTipoPago.clave ==="35"
    || this.selectedTipoPago.clave ==="36"){
      this.datosPir=true;
      this.OTipoCuenta=''
      this.OTipoCuentaPIR="40";
      this.OCuentaPIR="150990119400000014";
      this.ONombrePIR="PIR VICTOR"
      this.ORFCPIR="PIVV711223PIR"
    }
  }

  generarOrdenes() {
    //this.validaciones();


    
    this.envio = {
      datasource: {
        id: this.idBase,
        ip: this.ipBase,
        puerto: this.portBase,
        base: this.nombreBase,
        usuario: this.usuarioBase,
        pass: this.passBase
      },

      firmador: {
        id: this.idFirma,
        firmar: this.isCheckedFirmador,
        ip: this.ipFirma,
        puerto: this.portFirma,
        usuario: this.usuarioFirma,
        pass: this.passFirma
      },
      ordenes: [
        {
          cantidad: this.cantidadOrdenes,
          tipoPago: this.selectedTipoPago.clave,
          monto: this.montoOrden,
          concepto: this.conceptoOrden,
          modulo: this.modulo,
          segundos: this.segundos,
          //registro: this.isCheckedRegistro,
          ampliado: this.isCheckedAmpliado,
          certificacion: false,
          ordenante: {
            banco: this.claveBase,
            tipoCuenta: this.OTipoCuenta,
            cuenta: this.OCuenta,
            nombre: this.ONombre,
            rfc: this.ORFC
          },
          ordenantePir: {
           // banco: this.claveBase,
            tipoCuentaPir: this.OTipoCuentaPIR,
            cuentaPir: this.OCuentaPIR,
            nombrePir: this.ONombrePIR,
            rfcPir: this.ORFCPIR
          },

          beneficiario: {
            banco: this.BBanco,
            tipoCuenta: this.BTipoCuenta,
            cuenta: this.BCuenta,
            nombre: this.BNombre,
            rfc: this.BRFC
          }
        }
      ]
    }

    Swal.fire({
      title: "Enviando...",
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.ordenesService.postEnviarOrdenes(this.envio).subscribe(
      data => {
        console.log(data)

      },
      err => {
        console.log(err)
      },
      () => {
        console.log("Complete function triggered.")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro enviado correctamente',
          showConfirmButton: false
        })
      }
    );

    console.log(this.envio)
    }


    generarOrdenesPIR() {
      //this.validaciones();
  
  
      
      this.envio = {
        datasource: {
          id: this.idBase,
          ip: this.ipBase,
          puerto: this.portBase,
          base: this.nombreBase,
          usuario: this.usuarioBase,
          pass: this.passBase
        },
  
        firmador: {
          id: this.idFirma,
          firmar: this.isCheckedFirmador,
          ip: this.ipFirma,
          puerto: this.portFirma,
          usuario: this.usuarioFirma,
          pass: this.passFirma
        },
        ordenes: [
          {
            cantidad: this.cantidadOrdenes,
            tipoPago: 30,
            monto: this.montoOrden,
            concepto: this.conceptoOrden,
            modulo: this.modulo,
            segundos: this.segundos,
            //registro: this.isCheckedRegistro,
            ampliado: this.isCheckedAmpliado,
            certificacion: false,
            ordenante: {
              banco: this.claveBase,
              tipoCuenta: this.OTipoCuenta,
              cuenta: this.OCuenta,
              nombre: this.ONombre,
              rfc: this.ORFC
            },
  
            beneficiario: {
              banco: this.BBanco,
              tipoCuenta: this.BTipoCuenta,
              cuenta: this.BCuenta,
              nombre: this.BNombre,
              rfc: this.BRFC
            }
          }
        ]
      }
  
      Swal.fire({
        title: "Enviando...",
        text: "Espere un momento",
        imageUrl: "../../assets/progress.gif",
        imageWidth: 160,
        imageHeight: 160,
        showConfirmButton: false,
        allowOutsideClick: false
      });
      
  
      this.ordenesService.postEnviarOrdenespir(this.envio).subscribe(
        data => {
          console.log(data)
  
        },
        err => {
          console.log(err)
        },
        () => {
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro enviado correctamente',
            showConfirmButton: false
          })
        }
      );
  
      console.log(this.envio)
      }

    
    /********
     * Carga masiva
     */

    selectFiles(event: any): void {
      this.selectedFiles = event.target.files;
    }

    sendCargaMasiva(){
      /*this.envioCargaMasiva = {
        idBase: this.idBase
      }*/
  
      console.log("Base datos id:" + this.envioCargaMasiva)
      //this.dataMasiva = '{"encabezadoFileRequest":{"numCiclos":' + this.HNumCiclo +',"segundos":'+this.HSegundos+',"ordenanteRequest":{"banco":'+this.HBanco+',"tipoCuenta":'+this.HTipoCuenta+',"cuenta":'+this.HCuenta+',"nombre":"'+this.HNombre+'","rfc":"'+this.HRFC+'"},"detalleOrdenRequest":[{'+this.empList+']}}'
  
      //this.envioCargaMasiva = '{"encabezadoFileRequest":{"idBase":' + 3 +'"}';
      this.envioCargaMasiva = '{"idBase":'+ this.idBase +',"idFirma":'+ this.idFirma+'}';

      this.envioCargaMasiva = '{"idBase":' + this.idBase + ',"isArchivoEnv": "","idTipoContin":' + 3 + ',"fechaCert":"","idFirma":'+this.idFirma+'}'

      const file: File | null = this.selectedFiles.item(0);
  
      this.currentFile = file
  
      console.log(this.envioCargaMasiva)
  
      console.log("Matriz")
      console.log(this.envioCargaMasiva)

      /*******
       * Mensaje anterior
       */
      Swal.fire({
        title: "Enviando carga masiva...",
        text: "Espere un momento",
        imageUrl: "../../assets/progress.gif",
        imageWidth: 160,
        imageHeight: 160,
        showConfirmButton: false,
        allowOutsideClick: false
      });
  
      this.ordenesService.dataMasiva(this.envioCargaMasiva, this.currentFile).subscribe(
        
  
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        },
        () => {
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Archivo enviado correctamente',
            showConfirmButton: false
          })
        }
      );


    }

}
