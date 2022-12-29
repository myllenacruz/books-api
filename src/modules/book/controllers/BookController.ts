import { Request, Response } from "express";
import { CreateBookService } from "@modules/book/services/CreateBookService";
import { container } from "tsyringe";

export class BookController {
	public async create(
		request: Request, response: Response
	): Promise<Response> {
		const {
			sbn,
			name,
			description,
			stock_quantity,
			author
		} = request.body;

		try {
			const createBook = container.resolve(CreateBookService);

			const book = await createBook.execute({
				sbn,
				name,
				description,
				stock_quantity,
				author
			});

			return response.status(201).json(book);
		} catch (error) {
			return response.status(500).json({ error });
		}
	}
}
