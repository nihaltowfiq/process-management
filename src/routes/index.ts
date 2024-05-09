import { Express } from 'express';
import processRoute from './process.routes.js';

export default function setupRoutes(app: Express) {
	app.use('/api/', processRoute);
}
