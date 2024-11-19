import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Use AuthService
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  login() {
    const loginData = { name: this.name, password: this.password };

    // Use the AuthService to make a POST request to the login API
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Store the JWT token in localStorage
        localStorage.setItem('authToken', response.token);

        // Store user-specific information in localStorage
        localStorage.setItem('loggedInHR', response.user.name); // Save logged-in HR name
        localStorage.setItem('loggedInHRId', response.user.id); // Save logged-in HR ID
        localStorage.setItem('userPermission', response.user.permission); // Save user permission
        // /hr-dashboard
        // Redirect based on user permission
        // Redirect based on user permission
        if (response.user.permission === 'CEO') {
          this.router.navigate(['/ceo']); // Redirect to CEO component
        } else if (response.user.permission === 'HR' || response.user.permission === 'Admin') {
          this.router.navigate(['/hr-dashboard']); // Redirect both HR and Admin to the HR component
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password'; // Display error message
        console.error('Login failed:', error);
      }
    });
  }
}
