import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RepoData {
  // Repository Name
  repoName: string;

  // Description
  description: string;

  // Main language used in Project
  language: string;

  // URL
  html_url: string;
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
    if (entry["language"] == null) return; // github profile config => not really a project
    res.push({
      repoName: entry["name"],
      description: entry["description"],
      language: entry["language"],
      html_url: entry["html_url"],
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
