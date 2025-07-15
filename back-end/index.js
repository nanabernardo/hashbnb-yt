import "dotenv/config";

import { app } from "./server.js";

const { PORT } = process.env; // = const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
