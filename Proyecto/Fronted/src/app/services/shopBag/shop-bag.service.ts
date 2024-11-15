import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopBagService extends ModelService {
  constructor(http: HttpClient) {
    super(http, 'shopBag')
  }

  getTotal(data: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/total/' + data);
  }

  deleteByIdArticulo(idUsuario: number, idArticulo: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+'/articulo', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        idUsuario,
        idArticulo
      }
    });
  }
}
