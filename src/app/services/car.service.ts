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
  getsubModels(model: number): Observable<Ddl[]> {
    return this.http.get<Ddl[]>(`${this.apiUrl}/Submodels/${model}`);
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

  savecar(model: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(environment.BASE_URL + 'vehicle/sellcar', model, { headers });
  }

  getcar(id: string, search: string): Observable<CarsModel[]> {
    const token = this.getToken();
    var body = { search: search, user_id: id }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<CarsModel[]>(environment.BASE_URL + `vehicle/getcarsbyuserid`, body, { headers });
  }

  getcardetail(id: number, user_id: string | null): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + `vehicle/${id}/${user_id}`);
  }

  getcomments(id: number): Observable<any[]> {
    const token = this.getToken();
    console.log(token);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(environment.BASE_URL + `comments/comment/${id}`, { headers });
  }

  getreply(id: number): Observable<any[]> {
    return this.http.get<any[]>(environment.BASE_URL + `comments/reply/${id}`);
  }

  savereply(data: any): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + `comments`, data);
  }

  transbyuserid(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(environment.BASE_URL + `transaction/transbyuserid`, { headers });
  }

  payment(data: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<any>(environment.BASE_URL + `payment`, data, { headers });
  }

  getplans(): Observable<any[]> {
    return this.http.get<any[]>(environment.BASE_URL + `ddl/plans`);
  }

  getinventory_level(id: string | null): Observable<any[]> {
    return this.http.get<any[]>(environment.BASE_URL + `ddl/inventory_level/` + id);
  }

  getplan(id: number): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + `ddl/plans/` + id);
  }

  getenquiry(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(environment.BASE_URL + `chat/getenq`, { headers });
  }
  countenquiries(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(environment.BASE_URL + `chat/countenquiries`, { headers });
  }
  updateread(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(environment.BASE_URL + `chat/updateread`, { headers });
  }

  getenquirybyid(id: number): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(environment.BASE_URL + `chat/enquiry/` + id, { headers });
  }

  private getToken(): string {
    return localStorage.getItem('authToken') || "";
  }

}
