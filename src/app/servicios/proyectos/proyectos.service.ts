import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaProyectos } from 'src/app/clases/proyectos/listaProyectos';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ProyectoBauService {

  constructor(private httpClient: HttpClient) { }

  getProyectos(devolucion:any):Observable<listaProyectos[]>{
    return this.httpClient.post<listaProyectos[]>(`${global.URL_API}bim/mw/devoluciones/`,devolucion);
  }

  postListaProyectos(devoluciones:any){
    return this.httpClient.post(`${global.URL_API}enviarDevoluciones`,devoluciones);
  }

  postAgregarProyectos(proyecto:any){
    return this.httpClient.post(`${global.URL_API}guardarproyecto`,proyecto);
  }

  getAllProyectos(){
    return this.httpClient.get(`${global.URL_API}listaproyectos`)
  }

  getDevolucionesVarios(devolucion:any):Observable<listaProyectos[]>{
    return this.httpClient.post<listaProyectos[]>(`${global.URL_API}api/bim/retornos/`,devolucion);
  }
  

}
