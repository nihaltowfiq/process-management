import dotenv from 'dotenv';
import express, { Express } from 'express';
import connectDatabase from './db.js';
import setupRoutes from './routes/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// database connection
connectDatabase();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing setup
setupRoutes(app);

// error handler
// app.use(notFoundHanlder);
// app.use(errorHandler);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
