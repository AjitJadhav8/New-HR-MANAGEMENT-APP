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
  


  selectedInterviewDate: any = null;  // Store selected interview date as null initially

  // Handle candidate selection and update interview date
    // Method to handle candidate selection
   // Method to handle candidate selection
   onCandidateSelect(candidateId: string) {
    console.log('Selected Candidate ID:', candidateId); // Log the ID
    console.log('Candidates array:', this.candidates); // Log all candidates
  
    const selectedCandidate = this.candidates.find(candidate => candidate.candidate_id === parseInt(candidateId));
  
    if (selectedCandidate) {
      this.selectedRoundId = selectedCandidate.round_id; // Set the round_id

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

  


  // submitFeedback() {
  //   // Construct the feedback JSON
  //   const feedbackData = {
  //     interviewer: this.loggedInInterviewer,
  //     interviewDuration: this.interviewDuration,
  //     interviewMode: this.interviewMode,
  //     interviewDate: this.selectedInterviewDate,
  //     templates: this.templates?.map(template => ({
  //       sections: template.sections?.map((section: { section_name: any; evaluation: any; comments: any; criteria: any[]; }) => ({
  //         section_name: section.section_name,
  //         evaluation: section.evaluation, // Include evaluation
  //         comments: section.comments,    // Include comments for feedback
  //         criteria: section.criteria?.map((criteria: any) => ({
  //           sub_criteria: criteria.sub_criteria,
  //           points: criteria.points,
  //           out_of: criteria.out_of,
  //           comments: criteria.comments,
  //         })) || [], // Fallback to an empty array if criteria is undefined
  //       })) || [], // Fallback to an empty array if sections is undefined
  //     })) || [], // Fallback to an empty array if templates is undefined
  //   };
  
  //   // Map interviewDecision to status_id
  //   const statusId = this.interviewDecision; // This directly maps to the status_id
  
  //   // Assuming the template_id is from the selected template (you can modify this if needed)
  //   const templateId = this.templates?.[0]?.template_id;  // Select the first template_id or modify as needed
  
  //   // Construct the request body
  //   const requestBody = {
  //     feedback_json: feedbackData, // Feedback JSON
  //     status_id: statusId,         // The status_id mapped from interviewDecision
  //     template_id: templateId      // Add template_id here outside of feedback_json
  //   };
  
  //   // Log the request body for debugging
  //   console.log('Request Body:', JSON.stringify(requestBody));
  
  //   // Call the DataService to submit feedback
  //   this.dataService.submitFeedback(requestBody).subscribe({
  //     next: (response) => {
  //       console.log('Feedback submitted successfully:', response);
  //       alert('Feedback submitted successfully!');
  //       // Clear the form or reset state if needed
  //     },
  //     error: (err) => {
  //       console.error('Error submitting feedback:', err);
  //       alert('Failed to submit feedback.');
  //     },
  //   });
  // }
  

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
  
  

}
