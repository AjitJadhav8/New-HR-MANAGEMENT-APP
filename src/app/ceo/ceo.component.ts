import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-ceo',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './ceo.component.html',
  styleUrl: './ceo.component.css'
})
export class CEOComponent implements OnInit {
  candidates: any[] = [];
  selectedCandidate: any = null;
  loggedInHR: string = '';


  constructor(private http: HttpClient, private router: Router,private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllCandidates();
    this.getAllUsers();
    this.getAllRoles();
    this.getAllCandidates();
  }



  showDetailView = false; // Flag to control the visibility of the second table

  // Method to toggle the visibility of the second table
  toggleDetailView() {
    this.showDetailView = !this.showDetailView; // Toggle the value of showDetailView
  }


  getAllCandidates() {
    this.dataService.getAllCandidates().subscribe(
      data => {
        // Filter for distinct candidates using the Candidate_ID to avoid duplicates
        this.candidates = this.getDistinctCandidates(data);
        this.totalCandidates = this.candidates.length; // Update total candidates count

        // console.log('Filtered candidates:', this.candidates);
      },
      error => {
        console.error('Error fetching candidates:', error);
      }
    );
  }

  getDistinctCandidates(data: any[]) {
    const distinctCandidates = new Map();
    data.forEach(candidate => {
      if (!distinctCandidates.has(candidate.Candidate_ID)) {
        distinctCandidates.set(candidate.Candidate_ID, candidate);
      }
    });
    return Array.from(distinctCandidates.values());
  }


  closeModal() {
    this.selectedCandidate = null;
  }
  openModal(candidate: any) {
    this.dataService.getCandidateDetails(candidate.Candidate_ID).subscribe(
      data => {
        this.selectedCandidate = this.formatCandidateDetails(data);
      },
      error => {
        console.error('Error fetching candidate details:', error);
      }
    );
  }


  formatCandidateDetails(data: any) {
    if (data.interviewRounds) {
      data.interviewRounds.forEach((round: { Interview_Date: string; }) => {
        round.Interview_Date = this.formatDate(round.Interview_Date);
      });
    }
    return data;
  }


  

  // formatDate(dateString: string): string {
  //   if (!dateString) {
  //     return '';  // Or another fallback value if the date is missing
  //   }
    
  //   const date = new Date(dateString);
    
  //   if (isNaN(date.getTime())) {
  //     return 'Invalid Date';  // Or another fallback value for invalid date
  //   }
    
  //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
  //   return date.toLocaleDateString('en-GB', options); // 'en-GB' gives dd-mm-yyyy format
  // }
  formatDate(dateString: string): string {
    if (!dateString) {
      return ''; // Or another fallback value if the date is missing
    }
  
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; // Or another fallback value for invalid date
    }
  
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with 0 if needed
    const month = date.toLocaleString('en-US', { month: 'short' }); // Get short month name (e.g., "Nov")
    const year = date.getFullYear(); // Get full year
  
    return `${day}-${month}-${year}`;
  }
  
  

  logout(){
    localStorage.removeItem('loggedInHR');
    localStorage.removeItem('loggedInHRId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPermission');
    console.log('Logged out successfully.'); 
    // Navigate to login page
    this.router.navigate(['/login']); // Redirect to HR dashboard for other users
  }

  
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showChangePasswordForm: boolean = false;


  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    const loggedInHRId = localStorage.getItem('loggedInHRId');
    if (!loggedInHRId) {
      alert("User ID is not valid.");
      return;
    }

    const changePasswordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.dataService.changePassword(loggedInHRId, changePasswordData).subscribe(
      (response) => {
        alert("Password changed successfully!");
        this.showChangePasswordForm = false;
        this.resetChangePasswordForm();
      },
      (error) => {
        console.error('Error changing password:', error);
        alert("Failed to change password: " + (error.error?.message || "Unknown error"));
      }
    );
  }

  resetChangePasswordForm() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  
  currentPage: number = 1;
  pageSize: number = 30;  // Number of candidates per page
  totalCandidates: number = 0;

 // Pagination Logic
 get paginatedCandidates() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = this.currentPage * this.pageSize;
  return this.candidates.slice(startIndex, endIndex);
}

// Function to go to the next page
nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

// Function to go to the previous page
previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

// Function to go to a specific page
goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

// Calculate the total number of pages
get totalPages() {
  return Math.ceil(this.totalCandidates / this.pageSize);
}

users: any[] = [];
roles: any[] = [];
selectedUserId: number | null = null;
selectedRoleId: number | null = null;
newUser: any = {
  user_name: '',
  password: '',
  role_id: null,
};



// Fetch all users
getAllUsers() {
  this.dataService.getAllUsers().subscribe(
    (data) => {
      this.users = data;
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}

// Fetch all roles
getAllRoles() {
  this.dataService.getAllRoles().subscribe(
    (data) => {
      this.roles = data;
    },
    (error) => {
      console.error('Error fetching roles:', error);
    }
  );
}

// Update user role
updateUserRole() {
  if (!this.selectedUserId || !this.selectedRoleId) {
    this.showAlert('Please select a user and role.', 'error');
    return;
  }

  this.dataService.updateUserRole(this.selectedUserId, this.selectedRoleId).subscribe(
    (response) => {
      this.showAlert('User role updated successfully.', 'success');

      this.getAllUsers(); // Refresh user data
    },
    (error) => {
      console.error('Error updating user role:', error);
      this.showAlert('Failed to update user role.', 'error');

    }
  );
}

// Add a new user
addUser() {
  if (!this.newUser.user_name || !this.newUser.password || !this.newUser.role_id) {
    // this.alertMessage = 'Please fill all the fields.';
    // this.alertType = 'error';
    // return;
    this.showAlert('Please fill all the fields.', 'error');
    return;
  }

  this.dataService.addUser(this.newUser).subscribe(
    (response) => {
      this.showAlert('New user added successfully.', 'success');

      // this.alertMessage = 'New user added successfully.';
      // this.alertType = 'success';
      this.newUser = { user_name: '', password: '', role_id: null }; // Reset form
      this.getAllUsers(); // Refresh user data
    },
    (error) => {
      console.error('Error adding user:', error);
      // this.alertMessage = 'Failed to add user.';
      // this.alertType = 'error';
      this.showAlert('Failed to add user.', 'error');

    }
  );
}



deleteUser(userId: number): void {
  if (confirm('Are you sure you want to delete this user?')) {
    this.dataService.deleteUser(userId).subscribe(
      (response) => {
        this.showAlert('User deleted successfully.', 'success');

        this.getAllUsers(); // Refresh user data
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.showAlert('Failed to delete user.', 'error');

      }
    );
  }
}
currentSection: string | null = null; // Track current visible section

showUserManagement = false; // Controls visibility of User Management section

toggleUserManagementSection(section: string): void {
  this.currentSection = this.currentSection === section ? null : section;
}

alertMessage: string = '';
alertType: string = '';
  // Method to show alert
  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      this.alertMessage = '';  // Clear the alert message
    }, 3000);  // 3000ms = 3 seconds
  }
  closeUserManagement() {
    this.showUserManagement = false;
  }
  
  
}