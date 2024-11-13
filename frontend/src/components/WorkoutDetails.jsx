import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import styled from "styled-components";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  // Function to convert minutes back to HH:MM format
  const formatMinutesToHHMM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <StyledCard>
      <div className="card">
        <h4 className="card__title">{workout.title}</h4>
        <p className="card__content">
          <strong>Start Time: </strong>
          {formatMinutesToHHMM(workout.load)}
        </p>
        <p className="card__content">
          <strong>End Time: </strong>
          {formatMinutesToHHMM(workout.reps)}
        </p>
        <p className="card__timestamp">
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </p>
        <span className="card__delete" onClick={handleClick}>
          delete
        </span>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  .card {
    width: 300px;
    padding: 20px;
    background: #fff;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #000;
  }

  .card__title {
    font-size: 24px;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 10px;
    position: relative;
  }

  .card__content {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }

  .card__timestamp {
    font-size: 14px;
    color: #777;
    margin-bottom: 15px;
  }

  .card__delete {
    font-size: 16px;
    color: red;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    padding: 8px;
    border: 3px solid #000;
    background: #000;
    color: #fff;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s;
  }

  .card__delete::before {
    content: "Sure?";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #5ad641;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.3s;
  }

  .card__delete:hover::before {
    transform: translateY(0);
  }

  .card__delete:active {
    transform: scale(0.95);
  }
`;

export default WorkoutDetails;
