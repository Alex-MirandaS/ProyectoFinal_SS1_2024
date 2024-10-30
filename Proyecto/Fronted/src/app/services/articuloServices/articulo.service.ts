import { Injectable } from '@angular/core';
import { ModelService } from '../model.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService extends ModelService{
  constructor(http: HttpClient){
    super(http, 'articulo')
  }
    // POST: Agregar un nuevo elemento
    /*
    add(id: number, titulo:string, precio:number, imagen:string, descripcion:string, idEstado:number, idTipoArticulo:number, idUsuario:number, idProveedor:number): Observable<any> {
      return this.http.post<any>(this.apiUrl, { id, titulo, precio, imagen, descripcion, idEstado, idTipoArticulo, idUsuario, idProveedor });
    }*/
}
