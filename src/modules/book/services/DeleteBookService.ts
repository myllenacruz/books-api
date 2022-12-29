import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	id: number;
}

@injectable()
export class DeleteBookService {
	constructor(
		@inject("BookRepository")
		private bookRepository: IBookRepository
	) {}

	public async execute({ id }: IRequest): Promise<void> {
		const book = await this.bookRepository.findById(+id);

		if (!book) throw new AppError("Book not found", 404);

		await this.bookRepository.delete(book);
	}
}
