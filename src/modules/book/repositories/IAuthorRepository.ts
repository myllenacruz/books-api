import { Author } from "@modules/book/entities/Author";
import { ICreateAuthorDTO } from "@modules/book/dtos/ICreateAuthorDTO";

export interface IAuthorRepository {
	findById(id: number): Promise<Author | undefined>;
    create(data: ICreateAuthorDTO): Promise<Author>;
}
