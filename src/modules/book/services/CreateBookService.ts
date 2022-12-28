import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Book } from "@modules/book/entities/Book";

interface IRequest {
	sbn: string;
	name: string;
	description: string;
	stock_quantity: number;
	author: string;
}

export class CreateBookService {
	constructor(
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

		if (bookSbn) throw new Error("Sbn already existis!");

		if (bookName) throw new Error("Book name already existis!");

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