import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  protected apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient, private route: String) { 
    this.apiUrl+= route;
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByID(id:number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // POST: Agregar un nuevo elemento
  add(id: number, titulo:string, precio:number, imagen:string, descripcion:string, idEstado:number, idTipoArticulo:number, idUsuario:number, idProveedor:number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id, titulo, precio, imagen, descripcion, idEstado, idTipoArticulo, idUsuario, idProveedor });
  }

  // PUT: Actualizar un elemento
  update(id: number, data:any, columnName:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { data, columnName });
  }

  // DELETE: Eliminar un elemento
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
