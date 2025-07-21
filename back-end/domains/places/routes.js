import { Router } from "express";
import Place from "./model.js";
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";
import { __dirname } from "../../server.js";
import { sendToS3, downloadImage, uploadImage } from "./controller.js";

const router = Router();

router.post("/", async (req, res) => {
  connectDb();

  const {
    title,
    city,
    photos,
    description,
    extras,
    perks,
    price,
    checkin,
    checkout,
    guests,
  } = req.body;

  try {
    const { _id: owner } = await JWTVerify(req);

    const newPlaceDoc = await Place.create({
      owner,
      title,
      city,
      photos,
      description,
      extras,
      perks,
      price,
      checkin,
      checkout,
      guests,
    });

    res.json(newPlaceDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao criaro novo lugar.");
  }
});

router.post("/upload/link", async (req, res) => {
  const { link } = req.body;

  try {
    const { filename, fullPath, mimeType } = await downloadImage(link);

    const fileURL = await sendToS3(filename, fullPath, mimeType);

    res.json(fileURL);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao baixar a imagem.");
  }
});

router.post("/upload", uploadImage().array("files", 10), async (req, res) => {
  const { files } = req;

  const filesPromise = new Promise((resolve, reject) => {
    const fileURLArray = [];

    files.forEach(async (file, index) => {
      const { filename, path, mimetype } = file;

      try {
        const fileURL = await sendToS3(filename, path, mimetype);

        fileURLArray.push(fileURL);
      } catch (error) {
        console.error("Deu algo errado ao subir para o S3", error);
        reject(error);
      }
    });
    const idInterval = setInterval(() => {
      console.log("executou o intervalo!");

      if (files.length === fileURLArray.length) {
        clearInterval(idInterval);
        console.log("Limpou o intervalo!");
        resolve(fileURLArray);
      }
    }, 100);
  });

  const fileURLArrayResolved = await filesPromise;

  res.json(fileURLArrayResolved);
});

// {
//   fieldname: 'files',
//   originalname: '1752775547490.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'C:\\Users\\nanab\\Projetos\\HASHBNB-YOUTUBE\\back-end/tmp/',
//   filename: '1752958182919.jpg',
//   path: 'C:\\Users\\nanab\\Projetos\\HASHBNB-YOUTUBE\\back-end\\tmp\\1752958182919.jpg',
//   size: 2038552
// }

export default router;
