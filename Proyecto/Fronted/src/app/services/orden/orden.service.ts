import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService extends ModelService{
  constructor(http: HttpClient){
    super(http, 'orden')
  }
  getOrdenByIdUsuario(data:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/usuario', data);
  }
}