import { useEffect, useState } from 'react';
import { fetchResource, buildApiUrl } from '../api';

const codespaceActivitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : null;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('activities')
      .then(setActivities)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">API: {buildApiUrl('activities')}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {activities.length === 0 ? (
          <li className="list-group-item">No activities available.</li>
        ) : (
          activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <strong>{activity.type}</strong> — {activity.durationMinutes} minutes
              <div className="text-secondary">User ID: {activity.userId}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Activities;
