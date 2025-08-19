import { Router } from 'express';
import Memory from '../models/Memory';
const r = Router();

r.get('/', async (req, res) => {
  const { q, tag, mood, from, to } = req.query as any;
  const filter: any = {};
  if (tag) filter.tags = tag;
  if (mood) filter.mood = mood;
  if (from || to) filter.occurredAt = { ...(from && { $gte: new Date(from) }), ...(to && { $lte: new Date(to) }) };
  if (q) filter.$text = { $search: q };
  const items = await Memory.find(filter).sort({ occurredAt: -1 }).limit(200);
  res.json(items);
});

r.post('/', async (req, res) => {
  try {
    const doc = await Memory.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

export default r;
