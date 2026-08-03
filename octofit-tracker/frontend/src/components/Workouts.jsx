import { useEffect, useState } from 'react';
import { fetchResource, buildApiUrl } from '../api';

const codespaceWorkoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : null;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">API: {buildApiUrl('workouts')}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {workouts.length === 0 ? (
          <div className="list-group-item">No workouts found.</div>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id || workout.id} className="list-group-item">
              <strong>{workout.title}</strong>
              <div>Focus: {workout.focus}</div>
              <div>Duration: {workout.durationMinutes} min</div>
              <div className="text-secondary">Difficulty: {workout.difficulty}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;
