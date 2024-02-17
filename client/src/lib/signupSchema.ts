// Import Zod
import { string, z } from "zod";

// Define the schema for the signup form
export const signupSchema = z
  .object({
    name: string().min(3).max(50),
    email: string().email(),
    password: string().min(8).max(16),
    password_confirmation: string(),
    role: string().min(4).max(5).optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords does't match",
    path: ["password_confirmation"],
  });
