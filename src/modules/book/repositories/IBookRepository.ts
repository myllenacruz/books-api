import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { Book } from "@modules/book/entities/Book";
import { Pagination } from "@modules/pagination";
import { IPaginationOptions } from "@modules/pagination/interfaces/IPaginationOptions";

export interface IBookRepository {
    create(data: ICreateBookDTO): Promise<Book>;
	findBySbn(sbn: string): Promise<Book | undefined>;
	findByName(name: string): Promise<Book | undefined>;
	findById(id: number): Promise<Book | undefined>;
	findAll(paginationOptions?: IPaginationOptions): Promise<Pagination<Book>>;
	save(book: Book): Promise<Book>;
	delete(book: Book): Promise<void>;
}
