import database from "infra/database.js";

/**
 * @swagger
 * /api/v1/status:
 *   get:
 *     summary: Retorna o status da aplicação e do banco de dados
 *     tags:
 *       - Status
 *     responses:
 *       200:
 *         description: Status atual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 dependencies:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: object
 *                       properties:
 *                         version:
 *                           type: string
 *                         max_connections:
 *                           type: integer
 *                         opened_connections:
 *                           type: integer
 */
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionResults = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionValue =
    databaseMaxConnectionResults.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResults = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResults.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
