import express from "express";
import fs from "fs";
import path from "path";
import { getGitRepos, updateDatabase } from "./GetGitRepos";
import schedule from "node-schedule";
import cors from "cors";

const app = express();
const PORT = 8080;

const ELIGIBLE = fs.readFileSync(".forceupdate", "utf-8").trim();

// Start a cron-job (weekly)
const job = schedule.scheduleJob("0 0 * * 0", async () => {
  await updateDatabase();
});

app.use(cors());
app.use(express.json());

// Get repository data for user
app.get("/getGitRepos", async (req, res) => {
  const data = await getGitRepos();
  res.json(data);
});

// Force an update
app.post("/updateData", async (req, res) => {
  if (req.body.check !== ELIGIBLE) {
    res.sendStatus(401);
  } else {
    await updateDatabase();
    res.sendStatus(200);
  }
});

app.listen(PORT, () => {});
