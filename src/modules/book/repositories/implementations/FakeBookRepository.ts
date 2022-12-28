import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { Book } from "@modules/book/entities/Book";
import { IBookRepository } from "@modules/book/repositories/IBookRepository";

export class FakeBookRepository implements IBookRepository {
	public books: Book[] = [];

	public async create(data: ICreateBookDTO): Promise<Book> {
		const book: Book = new Book(data);
		const bookId: number = Math.floor(Math.random() * 10);

		Object.assign(book, {
			...data,
			id: bookId
		});

		this.books.push(book);

		return book;
	}

	public async findBySbn(sbn: string): Promise<Book | undefined> {
		return this.books.find(book => book.sbn === sbn);
	}

	public async findByName(name: string): Promise<Book | undefined> {
		return this.books.find(book => book.name === name);
	}
}
