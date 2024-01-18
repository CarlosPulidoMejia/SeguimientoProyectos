import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaProyectos,listatipoDocumentacion } from 'src/app/clases/proyectos/listaProyectos';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ProyectoBauService {

  constructor(private httpClient: HttpClient) { }

  getAllProyectos(): Observable<listaProyectos[]>{
    return this.httpClient.get<listaProyectos[]>(`${global.URL_API}listaproyectos`)
  }

  getTipoDocumentacion(): Observable<listatipoDocumentacion[]>{
    return this.httpClient.get<listatipoDocumentacion[]>(`${global.URL_API}tipoDocumentacion`)
  }

  getProyectos(devolucion:any):Observable<listaProyectos[]>{
    return this.httpClient.post<listaProyectos[]>(`${global.URL_API}bim/mw/devoluciones/`,devolucion);
  }

  postListaProyectos(devoluciones:any){
    return this.httpClient.post(`${global.URL_API}enviarDevoluciones`,devoluciones);
  }

  postAgregarProyectos(proyecto:any){
    return this.httpClient.post(`${global.URL_API}guardarproyecto`,proyecto);
  }

  getDevolucionesVarios(devolucion:any):Observable<listaProyectos[]>{
    return this.httpClient.post<listaProyectos[]>(`${global.URL_API}api/bim/retornos/`,devolucion);
  }
  

}
