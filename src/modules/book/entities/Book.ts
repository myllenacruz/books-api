import { ICreateBookDTO } from "@modules/book/dtos/ICreateBookDTO";

export class Book {
	public readonly id: number;
	public sbn: string;
	public name: string;
	public description: string;
	public author: string;
	public stock_quantity: number;

	constructor({
		sbn,
		name,
		description,
		author,
		stock_quantity
	}: ICreateBookDTO) {
		return Object.assign(this, {
			sbn,
			name,
			description,
			author,
			stock_quantity
		});
	}
}
