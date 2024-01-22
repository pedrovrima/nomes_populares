import { type Config } from "drizzle-kit";

import { env } from "@/env";

console.log(env);
export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  out: "./src/server/db/migrations",
  dbCredentials: {
    connectionString: env.CONECTION_STRING,
  },
} satisfies Config;
