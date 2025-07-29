import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [attendees, setAttendees] = useState([]);

  // Add new attendance
  const handleAdd = async () => {
    if (!name) return;
    await axios.post("http://localhost:5000/add-attendance", { name });
    setName("");
    fetchAttendance();
  };

  // Fetch attendance list
  const fetchAttendance = async () => {
    const res = await axios.get("http://localhost:5000/attendance");
    setAttendees(res.data);
  };

  // Delete attendance by index
  const handleDelete = async (index) => {
    await axios.delete(`http://localhost:5000/delete-attendance/${index}`);
    fetchAttendance();
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif" }}>
      <h2>Attendance Tracker</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <h3>Attendance List:</h3>
      <ul>
        {attendees.length === 0 ? (
          <p>No attendees yet.</p>
        ) : (
          attendees.map((a, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {a.name} - {new Date(a.time).toLocaleString()}
              <button
                onClick={() => handleDelete(index)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
