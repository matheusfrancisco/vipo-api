import { MigrationInterface, QueryRunner } from "typeorm";

export class editUserEntity1612736226236 implements MigrationInterface {
  name = "editUserEntity1612736226236";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "lastName" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "birthDate" TIMESTAMP NOT NULL`
    );
    await queryRunner.query(
      `CREATE TYPE "user_entity_gender_enum" AS ENUM('male', 'female', 'neuter')`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "gender" "user_entity_gender_enum" NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD "recommendations" jsonb NOT NULL DEFAULT '[]'`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "name" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "howMuch"`);
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD "howMuch" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "like"`);
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD "like" text NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "like"`);
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD "like" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "howMuch"`);
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD "howMuch" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" DROP COLUMN "recommendations"`
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "user_entity_gender_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "birthDate"`
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastName"`);
  }
}
