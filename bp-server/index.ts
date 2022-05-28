import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import AuthRouter from 'src/routes/auth';
import ErrorHandler from 'src/middlewares/ErrorHandler';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

const port = process.env.PORT;

app.use('/auth', AuthRouter);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
