import { Author } from "@modules/book/entities/Author";
import { IAuthorRepository } from "@modules/book/repositories/IAuthorRepository";
import { ICreateAuthorDTO } from "@modules/book/dtos/ICreateAuthorDTO";

export class FakeAuthorRepository implements IAuthorRepository {
	public authors: Author[] = [];

	public async findById(id: number): Promise<Author | undefined> {
		return this.authors.find(author => author.id === id);
	}

	public async create(data: ICreateAuthorDTO): Promise<Author> {
		const author: Author = new Author();
		const authorId: number = Math.floor(Math.random() * 10);

		Object.assign(author, {
			...data,
			id: authorId
		});

		this.authors.push(author);

		return author;
	}
}
