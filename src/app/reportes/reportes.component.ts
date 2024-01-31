import { Component, OnInit } from '@angular/core';
import { Base } from '../clases/baseDatos/base';
import { ContingenciaService } from '../servicios/contingencia/contingencia.service';
import { DatosService } from '../servicios/datos/datos.service';
import Swal from 'sweetalert2';
import { map, Observable, zip } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatrizcuentasService } from '../servicios/matrizcuentas/matrizcuentas.service';
import { PagosService } from '../servicios/pagos/pagos.service';
import { TipoPago } from '../clases/pagos/Pagos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ContingenciaData } from '../clases/contingencia/contingencia';
import { MatrizCuentas } from '../clases/contingencia/matrizCuentas';
import { DetalleMatriz } from '../clases/contingencia/detalle';
import { HttpClient } from '@angular/common/http';
import { DatosContingencia } from '../clases/contingencia/datosContingencia';

declare const $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.component.html',
  styleUrls: ['reportes.component.css']
})
export class ReportesComponent implements OnInit {

  /************
   * Modelos
   ************ */
  modDatosContingencia: DatosContingencia = new DatosContingencia();

  catBases: any;

  listaBase: Base[];

  listaPago: TipoPago[];

  datoBases: Base;

  id_Data: number;
  ip_Data: string;
  port_Data: String;
  name_Data: String;

  //Contingencia
  tipo_contingencia: any;

  sendContingencia: any;


  /*Data contingencia*/

  /*detalle*/
  selectedFiles?: FileList;
  currentFile?: File;

  isCheckedArchivoEnv: boolean;

  idTipoContin: number;

  dataContin: string;

  selectedDateInicio: any;

  //validacion POa
  //selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  //regla
  rgContingencia: boolean;
  rgContingenciaAct: boolean;
  rgContingenciaOff: boolean;
  rgContingenciaFileOff: boolean;


  /*mATRIZ DE CUENTAS*/
  tiposPago: any
  selectedTipoPago: any

  selectedTipo: any

  //matrizcuentas
  HNumCiclo: number
  HSegundos: number

  HBanco: string
  HTipoCuenta: string
  HCuenta: string
  HNombre: string
  HRFC: string

  //detalle Orden
  HCantidad: number
  HTipoPago: string
  HMonto: number
  HStatus: string
  HModulo: string

  envioMatrizCuenta: any


  /*fIN MATRIZ DE CUENTAS*/

  HId: number
  empList: Array<{ id: number, cantidad: number, tipoPago: string, monto: number, concepto: string, modulo: string }> = [];

  /*****
   * Generar env
   */
  generarEnv: any;



  /***********
   * 
   * Variables Nueva matriz de cuentas
   * 
   * ********/

  dataMatriz: string;

  /*******
   * Contingencia Data
   */
  dataContingencia: ContingenciaData;


  /*********
   * Generacion Matriz de cuentas
   */
  matriz: MatrizCuentas = new MatrizCuentas();

  ordenanteMatriz: any

  encabezadoMatriz: any;

  detalleMatriz: Array<{ id: number, cantidad: number, tipoPago: String, status: String, monto: number, modulo: String }> = [];
  //detalleMatriz:any;

  detalle: DetalleMatriz[] = [];

  det: DetalleMatriz[] = [];

  nombreFileTest: any

  //CPM
  proyectos: boolean;
  tickets: boolean;
  resumen: boolean;

  constructor(private datosService: DatosService, private contingenciaService: ContingenciaService, private matrizService: MatrizcuentasService, private pagosService: PagosService, private httpClient: HttpClient) { }

  /*Valores matriz de cuentas*/


