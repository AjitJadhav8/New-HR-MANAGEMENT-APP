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
// Login function done
exports.login = (req, res) => {
  const { name, password } = req.body;
  const query = `
      SELECT users.u_id, users.name, permissions.permission_name 
      FROM users 
      JOIN permissions ON users.permission_id = permissions.permission_id 
      WHERE users.name = ? AND users.password = ?
  `;

  db.query(query, [name, password], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }

      // Check if user exists
      if (results.length > 0) {
          const user = results[0]; // Assuming user data is in the first result

          // Generate JWT tokens
          const token = jwt.sign(
              { id: user.u_id, name: user.name, permission: user.permission_name }, // Include permission in payload
              'your-secret-key',
              { expiresIn: '1h' }
          );

          // Send response with token, user details, and permission
          return res.json({
              message: 'Login successful',
              token: token,
              user: {
                  id: user.u_id,
                  name: user.name,
                  permission: user.permission_name // Include permission in response
              }
          });
      } else {
          return res.status(401).json({ error: 'Invalid username or password' });
      }
  });
};


  // Change password function done
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
  
  // DROPDOWN Get interview options for done
exports.getInterviewOptions = async (req, res) => {
    try {
      // Fetch unique positions from the "positions" table
      const [positions] = await db
        .promise()
        .query("SELECT DISTINCT position_name FROM positions ORDER BY position_name ASC");
  
      // Fetch other fields from their respective tables
      const [roundNumbers] = await db
        .promise()
        .query("SELECT DISTINCT round_number FROM interview_rounds ORDER BY round_number ASC");
  
        const [interviewers] = await db
      .promise()
      .query("SELECT DISTINCT interviewer_name FROM interviewers ORDER BY interviewer_name ASC");
  
      const [remarks] = await db
        .promise()
        .query("SELECT DISTINCT remarks FROM interview_rounds WHERE remarks IS NOT NULL ORDER BY remarks ASC");
  
      // Corrected query for statuses with JOIN
      const [statuses] = await db
        .promise()
        .query(`
          SELECT DISTINCT s.status_name
          FROM interview_rounds ir
          JOIN statuses s ON ir.status_id = s.status_id
          ORDER BY s.status_name ASC
        `);
  
      // Send the response as JSON
      res.json({
        positions: positions.map((item) => item.position_name),
        roundNumbers: roundNumbers.map((item) => item.round_number),
        interviewers: interviewers.map((item) => item.interviewer_name), // Now returning interviewer_name
        remarks: remarks.map((item) => item.remarks),
        statuses: statuses.map((item) => item.status_name),
      });
    } catch (error) {
      console.error("Error retrieving interview options:", error.message);
      console.error("Stack trace:", error.stack);  // Detailed error stack trace
      res.status(500).send("Error retrieving interview options");
    }
  };
  
  // Get candidates for a specific HR user done
  exports.getCandidates = (req, res) => {
    const { u_id } = req.query;
  
    if (!u_id) {
      return res.status(400).json({ error: 'HR user ID is required' });
    }
  
    const query = `
      SELECT 
        c.c_id AS Candidate_ID,
        c.c_name AS Candidate_Name,
        p.position_name AS Position,
        ir.round_number AS Round_Number,
        ir.interview_date AS Interview_Date,
        ir.is_deleted AS Is_Deleted,  -- Add is_deleted for clarity
        i.interviewer_name AS Interviewer,
        s.status_name AS Status,
        ir.remarks AS Remarks
      FROM 
        candidates c
      LEFT JOIN 
        interview_rounds ir 
      ON 
        c.c_id = ir.c_id AND ir.is_deleted = 0  -- Exclude deleted rounds
      LEFT JOIN 
        positions p 
      ON 
        c.position_id = p.position_id
      LEFT JOIN 
        interviewers i 
      ON 
        ir.interviewer_id = i.interviewer_id
      LEFT JOIN 
        statuses s
      ON 
        ir.status_id = s.status_id
      WHERE 
        c.u_id = ?
      ORDER BY 
        c.c_id DESC, ir.ir_id DESC;
    `;
  
    db.query(query, [u_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      // Process the results to group the data by candidates
      const candidates = results.reduce((acc, candidate) => {
        const existingCandidate = acc.find(c => c.Candidate_ID === candidate.Candidate_ID);
  
        if (existingCandidate) {
          // If interview round data exists and is not deleted, add it
          if (candidate.Round_Number && candidate.Is_Deleted === 0) {
            existingCandidate.interviewRounds.push({
              Round_Number: candidate.Round_Number,
              Interviewer: candidate.Interviewer,
              Interview_Date: candidate.Interview_Date,
              Status: candidate.Status,
              Remarks: candidate.Remarks
            });
          }
        } else {
          // Create a candidate record if it doesn't exist, even with no rounds
          acc.push({
            Candidate_ID: candidate.Candidate_ID,
            Candidate_Name: candidate.Candidate_Name,
            Position: candidate.Position,
            interviewRounds: candidate.Round_Number && candidate.Is_Deleted === 0 ? [{
              Round_Number: candidate.Round_Number,
              Interviewer: candidate.Interviewer,
              Interview_Date: candidate.Interview_Date,
              Status: candidate.Status,
              Remarks: candidate.Remarks
            }] : []  // If no interview rounds, set to empty array
          });
        }
        return acc;
      }, []);
  
      res.json(candidates);
    });
  };
  

  
  
  
  
  // Add a new candidate with interview round done
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
  
    // Get position_id based on the position name
    const getPositionIdQuery = `
      SELECT position_id FROM positions WHERE position_name = ?
    `;
  
    db.query(getPositionIdQuery, [finalPosition], (err, positionResults) => {
      if (err) {
        console.error('Error fetching position ID:', err);
        return res.status(500).json({ error: 'Database error fetching position ID' });
      }
  
      if (positionResults.length === 0) {
        return res.status(400).json({ error: 'Position not found' });
      }
  
      const positionId = positionResults[0].position_id;
  
      // Get interviewer_id based on the interviewer's name
      const getInterviewerIdQuery = `
        SELECT interviewer_id FROM interviewers WHERE interviewer_name = ?
      `;
  
      db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
        if (err) {
          console.error('Error fetching interviewer ID:', err);
          return res.status(500).json({ error: 'Database error fetching interviewer ID' });
        }
  
        if (interviewerResults.length === 0) {
          return res.status(400).json({ error: 'Interviewer not found' });
        }
  
        const interviewerId = interviewerResults[0].interviewer_id;
  
        // Get status_id based on the status name
        const getStatusIdQuery = `
          SELECT status_id FROM statuses WHERE status_name = ?
        `;
  
        db.query(getStatusIdQuery, [status], (err, statusResults) => {
          if (err) {
            console.error('Error fetching status ID:', err);
            return res.status(500).json({ error: 'Database error fetching status ID' });
          }
  
          if (statusResults.length === 0) {
            return res.status(400).json({ error: 'Status not found' });
          }
  
          const statusId = statusResults[0].status_id;
  
          // Insert new candidate
          const addCandidateQuery = `
            INSERT INTO candidates (c_name, position_id, u_id) VALUES (?, ?, ?)
          `;
  
          db.query(addCandidateQuery, [upperCaseName, positionId, u_id], (err, result) => {
            if (err) {
              console.error('Error inserting candidate:', err);
              return res.status(500).json({ error: err.message || 'Database error' });
            }
  
            const candidateId = result.insertId;
  
            // Insert interview round for the new candidate
            const addInterviewRoundQuery = `
              INSERT INTO interview_rounds (c_id, round_number, interviewer_id, interview_date, status_id, remarks)
              VALUES (?, ?, ?, ?, ?, ?)
            `;
  
            db.query(addInterviewRoundQuery, [candidateId, round_number, interviewerId, interview_date, statusId, remarks], (err) => {
              if (err) {
                console.error('Error inserting interview round:', err);
                return res.status(500).json({ error: err.message || 'Database error' });
              }
  
              res.status(201).json({ message: 'Candidate and interview round added successfully' });
            });
          });
        });
      });
    });
  };
  
  // ----
  // Add a new interview round for an existing candidate Done
