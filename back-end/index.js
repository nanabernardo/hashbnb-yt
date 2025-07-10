import "dotenv/config";
import express from "express";
import UserRoutes from "./domains/users/routes.js";
import PlaceRoutes from "./domains/places/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url"; //pega url e converte para um caminho de arquivo
import { dirname } from "node:path";

const app = express();
const { PORT } = process.env; // = const PORT = process.env.PORT;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/users", UserRoutes);
app.use("/places", PlaceRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
