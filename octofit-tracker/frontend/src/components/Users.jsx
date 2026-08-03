import { useEffect, useState } from 'react';
import { fetchResource, buildApiUrl } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResource('users')
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <p className="text-muted">API: {buildApiUrl('users')}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {users.length === 0 ? (
          <div className="list-group-item">No users found.</div>
        ) : (
          users.map((user) => (
            <div key={user._id || user.id} className="list-group-item">
              <strong>{user.name}</strong>
              <div>{user.email}</div>
              <div className="text-secondary">Role: {user.role}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users;
