import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
