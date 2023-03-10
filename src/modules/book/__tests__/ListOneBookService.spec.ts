import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { ListOneBookService } from "@modules/book/services/ListOneBookService";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";
import { bookData } from "@modules/book/mocks/book";

let bookRepository: FakeBookRepository;
let listOneBookService: ListOneBookService;
let book: Book;

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

	it("should not list a book if id does not exist", async () => {
		await expect(
			listOneBookService.execute({ id: 12345 })
		).rejects.toBeInstanceOf(AppError);
	});
});