exports.addInterviewRound = (req, res) => {
  const { id } = req.params;  // Candidate ID
  const { round_number, interviewer, interview_date, status, remarks } = req.body;

  if (!round_number || !interviewer || !interview_date || !status) {
    return res.status(400).json({ error: 'All fields are required for the interview round' });
  }

  // Get interviewer_id from the interviewers table
  const getInterviewerIdQuery = `
    SELECT interviewer_id FROM interviewers WHERE interviewer_name = ?
  `;

  db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
    if (err) {
      console.error('Error fetching interviewer ID:', err);
      return res.status(500).json({ error: 'Database error fetching interviewer ID' });
    }

    if (interviewerResults.length === 0) {
      return res.status(400).json({ error: 'Interviewer not found' });
    }

    const interviewerId = interviewerResults[0].interviewer_id;

    // Get status_id from the statuses table
    const getStatusIdQuery = `
      SELECT status_id FROM statuses WHERE status_name = ?
    `;

    db.query(getStatusIdQuery, [status], (err, statusResults) => {
      if (err) {
        console.error('Error fetching status ID:', err);
        return res.status(500).json({ error: 'Database error fetching status ID' });
      }

      if (statusResults.length === 0) {
        return res.status(400).json({ error: 'Status not found' });
      }

      const statusId = statusResults[0].status_id;

      // Insert interview round for the candidate
      const addInterviewRoundQuery = `
        INSERT INTO interview_rounds (c_id, round_number, interviewer_id, interview_date, status_id, remarks)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(addInterviewRoundQuery, [id, round_number, interviewerId, interview_date, statusId, remarks], (err) => {
        if (err) {
          console.error('Error inserting interview round:', err);
          return res.status(500).json({ error: err.message || 'Database error' });
        }

        res.status(201).json({ message: 'Interview round added successfully' });
      });
    });
  });
};

  // Delete an interview round for a candidate
  exports.deleteInterviewRound = (req, res) => {
    const { id, round_number } = req.params;
  
    // Query to mark the round as deleted
    const query = 'UPDATE interview_rounds SET is_deleted = 1 WHERE c_id = ? AND round_number = ?';
  
    db.query(query, [id, round_number], (err, result) => {
      if (err) {
        console.error('Error deleting interview round:', err);
        return res.status(500).json({ error: err.message || 'Database error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Interview round not found' });
      }
  
      res.json({ message: 'Interview round marked as deleted successfully' });
    });
  };
  
  // -----



  // Update a candidate's information done
  exports.updateCandidate = (req, res) => {
    const { id } = req.params;
    const { name, position } = req.body;
  
    if (!name || !position) {
      return res.status(400).json({ error: 'Name and position are required' });
    }
  
    const upperCaseName = name.toUpperCase(); // Ensure the name is stored in uppercase
  
    // Get the position_id based on the position name
    const getPositionIdQuery = `
      SELECT position_id FROM positions WHERE position_name = ?
    `;
  
    db.query(getPositionIdQuery, [position], (err, positionResults) => {
      if (err) {
        console.error('Error fetching position ID:', err);
        return res.status(500).json({ error: 'Database error fetching position ID' });
      }
  
      if (positionResults.length === 0) {
        return res.status(400).json({ error: 'Position not found' });
      }
  
      const positionId = positionResults[0].position_id;
  
      // Update the candidate name and position_id
      const updateCandidateQuery = `
        UPDATE candidates 
        SET c_name = ?, position_id = ?
        WHERE c_id = ?
      `;
  
      db.query(updateCandidateQuery, [upperCaseName, positionId, id], (err, result) => {
        if (err) {
          console.error('Error updating candidate:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Candidate not found' });
        }
  
        res.json({ message: 'Candidate updated successfully' });
      });
    });
  };
  
  
  // Get all distinct candidates from all HRs (no interview details in the list) for CEO Done
  exports.getAllCandidates = (req, res) => {
    const query = `
      SELECT DISTINCT 
          c.c_id AS Candidate_ID,
          c.c_name AS Candidate_Name,
          p.position_name AS Position,  -- Fetch position name from the positions table
          u.name AS HR_Name  -- Fetch HR name from the users table
      FROM 
          candidates c
      LEFT JOIN 
          users u ON c.u_id = u.u_id
      LEFT JOIN 
          positions p ON c.position_id = p.position_id  -- Join with positions table to fetch position name
      ORDER BY 
          c.c_id DESC;
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
  
  
  // Get candidate details history by ID (including all interview rounds) for CEO Done 
  exports.getCandidateDetails = (req, res) => {
    const { id } = req.params;
  
    const query = `
      SELECT 
        c.c_id AS Candidate_ID,
        c.c_name AS Candidate_Name,
        p.position_name AS Position,
        u.name AS HR_Name,
        ir.round_number AS Round_Number,
        iv.interviewer_name AS Interviewer,
        ir.interview_date AS Interview_Date,
        s.status_name AS Status,
        ir.remarks AS Remarks
      FROM 
        candidates c
      LEFT JOIN 
        interview_rounds ir ON c.c_id = ir.c_id AND ir.is_deleted = 0  -- Exclude deleted rounds
      LEFT JOIN 
        users u ON c.u_id = u.u_id
      LEFT JOIN 
        positions p ON c.position_id = p.position_id
      LEFT JOIN 
        interviewers iv ON ir.interviewer_id = iv.interviewer_id
      LEFT JOIN 
        statuses s ON ir.status_id = s.status_id
      WHERE 
        c.c_id = ?
      ORDER BY 
        ir.round_number ;
    `;
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      // Check if results are empty (i.e., no interview rounds for this candidate)
      const candidate = {
        Candidate_ID: results.length > 0 ? results[0].Candidate_ID : id,
        Candidate_Name: results.length > 0 ? results[0].Candidate_Name : 'Unknown Candidate',
        Position: results.length > 0 && results[0].Position ? results[0].Position : 'No Position Assigned',
        HR_Name: results.length > 0 && results[0].HR_Name ? results[0].HR_Name : 'No HR Assigned',
        interviewRounds: results.length > 0 ? results.map(r => ({
          Round_Number: r.Round_Number,
          Interviewer: r.Interviewer,
          Interview_Date: r.Interview_Date,
          Status: r.Status,
          Remarks: r.Remarks
        })) : []  // Empty array if no rounds found
      };
  
      res.json(candidate);
    });
  };
  
  
  
  
  
  
  
  
  
  // Get interview rounds history for a candidate (HR) Done
  exports.getInterviewRoundsForCandidate = (req, res) => {
    const { c_id } = req.params;
    console.log("Received request for interview rounds with candidate ID:", c_id);
  
    // Query to fetch interview rounds with interviewer's name and status name
    const query = `
    SELECT 
      ir.round_number AS Round_Number,
      i.interviewer_name AS Interviewer,
      ir.interview_date AS Interview_Date,
      s.status_name AS Status,
      ir.remarks AS Remarks
    FROM interview_rounds ir
    LEFT JOIN interviewers i ON ir.interviewer_id = i.interviewer_id
    LEFT JOIN statuses s ON ir.status_id = s.status_id
    WHERE ir.c_id = ? AND ir.is_deleted = 0  -- Exclude rounds marked as deleted
    ORDER BY ir.ir_id;
  `;
  
    db.query(query, [c_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      console.log("Fetched interview rounds:", results);
      res.json(results); // Ensure JSON data is returned
    });
  };
  
  