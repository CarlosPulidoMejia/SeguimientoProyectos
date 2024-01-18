import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaProyectos,listaTipoDocumentacion,listaTipoProyecto, listaTipoFase, listaTipoEstado } from 'src/app/clases/proyectos/listaProyectos';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ProyectoBauService {

  constructor(private httpClient: HttpClient) { }

  getAllProyectos(): Observable<listaProyectos[]>{
    return this.httpClient.get<listaProyectos[]>(`${global.URL_API}listaproyectos`)
  }

  getTipoDocumentacion(): Observable<listaTipoDocumentacion[]>{
    return this.httpClient.get<listaTipoDocumentacion[]>(`${global.URL_API}tipoDocumentacion`)
  }

  getTipoProyecto(): Observable<listaTipoProyecto[]>{
    return this.httpClient.get<listaTipoProyecto[]>(`${global.URL_API}tipoProyecto`)
  }

  getTipoFase(): Observable<listaTipoFase[]>{
    return this.httpClient.get<listaTipoFase[]>(`${global.URL_API}tipoFase`)
  }
  
  getTipoEstado(): Observable<listaTipoEstado[]>{
    return this.httpClient.get<listaTipoEstado[]>(`${global.URL_API}tipoEstado`)
  }
















  //ELIMINAR//

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
