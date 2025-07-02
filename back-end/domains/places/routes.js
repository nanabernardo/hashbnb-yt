import { Router } from "express";
import Place from "./model";

const router = Router;

router.post("/", async (req, res) => {
  const {
    title,
    city,
    photos,
    description,
    extras,
    price,
    checkin,
    checkout,
    guests,
  } = req.body;

  try {
    const newPlaceDoc = await Place.create({
      owner,
      title,
      city,
      photos,
      description,
      extras,
      price,
      checkin,
      checkout,
      guests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default router;
