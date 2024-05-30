import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

// Custom Error Reporter
vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
  name: vine.string().minLength(3).maxLength(50),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(16).confirmed().optional(), // Make password optional
  role: vine.string().optional(),
  googleId: vine.string().optional(),
  facebookId: vine.string().optional(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().optional(), // Make password optional
});
