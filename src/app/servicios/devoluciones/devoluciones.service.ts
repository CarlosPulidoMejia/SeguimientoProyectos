import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaDevoluciones } from 'src/app/clases/devoluciones/listaDevoluciones';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  constructor(private httpClient: HttpClient) { }

  getDevoluciones(devolucion:any):Observable<listaDevoluciones[]>{
    return this.httpClient.post<listaDevoluciones[]>(`${global.URL_API}bim/mw/devoluciones/`,devolucion);
  }

  postListaDevoluciones(devoluciones:any){
    return this.httpClient.post(`${global.URL_API}enviarDevoluciones`,devoluciones);
  }

  getDevolucionesVarios(devolucion:any):Observable<listaDevoluciones[]>{
    return this.httpClient.post<listaDevoluciones[]>(`${global.URL_API}api/bim/retornos/`,devolucion);
  }
  

}
