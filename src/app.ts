import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import { config as dbConfig } from './config/db';
import { router as bankRouter } from './routes/bank';
import { router as mortgageRouter } from './routes/mortgage';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/bank', bankRouter);
app.use('/mortgage', mortgageRouter);

// Conect To DB
mongoose.connect(
  dbConfig.connectionString,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => console.log('Connected to Database')
);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
