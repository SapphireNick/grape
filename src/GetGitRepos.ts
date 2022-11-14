import axios from "axios";
import fs from "fs";
import path from "path";

let USERNAME = "";

// Setup DB-Specific
let DB_USER, DB_PASSWORD;
fs.readFile(path.join(__dirname, "../.env"), "utf-8", (err, data) => {
  if (err) throw err;
  DB_USER = data.split("\n")[0].split("=")[1];
  DB_PASSWORD = data.split("\n")[0].split("=")[1];
});

interface RepoData {
  // Repository Name
  repoName: string;

  // Description
  description: string;

  // Main language used in Project
  language: string;
}

export async function getGitRepos(username: string): Promise<Array<RepoData>> {
  if (username !== USERNAME) {
    USERNAME = username;
    updateDatabase(USERNAME);
  }
  return [];
}

async function getData(username: string): Promise<Array<RepoData>> {
  const data = (
    await axios.get(`https://api.github.com/users/${username}/repos`)
  ).data;

  let res = new Array<RepoData>();

  data.forEach((entry: any) => {
    res.push({
      repoName: entry["name"],
      description: entry["description"],
      language: entry["language"],
    });
  });

  return res;
}

async function updateDatabase(username: string) {
  const data = getData(username);
}
