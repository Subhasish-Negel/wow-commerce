import cloudinary from "cloudinary";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const updateProductImages = async (req, res) => {
  try {
    // Fetch all products from MongoDB
    const products = await prisma.products.findMany();

    // Iterate over each product
    for (const product of products) {
      const { thumbnail, images } = product;

      // Upload the thumbnail to Cloudinary
      const thumbnailResult = await cloudinary.v2.uploader.upload(thumbnail, {
        public_id: `products/${product.id}/thumbnail`,
      });
      const thumbnailPublicId = thumbnailResult.public_id;


      // Upload each image in the images array to Cloudinary
      const imagesPublicIds = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.v2.uploader.upload(image, {
            public_id: `products/${product.id}/${generateRandomNum()}`,
          });
          return result.public_id;
        })
      );

      // Update the product data in MongoDB
      await prisma.products.update({
        where: { id: product.id },
        data: {
          thumbnail: thumbnailPublicId,
          images: imagesPublicIds,
        },
      });
    }

    res.json({ message: "Product images updated successfully." });
  } catch (error) {
    console.error("Error updating product images:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
