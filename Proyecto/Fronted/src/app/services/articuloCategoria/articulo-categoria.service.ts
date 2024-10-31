import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticuloCategoriaService extends ModelService{
  constructor(http: HttpClient){
    super(http, 'articuloCategoria')
  }
}
