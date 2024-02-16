import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from '../../globals';
import { listaDependencia } from 'src/app/clases/configuracion/listaConfig';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private httpClient: HttpClient) { }

    getAll(){
        
    }

    getDependencia(): Observable<listaDependencia[]>{
        return this.httpClient.get<listaDependencia[]>(`${global.URL_API}tipoDependencia`)
    }
}
