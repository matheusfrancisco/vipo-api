import {MigrationInterface, QueryRunner} from "typeorm";

export class userAnswer1604892274844 implements MigrationInterface {
    name = 'userAnswer1604892274844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`);
        await queryRunner.query(`CREATE TABLE "user_answer" ("id" SERIAL NOT NULL, "numberOfPeople" integer NOT NULL, "howMuch" integer NOT NULL, "like" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_37b32f666e59572775b1b020fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "musicals" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "foods" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "drinks" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_4333f41c4fc441ddb4ba0cc9f2d" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_4333f41c4fc441ddb4ba0cc9f2d"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "drinks" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "foods" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "musicals" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_answer"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
