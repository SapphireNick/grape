import express from "express";
import { getGitRepos, updateDatabase } from "./GetGitRepos";
import schedule from "node-schedule";

const app = express();
const PORT = 8080;

// Start a cron-job (weekly)
const job = schedule.scheduleJob("0 0 * * 0", async () => {
  await updateDatabase();
});

app.use(express.json());
app.get("/getGitRepos", async (req, res) => {
  const data = await getGitRepos();
  res.json(data);
});

app.listen(PORT, () => {});
