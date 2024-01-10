import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

import * as global from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class CdaService {

  constructor(protected http:HttpClient) { }

  getCdas(request: any){
    return this.http.post(global.URL_API + 'getCDAS',request).pipe(
      catchError(error => {
        throw new Error (error);
      })
    );
  }

  downloadCda(filename : String ){
    return this.http.get(global.URL_API + 'download/' + filename,{ responseType: "blob" }).pipe(
      catchError(error => {
        throw new Error (error);
      })
    );
  }

}
