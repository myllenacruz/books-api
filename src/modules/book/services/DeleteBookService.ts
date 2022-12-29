import { IBookRepository } from "@modules/book/repositories/IBookRepository";

interface IRequest {
	id: number;
}

export class DeleteBookService {
	constructor(
		private bookRepository: IBookRepository
	) {}

	public async execute({ id }: IRequest): Promise<void> {
		const book = await this.bookRepository.findById(+id);

		if (!book) throw new Error("Book not found");

		await this.bookRepository.delete(book);
	}
}
