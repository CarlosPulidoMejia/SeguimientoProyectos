import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaTickets } from 'src/app/clases/tickets/listaTickets';

import * as global from '../../globals';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    constructor(private httpClient: HttpClient) { }

    getAllTickets(): Observable<listaTickets[]>{
        return this.httpClient.get<listaTickets[]>(`${global.URL_API}listaproyectos`)
    } 

    postAgregarTicket(proyecto:any){
        return this.httpClient.post(`${global.URL_API}guardarproyecto`,proyecto);
    }  

    putEditrTicket(proyecto:any,id:any){
        return this.httpClient.put(`${global.URL_API}detalleProy/${id}`,proyecto);
    }
}
