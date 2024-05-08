import { Request, Response } from 'express';
import { generateUniqueId, getCurrentTimeAndDate } from '../utils.js';
import ProcessModel, { IProcess } from '../models/process.models.js';

export async function createProcess(req: Request, res: Response) {
	try {
		const data: IProcess = await ProcessModel.create({
			pid: generateUniqueId(),
			creation_time: getCurrentTimeAndDate(),
		});
		res.status(201).json(data);
	} catch (err) {
		res.status(400).send(err);
	}
}

export async function getAllProcess(req: Request, res: Response) {
	try {
		const data = await ProcessModel.find();
		res.json(data);
	} catch (err) {
		res.status(500).send(err);
	}
}

export async function getSingleProcess(req: Request, res: Response) {
	try {
		console.log(req.params.pid);

		const data = await ProcessModel.findOne({ pid: parseInt(req.params.pid) });
		if (!data) {
			return res.status(404).json({ message: 'Data not found' });
		}
		res.json(data);
	} catch (err) {
		res.status(500).send(err);
	}
}

export async function deleteSingleProcess(req: Request, res: Response) {
	try {
		const deletedData = await ProcessModel.findOneAndDelete({ pid: parseInt(req.params.pid) });
		if (!deletedData) {
			return res.status(404).json({ message: 'Data not found' });
		}
		res.json({ message: 'Data deleted successfully' });
	} catch (err) {
		res.status(500).send(err);
	}
}

