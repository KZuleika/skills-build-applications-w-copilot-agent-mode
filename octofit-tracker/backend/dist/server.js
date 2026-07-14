import express from 'express';
import dotenv from 'dotenv';
import './config/database.ts';
dotenv.config();
const app = express();
const port = Number(process.env.PORT || 8000);
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.listen(port, () => {
    console.log(`Octofit Tracker backend running on port ${port}`);
});
