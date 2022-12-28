import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { ListBookService } from "@modules/book/services/ListBookService";
import { Book } from "@modules/book/entities/Book";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";

let bookRepository: FakeBookRepository;
let listBookService: ListBookService;
let book: Book;

const bookData: ICreateBookDTO = {
	name: "Book Name",
	description: "Book Description Test",
	sbn: "978-3-16-148410-0",
	stock_quantity: 2,
	author: "John Doe"
};

describe("List Books", () => {
	beforeEach(async () => {
		bookRepository = new FakeBookRepository();
		listBookService = new ListBookService(bookRepository);
		book = await bookRepository.create(bookData);
	});

	it("should list the books", async () => {
		const books = await listBookService.execute({
			paginationOptions: {
				limit: 50,
				page: 1
			}
		});

		expect(books.values[0].name).toEqual(book.name);
		expect(books.total >= 1).toBe(true);
	});
});