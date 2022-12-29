import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	sbn: string;
	name: string;
	description: string;
	stock_quantity: number;
	author: string;
}

@injectable()
export class CreateBookService {
	constructor(
		@inject("BookRepository")
		private bookRepository: IBookRepository
	) {}

	public async execute(
		{
			name,
			description,
			sbn,
			stock_quantity,
			author
		}: IRequest
	): Promise<Book> {
		const bookSbn = await this.bookRepository.findBySbn(sbn);
		const bookName = await this.bookRepository.findByName(name);

		if (bookSbn) throw new AppError("Sbn already existis!", 409);

		if (bookName) throw new AppError("Book name already existis!", 409);

		if (stock_quantity <= 0) throw new AppError("Stock quantity has to be more than 0", 400);

		const book = await this.bookRepository.create({
			name,
			description,
			sbn,
			stock_quantity,
			author
		});

		return book;
	}
}
