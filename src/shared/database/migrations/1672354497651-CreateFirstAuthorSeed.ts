import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFirstAuthorSeed1672354497651 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner
			.manager
			.createQueryBuilder()
			.insert()
			.into("author")
			.values({
				name: "John Doe"
			})
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.
			manager
			.createQueryBuilder()
			.delete()
			.from("author")
			.where({
				name: "John Doe"
			})
			.execute();
	}
}
