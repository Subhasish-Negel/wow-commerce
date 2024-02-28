import {
  generateRandomNum,
  imageValidator,
  checkIdFormat,
} from "../utils/helper.js";
import { prisma } from "../db/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { blogSchema } from "../validations/BlogValidation.js";
import { blogUpdateSchema } from "../validations/BlogUpdateValidation.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import logger from "../config/logger.js";
import { BannerSchema } from "../validations/BannerSchema.js";

export class ProductController {
  static async index(req, res) {
    try {
      let count = await prisma.products.count();
      let { search, sortField, sortOrder, page, limit } = req.query;

      if (page <= 0) {
        page = 1;
      }

      if (!limit) {
        limit = count;
        page = 1;
      }

      // Calculate skip based on page and limit
      const skip = (Number(page) - 1) * Number(limit);

      // Build query conditions
      const query = {
        skip,
        take: Number(limit),
      };

      // Add search conditions if search parameter exists
      if (search) {
        const filteredCount = await prisma.products.count({
          where: {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { category: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          },
        });
        query.where = {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { category: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        };
        count = filteredCount;
      }
      const totalPages = Math.ceil(count / limit);

      // Add sorting conditions if both sortField and sortOrder parameters exist
      if (sortField && sortOrder) {
        query.orderBy = {
          [sortField]: sortOrder,
        };
      }

      // Fetch products based on the combined query
      const products = await prisma.products.findMany(query);
      page = Number(page);

      return res.json({
        status: 200,
        products: products,
        metadata: {
          currentItems: products.length,
          totalItems: count,
          currentPage: page,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getSearchProducts(req, res) {
    try {
      const itemsForSearch = await prisma.products.findMany({
        select: {
          id: true,
          title: true,
          thumbnail: true,
          category: true,
          description: true,
        },
      });

      return res.json({
        status: 200,
        products: itemsForSearch,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
      });
    }
  }

  static async getRandomProducts(req, res) {
    const numberOfRandomProducts = 4;
    const minRating = 3;

    try {
      // Fetch the total number of products
      const totalProducts = await prisma.products.count();

      // Generate random skip value to get a different set of products each time
      const randomSkip = Math.floor(
        Math.random() * (totalProducts - numberOfRandomProducts)
      );

      // Fetch random products with ratings above 3
      const randomProducts = await prisma.products.findMany({
        skip: randomSkip,
        take: numberOfRandomProducts,
        where: {
          rating: {
            gte: minRating,
          },
        },
      });

      return res.json({
        status: 200,
        products: randomProducts,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
      });
    }
  }

  static async getBanner(req, res) {
    try {
      const bannerImages = await prisma.banner.findMany({});

      // Process each object
      for (const item of bannerImages) {
        item.image = cloudinary.url(item.image_id);
        delete item.image_id;
      }

      return res.status(200).json({
        images: bannerImages,
      });
    } catch (error) {
      console.error("Error fetching top-rated products:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  static async create(req, res) {
    try {
      const user = req.user;
      const body = req.body;
      const validator = vine.compile(blogSchema);
      const payload = await validator.validate(body);

      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "Image filed is required" });
      }

      // Custom image validator
      const image = req.files?.image;
      if (!image) {
        return res
          .status(411)
          .json({ error: "Please Provide Blog Cover Image" });
      }
      const message = imageValidator(image?.size, image?.mimetype);
      if (message !== null)
        return res.status(400).json({ errors: { image: message } });

      // Unqiue image name
      const imgEXT = image?.name.split(".");
      const newImageName = generateRandomNum() + "." + imgEXT[1];
      const uploadPath = process.cwd() + "/public/images/blog/" + newImageName;
      await image.mv(uploadPath, (err) => {
        if (err) throw err;
      });
      payload.user_id = user.id;

      // upload image URL on cloudinary
      await new Promise((resolve) => setTimeout(resolve, 50));
      const result = await cloudinary.uploader.upload(uploadPath, {
        folder: "blogPictures",
        resource_type: "image",
      });
      const image_id = result?.public_id;
      fs.unlinkSync(uploadPath);

      // Save the image_id on database
      payload.image_id = image_id;
      await prisma.products.create({
        data: payload,
      });

      //Include imageUrl in the response
      const response = { ...payload };
      const imageURL = cloudinary.url(image_id);
      response.image = imageURL;
      delete response.image_id;

      return res.json({
        status: 200,
        message: "Blog Created Successfully",
        response,
      });
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

  static async createBanner(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(BannerSchema);
      const payload = await validator.validate(body);

      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "Image is required" });
      }

      // Custom image validator
      const image = req.files?.image;
      if (!image) {
        return res.status(411).json({ error: "Please Provide Banner Image" });
      }
      const message = imageValidator(image?.size, image?.mimetype);
      if (message !== null)
        return res.status(400).json({ errors: { image: message } });

      // Unqiue image name
      const imgEXT = image?.name.split(".");
      const newImageName = generateRandomNum() + "." + imgEXT[1];
      const uploadPath = process.cwd() + "/public/images/blog/" + newImageName;
      await image.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      // upload image URL on cloudinary
      await new Promise((resolve) => setTimeout(resolve, 50));
      const result = await cloudinary.uploader.upload(uploadPath, {
        folder: "bannerPictures",
        resource_type: "image",
      });
      const image_id = result?.public_id;
      fs.unlinkSync(uploadPath);

      // Save the image_id on database
      payload.image_id = image_id;
      await prisma.banner.create({
        data: payload,
      });

      //Include imageUrl in the response
      const response = { ...payload };
      const imageURL = cloudinary.url(image_id);
      response.image = imageURL;
      delete response.image_id;

      return res.json({
        status: 200,
        message: "Banner Image Update Successfull",
        response,
      });
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

  static async show(req, res) {
    try {
      const { id } = req.params;

      // Check if ID is valid
      if (!checkIdFormat.test(id)) {
        return res.status(400).json({ error: "Invalid ObjectID" });
      }

      const blog = await prisma.products.findUnique({
        where: {
          id: id,
        },
      });

      // Not Found Error Handling
      if (!blog) {
        return res.status(404).json({ error: "Blog Not Found" });
      }
      res.json({ status: 200, blog: blog });
    } catch (error) {
      logger.log({ level: "error", message: error });
      return res.status(500).json({
        message:
          "Something Went REALLY Bad With The Server :( Please Try Later ?",
        error: error,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;
      const body = req.body;

      // Check if ID is valid
      if (!checkIdFormat.test(id)) {
        return res.status(400).json({ error: "Invalid ObjectID" });
      }

      // Get the Blog
      const blog = await prisma.products.findUnique({
        where: { id: id },
      });

      // No Blog Found Error Handling
      if (!blog) {
        return res.status(404).json({ error: "Blog Not Found" });
      }

      // Check the Owner
      if (user.id !== blog.user_id) {
        return res.status(401).json({ message: "UnAuthorized" });
      }

      // Data Validation
      const validator = vine.compile(blogUpdateSchema);
      const payload = await validator.validate(body);

      // Check Image Exists
      const image = req.files?.image;
      if (image) {
        const message = imageValidator(image?.size, image?.mimetype);
        if (message !== null)
          return res.status(400).json({ errors: { image: message } });

        const imgEXT = image.name.split(".");
        const newImageName = generateRandomNum() + "." + imgEXT[1];
        const uploadPath =
          process.cwd() + "/public/images/blog/" + newImageName;
        await image.mv(uploadPath, (err) => {
          if (err) throw err;
        });

        // Upload image on cloudinary
        await new Promise((resolve) => setTimeout(resolve, 50));
        const result = await cloudinary.uploader.upload(uploadPath, {
          folder: "blogPictures",
          resource_type: "image",
        });
        const image_id = result?.public_id;
        payload.image_id = image_id;
        fs.unlinkSync(uploadPath);

        // Deleting Old CoverPic from Server
        if (blog.image_id) {
          await cloudinary.uploader.destroy(blog.image_id);
        }
      }

      //If No Update
      if (Object.keys(payload).length === 0) {
        return res.status(411).json({ error: "No Changes Found to Update" });
      }

      // Save the image_id on database
      await prisma.products.update({
        data: { ...payload, updated_at: new Date() },
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: "Blog Updated Successfully",
        data: payload,
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      // Check if ID is valid
      if (!checkIdFormat.test(id)) {
        return res.status(400).json({ error: "Invalid ObjectID" });
      }

      const blog = await prisma.products.findUnique({
        where: {
          id: id,
        },
      });

      // No Blog Found Error Handling
      if (!blog) {
        return res.status(404).json({ error: "Blog Not Found" });
      }

      if (user.id !== blog.user_id) {
        return res.status(401).json({ message: "UnAuthorized" });
      }

      // CAUTION !! This is for deleting Media from Cloudinary, Remove this code after implementing Soft Delete !!!!
      if (blog.image_id) {
        await cloudinary.uploader.destroy(blog.image_id);
      }
      // Delete Blog
      await prisma.products.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Blog Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          "Something Went REALLY Bad With The Server :( Please Try Later ?",
        error: error,
      });
    }
  }
}
