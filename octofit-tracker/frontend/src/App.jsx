import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to build
          the Codespaces API base URL.
          Without this variable, the app falls back to <code>http://localhost:8000</code>.
        </p>
        <nav className="nav nav-pills flex-column flex-sm-row gap-2">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <div className="alert alert-info">
                Select a section to view backend data.
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
