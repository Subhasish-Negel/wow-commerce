import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const BannerSchema = vine.object({
  title: vine.string().minLength(10).maxLength(100),
});
