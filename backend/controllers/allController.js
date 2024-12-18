const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const db = require('../config/db');  // Import the database connection


// Login function done
exports.login = (req, res) => {
  const { name, password } = req.body;

  // Modify the query to reflect your updated schema without using aliases
  const query = `
      SELECT trans_users.user_id, trans_users.user_name, master_role.role_name
      FROM trans_users
      JOIN master_role ON trans_users.role_id = master_role.role_id
      WHERE trans_users.user_name = ? AND trans_users.password = ?
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
              { id: user.user_id, name: user.user_name, permission: user.role_name }, // Include permission in payload
              'your-secret-key',  // Replace with a secure secret key
              { expiresIn: '1h' }
          );

          // Send response with token, user details, and permission
          return res.json({
              message: 'Login successful',
              token: token,
              user: {
                  id: user.user_id,
                  name: user.user_name,
                  permission: user.role_name // Include permission in response
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
    const query = 'SELECT * FROM trans_users WHERE user_id = ? AND password = ?';
    db.query(query, [userId, currentPassword], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        // Update the password
        const updateQuery = 'UPDATE trans_users SET password = ? WHERE user_id = ?';
        db.query(updateQuery, [newPassword, userId], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Failed to update password' });
            }

            res.json({ message: 'Password changed successfully' });
        });
    });
};

  
  // DROPDOWN Get interview options for 
  exports.getInterviewOptions = async (req, res) => {
    try {
      // Fetch unique positions from the "master_positions" table
      const [positions] = await db
        .promise()
        .query("SELECT DISTINCT position_name FROM master_positions ORDER BY position_name ASC");

      // Fetch distinct round numbers from the "trans_interview_rounds" table

      // Fetch distinct round numbers directly from the master_rounds table
const [roundNumbers] = await db
.promise()
.query(`
  SELECT DISTINCT round_number
  FROM master_rounds
  ORDER BY 
    CASE
      WHEN round_number = 'Screening Round 1' THEN 1
      WHEN round_number = 'HR Round' THEN 3
      WHEN round_number LIKE 'Round%' THEN 2
      ELSE 4
    END,
    round_number ASC
`);


      // const [roundNumbers] = await db
      //   .promise()
      //   .query(`
      //     SELECT DISTINCT round_number
      //     FROM trans_interview_rounds
      //     ORDER BY 
      //       CASE
      //         WHEN round_number = 'Screening Round 1' THEN 1
      //         WHEN round_number = 'HR Round' THEN 3
      //         WHEN round_number LIKE 'Round%' THEN 2
      //         ELSE 4
      //       END,
      //       round_number ASC
      //   `);
        // .query("SELECT DISTINCT round_number FROM trans_interview_rounds ORDER BY round_number ASC");

      // Fetch distinct interviewers from the "master_interviewers" table
      const [interviewers] = await db
        .promise()
        .query("SELECT DISTINCT interviewer_name FROM master_interviewers ORDER BY interviewer_name ASC");

      // Fetch distinct remarks from the "trans_interview_rounds" table
      const [remarks] = await db
        .promise()
        .query("SELECT DISTINCT remarks FROM trans_interview_rounds WHERE remarks IS NOT NULL ORDER BY remarks ASC");

      // Corrected query for statuses with JOIN between "trans_interview_rounds" and "master_statuses"
      const [statuses] = await db
        .promise()
        .query("SELECT DISTINCT status_name FROM master_statuses ORDER BY status_name ASC");
        // .query(`
        //   SELECT DISTINCT s.status_name
        //   FROM trans_interview_rounds ir
        //   JOIN master_statuses s ON ir.status_id = s.status_id
        //   ORDER BY s.status_name ASC
        // `);

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
//   exports.getCandidates = (req, res) => {
//     const { u_id } = req.query;

//     if (!u_id) {
//       return res.status(400).json({ error: 'HR user ID is required' });
//     }

//     const query = `
//       SELECT 
//         c.candidate_id AS Candidate_ID,
//         c.candidate_name AS Candidate_Name,
//         p.position_name AS Position,
//         ir.round_number AS Round_Number,
//         ir.interview_date AS Interview_Date,

//         ir.updated_at AS Updated_At,  -- Add updated_at field

//         ir.is_deleted AS Is_Deleted,  -- Add is_deleted for clarity
//         i.interviewer_name AS Interviewer,
//         s.status_name AS Status,
//         ir.remarks AS Remarks
//       FROM 
//         trans_candidates c
//       LEFT JOIN 
//         trans_interview_rounds ir 
//       ON 
//         c.candidate_id = ir.candidate_id AND ir.is_deleted = 0  -- Exclude deleted rounds
//       LEFT JOIN 
//         master_positions p 
//       ON 
//         c.position_id = p.position_id
//       LEFT JOIN 
//         master_interviewers i 
//       ON 
//         ir.interviewer_id = i.interviewer_id
//       LEFT JOIN 
//         master_statuses s
//       ON 
//         ir.status_id = s.status_id
//       WHERE 
//     c.user_id = ? AND c.candidate_name != 'Demo Candidate' -- Exc
//       ORDER BY 
//         c.candidate_id DESC, ir.ir_id DESC;
//     `;

//     db.query(query, [u_id], (err, results) => {
//       if (err) {
//         console.error('Database query error:', err);
//         return res.status(500).json({ error: 'Database query error' });
//       }

//       // Process the results to group the data by candidates
//       const candidates = results.reduce((acc, candidate) => {
//         const existingCandidate = acc.find(c => c.Candidate_ID === candidate.Candidate_ID);

//         if (existingCandidate) {
//           // If interview round data exists and is not deleted, add it
//           if (candidate.Round_Number && candidate.Is_Deleted === 0) {
//             existingCandidate.interviewRounds.push({
//               Round_Number: candidate.Round_Number,
//               Interviewer: candidate.Interviewer,
//               Interview_Date: candidate.Interview_Date,
//               Updated_At: candidate.Updated_At, // Include updated_at
//               Status: candidate.Status,
//               Remarks: candidate.Remarks
//             });
//           }
//         } else {
//           // Create a candidate record if it doesn't exist, even with no rounds
//           acc.push({
//             Candidate_ID: candidate.Candidate_ID,
//             Candidate_Name: candidate.Candidate_Name,
//             Position: candidate.Position,
//             interviewRounds: candidate.Round_Number && candidate.Is_Deleted === 0 ? [{
//               Round_Number: candidate.Round_Number,
//               Interviewer: candidate.Interviewer,
//               Interview_Date: candidate.Interview_Date,
//               Updated_At: candidate.Updated_At,

//               Status: candidate.Status,
//               Remarks: candidate.Remarks
//             }] : []  // If no interview rounds, set to empty array
//           });
//         }
//         return acc;
//       }, []);

//       res.json(candidates);
//     });
// };

// Get candidates for a specific HR user
exports.getCandidates = (req, res) => {
  const { u_id } = req.query;

  if (!u_id) {
    return res.status(400).json({ error: 'HR user ID is required' });
  }

  const query = `
    SELECT 
      c.candidate_id AS Candidate_ID,
      c.candidate_name AS Candidate_Name,
      p.position_name AS Position,
      r.round_number AS Round_Number,  -- Reference round_number from master_rounds
      ir.interview_date AS Interview_Date,
      ir.updated_at AS Updated_At,
      ir.is_deleted AS Is_Deleted,
      i.interviewer_name AS Interviewer,
      s.status_name AS Status,
      ir.remarks AS Remarks
    FROM 
      trans_candidates c
    LEFT JOIN 
      trans_interview_rounds ir ON c.candidate_id = ir.candidate_id AND ir.is_deleted = 0
    LEFT JOIN 
      master_positions p ON c.position_id = p.position_id
    LEFT JOIN 
      master_interviewers i ON ir.interviewer_id = i.interviewer_id
    LEFT JOIN 
      master_statuses s ON ir.status_id = s.status_id
    LEFT JOIN 
      master_rounds r ON ir.round_id = r.round_id   -- Join the new table for round_number reference
    WHERE 
      c.user_id = ? AND c.candidate_name != 'Demo Candidate'  
    ORDER BY 
      c.candidate_id DESC, ir.ir_id DESC;
  `;

  db.query(query, [u_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }

    const candidates = results.reduce((acc, candidate) => {
      const existingCandidate = acc.find(c => c.Candidate_ID === candidate.Candidate_ID);

      if (existingCandidate) {
        if (candidate.Round_Number && candidate.Is_Deleted === 0) {
          existingCandidate.interviewRounds.push({
            Round_Number: candidate.Round_Number,
            Interviewer: candidate.Interviewer,
            Interview_Date: candidate.Interview_Date,
            Updated_At: candidate.Updated_At,
            Status: candidate.Status,
            Remarks: candidate.Remarks
          });
        }
      } else {
        acc.push({
          Candidate_ID: candidate.Candidate_ID,
          Candidate_Name: candidate.Candidate_Name,
          Position: candidate.Position,
          interviewRounds: candidate.Round_Number && candidate.Is_Deleted === 0 ? [{
            Round_Number: candidate.Round_Number,
            Interviewer: candidate.Interviewer,
            Interview_Date: candidate.Interview_Date,
            Updated_At: candidate.Updated_At,
            Status: candidate.Status,
            Remarks: candidate.Remarks
          }] : []
        });
      }
      return acc;
    }, []);

    res.json(candidates);
  });
};

  // Add a new candidate with interview round done
