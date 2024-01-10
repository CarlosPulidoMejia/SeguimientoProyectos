import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from '../../globals';
import { catchError, retry } from 'rxjs/operators'
import { matriz } from 'src/app/clases/matriz/matriz';
import { matrizcuentas } from 'src/app/clases/matriz/matrizcuentas';
@Injectable({
  providedIn: 'root'
})
export class MatrizcuentasService {

  constructor(private httpClient:HttpClient) { }

  postEncabezado(header:any){
    return this.httpClient.post(`${global.URL_API}headerexcelBanxico`,header);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${global.URL_API}excelBanxico`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getNameFile():Observable<matriz>{
    return this.httpClient.get<matriz>(`${global.URL_API}api/bim/matriz/getname`);
  }

  download(){
    return this.httpClient.get(global.URL_API + 'api/bim/matriz/download',{ responseType: "blob" }).pipe(
      catchError(error => {
        throw new Error (error);
      })
    );
  }

  dataMatriz(user:any,file:File){

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataMatriz', user);

    const req = new HttpRequest('POST', `${global.URL_API}api/bim/matriz/datos`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
    //return this.httpClient.post(`${global.URL_API}api/bim/contingencia/datos`,envio)
  }


  dataMatrizTest(user:any,file:File){

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataMatriz', JSON.stringify(user));

    const req = new HttpRequest('POST', `${global.URL_API}api/bim/poa/generarMC`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
    //return this.httpClient.post(`${global.URL_API}api/bim/contingencia/datos`,envio)
  }

  descargarArchivo():Observable<HttpResponse<Blob>>{

    const headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.httpClient.get(`${global.URL_API}api/bim/poa/generarMCFile`,{
      headers,
      responseType:'blob',
      observe: 'response'
    })
  }

  descargarArchivoMC(user:any,file:File):Promise<any>{

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataMatriz', JSON.stringify(user));

    return this.httpClient.post(`${global.URL_API}api/bim/poa/generarMCTest`, formData,{responseType :'arraybuffer'}).toPromise();

  }

}
