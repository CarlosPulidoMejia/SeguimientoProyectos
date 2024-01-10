import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base } from 'src/app/clases/baseDatos/base';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private httpClient: HttpClient) { }

  getAllBaseDatos():Observable<Base[]>{
    return this.httpClient.get<Base[]>(`${global.URL_API}bim/mw/datasource/`);
  }

  listaBase():Observable<Base[]>{
    return this.httpClient.get<Base[]>(global.URL_API + "bim/mw/datasource/");
  }

}
