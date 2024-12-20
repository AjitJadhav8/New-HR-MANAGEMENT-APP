import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // Use apiUrl from environment

  constructor(private http: HttpClient) {}

  // Login method to authenticate user and get JWT token
  // login(credentials: { name: string; password: string }): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/api/login`, credentials).pipe(
  //     tap((response: any) => {
  //       if (response.token) {
  //         this.saveToken(response.token);  // Save token in localStorage on successful login
  //       }
  //     })
  //   );
  // }

  // AuthService (updated)
login(credentials: { name: string; password: string; userType: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/api/login`, credentials).pipe(
    tap((response: any) => {
      if (response.token) {
        this.saveToken(response.token); // Save token in localStorage on successful login
      }
    })
  );
}


  // Save JWT token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Get JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Logout method to remove the token
  logout(): void {
    localStorage.removeItem('authToken');
  }



}