import Jwt from "jsonwebtoken";
import { prisma } from "../db/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { loginSchema } from "../validations/authValidation.js";

class AdminController {
  static async login(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      // Find user with email
      const findUser = await prisma.users.findUnique({
        where: { email: payload.email },
      });

      if (findUser) {
        // Check if user is admin
        if (findUser.role !== "admin") {
          return res.status(403).json({
            error: {
              message: "Unauthorized: Admins only",
            },
          });
        }

        // Create Login Token
        const payloadData = {
          id: findUser.id,
          role: findUser.role,
        };
        const token = Jwt.sign(payloadData, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // Set the token as an HttpOnly cookie
        return res
          .status(200)
          .cookie("jwtoken", `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 1000 * 3600),
          })
          .json({
            message: "Admin Logged In",
            access_token: `Bearer ${token}`,
          });
      }

      return res.status(401).json({
        error: {
          message: "Unauthorized: Admins only",
        },
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message:
            "Something Went REALLY Bad With The Server :( Please Try Later ?",
          error: error,
        });
      }
    }
  }
}

export { AdminController };