//   exports.addCandidateWithRound = (req, res) => {
//     const { candidate, round } = req.body;

//     if (!candidate || !round) {
//       return res.status(400).json({ error: 'Candidate and round data are required' });
//     }

//     const { name, position, u_id } = candidate;
//     const { round_number, interviewer, interview_date, status, remarks } = round;

//     if (!name || !position || !u_id || !round_number || !interviewer || !interview_date || !status) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     const finalPosition = position === 'Custom' ? candidate.customPosition : position;
//     const upperCaseName = name.toUpperCase();

//     // Get position_id based on the position name
//     const getPositionIdQuery = `
//       SELECT position_id FROM master_positions WHERE position_name = ?
//     `;

//     db.query(getPositionIdQuery, [finalPosition], (err, positionResults) => {
//       if (err) {
//         console.error('Error fetching position ID:', err);
//         return res.status(500).json({ error: 'Database error fetching position ID' });
//       }

//       if (positionResults.length === 0) {
//         return res.status(400).json({ error: 'Position not found' });
//       }

//       const positionId = positionResults[0].position_id;

//       // Get interviewer_id based on the interviewer's name
//       const getInterviewerIdQuery = `
//         SELECT interviewer_id FROM master_interviewers WHERE interviewer_name = ?
//       `;

//       db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
//         if (err) {
//           console.error('Error fetching interviewer ID:', err);
//           return res.status(500).json({ error: 'Database error fetching interviewer ID' });
//         }

//         if (interviewerResults.length === 0) {
//           return res.status(400).json({ error: 'Interviewer not found' });
//         }

//         const interviewerId = interviewerResults[0].interviewer_id;

//         // Get status_id based on the status name
//         const getStatusIdQuery = `
//           SELECT status_id FROM master_statuses WHERE status_name = ?
//         `;

//         db.query(getStatusIdQuery, [status], (err, statusResults) => {
//           if (err) {
//             console.error('Error fetching status ID:', err);
//             return res.status(500).json({ error: 'Database error fetching status ID' });
//           }

//           if (statusResults.length === 0) {
//             return res.status(400).json({ error: 'Status not found' });
//           }

//           const statusId = statusResults[0].status_id;

//           // Insert new candidate
//           const addCandidateQuery = `
//             INSERT INTO trans_candidates (candidate_name, position_id, user_id) 
//             VALUES (?, ?, ?)
//           `;

