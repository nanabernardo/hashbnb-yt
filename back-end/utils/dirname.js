import { fileURLToPath } from "url"; //pega url e converte para um caminho de arquivo
import { dirname } from "node:path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
