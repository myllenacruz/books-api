import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { IPaginationOptions } from "@modules/pagination/interfaces/IPaginationOptions";
import { Pagination } from "@modules/pagination";
import { Book } from "@modules/book/entities/Book";
import { inject, injectable } from "tsyringe";

interface IRequest {
	paginationOptions: IPaginationOptions
}

@injectable()
export class ListBookService {
	constructor(
		@inject("BookRepository")
		private bookRepository: IBookRepository
	) {}

	public async execute(
		{ paginationOptions }: IRequest
	): Promise<Pagination<Book>> {
		const books = await this.bookRepository.findAll(paginationOptions);
		return books;
	}
}
