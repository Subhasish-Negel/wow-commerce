import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import bcrypt from "bcryptjs";
import { prisma } from "../db/db.config.js";
import Jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      // Check if email already exists
      const finduser = await prisma.users.findUnique({
        where: { email: payload.email },
      });

      if (finduser) {
        return res.status(400).json({
          error:
            "Email is already registered, Please Login or use another email address",
        });
      }

      // Encrypt Password
      const salt = bcrypt.genSaltSync(13);
      payload.password = bcrypt.hashSync(payload.password, salt);
      const user = await prisma.users.create({ data: payload });

      // return res.json({ payload });

      return res.json({
        status: 200,
        message: "User Created Successfully.",
        user,
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
        if (bcrypt.compareSync(payload.password, findUser.password)) {
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
              // httpOnly: true,
              secure: true,
              sameSite: "None",
              expires: new Date(Date.now() + 1000 * 3600),
            })
            .json({
              message: "Logged In",
              access_token: `Bearer ${token}`,
            });
        }

        return res.status(401).json({
          error: {
            message: "Invalid Password",
          },
        });
      }
      return res.status(401).json({
        error: {
          message: "No user found with this email",
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

  static async logout(req, res) {
    try {
      res.clearCookie("jwtoken");
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong with the server",
        error: error,
      });
    }
  }
}

export default AuthController;
