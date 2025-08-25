-- CreateTable
CREATE TABLE "WorkflowRun" (
    "id" SERIAL NOT NULL,
    "runId" INTEGER NOT NULL,
    "repoName" TEXT NOT NULL,
    "workflowName" TEXT NOT NULL,
    "headBranch" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "conclusion" TEXT,
    "duration" INTEGER,
    "htmlUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "WorkflowRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowRun_runId_key" ON "WorkflowRun"("runId");

