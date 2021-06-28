import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class userFeedback1624710653080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_feedback",
        columns: [
          { name: "user_id", type: "integer", isPrimary: true },
          { name: "establishment_id", type: "integer", isPrimary: true },
          { name: "rating", type: "integer" },
          { name: "best_rated_item", type: "varchar" },
          { name: "least_rated_item", type: "varchar" },
          { name: "comments", type: "text", isNullable: true },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ],
        foreignKeys: [
          {
            name: "User",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_entity",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
          }
        ],
        uniques: [
          {
            name: "UserEstablishmentFeedback",
            columnNames: ["user_id", "establishment_id"]
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_feedback");
  }
}
