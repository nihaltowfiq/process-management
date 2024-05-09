import { Request, Response } from 'express';
import { generateUniqueId, getCurrentTimeAndDate } from '../utils.js';
import ProcessModel, { IProcess } from '../models/process.models.js';
import { startScheduler, stopScheduler } from '../services/scheduler.services.js';

export async function createProcess(_: Request, res: Response) {
	try {
		const pid = generateUniqueId();
		const data: IProcess = await ProcessModel.create({
			pid,
			creation_time: getCurrentTimeAndDate(),
		});
		startScheduler(pid);

		res.status(201).json(data);
	} catch (err) {
		res.status(400).send(err);
	}
}

export async function getAllProcess(_: Request, res: Response) {
	try {
		const data = await ProcessModel.find({}, { pid: 1, creation_time: 1, _id: 0 });

		res.json(data);
	} catch (err) {
		console.log(err);

		res.status(500).send(err);
	}
}

export async function getSingleProcess(req: Request, res: Response) {
	try {
		const data = await ProcessModel.findOne({ pid: parseInt(req.params.pid) }, { _id: 0, logs: 1 });
		if (!data) return res.status(404).json({ message: 'Data not found' });
		res.json(data);
	} catch (err) {
		res.status(500).send(err);
	}
}

export async function deleteSingleProcess(req: Request, res: Response) {
	try {
		const deletedData = await ProcessModel.findOneAndDelete({ pid: parseInt(req.params.pid) });
		if (!deletedData) return res.status(404).json({ message: 'Data not found' });

		stopScheduler(parseInt(req.params.pid));

		res.json({ message: 'Data deleted successfully' });
	} catch (err) {
		res.status(500).send(err);
	}
}
