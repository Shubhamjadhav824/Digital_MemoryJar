import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/memory-jar';

mongoose.connect(MONGO).then(()=> {
  app.listen(PORT, ()=> console.log(`API up on ${PORT}`));
}).catch(err => {
  console.error('Mongo connect error', err);
  process.exit(1);
});
