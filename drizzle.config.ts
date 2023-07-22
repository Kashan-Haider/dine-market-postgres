import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/db/schema/*",
  driver: 'pg'
} satisfies Config;

