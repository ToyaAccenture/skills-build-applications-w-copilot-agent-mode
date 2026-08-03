import { useEffect, useState } from 'react';
import { fetchResource, buildApiUrl } from '../api';

const codespaceLeaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : null;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">API: {buildApiUrl('leaderboard')}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="3">No leaderboard entries found.</td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry._id || entry.id}>
                <td>{entry.rank}</td>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
