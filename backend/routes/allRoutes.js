const express = require('express');
const router = express.Router();
const allController = require('../controllers/allController');
const verifyToken = require('../middleware/verifyToken');

// Define routes and map to controller methods
router.post('/login', allController.login);
router.put('/change-password', allController.changePassword);
router.get('/interview-options', allController.getInterviewOptions);
router.get('/candidates', allController.getCandidates);
router.post('/candidates-with-round', allController.addCandidateWithRound);
router.post('/candidates/:id/interview-rounds', allController.addInterviewRound);
router.delete('/candidates/:id/interview-rounds/:round_number', allController.deleteInterviewRound);
router.put('/candidates/:id', allController.updateCandidate);
router.get('/all-candidates', allController.getAllCandidates);
router.get('/candidates/:id/details', allController.getCandidateDetails);
router.get('/interview_rounds/:c_id', allController.getInterviewRoundsForCandidate);

module.exports = router;