  /* fin valores matriz de cuentas*/
  ngOnInit() {
    this.proyectos = true;
    this.tickets = false;
    this.resumen = false;


    this.listaBD();
    this.listaPagos();
    this.rgContingencia = false;
    this.rgContingenciaAct = true;
    this.rgContingenciaOff = true;
    this.rgContingenciaFileOff = true;

    this.HNumCiclo = 1
    this.HSegundos = 1

    this.HBanco = "40150"
    this.HTipoCuenta = "40"
    this.HCuenta = "150180019480800160"
    this.HNombre = "VICTOR PINEDA VELAZQUEZ"
    this.HRFC = "PIVV711223LN5"

    this.HId = 0


    this.HCantidad = null
    this.HMonto = null
    this.HStatus = ''
    this.HModulo = ''


    this.obtenerNombres()


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


  listaBD() {

    this.datosService.listaBase().subscribe({
      next: (data) => {
        this.listaBase = data;
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  listaPagos() {
    this.pagosService.getAllPagos().subscribe({
      next: (data) => {
        this.listaPago = data
        this.listaPago = this.listaPago.filter(x => x.tipo === 'E')
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  selectBase() {
    let baseId = this.listaBase.find(x => x.id_Datasource === this.catBases)
    this.id_Data = baseId.id_Datasource;
    this.ip_Data = baseId.ip;
    this.port_Data = baseId.puerto;
    this.name_Data = baseId.nombre_Base;
    /*this.datoBases.base = baseId.base;
    this.datoBases.puerto = baseId.puerto;*/
  }

  btnConsultContingencia() {

    this.modDatosContingencia.idBase = this.id_Data
    this.modDatosContingencia.tipoContingencia = "0"

    console.log(this.modDatosContingencia)
    /*this.sendContingencia = {
      tipoContingencia: 0,
      idBase: this.id_Data
    }*/


    Swal.fire({
      title: 'Consultando contingencia',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });
 
    let mensaje = "";

    this.contingenciaService.consultarContingencia(this.modDatosContingencia).subscribe({
      next: (data) => {
        console.log("Datos contingencia")
        this.dataContingencia = data;
        console.log(this.dataContingencia)

        if (this.dataContingencia.statusContin === 'C') {
          this.rgContingenciaAct = false;
          console.log("No hay contingencia activa")
          mensaje = "No hay contingencia activa"
        } else {
          this.rgContingenciaOff = false;
          console.log("Hay una contingencia activa")
          mensaje = "Contingencia Activa"
          if (this.dataContingencia.numeroContin == 1) {

            this.modDatosContingencia.tipoContingencia = "1"
          }
          if (this.dataContingencia.numeroContin == 2) {
            this.modDatosContingencia.tipoContingencia = "2"
          }
          console.log("Valor de contingencia: " +this.modDatosContingencia.tipoContingencia)
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: mensaje,
          showConfirmButton: false
        })

      }, error: (e) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, revise logs para mas informacion',
        })

      }
    });
  }

  btnActivarContingencia() {

    this.modDatosContingencia.idBase = this.id_Data

    console.log(this.modDatosContingencia.tipoContingencia)


    let mensaje = "";

    if (this.modDatosContingencia.tipoContingencia == '1') {
      mensaje = "COAS";
    } else {
      mensaje = "POA";
    }


    this.contingenciaService.activarContingencia(this.modDatosContingencia).subscribe({
      next:(data) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Contingencia " + mensaje + " activa",
          showConfirmButton: false
        })

        this.rgContingenciaOff = false;
        this.rgContingenciaAct = true;
      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, revise logs para mas informacion',
        })
      }
    })

  }