//           db.query(addCandidateQuery, [upperCaseName, positionId, u_id], (err, result) => {
//             if (err) {
//               console.error('Error inserting candidate:', err);
//               return res.status(500).json({ error: err.message || 'Database error' });
//             }

//             const candidateId = result.insertId;
            

//             // Insert interview round for the new candidate
//             const addInterviewRoundQuery = `
//               INSERT INTO trans_interview_rounds (candidate_id, round_number, interviewer_id, interview_date, status_id, remarks)
//               VALUES (?, ?, ?, ?, ?, ?)
//             `;

//             db.query(addInterviewRoundQuery, [candidateId, round_number, interviewerId, interview_date, statusId, remarks], (err) => {
//               if (err) {
//                 console.error('Error inserting interview round:', err);
//                 return res.status(500).json({ error: err.message || 'Database error' });
//               }

//               res.status(201).json({ message: 'Candidate and interview round added successfully' });
//             });
//           });
//         });
//       });
//     });
// };
//new
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
    SELECT position_id FROM master_positions WHERE position_name = ?
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

    // Get round_id based on the round_number
    const getRoundIdQuery = `
      SELECT round_id FROM master_rounds WHERE round_number = ?
    `;

    db.query(getRoundIdQuery, [round_number], (err, roundResults) => {
      if (err) {
        console.error('Error fetching round ID:', err);
        return res.status(500).json({ error: 'Database error fetching round ID' });
      }

      if (roundResults.length === 0) {
        return res.status(400).json({ error: 'Round not found' });
      }

      const roundId = roundResults[0].round_id;

      // Get interviewer_id based on the interviewer's name
      const getInterviewerIdQuery = `
        SELECT interviewer_id FROM master_interviewers WHERE interviewer_name = ?
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
          SELECT status_id FROM master_statuses WHERE status_name = ?
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
            INSERT INTO trans_candidates (candidate_name, position_id, user_id) 
            VALUES (?, ?, ?)
          `;

          db.query(addCandidateQuery, [upperCaseName, positionId, u_id], (err, result) => {
            if (err) {
              console.error('Error inserting candidate:', err);
              return res.status(500).json({ error: err.message || 'Database error' });
            }

            const candidateId = result.insertId;

            // Insert interview round for the new candidate
            const addInterviewRoundQuery = `
              INSERT INTO trans_interview_rounds (candidate_id, round_id, interviewer_id, interview_date, status_id, remarks)
              VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(addInterviewRoundQuery, [candidateId, roundId, interviewerId, interview_date, statusId, remarks], (err) => {
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
  });
};
//done ------------------------------------------------- for 17-12


//   exports.addInterviewRound = (req, res) => {
//     const { id } = req.params; // Candidate ID
//     const { round_number, interviewer, interview_date, status, remarks } = req.body;
  
//     if (!round_number || !interviewer || !interview_date || !status) {
//       return res.status(400).json({ error: 'All fields are required for the interview round.' });
//     }
  
//     // Check if the request is for a new round from the "Promote" or "Reject" buttons
//     if (status === 'Selected' || status === 'Rejected') {
//       // Only allow 'Selected' or 'Rejected' for these buttons
//       const allowedStatuses = ['Selected', 'Rejected', 'On Hold', 'Final Selected'];
// if (!allowedStatuses.includes(status)) {
//   return res.status(400).json({ error: 'Invalid status. Allowed values are "Selected", "Rejected", "On Hold", or "Final Selected".' });
// }

//     }
  
//     // Get interviewer_id from the master_interviewers table
//     const getInterviewerIdQuery = `
//       SELECT interviewer_id FROM master_interviewers WHERE interviewer_name = ?
//     `;
  
//     db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
//       if (err) {
//         console.error('Error fetching interviewer ID:', err);
//         return res.status(500).json({ error: 'Database error fetching interviewer ID.' });
//       }
  
//       if (interviewerResults.length === 0) {
//         return res.status(400).json({ error: 'Interviewer not found.' });
//       }
  
//       const interviewerId = interviewerResults[0].interviewer_id;
  
//       // Get status_id from the master_statuses table
//       const getStatusIdQuery = `
//         SELECT status_id FROM master_statuses WHERE status_name = ?
//       `;
  
//       db.query(getStatusIdQuery, [status], (err, statusResults) => {
//         if (err) {
//           console.error('Error fetching status ID:', err);
//           return res.status(500).json({ error: 'Database error fetching status ID.' });
//         }
  
//         if (statusResults.length === 0) {
//           return res.status(400).json({ error: 'Status not found.' });
//         }
  
//         const statusId = statusResults[0].status_id;
  
//         // Insert interview round for the candidate into trans_interview_rounds
//         const addInterviewRoundQuery = `
//           INSERT INTO trans_interview_rounds (candidate_id, round_number, interviewer_id, interview_date, status_id, remarks)
//           VALUES (?, ?, ?, ?, ?, ?)
//         `;
  
//         db.query(
//           addInterviewRoundQuery,
//           [id, round_number, interviewerId, interview_date, statusId, remarks],
//           (err) => {
//             if (err) {
//               console.error('Error inserting interview round:', err);
//               return res.status(500).json({ error: err.message || 'Database error.' });
//             }
  
//             res.status(201).json({ message: 'Interview round added successfully.' });
//           }
//         );
//       });
//     });
//   };
//new
exports.addInterviewRound = (req, res) => {
  const { id } = req.params; // Candidate ID
  const { round_number, interviewer, interview_date, status, remarks } = req.body;

  if (!round_number || !interviewer || !interview_date || !status) {
      return res.status(400).json({ error: 'All fields are required for the interview round.' });
  }

  // Check if the request is for a new round from the "Promote" or "Reject" buttons
  if (status === 'Selected' || status === 'Rejected') {
      // Only allow 'Selected' or 'Rejected' for these buttons
      const allowedStatuses = ['Selected', 'Rejected', 'On Hold', 'Final Selected'];
      if (!allowedStatuses.includes(status)) {
          return res.status(400).json({ error: 'Invalid status. Allowed values are "Selected", "Rejected", "On Hold", or "Final Selected".' });
      }
  }

  // Get interviewer_id from the master_interviewers table
  const getInterviewerIdQuery = `
      SELECT interviewer_id FROM master_interviewers WHERE interviewer_name = ?
  `;

  db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
      if (err) {
          console.error('Error fetching interviewer ID:', err);
          return res.status(500).json({ error: 'Database error fetching interviewer ID.' });
      }

      if (interviewerResults.length === 0) {
          return res.status(400).json({ error: 'Interviewer not found.' });
      }

      const interviewerId = interviewerResults[0].interviewer_id;

      // Get status_id from the master_statuses table
      const getStatusIdQuery = `
          SELECT status_id FROM master_statuses WHERE status_name = ?
      `;

      db.query(getStatusIdQuery, [status], (err, statusResults) => {
          if (err) {
              console.error('Error fetching status ID:', err);
              return res.status(500).json({ error: 'Database error fetching status ID.' });
          }

          if (statusResults.length === 0) {
              return res.status(400).json({ error: 'Status not found.' });
          }

          const statusId = statusResults[0].status_id;

          // Get round_id from the master_rounds table
          const getRoundIdQuery = `
              SELECT round_id FROM master_rounds WHERE round_number = ?
          `;

          db.query(getRoundIdQuery, [round_number], (err, roundResults) => {
              if (err) {
                  console.error('Error fetching round ID:', err);
                  return res.status(500).json({ error: 'Database error fetching round ID.' });
              }

              if (roundResults.length === 0) {
                  return res.status(400).json({ error: 'Round not found.' });
              }

              const roundId = roundResults[0].round_id;

              // Insert interview round for the candidate into trans_interview_rounds
              const addInterviewRoundQuery = `
                  INSERT INTO trans_interview_rounds (candidate_id, round_id, interviewer_id, interview_date, status_id, remarks)
                  VALUES (?, ?, ?, ?, ?, ?)
              `;

              db.query(
                  addInterviewRoundQuery,
                  [id, roundId, interviewerId, interview_date, statusId, remarks],
                  (err) => {
                      if (err) {
                          console.error('Error inserting interview round:', err);
                          return res.status(500).json({ error: err.message || 'Database error.' });
                      }

                      res.status(201).json({ message: 'Interview round added successfully.' });
                  }
              );
          });
      });
  });
};


//done
  

exports.deleteInterviewRound = (req, res) => {
  const { id } = req.params; // Only use candidate_id (id)

  // Step 1: Find the latest interview round for the given candidate_id
  const getLatestRoundQuery = `
    SELECT ir_id 
    FROM trans_interview_rounds 
    WHERE candidate_id = ? 
    ORDER BY ir_id DESC 
    LIMIT 1
  `;

  db.query(getLatestRoundQuery, [id], (err, result) => {
    if (err) {
      console.error('Error finding latest interview round:', err);
      return res.status(500).json({ error: err.message || 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No interview rounds found for this candidate' });
    }

    // Get the latest ir_id
    const latestIrId = result[0].ir_id;

    // Step 2: Mark this round as deleted
    const deleteRoundQuery = `
      UPDATE trans_interview_rounds 
      SET is_deleted = 1 
      WHERE ir_id = ?
    `;

    db.query(deleteRoundQuery, [latestIrId], (err, result) => {
      if (err) {
        console.error('Error deleting latest interview round:', err);
        return res.status(500).json({ error: err.message || 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Interview round not found' });
      }

      res.json({ message: 'Latest interview round marked as deleted successfully' });
    });
  });
};

  
  // -----


  // Update a candidate's information 
  exports.updateCandidate = (req, res) => {
    const { id } = req.params;
    const { name, position } = req.body;

    if (!name || !position) {
      return res.status(400).json({ error: 'Name and position are required' });
    }

    const upperCaseName = name.toUpperCase(); // Ensure the name is stored in uppercase

    // Get the position_id based on the position name from the new table schema
    const getPositionIdQuery = `
      SELECT position_id FROM master_positions WHERE position_name = ?
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

      // Update the candidate name and position_id in the updated table schema
      const updateCandidateQuery = `
        UPDATE trans_candidates 
        SET candidate_name = ?, position_id = ?
        WHERE candidate_id = ?
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

  
  // Get all distinct candidates from all HRs (no interview details in the list) for CEO 

// exports.getAllCandidates = (req, res) => {
//   const query = `
//     SELECT DISTINCT 
//         c.candidate_id AS Candidate_ID,
//         c.candidate_name AS Candidate_Name,
//         p.position_name AS Position,
//         u.user_name AS HR_Name,
//         ir.round_number AS Round_Number,
//         iv.interviewer_name AS Interviewer,  -- Include the Interviewer
//         ir.interview_date AS Interview_Date,
//         ir.updated_at AS Updated_At,
//         s.status_name AS Status,
//         ir.remarks AS Remarks,
//         ir.ir_id 
//     FROM 
//         trans_candidates c
//     LEFT JOIN 
//         trans_users u ON c.user_id = u.user_id
//     LEFT JOIN 
//         master_positions p ON c.position_id = p.position_id
//     LEFT JOIN 
//         trans_interview_rounds ir ON c.candidate_id = ir.candidate_id
//     LEFT JOIN 
//         master_interviewers iv ON ir.interviewer_id = iv.interviewer_id  -- Join with master_interviewers
//     LEFT JOIN 
//         master_statuses s ON ir.status_id = s.status_id
//      WHERE 
//       c.candidate_name != 'Demo Candidate' -- Exclude Demo Candidate
//     ORDER BY 
//         c.candidate_id DESC, ir.ir_id DESC;
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Database query error:', err);
//       return res.status(500).json({ error: 'Database query error' });
//     }
//     console.log('Candidates with interview rounds:', results);
//     res.json(results);
//   });
// };
//new
exports.getAllCandidates = (req, res) => {
  const query = `
    SELECT DISTINCT 
        c.candidate_id AS Candidate_ID,
        c.candidate_name AS Candidate_Name,
        p.position_name AS Position,
        u.user_name AS HR_Name,
        r.round_number AS Round_Number,  -- Fetch round_number from master_rounds
        iv.interviewer_name AS Interviewer,  -- Include the Interviewer
        ir.interview_date AS Interview_Date,
        ir.updated_at AS Updated_At,
        s.status_name AS Status,
        ir.remarks AS Remarks,
        ir.ir_id 
    FROM 
        trans_candidates c
    LEFT JOIN 
        trans_users u ON c.user_id = u.user_id
    LEFT JOIN 
        master_positions p ON c.position_id = p.position_id
    LEFT JOIN 
        trans_interview_rounds ir ON c.candidate_id = ir.candidate_id
    LEFT JOIN 
        master_rounds r ON ir.round_id = r.round_id  -- Join with master_rounds to fetch round_number
    LEFT JOIN 
        master_interviewers iv ON ir.interviewer_id = iv.interviewer_id  -- Join with master_interviewers
    LEFT JOIN 
        master_statuses s ON ir.status_id = s.status_id
    WHERE 
        c.candidate_name != 'Demo Candidate' -- Exclude Demo Candidate
    ORDER BY 
        c.candidate_id DESC, ir.ir_id DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    console.log('Candidates with interview rounds:', results);
    res.json(results);
  });
};
//done

  
  // Get candidate details history by ID (including all interview rounds) for CEO  Done
//   exports.getCandidateDetails = (req, res) => {
//     const { id } = req.params;
  
//     const query = `
//       SELECT 
//         c.candidate_id AS Candidate_ID,
//         c.candidate_name AS Candidate_Name,
//         p.position_name AS Position,
//         u.user_name AS HR_Name,
//         ir.round_number AS Round_Number,
//         iv.interviewer_name AS Interviewer,
//         ir.interview_date AS Interview_Date,

//         ir.updated_at AS Updated_At,  -- Include the updated_at field


//         s.status_name AS Status,
//         ir.remarks AS Remarks
//       FROM 
//         trans_candidates c
//       LEFT JOIN 
//         trans_interview_rounds ir ON c.candidate_id = ir.candidate_id AND ir.is_deleted = 0  -- Exclude deleted rounds
//       LEFT JOIN 
//         trans_users u ON c.user_id = u.user_id
//       LEFT JOIN 
//         master_positions p ON c.position_id = p.position_id
//       LEFT JOIN 
//         master_interviewers iv ON ir.interviewer_id = iv.interviewer_id
//       LEFT JOIN 
//         master_statuses s ON ir.status_id = s.status_id
//       WHERE 
//         c.candidate_id = ?
//       ORDER BY 
//         ir.ir_id;
//     `;
  
//     db.query(query, [id], (err, results) => {
//       if (err) {
//         console.error('Database query error:', err);
//         return res.status(500).json({ error: 'Database query error' });
//       }
  
//       // Check if results are empty (i.e., no interview rounds for this candidate)
//       const candidate = {
//         Candidate_ID: results.length > 0 ? results[0].Candidate_ID : id,
//         Candidate_Name: results.length > 0 ? results[0].Candidate_Name : 'Unknown Candidate',
//         Position: results.length > 0 && results[0].Position ? results[0].Position : 'No Position Assigned',
//         HR_Name: results.length > 0 && results[0].HR_Name ? results[0].HR_Name : 'No HR Assigned',
//         interviewRounds: results.length > 0 ? results.map(r => ({
//           Round_Number: r.Round_Number,
//           Interviewer: r.Interviewer,
//           Interview_Date: r.Interview_Date,

//           Updated_At: r.Updated_At,  // Add updated_at to interview rounds


//           Status: r.Status,
//           Remarks: r.Remarks
//         })) : []  // Empty array if no rounds found
//       };
  
//       res.json(candidate);
//     });
// };
//new
exports.getCandidateDetails = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      c.candidate_id AS Candidate_ID,
      c.candidate_name AS Candidate_Name,
      p.position_name AS Position,
      u.user_name AS HR_Name,
      r.round_number AS Round_Number, -- Use round_number from master_rounds with alias r
      iv.interviewer_name AS Interviewer,
      ir.interview_date AS Interview_Date,
      ir.updated_at AS Updated_At,  -- Include the updated_at field
      s.status_name AS Status,
      ir.remarks AS Remarks
    FROM 
      trans_candidates c
    LEFT JOIN 
      trans_interview_rounds ir ON c.candidate_id = ir.candidate_id AND ir.is_deleted = 0 -- Exclude deleted rounds
    LEFT JOIN 
      master_rounds r ON ir.round_id = r.round_id -- Join with master_rounds for round_number
    LEFT JOIN 
      trans_users u ON c.user_id = u.user_id
    LEFT JOIN 
      master_positions p ON c.position_id = p.position_id
    LEFT JOIN 
      master_interviewers iv ON ir.interviewer_id = iv.interviewer_id
    LEFT JOIN 
      master_statuses s ON ir.status_id = s.status_id
    WHERE 
      c.candidate_id = ?
    ORDER BY 
      ir.ir_id;
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
        Updated_At: r.Updated_At,  // Add updated_at to interview rounds
        Status: r.Status,
        Remarks: r.Remarks
      })) : [] // Empty array if no rounds found
    };

    res.json(candidate);
  });
};
//done

  //new done
  // Get interview rounds history for a candidate (HR) Done
  exports.getInterviewRoundsForCandidate = (req, res) => {
    const { c_id } = req.params;
    console.log("Received request for interview rounds with candidate ID:", c_id);
  
    // Query to fetch interview rounds with interviewer's name and status name
    const query = `
    SELECT 
      r.round_number AS Round_Number,          -- Fetch round_number from master_rounds
      i.interviewer_name AS Interviewer,       -- Fetch interviewer_name from master_interviewers
      ir.interview_date AS Interview_Date,     -- Fetch interview_date from trans_interview_rounds
      ir.updated_at AS Updated_At,             -- Fetch updated_at from trans_interview_rounds
      s.status_name AS Status,                 -- Fetch status_name from master_statuses
      ir.remarks AS Remarks                    -- Fetch remarks from trans_interview_rounds
    FROM trans_interview_rounds ir
    LEFT JOIN master_rounds r ON ir.round_id = r.round_id  -- Join master_rounds for round_number
    LEFT JOIN master_interviewers i ON ir.interviewer_id = i.interviewer_id  -- Join master_interviewers
    LEFT JOIN master_statuses s ON ir.status_id = s.status_id               -- Join master_statuses
    WHERE ir.candidate_id = ? AND ir.is_deleted = 0                         -- Filter by candidate_id and exclude deleted rounds
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
  
  






  
  

  // Add a new entry (position, status, interviewer)
  exports.addAdminEntry = (req, res) => {
    const { type, name } = req.body;

    // Define the appropriate table based on the type
    let table;
    switch (type) {
      case 'position':
        table = 'master_positions';  // Updated to match schema
        break;
      case 'status':
        table = 'master_statuses';  // Updated to match schema
        break;
      case 'interviewer':
        table = 'master_interviewers';  // Updated to match schema
        break;
      default:
        return res.status(400).json({ error: 'Invalid entry type' });
    }

    // Use the correct column name based on the type
    let columnName;
    if (table === 'master_positions') {
      columnName = 'position_name';  // Correct column name for positions
    } else if (table === 'master_statuses') {
      columnName = 'status_name';  // Correct column name for statuses
    } else if (table === 'master_interviewers') {
      columnName = 'interviewer_name';  // Correct column name for interviewers
    }

    const query = `INSERT INTO ${table} (${columnName}) VALUES (?)`;

    db.query(query, [name], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error adding entry' });
      }
      res.status(201).json({ message: `${type} added successfully` });
    });
};

  
// Delete an entry (position, status, interviewer)
exports.deleteAdminEntry = (req, res) => {
  const { type, id } = req.params;

  // Validate if the id is numeric
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Define the appropriate table and column based on the type
  let table;
  let column;
  let checkQuery;

  switch (type) {
    case 'position':
      table = 'master_positions';
      column = 'position_id';
      // Check if there are any candidates associated with the position
      checkQuery = `SELECT COUNT(*) AS count FROM trans_candidates WHERE position_id = ?`;
      break;
    case 'status':
      table = 'master_statuses';
      column = 'status_id';
      // No check for dependent rows for status, so no query needed
      checkQuery = null;
      break;
    case 'interviewer':
      table = 'master_interviewers';
      column = 'interviewer_id';
      // No check for dependent rows for interviewer, so no query needed
      checkQuery = null;
      break;
    default:
      return res.status(400).json({ error: 'Invalid entry type' });
  }

  // If there's a check query (for positions), we check for dependent candidates
  if (checkQuery) {
    db.query(checkQuery, [id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error checking for dependent rows' });
      }

      // If there are dependent rows (candidates), return an error
      if (results[0].count > 0) {
        return res.status(400).json({ error: 'Cannot delete position because there are candidates associated with it' });
      }

      // Proceed with deleting the position
      const query = `DELETE FROM ${table} WHERE ${column} = ?`;

      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error deleting entry' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: `${type} deleted successfully` });
      });
    });
  } else {
    // If there's no check for dependent rows (status, interviewer), just proceed with deletion
    const query = `DELETE FROM ${table} WHERE ${column} = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error deleting entry' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      res.json({ message: `${type} deleted successfully` });
    });
  }
};




