import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ModelService{
  constructor(http: HttpClient){
    super(http, 'usuario')
  }

  login(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/login', data);
  }
}