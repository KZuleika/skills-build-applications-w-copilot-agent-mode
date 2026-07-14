import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
const router = Router();
router.get('/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json({ message: 'Leaderboard collection', count: leaderboard.length, data: leaderboard });
});
router.post('/', async (req, res) => {
    const payload = req.body ?? {};
    const entry = await LeaderboardEntry.create({
        rank: payload.rank ?? 1,
        userId: payload.userId ?? 'user-1',
        score: payload.score ?? 0,
    });
    res.status(201).json(entry);
});
export default router;
