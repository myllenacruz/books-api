import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { Book } from "@modules/book/entities/Book";
import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { IPaginationOptions } from "@modules/pagination/interfaces/IPaginationOptions";
import { Pagination } from "@modules/pagination/index";

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

	public async findById(id: number): Promise<Book | undefined> {
		return this.books.find(book => book.id === id);
	}

	public async findAll(
		paginationOptions: IPaginationOptions
	): Promise<Pagination<Book>> {
		const { page, limit } = paginationOptions;
		const total = this.books.length;

		return {
			values: this.books.slice((page - 1 ) * limit, page * limit),
			total,
			totalPages: Math.ceil(total / limit)
		};
	}

	public async save(book: Book): Promise<Book> {
		const index = this.books.findIndex(findBook => findBook.id === book.id);

		this.books[index] = book;

		return book;
	}

	public async delete(book: Book): Promise<void> {
		const index = this.books.findIndex(findBook => findBook.id === book.id);
		this.books.splice(index, 1);
	}
}
