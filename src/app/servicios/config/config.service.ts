import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from '../../globals';
import { listaUsuarios, listaGerencias } from 'src/app/clases/configuracion/listaConfig';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private httpClient: HttpClient) { }

    getAllUsuario():Observable<listaUsuarios[]>{
        return this.httpClient.get<listaUsuarios[]>(`${global.URL_APIA}recursos/listarUsuarios`)
    }

    getAllGerencias():Observable<listaGerencias[]>{
        return this.httpClient.get<listaGerencias[]>(`${global.URL_API}recursos/listarGerencias`)
    }

    putEditarDependencia(id:any,dependencia:any){
        return this.httpClient.put(`${global.URL_API}modificarDependencia/${id}`,dependencia);
    }

    putEditarDocumentacion(id:any,documentacion:any){
        return this.httpClient.put(`${global.URL_API}modificarDocumentacion/${id}`, documentacion);
    }

    putEditarEstado(id:any,estado:any){
        return this.httpClient.put(`${global.URL_API}modificarEstado/${id}`,estado);
    }

    putEditarFase(id:any, fase:any){
        return this.httpClient.put(`${global.URL_API}modificarFase/${id}`,fase);
    }

    putEditarTipo(id:any, tipo:any){
        return this.httpClient.put(`${global.URL_API}modificarTipoProyecto/${id}`, tipo)
    }

    postAgregarDependencia(dependencia:any){
        return this.httpClient.post(`${global.URL_API}crearDependencia`, dependencia)
    }

    postAgregarDocumentacion(documentacion:any){
        return this.httpClient.post(`${global.URL_API}crearDocumentacion`,documentacion)
    }

    postAgregarEstado(estado:any){
        return this.httpClient.post(`${global.URL_API}crearEstado`,estado)
    }

    postAgregarFase(fase:any){
        return this.httpClient.post(`${global.URL_API}crearFase`,fase)
    }

    postAgregarTipoProy(tipoProy:any){
        return this.httpClient.post(`${global.URL_API}crearTipoProyecto`,tipoProy)
    }
    /**
     * 
    postAgregarProyectos(proyecto:any){
        return this.httpClient.post(`${global.URL_API}guardarproyecto`,proyecto);
    }
     *   
    putEditrProyecto(proyecto:any,id:any){
        return this.httpClient.put(`${global.URL_API}detalleProy/${id}`,proyecto);
    }
     * 
    getAllProyectos(): Observable<listaProyectos[]>{
        return this.httpClient.get<listaProyectos[]>(`${global.URL_API}listaproyectos`)
    } 
     */
}
