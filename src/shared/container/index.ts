import { container } from "tsyringe";

import { IBookRepository } from "@modules/book/repositories/IBookRepository";
import { TypeORMBookRepository } from "@modules/book/repositories/implementations/TypeORMBookRepository";

container.register<IBookRepository>("BookRepository", TypeORMBookRepository);
