import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseUrl = 'http://localhost:3000/cricketers';
  constructor(private http: HttpClient) { }

  public getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  public getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  public createItem(item: any): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  public updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, item);
  }

  public deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
