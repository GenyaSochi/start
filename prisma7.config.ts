import "dotenv/config";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const dbPath = fileURLToPath(new URL("./prisma/dev.db", import.meta.url));

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed-cli.ts",
  },
  datasource: {
    url: `file:${dbPath}`,
  },
});
