import cron from 'node-cron';
import ProcessModel from '../models/process.models.js';
import { getCurrentTimeAndDate } from '../utils.js';

export function startScheduler(pid: number) {
	cron.schedule(
		'*/5 * * * * *',
		async () => {
			try {
				await ProcessModel.updateOne({ pid }, { $push: { logs: getCurrentTimeAndDate({ isSecond: true }) } });

				console.log(`Updated logs PID:${pid}`);
			} catch (error: any) {
				console.error(`Error updating logs - PID:${pid}`, error?.message);
			}
		},
		{
			name: pid.toString(),
		},
	);
}

export function stopScheduler(pid: number) {
	const tasks = cron.getTasks();

	const task = tasks.get(pid.toString());
	task?.stop();
}
