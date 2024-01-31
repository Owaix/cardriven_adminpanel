// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './Users';
import { environment } from './env';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }
    register(user: User): Observable<any> {
        return this.http.post(environment.BASE_URL + 'users/Registerdealer', user);
    }

    login(user: User): Observable<any> {
        return this.http.post(environment.BASE_URL + 'users/Logindealer', user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    get_profile(): Observable<any> {
        const token = this.getToken();  // Replace this with your method of retrieving the token        
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get(environment.BASE_URL + 'users/me', { headers });
    }

    update_profile(user: User): Observable<any> {
        const token = this.getToken();  // Replace this with your method of retrieving the token        
        user.token = token;
        return this.http.put(environment.BASE_URL + 'users/update_profile', user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    get_states() {
        let territory = [
            {
                "name": "Australian capital territory",
                "abbreviation": "act",
                "capital": "canberra",
                "type": "territory"
            },
            {
                "name": "New south wales",
                "abbreviation": "nsw",
                "capital": "sydney",
                "type": "state"
            },
            {
                "name": "Northern territory",
                "abbreviation": "nt",
                "capital": "darwin",
                "type": "territory"
            },
            {
                "name": "Queensland",
                "abbreviation": "qld",
                "capital": "brisbane",
                "type": "state"
            },
            {
                "name": "South australia",
                "abbreviation": "sa",
                "capital": "adelaide",
                "type": "state"
            },
            {
                "name": "Tasmania",
                "abbreviation": "tas",
                "capital": "hobart",
                "type": "state"
            },
            {
                "name": "Victoria",
                "abbreviation": "vic",
                "capital": "melbourne",
                "type": "state"
            },
            {
                "name": "Western australia",
                "abbreviation": "wa",
                "capital": "perth",
                "type": "state"
            }
        ]
        return territory;
    }

    private getToken(): string {
        return localStorage.getItem('authToken') || "";
    }
}