import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

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
		author: string;

	@Column()
		stock_quantity: number;
}
