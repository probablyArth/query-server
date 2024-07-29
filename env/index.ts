import { z } from "zod";
import dotenv from "dotenv";

const envSchema = z.object({
  PORT: z.string().default("8000"),
  NODE_ENV: z.string().default("development"),
  DATA_URL: z
    .string()
    .default(
      "https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json"
    ),
});

export const parseSchema = () => {
  dotenv.config();
  process.env = envSchema.parse(process.env);
};

const getEnvVar = (key: keyof z.infer<typeof envSchema>): string =>
  process.env[key] as string;

export default getEnvVar;