// Fetch admin data (positions, statuses, interviewers)
exports.getAdminData = (req, res) => {
  // Modified queries to reflect the new schema
  const positionsQuery = 'SELECT * FROM master_positions';
  const statusesQuery = 'SELECT * FROM master_statuses';
  const interviewersQuery = 'SELECT * FROM master_interviewers';

  db.query(positionsQuery, (err, positions) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching positions' });
    }

    db.query(statusesQuery, (err, statuses) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error fetching statuses' });
      }

      db.query(interviewersQuery, (err, interviewers) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error fetching interviewers' });
        }

        // Send the full data with id and name
        res.json({
          positions: positions.map(p => ({
            position_id: p.position_id,
            position_name: p.position_name
          })),
          statuses: statuses.map(s => ({
            status_id: s.status_id,
            status_name: s.status_name
          })),
          interviewers: interviewers.map(i => ({
            interviewer_id: i.interviewer_id,
            interviewer_name: i.interviewer_name
          }))
        });
      });
    });
  });
};

// -----------------------

// Get all users
exports.getAllUsers = (req, res) => {
  const query = `
    SELECT u.user_id, u.user_name, r.role_name, r.role_id
    FROM trans_users u
    INNER JOIN master_role r ON u.role_id = r.role_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Get all roles
exports.getAllRoles = (req, res) => {
  const query = `
    SELECT role_id, role_name FROM master_role
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Update user role
exports.updateUserRole = (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  if (!userId || !roleId) {
    return res.status(400).json({ error: 'User ID and Role ID are required' });
  }

  const query = `
    UPDATE trans_users SET role_id = ? WHERE user_id = ?
  `;

  db.query(query, [roleId, userId], (err, result) => {
    if (err) {
      console.error('Error updating user role:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User role updated successfully' });
  });
};

// Add new user
exports.addUser = (req, res) => {
  const { user_name, password, role_id } = req.body;

  if (!user_name || !password || !role_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO trans_users (user_name, password, role_id) VALUES (?, ?, ?)
  `;

  db.query(query, [user_name, password, role_id], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  });
};

// exports.deleteUser = (req, res) => {
//   const userId = req.params.userId;
//   console.log(`Attempting to delete user with ID: ${userId}`);  // Add this to check if the route is hit
  
//   const query = 'DELETE FROM trans_users WHERE user_id = ?';
  
//   db.query(query, [userId], (err, result) => {
//     if (err) {
//       console.error('Error deleting user:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     if (result.affectedRows > 0) {
//       return res.status(200).json({ message: 'User deleted successfully' });
//     } else {
//       return res.status(404).json({ error: 'User not found' });
//     }
//   });
// };

//new 
exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  console.log(`Attempting to delete user with ID: ${userId}`);

  // Check if the user is associated with any candidates
  const checkCandidateQuery = `
    SELECT * FROM trans_candidates WHERE user_id = ?
  `;

  db.query(checkCandidateQuery, [userId], (err, candidates) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error while checking candidates.' });
    }

    if (candidates.length > 0) {
      return res.status(400).json({ error: 'User cannot be deleted as they are associated with candidates.' });
    }

    // If no associations are found, proceed with deletion
    const deleteUserQuery = 'DELETE FROM trans_users WHERE user_id = ?';

    db.query(deleteUserQuery, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: 'Database error during deletion.' });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'User deleted successfully' });
      } else {
        return res.status(404).json({ error: 'User not found.' });
      }
    });
  });
};


//done








// Backend route for updating the last interview round
// exports.updateInterviewRound = (req, res) => {
//   const { id } = req.params; // Candidate ID
//   const { round_number, interviewer, interview_date, status, remarks } = req.body;

//   // Check if all required fields are provided
//   if (!round_number || !interviewer || !interview_date || !status) {
//     return res.status(400).json({ error: 'All fields are required to update the interview round.' });
//   }

//   // Get interviewer_id from the master_interviewers table
//   const getInterviewerIdQuery = `
//     SELECT interviewer_id FROM master_interviewers WHERE interviewer_name = ?
//   `;
  
//   db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
//     if (err) {
//       console.error('Error fetching interviewer ID:', err);
//       return res.status(500).json({ error: 'Database error fetching interviewer ID.' });
//     }

//     if (interviewerResults.length === 0) {
//       return res.status(400).json({ error: 'Interviewer not found.' });
//     }

//     const interviewerId = interviewerResults[0].interviewer_id;

//     // Get status_id from the master_statuses table
//     const getStatusIdQuery = `
//       SELECT status_id FROM master_statuses WHERE status_name = ?
//     `;

//     db.query(getStatusIdQuery, [status], (err, statusResults) => {
//       if (err) {
//         console.error('Error fetching status ID:', err);
//         return res.status(500).json({ error: 'Database error fetching status ID.' });
//       }

//       if (statusResults.length === 0) {
//         return res.status(400).json({ error: 'Status not found.' });
//       }

//       const statusId = statusResults[0].status_id;

//       // Update the interview round in trans_interview_rounds
//       const updateInterviewRoundQuery = `
//         UPDATE trans_interview_rounds 
//         SET round_number = ?, interviewer_id = ?, interview_date = ?, status_id = ?, remarks = ?
//         WHERE candidate_id = ? 
//         ORDER BY ir_id DESC LIMIT 1
//       `;

//       db.query(
//         updateInterviewRoundQuery,
//         [round_number, interviewerId, interview_date, statusId, remarks, id],
//         (err) => {
//           if (err) {
//             console.error('Error updating interview round:', err);
//             return res.status(500).json({ error: err.message || 'Database error.' });
//           }

//           res.status(200).json({ message: 'Interview round updated successfully.' });
//         }
//       );
//     });
//   });
// };
//new
// Backend route for updating the last interview round
exports.updateInterviewRound = (req, res) => {
  const { id } = req.params; // Candidate ID
  const { round_number, interviewer, interview_date, status, remarks } = req.body;

  // Check if all required fields are provided
  if (!round_number || !interviewer || !interview_date || !status) {
    return res.status(400).json({ error: 'All fields are required to update the interview round.' });
  }

  // Get round_id from the master_rounds table
  const getRoundIdQuery = `
    SELECT round_id FROM master_rounds WHERE round_number = ?
  `;

  db.query(getRoundIdQuery, [round_number], (err, roundResults) => {
    if (err) {
      console.error('Error fetching round ID:', err);
      return res.status(500).json({ error: 'Database error fetching round ID.' });
    }

    if (roundResults.length === 0) {
      return res.status(400).json({ error: 'Round not found.' });
    }

    const roundId = roundResults[0].round_id;

    // Get interviewer_id from the master_interviewers table
    const getInterviewerIdQuery = `
      SELECT interviewer_id FROM master_interviewers WHERE interviewer_name = ?
    `;
  
    db.query(getInterviewerIdQuery, [interviewer], (err, interviewerResults) => {
      if (err) {
        console.error('Error fetching interviewer ID:', err);
        return res.status(500).json({ error: 'Database error fetching interviewer ID.' });
      }

      if (interviewerResults.length === 0) {
        return res.status(400).json({ error: 'Interviewer not found.' });
      }

      const interviewerId = interviewerResults[0].interviewer_id;

      // Get status_id from the master_statuses table
      const getStatusIdQuery = `
        SELECT status_id FROM master_statuses WHERE status_name = ?
      `;

      db.query(getStatusIdQuery, [status], (err, statusResults) => {
        if (err) {
          console.error('Error fetching status ID:', err);
          return res.status(500).json({ error: 'Database error fetching status ID.' });
        }

        if (statusResults.length === 0) {
          return res.status(400).json({ error: 'Status not found.' });
        }

        const statusId = statusResults[0].status_id;

        // Update the interview round in trans_interview_rounds
        const updateInterviewRoundQuery = `
          UPDATE trans_interview_rounds 
          SET round_id = ?, interviewer_id = ?, interview_date = ?, status_id = ?, remarks = ?
          WHERE candidate_id = ? 
          ORDER BY ir_id DESC LIMIT 1
        `;

        db.query(
          updateInterviewRoundQuery,
          [roundId, interviewerId, interview_date, statusId, remarks, id],
          (err) => {
            if (err) {
              console.error('Error updating interview round:', err);
              return res.status(500).json({ error: err.message || 'Database error.' });
            }

            res.status(200).json({ message: 'Interview round updated successfully.' });
          }
        );
      });
    });
  });
};
//done



// New API to get all candidates for HR Admin
// exports.getAllCandidatesHrAdmin = (req, res) => {
//   const query = `
//     SELECT 
//       c.candidate_id AS Candidate_ID,
//       c.candidate_name AS Candidate_Name,
//       p.position_name AS Position,
//       ir.round_number AS Round_Number,
//       ir.interview_date AS Interview_Date,
//       ir.updated_at AS Updated_At,  
//       ir.is_deleted AS Is_Deleted,  
//       i.interviewer_name AS Interviewer,
//       s.status_name AS Status,
//       ir.remarks AS Remarks,
//       u.user_name AS HR_Name  -- Include the HR name from trans_users
//     FROM 
//       trans_candidates c
//     LEFT JOIN 
//       trans_interview_rounds ir ON c.candidate_id = ir.candidate_id AND ir.is_deleted = 0
//     LEFT JOIN 
//       master_positions p ON c.position_id = p.position_id
//     LEFT JOIN 
//       master_interviewers i ON ir.interviewer_id = i.interviewer_id
//     LEFT JOIN 
//       master_statuses s ON ir.status_id = s.status_id
//     LEFT JOIN 
//       trans_users u ON c.user_id = u.user_id  -- Join with trans_users to get HR name
//     WHERE 
//       c.candidate_name != 'Demo Candidate' -- Exclude Demo Candidate
//     ORDER BY 
//       c.candidate_id DESC, ir.ir_id DESC;
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Database query error:', err);
//       return res.status(500).json({ error: 'Database query error' });
//     }

//     const candidates = results.reduce((acc, candidate) => {
//       const existingCandidate = acc.find(c => c.Candidate_ID === candidate.Candidate_ID);

//       if (existingCandidate) {
//         if (candidate.Round_Number && candidate.Is_Deleted === 0) {
//           existingCandidate.interviewRounds.push({
//             Round_Number: candidate.Round_Number,
//             Interviewer: candidate.Interviewer,
//             Interview_Date: candidate.Interview_Date,
//             Updated_At: candidate.Updated_At,
//             Status: candidate.Status,
//             Remarks: candidate.Remarks
//           });
//         }
//       } else {
//         acc.push({
//           Candidate_ID: candidate.Candidate_ID,
//           Candidate_Name: candidate.Candidate_Name,
//           Position: candidate.Position,
//           HR_Name: candidate.HR_Name,  // Include HR_Name here
//           interviewRounds: candidate.Round_Number && candidate.Is_Deleted === 0 ? [{
//             Round_Number: candidate.Round_Number,
//             Interviewer: candidate.Interviewer,
//             Interview_Date: candidate.Interview_Date,
//             Updated_At: candidate.Updated_At,
//             Status: candidate.Status,
//             Remarks: candidate.Remarks
//           }] : []
//         });
//       }

//       return acc;
//     }, []);

//     res.json(candidates);
//   });
// };
//new
exports.getAllCandidatesHrAdmin = (req, res) => {
  const query = `
    SELECT 
      c.candidate_id AS Candidate_ID,
      c.candidate_name AS Candidate_Name,
      p.position_name AS Position,
      r.round_number AS Round_Number, -- Use round_number from master_rounds with alias r
      ir.interview_date AS Interview_Date,
      ir.updated_at AS Updated_At,  
      ir.is_deleted AS Is_Deleted,  
      i.interviewer_name AS Interviewer,
      s.status_name AS Status,
      ir.remarks AS Remarks,
      u.user_name AS HR_Name  -- Include the HR name from trans_users
    FROM 
      trans_candidates c
    LEFT JOIN 
      trans_interview_rounds ir ON c.candidate_id = ir.candidate_id AND ir.is_deleted = 0
    LEFT JOIN 
      master_rounds r ON ir.round_id = r.round_id -- Join with master_rounds using alias r
    LEFT JOIN 
      master_positions p ON c.position_id = p.position_id
    LEFT JOIN 
      master_interviewers i ON ir.interviewer_id = i.interviewer_id
    LEFT JOIN 
      master_statuses s ON ir.status_id = s.status_id
    LEFT JOIN 
      trans_users u ON c.user_id = u.user_id  -- Join with trans_users to get HR name
    WHERE 
      c.candidate_name != 'Demo Candidate' -- Exclude Demo Candidate
    ORDER BY 
      c.candidate_id DESC, ir.ir_id DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }

    const candidates = results.reduce((acc, candidate) => {
      const existingCandidate = acc.find(c => c.Candidate_ID === candidate.Candidate_ID);

      if (existingCandidate) {
        if (candidate.Round_Number && candidate.Is_Deleted === 0) {
          existingCandidate.interviewRounds.push({
            Round_Number: candidate.Round_Number,
            Interviewer: candidate.Interviewer,
            Interview_Date: candidate.Interview_Date,
            Updated_At: candidate.Updated_At,
            Status: candidate.Status,
            Remarks: candidate.Remarks
          });
        }
      } else {
        acc.push({
          Candidate_ID: candidate.Candidate_ID,
          Candidate_Name: candidate.Candidate_Name,
          Position: candidate.Position,
          HR_Name: candidate.HR_Name,  // Include HR_Name here
          interviewRounds: candidate.Round_Number && candidate.Is_Deleted === 0 ? [{
            Round_Number: candidate.Round_Number,
            Interviewer: candidate.Interviewer,
            Interview_Date: candidate.Interview_Date,
            Updated_At: candidate.Updated_At,
            Status: candidate.Status,
            Remarks: candidate.Remarks
          }] : []
        });
      }

      return acc;
    }, []);

    res.json(candidates);
  });
};
//done