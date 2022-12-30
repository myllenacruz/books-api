import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Author } from "@modules/book/entities/Author";

@Entity("book")
export class Book {
    @PrimaryGeneratedColumn()
	    id: number;

	@Column()
		sbn: string;

	@Column()
		name: string;

	@Column()
		description: string;

	@Column()
		author_id: number;

	@Column()
		stock_quantity: number;

	@ManyToOne(() => Author, author => author.books)
	@JoinColumn({ name: "author_id" })
		author: Author;
}
