let prisma;
try {
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient();
} catch (e) {
  // fallback mock for environments without generated client
  prisma = {
    workflowRun: {
      findMany: async () => [],
      findUnique: async () => null,
      upsert: async () => {}
    }
  };
}

export default prisma;
