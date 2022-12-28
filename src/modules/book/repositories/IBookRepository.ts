import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { Book } from "@modules/book/entities/Book";

export interface IBookRepository {
    create(data: ICreateBookDTO): Promise<Book>;
	findBySbn(sbn: string): Promise<Book | undefined>;
	findByName(name: string): Promise<Book | undefined>;
}
