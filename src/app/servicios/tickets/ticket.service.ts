import { HttpClient, HttpRequest } from '@angular/common/http';
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
        return this.httpClient.get<listaTickets[]>(`${global.URL_API}ticket/listar`)
    } 

    postAgregarTicket(file:File){
        const formData: FormData = new FormData();
        formData.append('file', file);
        
        const req = new HttpRequest('POST',`${global.URL_API}ticket/cargar`, formData,{
            reportProgress:true,
            responseType: 'json'
        });
        return this.httpClient.request(req);
    }  

    putEditrTicket(proyecto:any,id:any){
        return this.httpClient.put(`${global.URL_API}detalleProy/${id}`,proyecto);
    }
}
