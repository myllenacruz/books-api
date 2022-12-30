import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IAuthorRepository } from "@modules/book/repositories/IAuthorRepository";

interface IRequest {
	sbn: string;
	name: string;
	description: string;
	stock_quantity: number;
	author_id: number;
}

@injectable()
export class CreateBookService {
	constructor(
		@inject("BookRepository")
		private bookRepository: IBookRepository,

		@inject("AuthorRepository")
		private authorRepository: IAuthorRepository
	) {}

	public async execute(
		{
			name,
			description,
			sbn,
			stock_quantity,
			author_id
		}: IRequest
	): Promise<Book> {
		const bookSbn = await this.bookRepository.findBySbn(sbn);
		const bookName = await this.bookRepository.findByName(name);
		const author = await this.authorRepository.findById(author_id);

		if (bookSbn) throw new AppError("Sbn already existis!", 409);

		if (bookName) throw new AppError("Book name already existis!", 409);

		if (stock_quantity <= 0) throw new AppError("Stock quantity has to be more than 0", 400);

		if (!author) throw new AppError("Author not found", 404);

		const book = await this.bookRepository.create({
			name,
			description,
			sbn,
			stock_quantity,
			author_id
		});

		return book;
	}
}
