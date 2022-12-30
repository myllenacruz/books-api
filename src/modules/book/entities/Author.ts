import { Column, Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Book } from "@modules/book/entities/Book";

@Entity("author")
export class Author {
    @PrimaryGeneratedColumn()
	    id: number;

	@Column()
		name: string;

	@OneToMany(() => Book, book => book.author)
		books: Book[];
}
