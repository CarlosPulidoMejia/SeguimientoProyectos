import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from '../../globals';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private httpClient: HttpClient) { }

    getAll(){
        
    }
}
