import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	id: number;
	name: string;
	description: string;
	author: string;
	stock_quantity: number;
}

export class UpdateBookService {
	constructor(
		private bookRepository: IBookRepository
	) {}

	public async execute(
		{
			id,
			name,
			description,
			author,
			stock_quantity
		}: IRequest
	): Promise<Book> {
		const book = await this.bookRepository.findById(+id);

		if (!book) throw new AppError("Book not found", 404);

		book.name = name;
		book.description = description;
		book.author = author;
		book.stock_quantity = stock_quantity;

		const updatedBook = await this.bookRepository.save(book);

		return updatedBook;
	}
}
