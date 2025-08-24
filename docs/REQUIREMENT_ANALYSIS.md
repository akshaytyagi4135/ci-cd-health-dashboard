# 🧠 Requirement Analysis Document

## Key Features

### Epic: CI/CD Pipeline Health Dashboard
- **User Story 1:** As a DevOps engineer, I want to see the success rate of recent pipeline runs so that I can gauge system stability.
- **User Story 2:** As a developer, I want to know the average build time for successful runs so that I can estimate deployment durations.
- **User Story 3:** As a team lead, I want to be alerted in Slack when a pipeline fails so that we can react quickly.
- **User Story 4:** As an engineer, I want to view a list of recent builds with status, branch, duration, and timestamp so that I can investigate failures.
- **User Story 5:** As a viewer, I want to click a build to see detailed logs so that I can debug issues.
- **User Story 6:** As an engineer, I want a visual representation of build trends to monitor performance over time.

## Tech Choices
- **Backend:** Node.js with Express.js for a lightweight, extensible API server.
- **Frontend:** React with hooks for building a responsive dashboard; Recharts for visualization.
- **Database:** PostgreSQL to store workflow run data reliably.
- **ORM:** Prisma for type-safe database access and easy migrations.
- **Alerting:** Slack Incoming Webhooks for simple, integrable notifications.
- **Containerization:** Docker & docker-compose for reproducible deployments and local development.

## APIs / External Tools Required
- **GitHub REST API:** `GET /repos/{owner}/{repo}/actions/runs` to fetch workflow run data.
- **GitHub REST API:** `GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs` for detailed logs.
- **Slack Incoming Webhook:** to post alerts on pipeline failures.
- **Node Cache / in-memory caching:** to reduce GitHub API rate usage.

## Non-Functional Requirements
- **Security:** Secrets like GitHub tokens and webhook URLs must be provided via environment variables and never committed.
- **Performance:** Use in-memory caching to avoid hitting GitHub rate limits and keep API responses under 500ms.
- **Reliability:** Background sync jobs should handle transient errors and retry failed API calls.

## Assumptions
- Target repositories use GitHub Actions.
- Slack webhook is reachable from the backend environment.
- Cron-driven sync runs at configurable intervals (default every 5 minutes).

