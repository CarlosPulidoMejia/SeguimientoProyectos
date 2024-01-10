import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContingenciaData } from 'src/app/clases/contingencia/contingencia';
import { DatosContingencia } from 'src/app/clases/contingencia/datosContingencia';
import * as global from '../../globals';
@Injectable({
  providedIn: 'root'
})
export class ContingenciaService {

  constructor(private httpClient:HttpClient) { }

  consultarContingencia(contingencia:DatosContingencia):Observable<ContingenciaData>{
    //return this.httpClient.post<ContingenciaData>(`${global.URL_API}api/bim/contingencia/consultar`,envio)
    return this.httpClient.post<ContingenciaData>(`${global.URL_API}api/bim/contingencia/consultar`,contingencia)
  }
  

  activarContingencia(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/activar`,envio)
  }
  offContingencia(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/off`,envio)
  }
  
  dataContingencia(user:any,file:File){

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataContin', user);

    const req = new HttpRequest('POST', `${global.URL_API}api/bim/contingencia/datos`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
    //return this.httpClient.post(`${global.URL_API}api/bim/contingencia/datos`,envio)
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${global.URL_API}api/bim/contingencia/validacion`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  generarFileEnv(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/generar`,envio)
  }



  /*****
   * Nuevo env
   */

  generarEnv(user:any,file:File):Observable<any>{

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataContin', user);

    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/datosEnv`, formData,{responseType :'arraybuffer'});

  }


  generarEnvTest(user:any,file:File):Observable<Blob>{

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataContin', user);

    const headers = new HttpHeaders({'Content-Type':'application/json'})
    const options = { headers: headers,resposeType:'blob'}
    /*return this.httpClient.get(`${global.URL_API}api/bim/poa/generarMCFile`,{
      headers,
      responseType:'blob',
      observe: 'response'
    })*/

    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/datosEnvt`, formData,{responseType:'blob'});

  }

  cargarArchivo(user:any,file:File){

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataContin', user);

   

    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/carga`, formData);

  }


  obtenerNombre(){
    return this.httpClient.get(`${global.URL_API}nombre`,{responseType: 'text'})
  }

  generarFileEnvTest(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/generarTest`,envio,{responseType :'arraybuffer'})
  }

  uploadFileTest(file: File) {

    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/validacionTest`, formData,{responseType :'arraybuffer'});
  }

  /*29/06/23*/
  /*****
   * Nuevo servicio 
   * Generar .env COAS POA
   */

  generarEnvCoasPoa(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/contingencia/generarEnv`,envio,{responseType :'arraybuffer'})
  }

  obtenerNombrePOA(){
    return this.httpClient.get(`${global.URL_API}nombreEnv`,{responseType: 'text'})
  }


}
