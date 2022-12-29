import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableBook1672274787672 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "book",
			columns: [
				{
					name: "id",
					type: "integer",
					isPrimary: true,
					isGenerated: true,
					generationStrategy: "increment",
					isUnique: true
				},
				{
					name: "name",
					type: "varchar"
				},
				{
					name: "sbn",
					type: "varchar",
					length: "17",
					isUnique: true
				},
				{
					name: "description",
					type: "varchar"
				},
				{
					name: "author",
					type: "varchar"
				},
				{
					name: "stock_quantity",
					type: "integer"
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("book");
	}
}
