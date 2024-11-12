const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const db = require('../config/db');  // Import the database connection

// Setup MySQL connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// Login function
exports.login = (req, res) => {
    const { name, password } = req.body;
    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
  
    db.query(query, [name, password], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      } 
      
      // Check if user exists
      if (results.length > 0) {
        const user = results[0]; // Assuming user data is in the first result
  
        // Generate JWT tokens
        const token = jwt.sign(
          { id: user.u_id, name: user.name }, // Use `u_id` instead of `id`
          'your-secret-key',
          { expiresIn: '1h' }
        );
  
        // Send response with token and user details
        return res.json({
          message: 'Login successful',
          token: token,
          user: {
            id: user.u_id,  // Use `u_id` here
            name: user.name
          }
        });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  };

  // Change password function
exports.changePassword = (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
  
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Check if the user exists and if the current password is correct
    const query = 'SELECT * FROM users WHERE u_id = ? AND password = ?';
    db.query(query, [userId, currentPassword], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid current password' });
      }
  
      // Update the password
      const updateQuery = 'UPDATE users SET password = ? WHERE u_id = ?';
      db.query(updateQuery, [newPassword, userId], (err, result) => {
        if (err) {
          console.error('Error updating password:', err);
          return res.status(500).json({ error: 'Failed to update password' });
        }
  
        res.json({ message: 'Password changed successfully' });
      });
    });
  };
  
  // Get interview options for dropdowns
  exports.getInterviewOptions = async (req, res) => {
    try {
      const [positions] = await db.promise().query("SELECT DISTINCT position FROM candidates");
      const [roundNumbers] = await db.promise().query("SELECT DISTINCT round_number FROM interview_rounds");
      const [interviewers] = await db.promise().query("SELECT DISTINCT interviewer FROM interview_rounds");
      const [remarks] = await db.promise().query("SELECT DISTINCT remarks FROM interview_rounds WHERE remarks IS NOT NULL");
      const [statuses] = await db.promise().query("SELECT DISTINCT status FROM interview_rounds");
  
      res.json({
        positions: positions.map(item => item.position),
        roundNumbers: roundNumbers.map(item => item.round_number),
        interviewers: interviewers.map(item => item.interviewer),
        remarks: remarks.map(item => item.remarks),
        statuses: statuses.map(item => item.status),
      });
    } catch (error) {
      res.status(500).send("Error retrieving interview options");
    }
  };


  // Get candidates for a specific HR user
