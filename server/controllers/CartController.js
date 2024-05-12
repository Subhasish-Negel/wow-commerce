import { prisma } from "../db/db.config.js";
import { cartItemSchema } from "../validations/cartValidation.js";
import vine, { errors } from "@vinejs/vine";

export class CartController {
  static async index(req, res) {
    try {
      const user_id = req.user.id;
      const cart = await prisma.cart.findUnique({
        where: { user_id: user_id },
        include: { cartItems: true },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addToCart(req, res) {
    try {
      const user_id = req.user.id;
      const body = req.body;

      const validator = vine.compile(cartItemSchema);
      const payload = await validator.validate(body);
      const product_id = payload.productId;
      const quantity = payload.quantity;

      let cart = await prisma.cart.findUnique({
        where: { user_id: user_id },
        include: { cartItems: true },
      });

      const alreadyExists = cart.cartItems.find(
        (item) => item.product_id === product_id
      );

      if (alreadyExists) {
        const updatedCart = await prisma.cartItem.update({
          where: { product_id: payload.productId },
          data: { quantity: alreadyExists.quantity + quantity },
        });

        return res.status(200).json({
          status: 200,
          cartItem: updatedCart,
          message: "Item Added to Cart",
        });
      }

      const newCartItem = await prisma.cartItem.create({
        data: {
          cart_id: cart.id,
          product_id: product_id,
          quantity: quantity,
        },
      });

      return res.status(201).json({ status: 201, cartItem: newCartItem });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: error.message,
          announce:
            "Something Went REALLY Bad With The Server :( Please Try Later ?",
        });
      }
    }
  }
}
