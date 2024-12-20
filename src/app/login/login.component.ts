import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data-service/data.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  name: string = '';
  password: string = '';
  errorMessage: string = '';
  userType: string = 'user'; // Default to 'user'

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    // Clear all items in localStorage when the LoginComponent is loaded
    console.log('Clearing localStorage');
    localStorage.clear();
  }

  // login() {
  //   const loginData = { name: this.name, password: this.password };

  //   // Use the AuthService to make a POST request to the login API
  //   this.authService.login(loginData).subscribe({
  //     next: (response) => {
  //       // console.log('Login successful:', response);
  //       console.log('Login successful');

  //       // Store the JWT token in localStorage
  //       localStorage.setItem('authToken', response.token);

  //       // Store user-specific information in localStorage
  //       localStorage.setItem('loggedInHR', response.user.name); // Save logged-in HR name
  //       localStorage.setItem('loggedInHRId', response.user.id); // Save logged-in HR ID
  //       localStorage.setItem('userPermission', response.user.permission); // Save user permission
  //       // /hr-dashboard
  //       // Redirect based on user permission
  //       // Redirect based on user permission
  //       if (response.user.permission === 'CEO') {
  //         this.router.navigate(['/ceo']); // Redirect to CEO component
  //       } else if (response.user.permission === 'HR' || response.user.permission === 'Admin'  || response.user.permission === 'HrAdmin') {
  //         this.router.navigate(['/hr-dashboard']); // Redirect both HR and Admin to the HR component
  //       }else if (response.user.permission === 'Interviewer') {
  //         this.router.navigate(['/interviewer-dashboard']); // Redirect to interviewer dashboard
  //       }
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Invalid username or password'; // Display error message
  //       console.error('Login failed:', error);
  //     }
  //   });
  // }


  login() {
    const loginData = { name: this.name, password: this.password, userType: this.userType };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful');

        // Store the JWT token in localStorage
        localStorage.setItem('authToken', response.token);

        // Store user-specific information in localStorage
        localStorage.setItem('loggedInHR', response.user.name);
        localStorage.setItem('loggedInHRId', response.user.id);
        localStorage.setItem('userPermission', response.user.permission);

        // Redirect based on user permission
        if (response.user.permission === 'CEO') {
          this.router.navigate(['/ceo']);
        } else if (['HR', 'Admin', 'HrAdmin'].includes(response.user.permission)) {
          this.router.navigate(['/hr-dashboard']);
        } else if (response.user.permission === 'Interviewer') {
          this.router.navigate(['/interviewr']); // Redirect to interviewer dashboard
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed:', error);
      }
    });
  }
}
