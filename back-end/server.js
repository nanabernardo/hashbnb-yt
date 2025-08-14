import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { fileURLToPath } from "url"; //pega url e converte para um caminho de arquivo
import path, { dirname } from "node:path";

export const app = express();

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
app.use("/tmp", express.static(__dirname + "/tmp"));
app.use(express.static(path.join(__dirname, "../front-end/dist")));
app.use(router);

// ----- Onde parei. Está dando erro e precisa ser resolvido. ------
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
// });
