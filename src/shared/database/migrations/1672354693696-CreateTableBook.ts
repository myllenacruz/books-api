import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableBook1672354693696 implements MigrationInterface {
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
					name: "author_id",
					type: "integer"
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
					name: "stock_quantity",
					type: "integer"
				}
			]
		}));

		await queryRunner.createForeignKey(
		  "book",
		  new TableForeignKey({
				name: "book_author_fk",
				columnNames: ["author_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "author"
		  })
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("book");
	}
}
