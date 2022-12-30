import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { Repository, getRepository } from "typeorm";
import { Book } from "@modules/book/entities/Book";
import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";
import { IPaginationOptions } from "@modules/pagination/interfaces/IPaginationOptions";
import { Pagination } from "@modules/pagination";

export class TypeORMBookRepository implements IBookRepository {
	private ormRepository: Repository<Book>;

	constructor() {
		this.ormRepository = getRepository(Book);
	}

	public async create(data: ICreateBookDTO): Promise<Book> {
		const book = this.ormRepository.create({ ...data });

		await this.ormRepository.save(book);

		return book;
	}

	public async findBySbn(sbn: string): Promise<Book | undefined> {
		const book = this.ormRepository.findOne({
			where: {
				sbn
			}
		});

		return book;
	}

	public async findByName(name: string): Promise<Book | undefined> {
		const book = this.ormRepository.findOne({
			where: {
				name
			}
		});

		return book;
	}

	public async findById(id: number): Promise<Book | undefined> {
		const book = this.ormRepository
			.createQueryBuilder("book")
			.where(`book.id = ${id}`, { id })
			.leftJoin("book.author", "author")
			.addSelect("author.name")
			.getOne();

		return book;
	}

	public async findAll(
		paginationOptions: IPaginationOptions
	): Promise<Pagination<Book>> {
		const { page, limit } = paginationOptions;

		const query = this.ormRepository
			.createQueryBuilder("book")
			.select(["book.name"])
			.where("book.stock_quantity >= 1");

		const [criticidades, total] = await query
			.orderBy("book.name", "ASC")
			.limit(limit)
			.offset((page - 1) * limit)
			.getManyAndCount();

		return {
			values: criticidades,
			total,
			totalPages: Math.ceil(total / limit)
		};
	}

	public async save(book: Book): Promise<Book> {
		return this.ormRepository.save(book);
	}

	public async delete(book: Book): Promise<Book> {
		return this.ormRepository.remove(book);
	}
}
