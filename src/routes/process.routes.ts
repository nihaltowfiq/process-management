import { Router } from 'express';
import {
	createProcess,
	deleteSingleProcess,
	getAllProcess,
	getSingleProcess,
} from '../controllers/process.controllers.js';

const processRoute = Router();

processRoute.post('/create-process', createProcess);

processRoute.get('/get-all', getAllProcess);

processRoute.get('/get-single/:pid', getSingleProcess);

processRoute.delete('/delete-process/:pid', deleteSingleProcess);

export default processRoute;

