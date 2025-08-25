# CI/CD Pipeline Health Dashboard

A full-stack application for monitoring GitHub Actions workflows. The backend ingests workflow run data, stores it in PostgreSQL, exposes metrics via a REST API, and sends Slack alerts on failures. The frontend displays summary metrics, recent builds, and basic visualizations.

## Architecture

```
GitHub Actions API -> Express Backend -> PostgreSQL <- React Frontend
                               |
                               +-> Slack Webhook Alerts
```

## Setup & Run

```bash
# copy environment variables
cp .env.example .env

# populate credentials
# GH_TOKEN=your_github_token
# REPO_OWNER=owner
# REPO_NAME=repo
# WEBHOOK_URL=https://hooks.slack.com/services/...

# install dependencies and run tests
cd backend && npm install && npm test && cd ..
cd frontend && npm install && npm test && cd ..

# prepare database (skip if using docker-compose)
cd backend && npm run migrate && cd ..

# run services
docker-compose up --build
```


The frontend will be available at http://localhost:3000 and the backend at http://localhost:4000. API requests from the frontend
to `/api/*` are proxied to the backend service by Nginx.

### GitHub Actions & Slack Notifications

This repository includes a workflow at `.github/workflows/ci.yml` that installs dependencies, runs the backend and frontend test suites, and posts the result to Slack.

To enable notifications, add a repository secret named `SLACK_WEBHOOK_URL` with the webhook for the `ci-cd-health-dashboard` channel (e.g. `https://hooks.slack.com/services/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`). The workflow will automatically send messages on success and failure.

## How AI Was Used

This project was generated with assistance from an AI system prompted to design, implement, and document a production-ready CI/CD pipeline health dashboard.

## Key Learnings & Assumptions

- Simplified authentication and error handling for clarity.
- Logs are not streamed; a link to GitHub is provided for detailed logs.
- Further hardening and scalability improvements can be added as needed.
