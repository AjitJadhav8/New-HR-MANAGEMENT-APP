import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Your backend URL
  // private apiUrl = 'http://3.6.117.163:3000'; // Base URL for your API


  // constructor(private http: HttpClient) {}

  // login(credentials: { name: string; password: string }): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/api/login`, credentials);
  // }

  // saveToken(token: string): void {
  //   localStorage.setItem('authToken', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('authToken');
  // }

  // logout(): void {
  //   localStorage.removeItem('authToken');
  // }




  constructor(private http: HttpClient) {}

  // Login method to authenticate user and get JWT token
  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);  // Save token in localStorage on successful login
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