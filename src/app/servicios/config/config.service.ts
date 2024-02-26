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
        return this.httpClient.get<listaUsuarios[]>(`${global.URL_API}recursos/listarUsuarios`)
    }

    getAllGerencias():Observable<listaGerencias[]>{
        return this.httpClient.get<listaGerencias[]>(`${global.URL_API}recursos/listarGerencias`)
    }
    /**
    getAllProyectos(): Observable<listaProyectos[]>{
        return this.httpClient.get<listaProyectos[]>(`${global.URL_API}listaproyectos`)
    } 
     */
}
