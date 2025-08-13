import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import download from "image-downloader";
import mime from "mime-types";
import multer from "multer";
import { __dirname } from "../../server.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getExtension = (path) => {
  const mimeType = mime.lookup(path);
  const contentType = mime.contentType(mimeType);
  const extension = mime.extension(contentType);

  return { extension, mimeType };
};

export const sendToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "hashbnb", // pasta que será criada no Cloudinary (opcional)
    });
    return result.secure_url; // URL da imagem no Cloudinary
  } catch (error) {
    throw error;
  }
};

export const downloadImage = async (link) => {
  const { extension, mimeType } = getExtension(link);
  const destination = `${__dirname}/tmp/`;

  const filename = `${Date.now()}.${extension}`;
  const fullPath = `${destination}${filename}`;

  console.log(link, extension);

  try {
    const options = {
      url: link,
      dest: fullPath,
    };
    await download.image(options);

    return { filename, fullPath, mimeType };

    //console.log("Saved to", filename);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/tmp/`);
    },
    filename: function (req, file, cb) {
      const { extension } = getExtension(file.originalname);
      const uniqueSulfix = Math.round(Math.random() * 1e9);

      cb(null, `${Date.now()}-${uniqueSulfix}.${extension}`);
    },
  });
  return multer({ storage });
};
