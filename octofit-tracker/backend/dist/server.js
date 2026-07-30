"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiBaseUrl: `${baseUrl}/api`,
    });
});
const registerResourceRoutes = (resourceName, model) => {
    const routePath = `/api/${resourceName}`;
    app.get([routePath, `${routePath}/`], async (_req, res) => {
        try {
            const data = await model.find({});
            res.json({
                resource: resourceName,
                apiUrl: `${baseUrl}${routePath}/`,
                data,
            });
        }
        catch (error) {
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
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create record' });
        }
    });
};
registerResourceRoutes('users', models_1.User);
registerResourceRoutes('teams', models_1.Team);
registerResourceRoutes('activities', models_1.Activity);
registerResourceRoutes('leaderboard', models_1.LeaderboardEntry);
registerResourceRoutes('workouts', models_1.Workout);
(0, models_1.connectToDatabase)()
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
