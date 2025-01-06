import z from "zod";

const envSchema = z.object({
  REACT_APP_API_URL: z.string().default("http://localhost:5000"),
});

export const env = envSchema.parse(process.env);
