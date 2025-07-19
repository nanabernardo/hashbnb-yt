import "dotenv/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import download from "image-downloader";
import mime from "mime-types";
import multer from "multer";
import { __dirname } from "../../server.js";

const { S3_ACCESS_KEY, S3_SECRET_KEY, BUCKET } = process.env;

const getExtension = (path) => {
  const mimeType = mime.lookup(path);
  const contentType = mime.contentType(mimeType);
  const extension = mime.extension(contentType);

  return extension;
};

export const sendToS3 = async (filename, path, mimetype) => {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    },
  });
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: filename,
    Body: fs.readFileSync(path),
    ContentType: mimetype,
    ACL: "public-read",
  });
  try {
    await client.send(command);

    return `https://${BUCKET}.s3.us-east-1.amazonaws.com/${filename}`;
  } catch (error) {
    throw error;
  }
};

export const downloadImage = async (link) => {
  const extension = getExtension(link);
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
      const extension = getExtension(file.originalname);

      cb(null, `${Date.now()}.${extension}`);
    },
  });
  return multer({ storage });
};
