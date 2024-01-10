import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as global from '../../globals';
@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private httpClient:HttpClient) { }

  postEnviarOrdenes(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/envio/ordenes`,envio);
  }


  postEnviarOrdenespir(envio:any){
    return this.httpClient.post(`${global.URL_API}api/bim/envio/ordenespir`,envio);
  }

  dataMasiva(user:any,file:File){

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('dataMasiva', user);

    const req = new HttpRequest('POST', `${global.URL_API}api/bim/envio/carga-masiva`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
    //return this.httpClient.post(`${global.URL_API}api/bim/contingencia/datos`,envio)
  }
  
}
