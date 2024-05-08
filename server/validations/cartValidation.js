import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

// Custom Error Reporter
vine.errorReporter = () => new CustomErrorReporter();

export const cartItemSchema = vine.object({
  productId: vine.string().fixedLength(24),
  quantity: vine.number(),
});
