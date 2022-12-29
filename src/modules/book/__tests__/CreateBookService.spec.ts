import { FakeBookRepository } from "@modules/book/repositories/implementations/FakeBookRepository";
import { CreateBookService } from "@modules/book/services/CreateBookService";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { AppError } from "@shared/errors/AppError";

let bookRepository: FakeBookRepository;
let createBookService: CreateBookService;

describe("Create Books", () => {
	beforeEach(() => {
		bookRepository = new FakeBookRepository();
		createBookService = new CreateBookService(bookRepository);
	});

	it("should create a new book", async () => {
		const bookData: ICreateBookDTO = {
			name: "Book Name",
			description: "Book Description Test",
			sbn: "978-3-16-148410-0",
			stock_quantity: 2,
			author: "John Doe"
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
			author: "John Doe"
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
			author: "John Doe"
		};

		await createBookService.execute(bookData);

		await expect(
			createBookService.execute(bookData)
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create an book with stock quantity lass or equal 0", async () => {
		const bookData: ICreateBookDTO = {
			name: "Book Name",
			description: "Book Description Test",
			sbn: "978-3-16-148410-0",
			stock_quantity: 0,
			author: "John Doe"
		};

		await expect(
			createBookService.execute(bookData)
		).rejects.toBeInstanceOf(AppError);
	});
});
