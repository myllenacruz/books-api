import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IAuthorRepository } from "@modules/book/repositories/IAuthorRepository";

interface IRequest {
	id: number;
	name: string;
	description: string;
	author_id: number;
	stock_quantity: number;
}

@injectable()
export class UpdateBookService {
	constructor(
		@inject("BookRepository")
		private bookRepository: IBookRepository,

		private authorRepository: IAuthorRepository
	) {}

	public async execute(
		{
			id,
			name,
			description,
			author_id,
			stock_quantity
		}: IRequest
	): Promise<Book> {
		const book = await this.bookRepository.findById(id);
		const bookName = await this.bookRepository.findByName(name);
		const author = await this.authorRepository.findById(author_id);

		if (!book) throw new AppError("Book not found", 404);

		if (bookName && bookName.id !== id)
			throw new AppError("Book name already existis!", 409);

		if (!author) throw new AppError("Author not found", 404);

		book.name = name;
		book.description = description;
		book.author_id = author_id;
		book.stock_quantity = stock_quantity;

		const updatedBook = await this.bookRepository.save(book);

		return updatedBook;
	}
}
