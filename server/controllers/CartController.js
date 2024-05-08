import { prisma } from "../db/db.config";

export class CartController {
  static async index(req, res) {
    try {
      const cart = await prisma.cart.findUnique();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addToCart(req, res) {
    try {
      const user_id = req.user.id;
      const product_id = req.body.productId;
      const quantity = req.body.quantity;

      let cart = await prisma.cart.findUnique({
        where: { userId: user_id },
        include: { cartItems: true },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: { user_id: user_id },
        });
      }

      const alreadyExists = cart.cartItems.find(
        (item) => item.productId === product_id
      );

      if (alreadyExists) {
        const updatedCart = await prisma.cart.update({
          where: { productId: product_id },
          data: { quantity: alreadyExists.quantity + quantity },
        });

        res.status(200).json({ status: 200, cartItem: updatedCart });
      }

      const newCartItem = await prisma.cartItem.create({
        data: {
          cart_id: cart.id,
          product_id: product_id,
        },
      });

      res.status(201).json({ status: 201, cartItem: newCartItem });
    } catch (error) {
      res.status(500).json({ status: 500, error: "Internal server error" });
    }
  }
}
