import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	id: number;
}

export class DeleteBookService {
	constructor(
		private bookRepository: IBookRepository
	) {}

	public async execute({ id }: IRequest): Promise<void> {
		const book = await this.bookRepository.findById(+id);

		if (!book) throw new AppError("Book not found", 404);

		await this.bookRepository.delete(book);
	}
}
