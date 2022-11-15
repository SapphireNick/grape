import axios from "axios";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const USERNAME = "SapphireNick";

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

export async function getGitRepos(): Promise<Array<RepoData>> {
  return await prisma.repo.findMany();
}

async function getData(): Promise<Array<RepoData>> {
  const data = (
    await axios.get(`https://api.github.com/users/SapphireNick/repos`)
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

export async function updateDatabase() {
  const data = await getData();

  // Clear Table
  await prisma.repo.deleteMany();
  await prisma.$queryRaw`ALTER SEQUENCE "Repo_id_seq" RESTART WITH 1;`;

  // Fill with up-to-date data
  for (let i = 0; i < data.length; i++) {
    await prisma.repo.create({
      data: data[i],
    });
  }
}
