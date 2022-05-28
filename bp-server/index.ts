import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import ErrorHandler from 'src/middlewares/ErrorHandler';
import AuthRouter from 'src/routes/auth';

const app = express();

dotenv.config();

app.use(urlencoded({ extended: true }));

const port = process.env.PORT;

app.use('/auth', AuthRouter);
app.use(ErrorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening on port ${port}`);
});
