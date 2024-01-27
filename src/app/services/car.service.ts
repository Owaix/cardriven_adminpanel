import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './env';
import { CarDetail, Ddl } from './Users';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  private apiUrl = environment.BASE_URL + 'ddl';
  constructor(private http: HttpClient) { }

  getMakes(): Observable<Ddl[]> {
    return this.http.get<Ddl[]>(`${this.apiUrl}/make`);
  }

  getModels(make: number): Observable<Ddl[]> {
    return this.http.get<Ddl[]>(`${this.apiUrl}/model/${make}`);
  }

  getYears(model: number): Observable<Ddl[]> {
    return this.http.get<Ddl[]>(`${this.apiUrl}/year/${model}`);
  }

  getCategory(model: any): Observable<Ddl[]> {
    return this.http.post<Ddl[]>(`${this.apiUrl}/category`, model);
  }

  getdetail(id: number): Observable<CarDetail> {
    return this.http.get<CarDetail>(environment.BASE_URL + `vehicle/savecardetail/${id}`);
  }

  saveimg(model: any): Observable<any> {
    const token = this.getToken();  // Replace this with your method of retrieving the token        
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(environment.BASE_URL + 'vehicle/saveimg', model, { headers });
  }

  deleteimg(model: any): Observable<any> {
    const token = this.getToken();  // Replace this with your method of retrieving the token        
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(environment.BASE_URL + 'vehicle/deleteimg', model, { headers });
  }

  private getToken(): string {
    return localStorage.getItem('authToken') || "";
  }
}
