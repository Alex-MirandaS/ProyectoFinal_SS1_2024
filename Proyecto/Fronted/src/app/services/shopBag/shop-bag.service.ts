import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopBagService extends ModelService{
  constructor(http: HttpClient){
    super(http, 'shopBag')
  }

  getTotal(data:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/total/'+data);
  }
}
