import { Component } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interviewer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './interviewer.component.html',
  styleUrl: './interviewer.component.css'
})
export class InterviewerComponent {

  showDetail = false; // Initially set to false (hidden)

  // Function to toggle candidate details visibility
  toggleCandidateDetails() {
    this.showDetail = !this.showDetail; // Toggle between true/false
  }

  closeCandidateDetails() {
    this.selectedCandidateId = ""; // Reset selected candidate
  }
  



  loggedInInterviewer: string = '';
  showChangePasswordForm: boolean = false;
  templates: any[] = [];

  interviewDuration: string = ''; // Store the duration of the interview
interviewMode: string = ''; // Store the selected mode of the interview
interviewDecision: any;
  selectedRoundId: any;

  constructor(private dataService: DataService, private router: Router,) {}
  ngOnInit() {
    this.loggedInInterviewer = localStorage.getItem('loggedInHR') || 'Interviewer';

    this.loggedInInterviewer = localStorage.getItem('loggedInHR') || 'Interviewer';
    this.interviewerId = localStorage.getItem('loggedInHRId') || ''; // Get interviewer ID
    this.getCandidatesForInterviewer(); // Fetch candidates
    this.getTemplates(); // Fetch templates
    this.pointsDropdown = this.generatePointsDropdown(1, 5, 0.5);
    this.getAllCandidatesForInterviewer(); // Fetch candidate
    this.getSubmittedFeedback();

  
  }


  filteredCandidatesAll: any[] = [];
  paginatedCandidatesAll: any[] = [];
  totalCandidatesAll: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  candidatesAll: any[] = []; // Store all candidates


  getAllCandidatesForInterviewer() {
    this.dataService.getAllCandidatesForInterviewer(this.interviewerId).subscribe(
      (data) => {
        this.candidatesAll = data.map(candidate => ({
          ...candidate,
          Interview_Date: candidate.Interview_Date
            ? this.formatDate(candidate.Interview_Date)
            : 'N/A',
          Updated_At: candidate.Updated_At
            ? this.formatDate(candidate.Updated_At)
            : 'N/A',
          Status: candidate.Status || 'N/A',
          Remarks: candidate.Remarks,
          HR_Name: candidate.HR_Name || 'N/A'  // HR Name is added here

        }));
        this.filteredCandidatesAll = [...this.candidatesAll]; // Initially show all candidates
        this.totalCandidatesAll = this.filteredCandidatesAll.length;
        this.updatePageCandidatesAll();
      },
      (error) => {
        console.error('There was an error fetching the candidates!', error.message || error);
      }
    );
  }

