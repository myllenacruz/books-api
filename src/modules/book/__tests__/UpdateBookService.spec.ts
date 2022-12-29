import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { UpdateBookService } from "@modules/book/services/UpdateBookService";
import { Book } from "@modules/book/entities/Book";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { AppError } from "@shared/errors/AppError";

let bookRepository: FakeBookRepository;
let updateBookService: UpdateBookService;
let book: Book;

const bookData: ICreateBookDTO = {
	name: "Book Name",
	description: "Book Description Test",
	sbn: "978-3-16-148410-0",
	stock_quantity: 2,
	author: "John Doe"
};

describe("Update Books", () => {
	beforeEach(async () => {
		bookRepository = new FakeBookRepository();
		updateBookService = new UpdateBookService(bookRepository);
		book = await bookRepository.create(bookData);
	});

	it("should update an book", async () => {
		const updatedBook = await updateBookService.execute({
			id: book.id,
			name: "New Book Name",
			description: "New Book Description Test",
			author: "Jane Doe",
			stock_quantity: 5
		});

		expect(updatedBook).toHaveProperty("id");
		expect(updatedBook.name).toEqual("New Book Name");
	});

	it("should not update an book if id does not exist", async () => {
		await expect(
			updateBookService.execute({
				id: 1234,
				name: "New Book Name",
				description: "New Book Description Test",
				author: "Jane Doe",
				stock_quantity: 5
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
