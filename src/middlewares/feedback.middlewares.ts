import { Request, Response } from 'express';

// 404 not found handler
export function notFoundHanlder(req: Request, res: Response) {
	res.status(404);
	res.json({
		message: 'Your requested content was not found!',
	});
}
