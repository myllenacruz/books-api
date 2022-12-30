import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { CreateBookService } from "@modules/book/services/CreateBookService";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { AppError } from "@shared/errors/AppError";
import { FakeAuthorRepository } from "@modules/book/repositories/implementations/FakeAuthorRepository";
import { Author } from "@modules/book/entities/Author";

let bookRepository: FakeBookRepository;
let authorRepository: FakeAuthorRepository;
let createBookService: CreateBookService;
let author: Author;

describe("Create Books", () => {
	beforeEach(async () => {
		bookRepository = new FakeBookRepository();
		authorRepository = new FakeAuthorRepository();

		createBookService = new CreateBookService(
			bookRepository,
			authorRepository
		);

		author = await authorRepository.create({ name: "John Doe" });
	});

	it("should create a new book", async () => {
		const bookData: ICreateBookDTO = {
			name: "Book Name",
			description: "Book Description Test",
			sbn: "978-3-16-148410-0",
			stock_quantity: 2,
			author_id: author.id
		};

		const book = await createBookService.execute(bookData);

		expect(book).toHaveProperty("id");
	});

	it("should not be able to create an book with existing sbn", async () => {
		const bookData: ICreateBookDTO = {
			name: "Book Name",
			description: "Book Description Test",
			sbn: "978-3-16-148410-0",
			stock_quantity: 2,
			author_id: author.id
		};

		await createBookService.execute(bookData);

		await expect(
			createBookService.execute(bookData)
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create an book with existing name", async () => {
		const bookData: ICreateBookDTO = {
			name: "Book Name",
			description: "Book Description Test",
			sbn: "978-3-16-148410-0",
			stock_quantity: 2,
			author_id: author.id
		};

		await createBookService.execute(bookData);

		await expect(
			createBookService.execute(bookData)
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create an book if author id do not exist", async () => {
		const bookData: ICreateBookDTO = {
			name: "Book Name",
			description: "Book Description Test",
			sbn: "978-3-16-148410-0",
			stock_quantity: 1,
			author_id: 1234
		};

		await expect(
			createBookService.execute(bookData)
		).rejects.toBeInstanceOf(AppError);
	});
});
