import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css'
})
export class HRComponent implements OnInit {

  loggedInHR: string = '';
  loggedInHRId: string | null = '';
  candidates: any[] = [];
  selectedCandidate: any = null;


  showAddRound: boolean = false;  // New property to control Add Round section visibility
  showUpdateCandidate: boolean = false;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) { }
  todayDate: string = ''; // Declare todayDate as a string

  isHR: boolean = false;
  isAdmin: boolean = false; // New property to check if the user is Admin

  ngOnInit(): void {
    // Fetch the logged-in HR details and permission from localStorage
    this.loggedInHR = localStorage.getItem('loggedInHR') || '';
    this.loggedInHRId = localStorage.getItem('loggedInHRId');
  
    // Check the user role stored in localStorage and set appropriate flags for Admin and HR roles
    const userPermission = localStorage.getItem('userPermission');
    
    // If the user is 'HrAdmin', give them both Admin and HR privileges
    if (userPermission === 'HrAdmin') {
      this.isAdmin = true;
      this.isHR = true;
    } else if (userPermission === 'Admin') {
      this.isAdmin = true;
      this.isHR = false;
    } else if (userPermission === 'HR') {
      this.isAdmin = false;
      this.isHR = true;
    } else {
      this.isAdmin = false;
      this.isHR = false;
    }
  
    // Log the role details for debugging
    console.log('Is Admin:', this.isAdmin);
    console.log('Is HR:', this.isHR);
    console.log('Logged in HR:', this.loggedInHR);
    console.log('Logged in HR ID:', this.loggedInHRId);
  
    // Fetch data if the logged-in HR exists
    if (this.loggedInHRId) {
      // Fetch candidates if the HR is logged in
      this.getCandidates();
      
      // Fetch admin data if the user has Admin rights
      if (this.isAdmin) {
        this.fetchAdminData();
      }
    } else {
      console.error('No HR is logged in!');
    }
  
    // Fetch interview options for dropdowns (positions, statuses, interviewers)
    this.dataService.getInterviewOptions().subscribe((data) => {
      this.interviewOptions = data;
      console.log('Interview Options:', this.interviewOptions);
    });
  
    // Set today's date in the required format
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }
  


  isAdminPanelVisible: boolean = false;  // Panel is hidden initially
  toggleAdminPanel() {
    this.isAdminPanelVisible = !this.isAdminPanelVisible;
  }


  closeAdminPanel(){
    this.isAdminPanelVisible = false;

  }


  getCandidates() {
    console.log('Fetching candidates for HR ID:', this.loggedInHRId);

    this.dataService.getCandidates(this.loggedInHRId)
      .subscribe(
        (data) => {
          // Process candidates data to format the Interview_Date field
          this.candidates = data.map(candidate => ({
            ...candidate,
            Interview_Date: candidate.interviewRounds.length > 0
              ? (candidate.interviewRounds[0].Interview_Date ? this.formatLocalDate(candidate.interviewRounds[0].Interview_Date) : 'N/A')
              : 'N/A',
            Round_Number: candidate.interviewRounds.length > 0
              ? candidate.interviewRounds[0].Round_Number
              : 'N/A',
            Interviewer: candidate.interviewRounds.length > 0
              ? candidate.interviewRounds[0].Interviewer
              : 'N/A',
            Status: candidate.interviewRounds.length > 0
              ? candidate.interviewRounds[0].Status
              : 'N/A',
            Remarks: candidate.interviewRounds.length > 0
              ? candidate.interviewRounds[0].Remarks
              : 'N/A'
          }));
          this.totalCandidates = this.candidates.length;  // Total number of candidates for pagination
          this.updatePageCandidates();
          console.log('Fetched candidates:', this.candidates);
        },
        (error) => {
          console.error('There was an error fetching the candidates!', error.message || error);
        }
      );
  }




  getInterviewOptions() {
    this.dataService.getInterviewOptions().subscribe((data) => {
      this.interviewOptions = data;
      console.log('Interview Options:', this.interviewOptions);
    });
  }

  showActionModal: boolean = false;  // Add this line to declare the flag
  selectCandidate(candidate: any) {
    this.selectedCandidate = candidate;
    // Reset the visibility flags
    this.showAddRound = false;
    this.showUpdateCandidate = false;
    this.showActionModal = true; // Show the modal when a candidate is selected

  }


  // Method to get the last interview round for the selected candidate
  getLastRoundData(candidateId: number) {
    this.dataService.getInterviewRounds(candidateId).subscribe(
      (history) => {
        if (history.length > 0) {
          const lastRound = history[history.length - 1]; // Last round data
          this.newRound.interviewer = lastRound.Interviewer;  // Prefill the interviewer
          this.newRound.status = lastRound.Status;            // Prefill the status
          this.newRound.remarks = lastRound.Remarks;          // Prefill the remarks
          this.newRound.round_number = lastRound.Round_Number; // Prefill round number

        } else {
          this.newRound.round_number = '1';  // If no previous rounds, set to '1'
        }
      },
      (error) => {
        console.error('Error fetching last round data:', error);
      }
    );
  }




  // Separate new entry objects for each section
  newPositionEntry = { name: '' };
  newStatusEntry = { name: '' };
  newInterviewerEntry = { name: '' };
  currentSection: string = '';

  showUpdateCandidateSection() {
    this.showUpdateCandidate = true;
    this.showAddRound = false; // Hide add round section
  }


  formatLocalDate(dateString: string): string {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Get the timezone offset in milliseconds
    return new Date(date.getTime() - userTimezoneOffset).toISOString().split('T')[0];
  }


  newCandidate: { name: string, position: string | undefined, customPosition?: string } = { name: '', position: '', customPosition: '' };

  isCustomRound: boolean = false;  // Declare the flag for custom round

  addNewCandidate() {
    if (!this.newCandidate.name?.trim()) {
      this.showAlert('Candidate name is required.', 'error');
      return;
    }

    if (!this.newCandidate.position?.trim()) {
      this.showAlert('Position is required.', 'error');
      return;
    }

    if (!this.newRound.round_number?.trim() && !this.newRound.customRoundNumber?.trim()) {
      this.showAlert('Round number or Custom Round Number is required.', 'error');
      return;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const interviewDate = new Date(this.newRound.interview_date).setHours(0, 0, 0, 0);
    if (isNaN(interviewDate) || interviewDate < today) {
      this.showAlert('Please select a valid future interview date.', 'error');
      return;
    }

    if (!this.newRound.status?.trim()) {
      this.showAlert('Status is required.', 'error');
      return;
    }

    // If round is 'Custom', assign customRoundNumber to round_number
    this.newRound.round_number = this.isCustomRound ? this.newRound.customRoundNumber || '' : this.newRound.round_number;

    // Prepare candidate data
    const candidateData = {
      name: this.newCandidate.name,
      position: this.newCandidate.position || '',
      u_id: this.loggedInHRId
    };

    // Prepare round data
    const roundData = {
      round_number: this.newRound.round_number === 'Custom' ? this.newRound.customRoundNumber : this.newRound.round_number,
      interviewer: this.newRound.interviewer || '',
      interview_date: this.formatLocalDate(this.newRound.interview_date),
      status: this.newRound.status || '',
      remarks: this.newRound.remarks
    };

    // Call the service to add both candidate and round
    this.dataService.addNewCandidateWithRound(candidateData, roundData).subscribe(
      response => {
        this.getCandidates(); // Refresh candidate list
        this.getInterviewOptions(); // Refetch interview options
        this.newCandidate = { name: '', position: '' }; // Reset form
        this.newRound = { round_number: '', interviewer: '', interview_date: '', status: '', remarks: '', customRoundNumber: '' }; // Reset round form
        this.isCustomRound = false; // Reset custom round flag

        // Show success alert
        this.showAlert('Candidate and Interview Round added successfully!', 'success');
        setTimeout(() => {
          this.isModalOpen = false; // Close the modal
        }, 2000);
      },
      error => {
        console.error('Error adding candidate with round:', error);
        this.showAlert('Failed to add candidate and round. Please fill all the fields.', 'error');
      }
    );
  }


  newRound: {
    round_number: string;
    customRoundNumber?: string;  // Optional custom round number
    interviewer: string;
    customInterviewer?: string;  // Optional custom interviewer
    interview_date: string;
    status: string;
    customStatus?: string;       // Optional custom status
    remarks: string;
  } = {
      round_number: '',
      customRoundNumber: '',  // Default to empty string
      interviewer: '',
      customInterviewer: '',  // Default to empty string
      interview_date: '',
      status: '',
      customStatus: '',       // Default to empty string
      remarks: ''
    };


  addNewRound() {

    // Check if round number is selected
    if (!this.newRound.round_number?.trim() && !this.newRound.customRoundNumber?.trim()) {
      this.showAlert('Round number or Custom Round Number is required.', 'error');
      return;
    }

    // Check if interviewer name is selected
    if (!this.newRound.interviewer) {
      this.showAlert('Please select an interviewer name.', 'alert-danger');
      return; // Prevent form submission if interviewer name is not selected
    }

    // Check if status is selected
    if (!this.newRound.status) {
      this.showAlert('Please select a status.', 'alert-danger');
      return; // Prevent form submission if status is not selected
    }

    // Check if interview date is selected
    if (!this.newRound.interview_date) {
      this.showAlert('Please select an interview date.', 'alert-danger');
      return; // Prevent form submission if date is not selected
    }

    // Prepare final values for each field, using custom round number if selected
    const roundData = {
      round_number: this.newRound.round_number === 'Custom' ? this.newRound.customRoundNumber : this.newRound.round_number,
      interviewer: this.newRound.interviewer,
      interview_date: this.formatLocalDate(this.newRound.interview_date), // Adjust date formatting as needed
      status: this.newRound.status,
      remarks: this.newRound.remarks,
      c_id: this.selectedCandidate.Candidate_ID // Candidate ID
    };

    // Send data to backend
    this.dataService.addNewRound(this.selectedCandidate.Candidate_ID, roundData)
      .subscribe(
        () => {
          this.showAlert('Interview round added successfully!', 'alert-success'); // Success alert
          this.getCandidates(); // Refresh candidate list
          this.getInterviewOptions(); // Refetch interview options for dropdowns

          // Reset form
          this.newRound = { round_number: '', interviewer: '', interview_date: '', status: '', remarks: '', customRoundNumber: '' };

          // Close modal after success
          setTimeout(() => {
            this.showAddRoundModal = false;
          }, 2000);
        },
        error => {
          console.error('Error adding round:', error);
          this.showAlert('Please fill all the fields, including the date.', 'alert-danger'); // Error alert
        }
      );
  }


  deleteInterviewRound(candidateId: number, roundNumber: string, candidateName: string) {
    const confirmDelete = confirm(`Are you sure you want to delete interview round ${roundNumber} for ${candidateName}?`);

    if (confirmDelete) {
      const encodedRoundNumber = encodeURIComponent(roundNumber); // Ensure round_number is URL-safe

      this.dataService.deleteInterviewRound(candidateId, encodedRoundNumber)
        .subscribe(
          (response) => {
            console.log('Interview round deleted:', response);
            this.showAlert(`Interview round ${roundNumber} for ${candidateName} deleted successfully.`, 'alert-success'); // Success alert
            this.getCandidates(); // Refresh candidate list after deletion
            this.getInterviewOptions(); // Refresh interview options after deleting a round

          },
          (error) => {
            console.error('There was an error deleting the interview round!', error);
            this.showAlert('Error deleting interview round. Please try again.', 'alert-danger'); // Error alert
          }
        );
    } else {
      console.log('Delete operation was canceled.');
    }
  }


  showAddRoundSection(candidate: any) {
    this.selectedCandidate = candidate; // Set the selected candidate for the add round form
    this.newRound = {
      round_number: '', // Allow user to input the round number manually
      interviewer: '',
      interview_date: '',
      status: '',
      remarks: ''
    };
    this.getCandidateHistory(candidate.Candidate_ID);
    this.getLastRoundData(candidate.Candidate_ID);

    this.showAddRound = true;
    this.toggleAddRoundModal(); // Open the modal

  }

  selectedStatus: string = '';
  isCustomStatus: boolean = false;  // Toggle for custom status input
  selectedPosition: string = '';
  isCustomPosition: boolean = false;  // Toggle for custom position input

  updateCandidate() {
    if (this.selectedCandidate) {
      // If position is 'Custom', assign customPosition to position
      if (this.isCustomPosition) {
        this.selectedCandidate.Position = this.selectedCandidate.customPosition || ''; // Ensure position is a string
      }

      const updatedCandidate = {
        name: this.selectedCandidate.Candidate_Name,
        position: this.selectedCandidate.Position || '', // Provide an empty string if position is undefined
      };

      this.dataService.updateCandidate(this.selectedCandidate.Candidate_ID, updatedCandidate)
        .subscribe(
          (response) => {
            console.log('Candidate updated:', response);
            this.showAlert('Candidate updated successfully!', 'alert-success'); // Success alert

            this.getCandidates(); // Refresh the candidate list after updating
          },
          (error) => {
            console.error('Error updating candidate:', error);
            this.showAlert('Error updating candidate. Please try again.', 'alert-danger'); // Error alert

          }
        );
    } else {
      console.error('No candidate selected for update.');
      this.showAlert('No candidate selected for update.', 'alert-warning'); // Warning alert if no candidate is selected

    }
  }



  showHistory: boolean = false; // Control the visibility of the history section
  candidateHistory: any[] = []; // Holds the interview rounds history for the selected candidate

  showHistorySection() {
    console.log("Showing history section for candidate:", this.selectedCandidate);
    this.showHistory = true;
    this.getCandidateHistory(this.selectedCandidate.Candidate_ID);
  }

  lastInterviewDate: string = ''; // Store the last interview date for the selected candidate


  // Fetches all interview rounds for a selected candidate
  getCandidateHistory(candidateId: number) {
    console.log("Fetching history for candidate ID:", candidateId);
    this.dataService.getInterviewRounds(candidateId).subscribe(
      (history) => {
        console.log("Interview history fetched:", history);
        this.candidateHistory = history.map(round => ({
          ...round,
          Interview_Date: round.Interview_Date ? this.formatLocalDate(round.Interview_Date) : 'N/A'
        }));

        // Get the latest interview date from history and store it
        const lastRound = this.candidateHistory[this.candidateHistory.length - 1];
        if (lastRound && lastRound.Interview_Date !== 'N/A') {
          this.lastInterviewDate = lastRound.Interview_Date; // Set the last interview date
        }

        console.log("Formatted candidate history:", this.candidateHistory);
      },
      (error) => {
        console.error("Error fetching interview history:", error);
      }
    );
  }


  // In hr.component.ts
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showChangePasswordForm: boolean = false;



  adminData: {
    positions: { position_id: number, position_name: string }[],
    statuses: { status_id: number, status_name: string }[],
    interviewers: { interviewer_id: number, interviewer_name: string }[]
  } = { positions: [], statuses: [], interviewers: [] };


  newAdminEntry: { type: string; name: string } = { type: '', name: '' };
  selectedAdminEntry: { type: string; id: number | null } = { type: '', id: null };
  onPositionSelect() {
    this.selectedAdminEntry.type = 'position';
  }

  onStatusSelect() {
    this.selectedAdminEntry.type = 'status';
  }

  onInterviewerSelect() {
    this.selectedAdminEntry.type = 'interviewer';
  }

  fetchAdminData() {
    this.dataService.getAdminData().subscribe(
      (data) => {
        this.adminData = data;
        console.log('Fetched admin data:', this.adminData);
      },
      (error) => {
        console.error('Error fetching admin data:', error);
      }
    );
  }


  addAdminEntry(type: string) {
    let name: string = ''; // Initialize the variable to an empty string
    let newEntry: any;

    // Choose the right entry object based on the type
    if (type === 'position') {
      newEntry = this.newPositionEntry;
      name = newEntry.name; // Assign the name value for position
    } else if (type === 'status') {
      newEntry = this.newStatusEntry;
      name = newEntry.name; // Assign the name value for status
    } else if (type === 'interviewer') {
      newEntry = this.newInterviewerEntry;
      name = newEntry.name; // Assign the name value for interviewer
    }

    // Ensure that the name is not empty before proceeding
    if (!name.trim()) {
      this.showAlert('Please provide a name.', 'alert-danger');
      return;
    }

    // Now call the service to add the new entry
    this.dataService.addAdminEntry(type, name).subscribe(
      (response: any) => {
        this.showAlert('Entry added successfully!', 'alert-success');
        newEntry.name = ''; // Reset the name field for the section
        this.fetchAdminData(); // Refresh data
      },
      (error: any) => {
        console.error('Error adding entry:', error);
        this.showAlert('Error adding entry. Please try again.', 'alert-danger');
      }
    );
  }


  deleteAdminEntry(type: string, id: number | string) {
    // Convert string to number if necessary
    const idToDelete = typeof id === 'string' ? parseInt(id, 10) : id;

    // Validate the id to ensure it's a number
    if (isNaN(idToDelete)) {
      console.error('Invalid ID:', id);
      return;
    }

    // Show a confirmation dialog before deleting
    const confirmation = confirm('Are you sure you want to delete this entry?');
    if (confirmation) {
      // Call the service to delete the entry
      this.dataService.deleteAdminEntry(type, idToDelete).subscribe(
        (response: any) => {
          this.showAlert('Entry deleted successfully!', 'alert-success');
          this.fetchAdminData(); // Refresh the data after deletion
        },
        (error: any) => {
          console.error('Error deleting entry:', error);
          this.showAlert('Error deleting entry. Please try again.', 'alert-danger');
        }
      );
    }
  }



  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Ensure loggedInHRId is a string
    if (!this.loggedInHRId) {
      alert("User ID is not valid.");
      return;
    }

    // Create changePasswordData without userId
    const changePasswordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    // Call the dataService with both userId and changePasswordData
    this.dataService.changePassword(this.loggedInHRId as string, changePasswordData).subscribe(
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


  interviewOptions: any = {
    positions: [],
    roundNumbers: [],
    interviewers: [],
    remarks: [],
    statuses: [],
  };


  logout() {
    localStorage.removeItem('loggedInHR');
    localStorage.removeItem('loggedInHRId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPermission');
    console.log('Logged out successfully.');
    // Navigate to login page
    this.router.navigate(['/login']); // Redirect to HR dashboard for other users
  }


  resetForm() {
    this.newRound = {
      round_number: '',
      interviewer: '',
      interview_date: '',
      status: '',
      remarks: ''
    };
    this.selectedCandidate = null;
  }

  resetChangePasswordForm() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }




  currentPage: number = 1;
  pageSize: number = 30;  // Number of candidates per page
  totalCandidates: number = 0;

  get paginatedCandidates() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.candidates.slice(startIndex, endIndex);
  }

  // Function to go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageCandidates();
    }
  }

  // Function to go to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageCandidates();
    }
  }

  // Function to go to a specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageCandidates();
    }
  }

  // Calculate the total number of pages
  get totalPages() {
    return Math.ceil(this.totalCandidates / this.pageSize);
  }

  // Update the displayed candidates for the current page
  updatePageCandidates() {
    this.paginatedCandidates;
  }


  // Modals

  // Toggle the section based on the button clicked
  toggleSection(section: string) {
    this.currentSection = section;
  }


  toggleAddRoundModal() {
    this.showAddRoundModal = !this.showAddRoundModal; // Toggle modal visibility
  }
  showAddRoundModal = false;  // Initialize as false to hide the modal initially


  closeActionModal() {
    this.showActionModal = false;
  }


  openUpdateCandidateModal() {
    this.showUpdateCandidate = true;
  }

  // Close Update Candidate Modal
  closeUpdateCandidateModal() {
    this.showUpdateCandidate = false;
  }
  openHistoryModal() {
    this.showHistory = true;
  }

  // Close History Modal
  closeHistoryModal() {
    this.showHistory = false;
  }

  // Variables for alert message and type
  alertMessage: string | null = null;
  alertType: string = 'alert-success'; // or any other class for styling

  // Function to show alert
  showAlert(message: string, type: string = 'alert-success') {
    this.alertMessage = message;
    this.alertType = type;

    // Hide alert after 3 seconds
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }

  isModalOpen: boolean = false; // Modal open state

  // This function will be called when the button is clicked to open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // This function will be called to close the modal
  closeModal() {
    this.isModalOpen = false;
  }




  //  getUserRole(){
  //   role=1;

  //  }

  selectCandidateForNextRound(candidate: any) {
    const newRoundData = {
      round_number: candidate.Round_Number || 1, // Keep the current round number or set to 1 if undefined
      interviewer: candidate.Interviewer || '', // Retain the interviewer
      interview_date: this.todayDate, // Set the current date
      status: 'Selected', // Use 'Selected' status
      remarks: 'Promoted to next round', // Default remark
      c_id: candidate.Candidate_ID, // Candidate ID
    };

    this.dataService.addNewRound(candidate.Candidate_ID, newRoundData).subscribe(
      () => {
        this.showAlert(`Candidate ${candidate.Candidate_Name} has been promoted to the next round.`, 'alert-success');
        this.getCandidates(); // Refresh the candidate list
      },
      (error) => {
        console.error('Error promoting candidate:', error);
        this.showAlert('Failed to promote the candidate. Please try again.', 'alert-danger');
      }
    );
  }


  rejectCandidate(candidate: any) {
    const rejectedRoundData = {
      round_number: candidate.Round_Number || 1, // Keep the current round number or set to 1 if undefined
      interviewer: candidate.Interviewer || '', // Retain the interviewer
      interview_date: this.todayDate, // Set the current date
      status: 'Rejected', // Use 'Rejected' status
      remarks: 'Candidate rejected', // Default remark
      c_id: candidate.Candidate_ID, // Candidate ID
    };

    this.dataService.addNewRound(candidate.Candidate_ID, rejectedRoundData).subscribe(
      () => {
        this.showAlert(`Candidate ${candidate.Candidate_Name} has been rejected.`, 'alert-success');
        this.getCandidates(); // Refresh the candidate list
      },
      (error) => {
        console.error('Error rejecting candidate:', error);
        this.showAlert('Failed to reject the candidate. Please try again.', 'alert-danger');
      }
    );
  }




}