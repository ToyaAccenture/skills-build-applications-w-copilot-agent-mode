import { useEffect, useState } from 'react';
import { fetchResource, buildApiUrl } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">API: {buildApiUrl('teams')}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gy-3">
        {teams.length === 0 ? (
          <div className="col-12">No teams found.</div>
        ) : (
          teams.map((team) => (
            <div key={team._id || team.id} className="col-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">Sport: {team.sport}</p>
                  <p className="card-text">Members: {team.members}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teams;
