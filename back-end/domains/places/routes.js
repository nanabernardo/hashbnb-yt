import { Router } from "express";
import Place from "./model.js";
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";
import { __dirname } from "../../server.js";
import { sendToCloudinary, downloadImage, uploadImage } from "./controller.js";

const router = Router();

router.get("/", async (req, res) => {
  connectDb();

  try {
    const placeDocs = await Place.find();

    res.json(placeDocs);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao encontrar as Acomodações.");
  }
});

router.get("/owner", async (req, res) => {
  connectDb();

  try {
    const userInfo = await JWTVerify(req);

    try {
      const placeDocs = await Place.find({ owner: userInfo._id });

      res.json(placeDocs);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao encontrar as Acomodações.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao verificar o usuário.");
  }
});

router.get("/:id", async (req, res) => {
  connectDb();

  const { id: _id } = req.params;

  try {
    const placeDoc = await Place.findOne({ _id });

    res.json(placeDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao encontrar a Acomodação.");
  }
});

router.put("/:id", async (req, res) => {
  connectDb();

  const { id: _id } = req.params;

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
    const updatedPlaceDoc = await Place.findOneAndUpdate(
      { _id },
      {
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
      }
    );

    res.json(updatedPlaceDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao atualizar a acomodação.");
  }
});

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
    res.status(500).json("Deu erro ao criar o novo lugar.");
  }
});

router.post("/upload/link", async (req, res) => {
  const { link } = req.body;

  try {
    const { fullPath } = await downloadImage(link);

    const fileURL = await sendToCloudinary(fullPath);

    res.json(fileURL);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao baixar a imagem.");
  }
});

router.post("/upload", uploadImage().array("files", 10), async (req, res) => {
  const { files } = req;

  try {
    const uploadPromises = files.map((file) => sendToCloudinary(file.path));
    const fileURLArrayResolved = await Promise.all(uploadPromises);

    res.json(fileURLArrayResolved);
  } catch (error) {
    console.error("Deu algo errado ao subir as imagens para o Cloudinary", error);
    res.status(500).json("Erro no upload das imagens.");
  }
});

export default router;
