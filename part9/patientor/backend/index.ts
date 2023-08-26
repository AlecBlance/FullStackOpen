import express from "express";

const app = express();
app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
