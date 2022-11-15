import express from "express";
import { getGitRepos, updateDatabase } from "./GetGitRepos";

const app = express();
const PORT = 8080;
export let USERNAME = "";

app.use(express.json());
app.post("/getGitRepos", async (req, res) => {
  if (req.body.username === undefined) {
    res.status(400).send({
      message: "NO USERNAME GIVEN",
    });
    return;
  }
  if (req.body.username !== USERNAME) {
    USERNAME = req.body.username;
    await updateDatabase(USERNAME);
  }
  const data = await getGitRepos(req.body.username);
  res.json(data);
});

app.listen(PORT, () => {});
