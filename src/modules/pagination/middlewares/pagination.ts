import { Request, Response, NextFunction } from "express";

export function pagination (
	request: Request,
	_response: Response,
	next: NextFunction
): void {
	const { page, limit } = request.query;

	const pageInt = page ? parseInt(String(page), 10) : 1;
	const limitInt = limit ? parseInt(String(limit), 10) : 50;

	request.paginationOptions = {
		page: pageInt < 1 ? 1 : pageInt,
		limit: limitInt > 200 ? 200 : limitInt
	};

	return next();
}
