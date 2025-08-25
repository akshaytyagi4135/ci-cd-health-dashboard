import cron from 'node-cron';
import prisma from '../db.js';
import { fetchWorkflowRuns } from '../services/github.service.js';
import { sendAlert } from '../services/alert.service.js';

export function startSync() {
  const schedule = process.env.SYNC_SCHEDULE || '*/5 * * * *'; // every 5 minutes
  cron.schedule(schedule, async () => {
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;
    const token = process.env.GH_TOKEN;
    const webhook = process.env.WEBHOOK_URL;
    if (!owner || !repo || !token) return;
    try {
      const data = await fetchWorkflowRuns(owner, repo, token);
      for (const run of data.workflow_runs) {
        await prisma.workflowRun.upsert({
          where: { runId: run.id },
          update: {
            status: run.status,
            conclusion: run.conclusion,
            duration: run.run_duration_ms ? Math.round(run.run_duration_ms / 1000) : null,
            updatedAt: new Date(run.updated_at)
          },
          create: {
            runId: run.id,
            repoName: repo,
            workflowName: run.name,
            headBranch: run.head_branch,
            status: run.status,
            conclusion: run.conclusion,
            duration: run.run_duration_ms ? Math.round(run.run_duration_ms / 1000) : null,
            htmlUrl: run.html_url,
            createdAt: new Date(run.created_at),
            updatedAt: new Date(run.updated_at)
          }
        });
        if (run.conclusion === 'failure') {
          await sendAlert(webhook, {
            text: `Workflow ${run.name} failed on branch ${run.head_branch}. ${run.html_url}`
          });
        }
      }
    } catch (err) {
      console.error('Sync failed', err.message);
    }
  });
}
