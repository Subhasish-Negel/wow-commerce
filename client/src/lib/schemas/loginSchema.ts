// Import Zod
import { string, z } from "zod";

// Define the schema for the signup form
export const loginSchema = z.object({
  email: string().email(),
  password: string().min(8).max(16),
});
