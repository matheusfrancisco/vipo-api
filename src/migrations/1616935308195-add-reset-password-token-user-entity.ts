import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addResetPasswordTokenUserEntity1616935308195
  implements MigrationInterface {
  name = "addResetPasswordTokenUserEntity1616935308195";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user_entity",
      new TableColumn({
        name: "reset_password_token",
        type: "varchar",
        isNullable: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user_entity", "reset_password_token");
  }
}
