import { container } from "tsyringe";

import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { TypeORMBookRepository } from "@modules/book/repositories/implementations/TypeORMBookRepository";

import { IAuthorRepository } from "@modules/book/repositories/IAuthorRepository";
import { TypeORMAuthorRepository } from "@modules/book/repositories/implementations/TypeORMAuthorRepository";

container.register<IBookRepository>("BookRepository", TypeORMBookRepository);

container.register<IAuthorRepository>("AuthorRepository", TypeORMAuthorRepository);
