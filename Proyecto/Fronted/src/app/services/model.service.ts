import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  protected apiUrl = 'http://localhost:3000/api/';
  constructor(protected http: HttpClient, private route: String) { 
    this.apiUrl+= route;
  }

  add(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByID(id:number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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
