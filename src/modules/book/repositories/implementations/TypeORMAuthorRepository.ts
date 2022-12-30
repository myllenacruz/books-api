import { ICreateAuthorDTO } from "@modules/book/dtos/ICreateAuthorDTO";
import { Author } from "@modules/book/entities/Author";
import { IAuthorRepository } from "@modules/book/repositories/IAuthorRepository";
import { Repository, getRepository } from "typeorm";

export class TypeORMAuthorRepository implements IAuthorRepository {
	private ormRepository: Repository<Author>;

	constructor() {
		this.ormRepository = getRepository(Author);
	}

	public async findById(id: number): Promise<Author | undefined> {
		const author = this.ormRepository.findOne({
			where: {
				id
			}
		});

		return author;
	}

	public async create(data: ICreateAuthorDTO): Promise<Author> {
		const book = this.ormRepository.create({ ...data });

		await this.ormRepository.save(book);

		return book;
	}
}
