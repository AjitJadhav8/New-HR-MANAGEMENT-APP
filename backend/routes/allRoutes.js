const express = require('express');
const router = express.Router();
const allController = require('../controllers/allController');
const verifyToken = require('../middleware/verifyToken');

// Define routes and map to controller methods
// Login function
router.post('/login', allController.login);
  // Change password function
router.put('/change-password', allController.changePassword);
  // Get interview options for dropdowns
router.get('/interview-options', allController.getInterviewOptions);
  // Get candidates for a specific HR user
router.get('/candidates', allController.getCandidates);
  // Add a new candidate with interview round
router.post('/candidates-with-round', allController.addCandidateWithRound);
  // Add a new interview round for an existing candidate
router.post('/candidates/:id/interview-rounds', allController.addInterviewRound);
  // Delete an interview round for a candidate

router.delete('/candidates/:id/interview-rounds/:round_number', allController.deleteInterviewRound);
  // Update a candidate's information

router.put('/candidates/:id', allController.updateCandidate);
  // Get all distinct candidates from all HRs (no interview details in the list) for CEO

router.get('/all-candidates', allController.getAllCandidates);
  // Get candidate details by ID (including all interview rounds) for CEO

router.get('/candidates/:id/details', allController.getCandidateDetails);
  // Get interview rounds history for a candidate (HR)

router.get('/interview_rounds/:c_id', allController.getInterviewRoundsForCandidate);

// -----Admin-----

router.post('/admin/entries', allController.addAdminEntry);
router.delete('/admin/entries/:type/:id', allController.deleteAdminEntry);
router.get('/admin/data', allController.getAdminData);

// -----SuperUser--
router.post('/users', allController.addUser);

// Route to get all users
router.get('/users', allController.getAllUsers);

// Route to get all roles
router.get('/roles', allController.getAllRoles);

// Route to update a user's role
router.put('/users/:userId/role', allController.updateUserRole);


// Route to delete a user
router.delete('/users/:userId', allController.deleteUser);

router.put('/interview-rounds/:id', allController.updateInterviewRound);

router.get('/getAllCandidatesHrAdmin', allController.getAllCandidatesHrAdmin);


// phase 2 templates

router.get('/templates', allController.getAllTemplates);

router.get('/candidates/:interviewer_id', allController.getCandidatesByInterviewerId);

router.post('/submitFeedback', allController.submitFeedback);

router.get('/interviewer/candidates', allController.getAllCandidatesForInterviewer);


// Define the route to get feedback by interviewerId
router.get('/feedback/:interviewerId', allController.getFeedbackForInterviewer);


router.get('/feedback/candidate/:candidateId', allController.getFeedbackForCandidate);



module.exports = router;
