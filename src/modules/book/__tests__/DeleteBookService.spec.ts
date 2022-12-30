import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { DeleteBookService } from "@modules/book/services/DeleteBookService";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";
import { bookData } from "@modules/book/mocks/book";

let bookRepository: FakeBookRepository;
let deleteBookService: DeleteBookService;
let book: Book;

describe("Delete Books", () => {
	beforeEach(async () => {
		bookRepository = new FakeBookRepository();
		deleteBookService = new DeleteBookService(bookRepository);
		book = await bookRepository.create(bookData);
	});

	it("should delete a book", async () => {
		await expect(
			deleteBookService.execute({ id: book.id })
		).resolves.toBeUndefined();
	});

	it("should not delete a book if id does not exist", async () => {
		await expect(
			deleteBookService.execute({ id: 12345 })
		).rejects.toBeInstanceOf(AppError);
	});
});
