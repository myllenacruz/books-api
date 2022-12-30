import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAuthor1672354010570 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "author",
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
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("author");
	}
}
