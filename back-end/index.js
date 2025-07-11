import "dotenv/config";
import { fileURLToPath } from "url"; //pega url e converte para um caminho de arquivo
import { dirname } from "node:path";
import { app } from "./server.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const { PORT } = process.env; // = const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
