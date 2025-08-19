import { Schema, model } from 'mongoose';

const MediaSchema = new Schema({
  kind: { type: String, enum: ['image','audio','video'], required: true },
  url: { type: String, required: true },
  key: { type: String, required: true },
  durationMs: Number
}, { _id: false });

const MemorySchema = new Schema({
  jarId: { type: Schema.Types.ObjectId, ref: 'Jar', index: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
  media: [MediaSchema],
  links: [String],
  mood: { type: String, enum: ['happy','grateful','nostalgic','proud','silly','other'] },
  tags: { type: [String], index: true },
  occurredAt: { type: Date, index: true, default: Date.now },
  visibility: { type: String, enum: ['public','members','private'], default: 'members' },
  hiddenUntil: Date,
  reactions: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, type: String }]
}, { timestamps: true });

export default model('Memory', MemorySchema);
