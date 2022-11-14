import express from "express";
import { getGitRepos } from "./GetGitRepos";

const app = express();
const PORT = 8080;

app.get("/getGitRepos", async (req, res) => {
  // TODO: what if no username is given
  const data = await getGitRepos(req.body.username);
  res.json(data);
});

app.listen(PORT, () => {});
