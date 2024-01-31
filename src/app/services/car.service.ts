import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './env';
import { CarDetail, CarModel, Ddl } from './Users';
import { CarsModel } from '../component/table/table-data';

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
    const token = this.getToken();       
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(environment.BASE_URL + 'vehicle/saveimg', model, { headers });
  }

  deleteimg(model: any): Observable<any> {
    const token = this.getToken();       
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(environment.BASE_URL + 'vehicle/deleteimg', model, { headers });
  }

  savecar(model: any): Observable<any> {``
    const token = this.getToken();       
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(environment.BASE_URL + 'vehicle/sellcar', model, { headers });
  }

  getcar(id: number): Observable<CarsModel[]> {
    const token = this.getToken();       
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<CarsModel[]>(environment.BASE_URL + `vehicle/getcarsbyuserid/${id}`, { headers });
  }

  private getToken(): string {
    return localStorage.getItem('authToken') || "";
  }
}
