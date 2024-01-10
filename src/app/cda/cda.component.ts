import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Base } from '../clases/baseDatos/base';
import { TipoPago } from '../clases/pagos/Pagos';
import { CdaService } from '../servicios/cdas/cda.service';
import { DatosService } from '../servicios/datos/datos.service';

declare const $: any;

@Component({
  selector: 'app-cda',
  templateUrl: './cda.component.html',
  styleUrls: ['./cda.component.css']
})
export class CdaComponent implements OnInit {

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


  //Banderas
  validaError = false;

  //archivos
  archivos:any;
  selectedArchivo:any;

  //Archivos y Frase
  cer : any = null;
  cve : any = null;
  crt : any = null;
  cerBase64 : any = "";
  cveBase64 : any = "";
  crtBase64 : any = "";
  fraseSeguridad : String = "";

  //RequestGetCDA;
  getCDA: any;
  stringgetCDA:any;
  getCDAObject:any;

  //OrpNumero
  orpNumIni:any;
  orpNumFin:any;

  tipoBusqueda:string;
  
  constructor(private cdaService:CdaService,private datosService: DatosService) { }

  ngOnInit(): void {
    this.listaBD();
  }

  listaBD() {
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

  /******
   * Certificados CDA
   */
  changeListener(files : File[]){
    if (files[0].name.substr(-3,3) == "cer"){
      this.cer = files[0];
    }else if (files[0].name.substr(-3,3) == "cve"){
      this.cve = files[0];
    }else if (files[0].name.substr(-3,3) == "crt"){
      this.crt = files[0];
    }
  }

  async getCDAS(){

    if (this.id_Data === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione una base de datos',
      })
      this.validaError = true;
    }

    if(this.fraseSeguridad === ""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese la frase de seguridad',
      });
      this.validaError = true;
    }

    if (this.cer === null || this.cve === null || this.crt === null){
      var mensaje  = "Ingrese el archivo " + (this.cer === null ? ".cer"
                                              :this.cve === null ? ".cve" 
                                              :this.crt === null ? ".crt" 
                                              : "" );
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
      });
      this.validaError = true;
    }

    if(!this.validaError){
    
      //Encode Base 64
      await this.getBase64(this.cve).then(
        data => this.cveBase64 = data
      );
      await this.getBase64(this.cer).then(
        data => this.cerBase64 = data
      );
      await this.getBase64(this.crt).then(
        data => this.crtBase64 = data
      );

      this.getCDA = {
        datasource: {
          //ip: this.selectedDatasource.ip,
         // puerto: this.selectedDatasource.puerto,
          //base: this.selectedDatasource.base,
          //usuario: this.selectedDatasource.usuario,
          //pass: this.selectedDatasource.pass,
          //descripcion: this.selectedDatasource.descripcion
          id: this.id_Data
        },
        cer: this.cerBase64.split(',')[1],
        nameCer : this.cer.name,
        cve : this.cveBase64.split(',')[1],
        nameCve : this.cve.name,
        crt : this.crtBase64.split(',')[1],
        nameCrt : this.crt.name,
        password : this.fraseSeguridad,
        orpNumIni : this.orpNumIni,
        orpNumFin : this.orpNumFin,
        tipoBusqueda: this.tipoBusqueda
      };

    this.stringgetCDA = JSON.stringify(this.getCDA);
    this.getCDAObject = JSON.parse(this.stringgetCDA);
    console.log(this.getCDAObject);

    Swal.fire({
      title: "Generando CDAS...",
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    this.cdaService.getCdas(this.getCDAObject).subscribe(
      (data) =>{

        $('#tablacda').dataTable().fnDestroy();


          this.archivos = data;

          setTimeout(()=>{ 
            $('#tablacda').DataTable( {
              language: {
                url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
              pageLength: 10,
              responsive: true
          } );
        },1);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La busqueda ha sido completada',
            timer: 1000,
            showConfirmButton: false
          })



      }
    );
    }
  }

  async getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  descargarArchivo(nameFile:string){
    this.cdaService.downloadCda(nameFile).subscribe(
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

    const filtePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filtePath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

}
