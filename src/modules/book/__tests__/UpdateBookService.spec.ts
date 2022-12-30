import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { UpdateBookService } from "@modules/book/services/UpdateBookService";
import { Book } from "@modules/book/entities/Book";
import { AppError } from "@shared/errors/AppError";
import { FakeAuthorRepository } from "@modules/book/repositories/implementations/FakeAuthorRepository";
import { Author } from "@modules/book/entities/Author";
import { bookData } from "@modules/book/mocks/book";
import { authorData } from "@modules/book/mocks/author";

let bookRepository: FakeBookRepository;
let authorRepository: FakeAuthorRepository;
let updateBookService: UpdateBookService;
let book: Book;
let author: Author;

describe("Update Books", () => {
	beforeEach(async () => {
		bookRepository = new FakeBookRepository();
		authorRepository = new FakeAuthorRepository();

		updateBookService = new UpdateBookService(
			bookRepository,
			authorRepository
		);

		author = await authorRepository.create(authorData);
		book = await bookRepository.create(bookData);
	});

	it("should update an book", async () => {
		const updatedBook = await updateBookService.execute({
			id: book.id,
			name: "New Book Name",
			description: "New Book Description Test",
			author_id: author.id,
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
				author_id: author.id,
				stock_quantity: 5
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not update an book with existing name", async () => {
		await expect(
			updateBookService.execute({
				id: 1234,
				name: book.name,
				description: book.description,
				stock_quantity: 2,
				author_id: author.id
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not update an book if author id does not exist", async () => {
		await expect(
			updateBookService.execute({
				id: book.id,
				name: "New Book Name",
				description: "New Book Description Test",
				author_id: 1234,
				stock_quantity: 5
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
