import 'dotenv/config';
import { z } from 'zod';

import { EnvironmentEnum } from '../consts/environment.enum';

const envsSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'PORT must be a number',
    }),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'DATABASE_PORT must be a number',
    }),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  NODE_ENV: z.nativeEnum(EnvironmentEnum),
});

const parsedEnv = envsSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Config validation error: ${parsedEnv.error.message}`);
}

const envVars = parsedEnv.data;

export const envs = {
  port: envVars.PORT,
  database: {
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    user: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    name: envVars.DATABASE_NAME,
  },
  environment: envVars.NODE_ENV,
};
