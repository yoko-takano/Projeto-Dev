/**
 * @swagger
 * /api/v1/migrations:
 *   get:
 *     summary: Lista as migrations pendentes
 *     tags:
 *       - Migrations
 *     responses:
 *       200:
 *         description: Lista de migrations pendentes (sem executar)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Executa as migrations pendentes
 *     tags:
 *       - Migrations
 *     responses:
 *       201:
 *         description: Migrations executadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       200:
 *         description: Nenhuma migration pendente
 *       405:
 *         description: Método não permitido
 */
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `method "${request.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
