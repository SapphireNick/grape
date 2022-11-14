-- CreateTable
CREATE TABLE "Repo" (
    "id" SERIAL NOT NULL,
    "repoName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repo_repoName_key" ON "Repo"("repoName");
