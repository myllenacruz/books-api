import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	id: number;
}

export class ListOneBookService {
	constructor(
		private bookRepository: IBookRepository
	) {}

	public async execute({ id }: IRequest): Promise<Book> {
		const book = await this.bookRepository.findById(id);

		if (!book) throw new AppError("Book not found", 404);

		return book;
	}
}