  btnOffContingencia() {
    this.modDatosContingencia.idBase = this.id_Data
    this.modDatosContingencia.tipoContingencia = "0"


        
    Swal.fire({
      title: 'Desactivando contingencia',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });


    this.contingenciaService.offContingencia(this.modDatosContingencia).subscribe({
      next:(data) =>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Contingencia desactivada",
          showConfirmButton: false
        })

        this.rgContingenciaOff = true;
        this.rgContingenciaAct = true;

      },error:(e)=>{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, revise logs para mas informacion',
        })
      }
    })

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  btnCargaMasiva() {

    console.log("BTN CARGA")

    const file: File | null = this.selectedFiles.item(0);

    this.currentFile = file
    this.tipo_contingencia = this.tipo_contingencia;
    //this.idBase = 1456
    this.dataContin = '{"idBase":' + this.id_Data + ',"isArchivoEnv": "' + this.isCheckedArchivoEnv + '","idTipoContin":' + this.tipo_contingencia + ',"fechaCert":"' + this.selectedDateInicio + '","idFirma":' + 0 + '}'

    console.log("Enviar masivos")

    console.log(this.dataContin)
    Swal.fire({
      title: 'Enviando registros',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    console.log(this.dataContin)
    /* this.contingenciaService.dataContingencia(this.dataContin, this.currentFile).subscribe({
       next:(data)=>{
         console.log("Correcto 123")
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Registros enviados correctamente',
           showConfirmButton: false
         })
       },
       error:(e)=>{
         console.log(e)
       },
       (d)=>{
 
       }
     })*/

    this.contingenciaService.dataContingencia(this.dataContin, this.currentFile).subscribe(

      data => {
        console.log(data)

      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, revise logs para mas informacion',
        })
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

  btnGenerarEnv() {
    this.generarEnv = {
      tipoContingencia: this.tipo_contingencia,
      id: this.id_Data,
      fechaCert: this.selectedDateInicio
    }

    console.log(this.generarEnv);

    Swal.fire({
      title: 'Generando archivo',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.contingenciaService.generarFileEnv(this.generarEnv).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Archivo creado correctamente',
          showConfirmButton: false
        })

      }, error: (e) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, revise logs para mas informacion',
        })

      }
    });
  }

  btnAlerta() {
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )
  }
  btnValidacionContingencia() {

  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {

      Swal.fire({
        title: 'Validando archivos',
        text: "Espere un momento",
        imageUrl: "../../assets/progress.gif",
        imageWidth: 160,
        imageHeight: 160,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      this.contingenciaService.upload(file).subscribe(


        event => {
          console.log(event)
          /*if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          }*/
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error, revise logs para mas informacion',
          })
        },
        () => {
          console.log("Complete function triggered.")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Archivos validados correctamente",
            showConfirmButton: false
          })
        }
      );

      /*
      this.contingenciaService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          //this.fileInfos = this.uploadService.getFiles();
        }
      });
      */

      /*
            Swal.fire({
              title: 'Enviando registros',
              text: "Espere un momento",
              imageUrl: "../../assets/progress.gif",
              imageWidth: 160,
              imageHeight: 160,
              showConfirmButton: false,
              allowOutsideClick: false
            });
      
            this.contingenciaService.upload(file).subscribe(
      
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
      */
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  /*Matriz de cuentas*/
  addRegistroPoa() {
    this.HId = this.HId + 1
    this.empList.push({ id: this.HId, cantidad: this.HCantidad, tipoPago: this.selectedTipoPago.clave, monto: this.HMonto, concepto: this.HStatus, modulo: this.HModulo });

    this.detalleMatriz.push({ id: this.HId, cantidad: this.HCantidad, tipoPago: this.selectedTipoPago.clave, status: this.HStatus, monto: this.HMonto, modulo: this.HModulo });



  }

  eliminarRegistroPoa(id: number) {
    this.empList = this.empList.filter(item => item.id !== id)

    this.detalleMatriz = this.detalleMatriz.filter(item => item.id !== id)

    //this.empList.push({ id: this.HId, cantidad: this.HCantidad, tipoPago: this.selectedTipoPago.clave, status: this.HStatus,monto: this.HMonto, modulo: this.HModulo });
  }

  archivosPOA() {
    this.envioMatrizCuenta = {
      encabezadoFileRequest: {
        numCiclos: this.HNumCiclo,
        segundos: this.HSegundos,
        ordenanteRequest: {
          banco: this.HBanco,
          tipoCuenta: this.HTipoCuenta,
          cuenta: this.HCuenta,
          nombre: this.HNombre,
          rfc: this.HRFC
        }
      },
      detalleOrdenRequest: this.empList,
      tipoCertificacion: "poa",
      idBase: this.id_Data
    }
    /*
        this.matrizService.postEncabezado(this.envioMatrizCuenta).subscribe({
          next: (data) => {
            this.crearArchivoPOA();
          },
          error: (e) => {
            console.log(e)
          }
        })*/


    Swal.fire({
      title: 'Generando archivo',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    this.matrizService.postEncabezado(this.envioMatrizCuenta).subscribe(


      event => {
        console.log(event)
        /*if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        }*/
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, intentelo nuevamente0',
        })
      },
      () => {
        console.log("Complete function triggered.")



        this.crearArchivoPOA();



      }
    );

  }

  crearArchivoPOA() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      let nameFile;
      if (file) {
        /*
        this.currentFile = file;
        this.matrizService.upload(this.currentFile).subscribe({
          next: (data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Archivo generado correctamente',
              timer: 3000,
              showConfirmButton: false
            })
            $('#exampleModalPOA').modal('hide');
            this.downloadMatriz();
            //this.limpiarModal();
          },
          error: (e) => {
            console.log(e)
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se genero el archivo',
            })
          }
        });

        */
        this.currentFile = file;

        this.matrizService.upload(this.currentFile).subscribe(


          data => {
            console.log("Nombre archivo")
            console.log(data)
            /*if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            }*/
            nameFile = data
            console.log("--" + nameFile)
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrio un error, intentelo nuevamente1',
            })
          },
          () => {
            console.log("Complete function triggered.")

            this.getNameFile();
            // this.downloadMatriz();



          }
        );
      }
    }
  }
  getNameFile() {
    let nameFile;
    this.matrizService.getNameFile().subscribe(
      data => {
        console.log("Nombre archivo")
        console.log(data)
        /*if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        }*/
        nameFile = data.name;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error, intentelo nuevamente2',
        })
      },
      () => {
        console.log("Complete function triggered.")

        //this.getNameFile();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Matriz de cuentas generada correctamente",
          showConfirmButton: false
        })
        this.downloadMatriz(nameFile);
      }
    );
  }
  downloadMatriz(nameFile: string) {

    this.matrizService.download().subscribe(
      blob => {
        this.manageDownload(blob, nameFile);
      }
    );
  }

  manageDownload(response: any, fileName: string): void {
    //debugger;
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);

    const filtePath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    const downloadLink = document.createElement('a');
    downloadLink.href = filtePath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  /****************\
   * df
   * Matriz de cuentas Nuevo
   * 
   * *********/

  archivosPOANew() {
    this.envioMatrizCuenta = {
      encabezadoFileRequest: {
        numCiclos: this.HNumCiclo,
        segundos: this.HSegundos,
        ordenanteRequest: {
          banco: this.HBanco,
          tipoCuenta: this.HTipoCuenta,
          cuenta: this.HCuenta,
          nombre: this.HNombre,
          rfc: this.HRFC
        },
        detalleOrdenRequest: this.empList
      },
      //detalleOrdenRequest: this.empList,
      tipoCertificacion: "poa",
      idBase: this.id_Data
    }

    console.log("Ciclo:" + this.HNumCiclo)
    this.dataMatriz = '{"encabezadoFileRequest":{"numCiclos":' + this.HNumCiclo + ',"segundos":' + this.HSegundos + ',"ordenanteRequest":{"banco":' + this.HBanco + ',"tipoCuenta":' + this.HTipoCuenta + ',"cuenta":' + this.HCuenta + ',"nombre":"' + this.HNombre + '","rfc":"' + this.HRFC + '"},"detalleOrdenRequest":[{' + this.empList + ']}}'

    const file: File | null = this.selectedFiles.item(0);

    this.currentFile = file

    console.log(this.envioMatrizCuenta)

    console.log("Matriz")
    console.log(this.dataMatriz)

    this.matrizService.dataMatriz(this.dataMatriz, this.currentFile).subscribe(

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


  /*********
   * Carma Masiva normal
   */
  changeStatus() {
    console.log(this.tipo_contingencia)

    this.rgContingenciaFileOff = false;

    console.log(this.rgContingenciaFileOff)

    if (this.tipo_contingencia == 3) {
      //this.rgContingenciaFileOff = false;
    }
  }

  /*******
   * Archivos Poa nuevo
   */





  archivosNewPOA() {
    this.matriz.tipoCertificacion = "POA";
    this.ordenanteMatriz = {
      banco: "1233",
      cuenta: "1234",
      nombre: "VICTOR PINEDA",
      rfc: "rfc123",
      tipoCuenta: "40"
    }

    this.encabezadoMatriz = {
      numCiclos: 1,
      segundos: 1
    }

    this.matriz.ordenanteMatriz = this.ordenanteMatriz
    this.matriz.encabezadoMatriz = this.encabezadoMatriz
    this.matriz.detalleMatriz = this.detalleMatriz;

    console.log(this.matriz)

    const file: File | null = this.selectedFiles.item(0);

    this.currentFile = file;

    this.matrizService.dataMatrizTest(this.matriz, this.currentFile).subscribe({
      next: (data) => {

        console.log(data)
      },
      error: (e) => {

        console.log(e)
      }
    })
  }

  descargarPOA() {

    this.matrizService.descargarArchivo().subscribe((res: HttpResponse<Blob>) => {

      console.log(res)
      let nombrearchivo = "MC";
      const now = new Date();

      const anio = now.getFullYear()
      const mes = now.getMonth()
      const dia = now.getDate()
      const hora = now.getHours()
      const min = now.getMinutes()
      const seg = now.getSeconds()

      const fecha = anio + "-" + mes + "-" + dia + "-" + hora + min + seg

      /**Descarga file */
      const archivo = new Blob([res.body], { type: res.headers.get('Content-Type') });

      const url = window.URL.createObjectURL(archivo);

      const link = document.createElement('a');

      link.href = url;

      link.download = "MC_" + fecha;

      link.click();
      const contentDispositHeader = res.headers.get('Content-Disposition');
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDispositHeader);

      console.log(matches)
      const nombreArchivo = matches[0].replace(/['"]/g, '');

      console.log("Nombre archivo :" + nombreArchivo)


      //const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      //const matches = fileNameRegex.exec(contentDisposition);

      //const matches = filenames.exec(contentDispositHeader);



    })

    /*this.matrizService.descargarArchivo().subscribe(res=>{
      console.log(res);
  console.log(res.headers.get('Content-Disposition'));*/

    //})
  }

  async descargarPOATest() {

    Swal.fire({
      title: 'Generando matriz de cuentas',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    try {
      const file: File | null = this.selectedFiles.item(0);

      this.currentFile = file;

      const now = new Date();

      const anio = now.getFullYear()
      const mes = now.getMonth()
      const dia = now.getDate()
      const hora = now.getHours()
      const min = now.getMinutes()
      const seg = now.getSeconds()

      const fecha = anio + "-" + dia + "-" + hora + min + seg + ".txt"


      this.matriz.tipoCertificacion = "POA";
      this.matriz.idBase = this.id_Data
      this.ordenanteMatriz = {
        banco: this.HBanco,
        cuenta: this.HCuenta,
        nombre: this.HNombre,
        rfc: this.HRFC,
        tipoCuenta: this.HTipoCuenta
      }

      this.encabezadoMatriz = {
        numCiclos: this.HNumCiclo,
        segundos: this.HSegundos
      }

      this.matriz.ordenanteMatriz = this.ordenanteMatriz
      this.matriz.encabezadoMatriz = this.encabezadoMatriz
      this.matriz.detalleMatriz = this.detalleMatriz;


      console.log(this.matriz)
      const result = await this.matrizService.descargarArchivoMC(this.matriz, this.currentFile);

      console.log(result)
      const blob = new Blob([result], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url;
      link.download = fecha;
      link.click();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Matriz de cuentas generada correctamente",
        showConfirmButton: false
      })

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error al generar la matriz de cuentas, intentelo nuevamente',
      })
    }

    /* const file: File | null = this.selectedFiles.item(0);
 
       this.currentFile = file;
 
     this.matriz.ordenanteMatriz = this.ordenanteMatriz
     this.matriz.encabezadoMatriz = this.encabezadoMatriz
     this.matriz.detalleMatriz = this.detalleMatriz;
 
 
     this.matrizService.descargarArchivoMC(this.matriz,this.currentFile).subscribe({
 next : (data) =>{
   console.log(data)
 },error: (e)  => {
   console.log(e)
 }*/



  }


  /**********************
   * Nuevo Generar Env  *
   *********************/

  async generarEnvTest() {

    console.log("BTN CARGA")

    const file: File | null = this.selectedFiles.item(0);

    this.currentFile = file
    this.tipo_contingencia = this.tipo_contingencia;
    //this.idBase = 1456
    this.dataContin = '{"idBase":' + this.id_Data + ',"isArchivoEnv": "' + this.isCheckedArchivoEnv + '","idTipoContin":' + this.modDatosContingencia.tipoContingencia + ',"fechaCert":"' + this.selectedDateInicio + '","idFirma":' + 0 + '}'

    console.log("Enviar masivos")

    console.log(this.dataContin)

    console.log(this.isCheckedArchivoEnv)
    if(this.isCheckedArchivoEnv ===true){
      console.log("verdadero")
    }else{
      console.log("falseo")
    }

    Swal.fire({
      title: 'Enviando registros',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    console.log(this.dataContin)

    this.currentFile = file;


    /*22/06/2023*/
    if(this.isCheckedArchivoEnv == true){

      this.contingenciaService.generarEnv(this.dataContin, this.currentFile).subscribe({
        next:(result:ArrayBuffer) =>{
  
          console.log("Test env")
        //this.obtenerNombres();
        console.log(this.nombreFileTest)
        //console.log(nombre)
        const blob = new Blob([result], { type: 'application/octet-stream' });
  
        const blobs = new Blob([result], { type: 'application/octet-stream' });
  
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url;
        this.contingenciaService.obtenerNombre().subscribe({
          next: (data) => {
            this.nombreFileTest = data
  
            link.download = this.nombreFileTest;
            link.click();
          }, error: (e) => {
            console.log(e)
          }
  
        })
  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Archivo .env generado correctamente",
          showConfirmButton: false
        })
  
        },error:(e)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error al generar archivo .env, intentelo nuevamente',
          })
        }
      })

    }else{

      this.contingenciaService.cargarArchivo(this.dataContin, this.currentFile).subscribe({
        next: (data) =>{
          console.log("Enviando archivo")

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Archivo enviado correctamente",
            showConfirmButton: false
          })
        },
        error: (e)=>{
          console.log(e)
        }
      })

    }

  }

  getNameFileTest(result): String {


    const contentDispositHeader = result.headers.get('Content-Disposition');
    console.log(contentDispositHeader)
    const matches = contentDispositHeader.match(/filename(.+)"/);// /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDispositHeader);
    return matches ? matches[1] : 'unknow'
  }

  obtenerArchivo() {
    this.httpClient.get('http://localhost:8087/archivo', { observe: 'response', responseType: 'blob' })
      .subscribe((response) => {
        // Obtener el nombre del archivo de la cabecera Content-Disposition
        // contentDisposition = response.headers.get('Content-Disposition');
        // nombreArchivo = contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '');
        //console.log("Nombre archivo: " + nombreArchivo)
        // Guardar el objeto Resource en el sistema de archivos del cliente
        console.log(response)

        //const nombreArchivos = matches[0].replace(/['"]/g, '');

        //console.log("Nombre archivo :" + nombreArchivos)

        //saveAs(archivo, nombreArchivo);
      });

  }

  obtenerNombres(): String {
    let nombre = "";

    this.contingenciaService.obtenerNombre().subscribe({
      next: (data) => {
        console.log("123456")
        console.log(data.toString());
        this.nombreFileTest = data

        nombre = this.nombreFileTest;

      },
      error: (e) => {
        console.log(e)
      }
    })

    console.log(nombre + "");
    console.log(this.listaBase)
    return nombre


  }

  btnGenerarEnvTest() {
    this.generarEnv = {
      tipoContingencia: this.tipo_contingencia,
      id: this.id_Data,
      fechaCert: this.selectedDateInicio
    }

    console.log(this.generarEnv);

    Swal.fire({
      title: 'Generando archivo',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.contingenciaService.generarFileEnvTest(this.generarEnv).subscribe({
      next:(result:ArrayBuffer)=>{

      console.log("Test env")
      //this.obtenerNombres();
      console.log(this.nombreFileTest)
      //console.log(nombre)
      const blob = new Blob([result], { type: 'application/octet-stream' });

      const blobs = new Blob([result], { type: 'application/octet-stream' });

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url;
      this.contingenciaService.obtenerNombre().subscribe({
        next: (data) => {
          this.nombreFileTest = data

          link.download = this.nombreFileTest;
          link.click();
        }, error: (e) => {
          console.log(e)
        }


      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Archivo creado correctamente',
        showConfirmButton: false
      })

      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error al generar archivo .env, intentelo nuevamente',
        })
      }
    })
/*
    this.contingenciaService.generarFileEnvTest(this.generarEnv).subscribe((result: ArrayBuffer) => {
      //const nombre = this.getNameFileTest(result);
      //result.slice(f => f)
      console.log("Test env")
      //this.obtenerNombres();
      console.log(this.nombreFileTest)
      //console.log(nombre)
      const blob = new Blob([result], { type: 'application/octet-stream' });

      const blobs = new Blob([result], { type: 'application/octet-stream' });

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url;
      this.contingenciaService.obtenerNombre().subscribe({
        next: (data) => {
          this.nombreFileTest = data

          link.download = this.nombreFileTest;
          link.click();
        }, error: (e) => {
          console.log(e)
        }


      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Archivo creado correctamente',
        showConfirmButton: false
      })



      /* this.contingenciaService.generarFileEnvTest(this.generarEnv).subscribe({
           next: (data) => {
             Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Archivo creado correctamente',
               showConfirmButton: false
             })
   
           },error: (e) =>{
   
             Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'Ocurrio un error, revise logs para mas informacion',
             })
   
           }
         }); --*--/
    })*/

  }

  uploadFilesTest(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.uploadTest(i, this.selectedFiles[i]);
      }
    }
  }

  uploadTest(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {

      Swal.fire({
        title: 'Validando archivos',
        text: "Espere un momento",
        imageUrl: "../../assets/progress.gif",
        imageWidth: 160,
        imageHeight: 160,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      this.contingenciaService.uploadFileTest(file).subscribe((result: ArrayBuffer) => {
        //const nombre = this.getNameFileTest(result);
        //result.slice(f => f)
        console.log("Test env")
        //this.obtenerNombres();
        console.log(this.nombreFileTest)
        //console.log(nombre)
        const blob = new Blob([result], { type: 'application/octet-stream' });
  
        const blobs = new Blob([result], { type: 'application/octet-stream' });
  
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url;
        this.contingenciaService.obtenerNombre().subscribe({
          next: (data) => {
            this.nombreFileTest = data
  
            link.download = this.nombreFileTest;
            link.click();
          }, error: (e) => {
            console.log(e)
          }
  
  
        })
  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Archivo creado correctamente',
          showConfirmButton: false
        })

      })

    }
  }



  /*29/06/23*/
  /********
   * Boton generar .env
   */

  btnGenerarEnvCoasPoa() {
    console.log("btnGenerarEnvCoasPoa")
    this.generarEnv = {
      tipoContingencia: this.modDatosContingencia.tipoContingencia,
      idBase: this.id_Data,
      fechaCert: this.selectedDateInicio
    }

    console.log(this.generarEnv);

    Swal.fire({
      title: 'Generando archivo',
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.contingenciaService.generarEnvCoasPoa(this.generarEnv).subscribe({
      next:(result:ArrayBuffer)=>{

      const blob = new Blob([result], { type: 'application/octet-stream' });

      const blobs = new Blob([result], { type: 'application/octet-stream' });

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url;
      this.contingenciaService.obtenerNombrePOA().subscribe({
        next: (data) => {
          this.nombreFileTest = data

          link.download = this.nombreFileTest;
          link.click();
        }, error: (e) => {
          console.log(e)
        }


      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Archivo .env creado correctamente',
        showConfirmButton: false
      })

      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error al generar archivo .env, intentelo nuevamente',
        })
      }
    })

  }

}




