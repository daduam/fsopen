import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_, res) => {
  return res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});