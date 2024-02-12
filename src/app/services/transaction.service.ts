import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './env';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private baseUrl = environment.BASE_URL + 'transaction/';
    constructor(private http: HttpClient) { }

    getTopUp(userId: number, amount: number): Observable<any> {
        const url = `${this.baseUrl}/top-up`;
        const headers = this.getAuthorizationHeaders();

        return this.http.post(url, { userId, amount }, { headers })
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    purchaseCar(userId: number, carId: number, amount: number): Observable<any> {
        const url = `${this.baseUrl}/purchase`;
        const headers = this.getAuthorizationHeaders();

        return this.http.post(url, { userId, carId, amount }, { headers })
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    getBalance(userId: number): Observable<any> {
        const url = `${this.baseUrl}/balance`;
        const headers = this.getAuthorizationHeaders();

        return this.http.get(url, { headers })
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    private getAuthorizationHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    private handleError(error: Response | any): Observable<any> {
        let errorMessage: string;
        if (error instanceof Response) {
            errorMessage = `Error occurred; status code: ${error.status}, message: ${error.statusText}`;
        } else {
            // Log client-side or network errors
            errorMessage = `An error occurred: ${error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}



// import { ApiService } from './api.service';

// constructor(private apiService: ApiService) {}

// onTopUp(userId: number, amount: number) {
//   this.apiService.getTopUp(userId, amount)
//     .subscribe(response => {
//       console.log('Top-up successful:', response);
//     }, error => {
//       console.error('Top-up failed:', error);
//     });
// }

// onPurchase(userId: number, carId: number, amount: number) {
//   this.apiService.purchaseCar(userId, carId, amount)
//     .subscribe(response => {
//       console.log('Car purchase successful:', response);
//     }, error => {
//       console.error('Car purchase failed:', error);
//     });
// }

// getBalance(userId: number) {
//   this.apiService.getBalance(userId)
//     .subscribe(balance => {
//       console.log('User balance:', balance);
//     }, error => {
//       console.error('Failed to retrieve balance:', error);
//     });
// }