  updatePageCandidatesAll() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCandidatesAll = this.filteredCandidatesAll.slice(startIndex, endIndex);
  }



  expandedCandidates: Set<string> = new Set(); // To track candidates whose rounds are shown












  
  pointsDropdown: number[] = []; // Define the pointsDropdown property

  generatePointsDropdown(start: number, end: number, step: number): number[] {
    const dropdownValues = [];
    for (let value = start; value <= end; value += step) {
      dropdownValues.push(value);
    }
    return dropdownValues;
  }

  interviewerId: string = '';
  candidates: any[] = []; // Store the list of candidates
  selectedCandidateId: string = ''; 
  // Fetch candidates from trans_interview_rounds for the logged-in interviewer
  getCandidatesForInterviewer() {
    this.dataService.getCandidatesByInterviewerId(this.interviewerId).subscribe({
      next: (data) => {
        this.candidates = data;
        console.log('Candidates for this interviewer:', this.candidates);
      },
      error: (err) => {
        console.error('Failed to fetch candidates:', err);
      }
    });
  }

  selectedCandidateName: string = ''; // Store the selected candidate's name

  selectedInterviewDate: any = null;  // Store selected interview date as null initially


  
  onCandidateSelect(candidateId: string) {
    console.log('Selected Candidate ID:', candidateId); // Log the ID
    const selectedCandidate = this.candidates.find(candidate => candidate.candidate_id === parseInt(candidateId));

    if (selectedCandidate) {
      this.selectedCandidateId = selectedCandidate.candidate_id;
      this.selectedCandidateName = selectedCandidate.candidate_name;
      this.selectedRoundId = selectedCandidate.round_id;
      this.selectedInterviewDate = this.formatDate(selectedCandidate.interview_date);
      
      console.log('Selected Candidate:', selectedCandidate);
      console.log('Formatted Interview Date:', this.selectedInterviewDate);
    } else {
      console.error('Candidate not found');
    }
  }

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

    

  // Fetch templates from the backend
  getTemplates() {
    this.dataService.getTemplates().subscribe({
      next: (data) => {
        this.templates = data.map((item: any) => ({
          template_id: item.template_id,
          sections: item.template_json?.sections?.map((section: any) => ({
            section_name: section.section_name,
            comments: section.comments,
            evaluation: section.evaluation,  // Bind evaluation field
            criteria: section.criteria?.map((criteriaItem: any) => ({
              ...criteriaItem
            }))
          }))
        })) || [];

        console.log('Processed templates:', this.templates);
      },
      error: (err) => console.error('Failed to fetch templates:', err)
    });
  }

  // Method to add a new row for criteria
  addCriteriaRow(section: any) {
    section.criteria.push({
      sub_criteria: '',
      points: 0,
      out_of: 0,
      comments: ''
    });
  }

  // Method to remove a row from criteria
  removeCriteriaRow(section: any, index: number) {
    section.criteria.splice(index, 1);
  }


  logout() {
    localStorage.removeItem('loggedInHR');
    localStorage.removeItem('loggedInHRId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPermission');
    console.log('Logged out successfully.');
    // Navigate to login page
    this.router.navigate(['/login']); // Redirect to HR dashboard for other users
  }



  submitFeedback() {
    console.log('Selected Round ID:', this.selectedRoundId); // Debug the round_id value

    // Construct the feedback JSON
    const feedbackData = {
      interviewer: this.interviewerId,
      interviewDuration: this.interviewDuration,
      interviewMode: this.interviewMode,
      interviewDate: this.selectedInterviewDate,
      templates: this.templates?.map(template => ({
        template_id: template.template_id, // Use template_id from the fetched template
        sections: template.sections?.map((section: { section_name: any; evaluation: any; comments: any; criteria: any[]; }) => ({
          section_name: section.section_name,
          evaluation: section.evaluation,
          comments: section.comments,
          criteria: section.criteria?.map((criteria: any) => ({
            sub_criteria: criteria.sub_criteria,
            points: criteria.points,
            out_of: criteria.out_of,
            comments: criteria.comments,
          })) || [],
        })) || [],
      })) || [],
    };
  
    // Map interviewDecision to status_id
    const statusId = this.interviewDecision; // This directly maps to the status_id
    const candidateId = this.selectedCandidateId; // Assuming you have the selected candidate ID
    const interviewerId = this.interviewerId; // Assuming you have the logged-in interviewer ID
    const templateId = this.templates?.[0]?.template_id; // Assuming you want the first template's ID

    // Construct the request body
    const requestBody = {
      feedback_json: feedbackData, // Feedback JSON
      status_id: statusId, // The status_id mapped from interviewDecision
      template_id: templateId, // Template ID
      candidate_id: candidateId, // Candidate ID
      interviewer_id: interviewerId, // Interviewer ID
      round_id: this.selectedRoundId, // Include round_id here
    };
  
    // Log the request body for debugging
    console.log('Request Body:', JSON.stringify(requestBody));
  
    // Call the DataService to submit feedback and create a new round
    this.dataService.submitFeedback(requestBody).subscribe({
      next: (response) => {
        console.log('Feedback submitted and round created successfully:', response);
        alert('Feedback submitted and round created successfully!');
        // Clear the form or reset state if needed
      },
      error: (err) => {
        console.error('Error submitting feedback and creating round:', err);
        alert('Failed to submit feedback and create round.');
      },
    });
  }

  submittedFeedback: any[] = [];



  getSubmittedFeedback(): void {
    const interviewerId = localStorage.getItem('loggedInHRId'); // Get the logged-in interviewer's ID

    if (!interviewerId) {
      console.error('Interviewer ID not found');
      return;
    }

    this.dataService.getFeedbackForInterviewer(interviewerId).subscribe({
      next: data => {
        console.log('Fetched submitted feedback:', data);
        this.submittedFeedback = data.map((item: {
          status_id: number;
          interviewMode: any;
          position: any;
          feedback_json: any;
          interview_date: string;
          mode: string;
          candidate_name: string;
          interviewer_name: string;
          decision: string;
        }) => ({
          feedback_json: item.feedback_json.templates?.[0]?.sections ?? [],
        }));
      },
      error: err => console.error('Backend API error fetching feedback', err)
    });
  }









  
}
