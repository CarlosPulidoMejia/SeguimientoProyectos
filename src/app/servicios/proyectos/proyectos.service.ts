import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaProyectos,listaTipoDocumentacion,listaTipoProyecto, listaTipoFase, listaTipoEstado, listaTipoDependencia, listaDocumetnacionAvance, listaToDo } from 'src/app/clases/proyectos/listaProyectos';

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

  getTipoDependencia(): Observable<listaTipoDependencia[]>{
    return this.httpClient.get<listaTipoDependencia[]>(`${global.URL_API}tipoDependencia`)
  }

  getDocumentacionAvance(idProyecto:any):Observable<listaDocumetnacionAvance[]>{
    return this.httpClient.get<listaDocumetnacionAvance[]>(`${global.URL_API}objetivo/listarDocumentacion/${idProyecto}`)
  }

  getListaToDo(idProyecto:any):Observable<listaToDo[]>{
    return this.httpClient.get<listaToDo[]>(`${global.URL_API}objetivo/listarToDo/${idProyecto}`)
  }

  getCerrarSemana(){
    return this.httpClient.get(`${global.URL_API}cerrar/semana`)
  }

  postAgregarProyectos(proyecto:any){
    return this.httpClient.post(`${global.URL_API}guardarproyecto`,proyecto);
  }  

  putEditrProyecto(proyecto:any,id:any){
    return this.httpClient.put(`${global.URL_API}detalleProy/${id}`,proyecto);
  }

  putComentarioDocumentacion(objetivo:any,id:any){
    return this.httpClient.put(`${global.URL_API}objetivo/modificarDocumentacion/${id}`,objetivo);
  }

  putEditarComentarioProyecto(idProyecto:any,comentarioProyecto:any){
    return this.httpClient.put(`${global.URL_API}objetivo/editarComentario/${idProyecto}`,comentarioProyecto);
  }

  putEditarComentariosSD(idProyecto:any, comentarioSD:any){
    console.log(`${global.URL_API}objetivo/observacionesSD/${idProyecto}`, comentarioSD);
    
    return this.httpClient.put(`${global.URL_API}objetivo/observacionesSD/${idProyecto}`, comentarioSD)
  }

  postToDo(detalleToDo:any){
    return this.httpClient.post(`${global.URL_API}guardarToDo`,detalleToDo)
  }
}
