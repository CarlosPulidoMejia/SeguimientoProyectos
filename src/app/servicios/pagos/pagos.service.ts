import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPago } from 'src/app/clases/pagos/Pagos';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private httpClient: HttpClient) { }

  getAllPagos():Observable<TipoPago[]>{
    return this.httpClient.get<TipoPago[]>(`${global.URL_API}api/bim/pagos`);
  }
}
