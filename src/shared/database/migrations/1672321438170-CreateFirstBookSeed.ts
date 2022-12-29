import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFirstBookSeed1672321438170 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner
			.manager
			.createQueryBuilder()
			.insert()
			.into("book")
			.values({
				name: "A Book Name",
				description: "Book Description Test",
				sbn: "978-1-12-148410-0",
				stock_quantity: 100,
				author: "John Doe"
			})
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.
			manager
			.createQueryBuilder()
			.delete()
			.from("book")
			.where({
				name: "A Book Name"
			})
			.execute();
	}
}
