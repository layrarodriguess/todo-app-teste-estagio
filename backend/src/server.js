import "dotenv/config";
import express from "express";
import cors from "cors";
import { ZodError } from "zod";
import tasksRoutes from "./routes/tasksRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/tasks", tasksRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues[0]?.message ?? "Dados inválidos." });
  }

  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
