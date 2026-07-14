import { Router } from 'express';
import Team from '../models/Team.js';
const router = Router();
router.get('/', async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json({ message: 'Teams collection', count: teams.length, data: teams });
});
router.post('/', async (req, res) => {
    const payload = req.body ?? {};
    const team = await Team.create({
        name: payload.name ?? 'New Team',
        members: payload.members ?? [],
    });
    res.status(201).json(team);
});
export default router;
