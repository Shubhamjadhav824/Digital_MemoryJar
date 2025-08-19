import { Router } from 'express';
import memories from './memories';
const r = Router();
r.get('/ping', (req, res) => res.json({ ok: true }));
r.use('/memories', memories);
export default r;
