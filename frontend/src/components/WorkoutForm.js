import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const parseTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be logged in");
      return;
    }
    const workout = { title, load: parseTimeToMinutes(load), reps: parseTimeToMinutes(reps) };

    const response = await fetch(process.env.REACT_APP_API_URL + "/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form
      className="create"
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#333", fontSize: "1.5rem", marginBottom: "1rem" }}>Add a New Task</h3>
      
      <label style={{ fontWeight: "bold", color: "#555" }}>Task Title:</label>
      <input
        type="text"
        className={emptyFields.includes("title") ? "error" : ""}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <label style={{ fontWeight: "bold", color: "#555" }}>Start Time (in 24 hr format):</label>
      <input
        type="time"
        className={emptyFields.includes("load") ? "error" : ""}
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <label style={{ fontWeight: "bold", color: "#555" }}>End Time (in 24 hr format):</label>
      <input
        type="time"
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <button
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#4CAF50",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Add Task
      </button>
      
      {error && (
        <div style={{ color: "red", marginTop: "1rem", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
