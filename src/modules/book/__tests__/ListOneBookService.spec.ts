import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { ListOneBookService } from "@modules/book/services/ListOneBookService";
import { Book } from "@modules/book/entities/Book";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";

let bookRepository: FakeBookRepository;
let listOneBookService: ListOneBookService;
let book: Book;

const bookData: ICreateBookDTO = {
	name: "Book Name",
	description: "Book Description Test",
	sbn: "978-3-16-148410-0",
	stock_quantity: 2,
	author: "John Doe"
};

describe("List one Book", () => {
	beforeEach(async () => {
		bookRepository = new FakeBookRepository();
		listOneBookService = new ListOneBookService(bookRepository);
		book = await bookRepository.create(bookData);
	});

	it("should list one book by id", async () => {
		const foundBook = await listOneBookService.execute({
			id: book.id
		});

		expect(foundBook.id).toEqual(book.id);
	});
});