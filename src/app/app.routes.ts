import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HRComponent } from './hr/hr.component';
import { CEOComponent } from './ceo/ceo.component';
import { authGuard } from './Guards/auth.guard';
import { InterviewerComponent } from './interviewer/interviewer.component';

export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to 'login', base url
    { path: 'login', component: LoginComponent },          // Route for login
    { path: 'hr-dashboard', component: HRComponent, canActivate: [authGuard] }, // Protect HR dashboard
    { path: 'ceo', component: CEOComponent, canActivate: [authGuard] }, // Protect CEO dashboard
    {path:'interviewr', component:InterviewerComponent},
    {path:'ceo/interviewr', component:InterviewerComponent}
    // { path: '**', redirectTo: 'login' } 
    // Catches any undefined routes and redirects users to the login page.
];