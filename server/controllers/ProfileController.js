import {generateRandomNum, imageValidator} from "../utils/helper.js";
import {prisma} from "../db/db.config.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

class ProfileController {
    static async index(req, res) {
        try {
            const userData = req.user;
            const user = await prisma.users.findUnique({
                where: {id: userData.id},
                select: {
                    id: true,
                    role: true,
                    name: true,
                    email: true,
                    picture_id: true,
                },
            // Include imageUrl in the response
            });

            if (user.picture_id) {
                user.image = cloudinary.url(user.picture_id);
                delete user.picture_id;
            }

            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({
                message:
                    "Something Went REALLY Bad With The Server :( Please Try Later ?",
                error: error,
            });
        }
    }

    static async update(req, res) {
        try {
            const {id} = req.params;
            const validUser = req.user;

            // Validating Owner of the Account
            if (validUser.id !== id) {
                return res.status(401).json({status: 401, message: "UnAuthorized"});
            }

            // Fetching User
            const user = await prisma.users.findUnique({
                where: {
                    id: id,
                },
            });

            const {name} = req.body;

            // Flag to check if any update operation is performed
            let updated = false;

            // Process the profile picture if provided
            if (req.files && req.files.profile) {
                const profile = req.files.profile;
                const message = imageValidator(profile?.size, profile.mimetype);

                if (message != null) {
                    return res.status(400).json({
                        errors: {
                            profile: message,
                        },
                    });
                }

                // Making image name unique
                const imgEXT = profile?.name.split(".");
                const imageName = generateRandomNum() + "." + imgEXT[1];
                const uploadPath =
                    process.cwd() + "/public/images/profile/" + imageName;

                await profile.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });

                // upload image on cloudinary
                await new Promise((resolve) => setTimeout(resolve, 50));
                const result = await cloudinary.uploader.upload(uploadPath, {
                    folder: "profilePictures",
                    resource_type: "image",
                });
                const picture_id = result.public_id;

                // Deleting Old ProfilePic from Server
                if (user.picture_id) {
                    await cloudinary.uploader.destroy(user.picture_id);
                }

                fs.unlinkSync(uploadPath);

                // Update picture_id in the database
                await prisma.users.update({
                    data: {
                        picture_id: picture_id,
                        updated_at: new Date(),
                    },
                    where: {
                        id: id,
                    },
                });

                updated = true;
            }

            // Update name in the database if provided
            if (name) {
                await prisma.users.update({
                    data: {
                        name: name,
                        updated_at: new Date(),
                    },
                    where: {
                        id: id,
                    },
                });

                updated = true;
            }

            // If no update operation is performed, return a message indicating no changes found
            if (!updated) {
                return res
                    .status(400)
                    .json({status: 400, message: "No Changes Found to Apply"});
            }

            return res.json({
                status: 200,
                message: "Profile Updated Successfully.",
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Something Went REALLY Bad With The Server :( Please Try Later ?",
                error,
            });
        }
    }

    static async destroy() {
    }
}

export default ProfileController;
