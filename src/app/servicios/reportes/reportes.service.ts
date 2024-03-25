import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaGestion, listaResumenGeneral, listaPorcentajesGestion } from 'src/app/clases/reportes/listaReportes';

import * as global from '../../globals';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {
    
    constructor(private httpClient: HttpClient) { }

    getGestion():Observable<listaGestion>{
        return this.httpClient.get<listaGestion>(`${global.URL_API}reporte/gestion`)
    }

    getResumen():Observable<listaResumenGeneral>{
        return this.httpClient.get<listaResumenGeneral>(`${global.URL_API}reporte/resumen`)
    }

    getPorcentajes():Observable<listaPorcentajesGestion>{
        return this.httpClient.get<listaPorcentajesGestion>(`${global.URL_API}reporte/detalle`)
    }
}