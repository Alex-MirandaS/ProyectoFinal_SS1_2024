import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService extends ModelService{
  constructor(http: HttpClient){
    super(http, 'reporte')
  }

  getReporte(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  loginPasarela(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/loginPasarela', data);
  }

  pagarGetComprobante(data:any): Observable<any> {
    console.log(this.apiUrl);
    return this.http.post<{ pdf: string, id: number }>(this.apiUrl+'/pagarGetComprobante', data);
  }
}

