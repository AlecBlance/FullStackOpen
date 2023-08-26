import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";

const app = express();

app.use(cors());
app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