exports.getCandidates = (req, res) => {
    const { u_id } = req.query;
    
    if (!u_id) {
      return res.status(400).json({ error: 'HR user ID is required' });
    }
  
    const query = `
      SELECT 
          c.c_id AS Candidate_ID,
          c.c_name AS Candidate_Name,
          c.position AS Position,
          ir.round_number AS Round_Number,
          ir.interviewer AS Interviewer,
          ir.interview_date AS Interview_Date,
          ir.status AS Status,
          ir.remarks AS Remarks
      FROM 
          candidates c
      LEFT JOIN 
          interview_rounds ir 
      ON 
          c.c_id = ir.c_id
      AND 
        ir.ir_id = (
        SELECT MAX(sub_ir.ir_id)  -- Select the most recent interview round based on the auto-incremented ir_id
        FROM interview_rounds sub_ir
        WHERE sub_ir.c_id = c.c_id
    )
      WHERE 
          c.u_id = ?
      ORDER BY 
        c.c_id DESC; 
    `;
    

    // AND 
    // ir.round_number = (
    //     SELECT MAX(sub_ir.round_number)
    //     FROM interview_rounds sub_ir
    //     WHERE sub_ir.c_id = c.c_id
    // )
    db.query(query, [u_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results);
    });
  };
  
  // Add a new candidate with interview round
  exports.addCandidateWithRound = (req, res) => {
    const { candidate, round } = req.body;
  
    if (!candidate || !round) {
      return res.status(400).json({ error: 'Candidate and round data are required' });
    }
  
    const { name, position, u_id } = candidate;
    const { round_number, interviewer, interview_date, status, remarks } = round;
  
    if (!name || !position || !u_id || !round_number || !interviewer || !interview_date || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const finalPosition = position === 'Custom' ? candidate.customPosition : position;
    const upperCaseName = name.toUpperCase();
  
    const addCandidateQuery = `
      INSERT INTO candidates (c_name, position, u_id) VALUES (?, ?, ?)
    `;
  
    db.query(addCandidateQuery, [upperCaseName, finalPosition, u_id], (err, result) => {
      if (err) {
        console.error('Error inserting candidate:', err);
        return res.status(500).json({ error: err.message || 'Database error' });
      }
  
      const candidateId = result.insertId;
  
      const addInterviewRoundQuery = `
        INSERT INTO interview_rounds (c_id, round_number, interviewer, interview_date, status, remarks)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      db.query(addInterviewRoundQuery, [candidateId, round_number, interviewer, interview_date, status, remarks], (err) => {
        if (err) {
          console.error('Error inserting interview round:', err);
          return res.status(500).json({ error: err.message || 'Database error' });
        }
  
        res.status(201).json({ message: 'Candidate and interview round added successfully' });
      });
    });
  };
  
  // Add a new interview round for an existing candidate
  exports.addInterviewRound = (req, res) => {
    const { id } = req.params;
    const { round_number, interviewer, interview_date, status, remarks } = req.body;
  
    if (!round_number || !interviewer || !interview_date || !status) {
      return res.status(400).json({ error: 'All fields are required for the interview round' });
    }
  
    const addInterviewRoundQuery = `
      INSERT INTO interview_rounds (c_id, round_number, interviewer, interview_date, status, remarks) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(addInterviewRoundQuery, [id, round_number, interviewer, interview_date, status, remarks], (err) => {
      if (err) {
        console.error('Error inserting interview round:', err);
        return res.status(500).json({ error: err.message || 'Database error' });
      }
      res.status(201).json({ message: 'Interview round added successfully' });
    });
  };

  // Delete an interview round for a candidate
exports.deleteInterviewRound = (req, res) => {
    const { id, round_number } = req.params;
  
    // If round_number contains spaces, ensure it is correctly encoded (e.g., HR Round becomes HR%20Round)
    const query = 'DELETE FROM interview_rounds WHERE c_id = ? AND round_number = ?';
  
    db.query(query, [id, round_number], (err, result) => {
      if (err) {
        console.error('Error deleting interview round:', err);
        return res.status(500).json({ error: err.message || 'Database error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Interview round not found' });
      }
  
      res.json({ message: 'Interview round deleted successfully' });
    });
  };
  
  // Update a candidate's information
  exports.updateCandidate = (req, res) => {
    const { id } = req.params;
    const { name, position } = req.body;
  
    if (!name || !position) {
      return res.status(400).json({ error: 'Name and position are required' });
    }
  
    const upperCaseName = name.toUpperCase(); // Ensure the name is stored in uppercase
  
    const updateCandidateQuery = `
      UPDATE candidates 
      SET c_name = ?, position = ?
      WHERE c_id = ?
    `;
  
    db.query(updateCandidateQuery, [upperCaseName, position, id], (err, result) => {
      if (err) {
        console.error('Error updating candidate:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      res.json({ message: 'Candidate updated successfully' });
    });
  };
  
  // Get all distinct candidates from all HRs (no interview details in the list) for CEO
  exports.getAllCandidates = (req, res) => {
    const query = `
    SELECT DISTINCT 
        c.c_id AS Candidate_ID,
        c.c_name AS Candidate_Name,
        c.position AS Position,
        u.name AS HR_Name  -- Fetch HR name from the users table
    FROM 
        candidates c
    LEFT JOIN 
        users u ON c.u_id = u.u_id
    ORDER BY 
        c.c_id;
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      console.log('Distinct candidates results:', results);
      res.json(results);
    });
  };
  
  // Get candidate details by ID (including all interview rounds) for CEO
  exports.getCandidateDetails = (req, res) => {
    const { id } = req.params;
  
    const query = `
    SELECT 
      c.c_id AS Candidate_ID,
      c.c_name AS Candidate_Name,
      c.position AS Position,
      u.name AS HR_Name,
      ir.round_number AS Round_Number,
      ir.interviewer AS Interviewer,
      ir.interview_date AS Interview_Date,
      ir.status AS Status,
      ir.remarks AS Remarks
    FROM 
      candidates c
    LEFT JOIN 
      interview_rounds ir ON c.c_id = ir.c_id
    LEFT JOIN 
      users u ON c.u_id = u.u_id
    WHERE 
      c.c_id = ?
    ORDER BY 
      ir.round_number;
    `;
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      // Prepare the candidate's details along with all interview rounds
      const candidate = {
        Candidate_ID: results[0].Candidate_ID,
        Candidate_Name: results[0].Candidate_Name,
        Position: results[0].Position,
        HR_Name: results[0].HR_Name,
        interviewRounds: results.map(r => ({
          Round_Number: r.Round_Number,
          Interviewer: r.Interviewer,
          Interview_Date: r.Interview_Date,
          Status: r.Status,
          Remarks: r.Remarks
        }))
      };
  
      res.json(candidate);
    });
  };
  
  // Get interview rounds history for a candidate (HR)
  exports.getInterviewRoundsForCandidate = (req, res) => {
    const { c_id } = req.params;
    console.log("Received request for interview rounds with candidate ID:", c_id);
  
    const query = `SELECT 
        round_number AS Round_Number,
        interviewer AS Interviewer,
        interview_date AS Interview_Date,
        status AS Status,
        remarks AS Remarks
      FROM interview_rounds
      WHERE c_id = ?
      ORDER BY ir_id;`;
  
    db.query(query, [c_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      console.log("Fetched interview rounds:", results);
      res.json(results); // Ensure JSON data is returned
    });
  };
  