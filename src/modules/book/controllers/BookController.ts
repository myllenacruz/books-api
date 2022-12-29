import { Request, Response } from "express";
import { CreateBookService } from "@modules/book/services/CreateBookService";
import { container } from "tsyringe";
import { ListBookService } from "@modules/book/services/ListBookService";
import { ListOneBookService } from "@modules/book/services/ListOneBookService";

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

	public async list(
		request: Request, response: Response
	): Promise<Response> {
		try {
			const listBooks = container.resolve(ListBookService);

			const books = await listBooks.execute(
				{ paginationOptions: request.paginationOptions }
			);

			return response.status(200).json(books);
		} catch (error) {
			return response.status(500).json({ error });
		}
	}

	public async listOne(
		request: Request, response: Response
	): Promise<Response> {
		const { id } = request.params;

		try {
			const listBook = container.resolve(ListOneBookService);

			const book = await listBook.execute({ id: +id });

			return response.status(200).json(book);
		} catch (error) {
			return response.status(500).json({ error });
		}
	}
}
