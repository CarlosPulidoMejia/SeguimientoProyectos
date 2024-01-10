import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaEscenario } from 'src/app/clases/escenarios/escenarios';
import * as global from '../../globals';
@Injectable({
  providedIn: 'root'
})
export class EscenariosService {

  constructor(private httpClient:HttpClient) { }

  getEscenarios():Observable<listaEscenario[]>{
    return this.httpClient.get<listaEscenario[]>(`${global.URL_API}api/bim/envios/escenarios`);
  }
}
