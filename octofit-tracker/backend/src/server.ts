import express from 'express';
import { connectToDatabase, User, Team, Activity, LeaderboardEntry, Workout } from './models';

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiBaseUrl: `${baseUrl}/api`,
  });
});

const registerResourceRoutes = (resourceName: string, model: any) => {
  const routePath = `/api/${resourceName}`;

  app.get([routePath, `${routePath}/`], async (_req, res) => {
    try {
      const data = await model.find({});
      res.json({
        resource: resourceName,
        apiUrl: `${baseUrl}${routePath}/`,
        data,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  });

  app.post([routePath, `${routePath}/`], async (req, res) => {
    try {
      const newItem = await model.create(req.body);
      res.status(201).json({
        resource: resourceName,
        apiUrl: `${baseUrl}${routePath}/`,
        data: newItem,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create record' });
    }
  });
};

registerResourceRoutes('users', User);
registerResourceRoutes('teams', Team);
registerResourceRoutes('activities', Activity);
registerResourceRoutes('leaderboard', LeaderboardEntry);
registerResourceRoutes('workouts', Workout);

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
