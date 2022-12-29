import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { DeleteBookService } from "@modules/book/services/DeleteBookService";
import { Book } from "@modules/book/entities/Book";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";

let bookRepository: FakeBookRepository;
let deleteBookService: DeleteBookService;
let book: Book;

const bookData: ICreateBookDTO = {
	name: "Book Name",
	description: "Book Description Test",
	sbn: "978-3-16-148410-0",
	stock_quantity: 2,
	author: "John Doe"
};

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
});
