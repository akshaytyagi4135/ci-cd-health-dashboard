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

# install dependencies and run tests
cd backend && npm install && npm test && cd ..
cd frontend && npm install && npm test && cd ..

# run services
docker-compose up --build
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:4000.

## How AI Was Used

This project was generated with assistance from an AI system prompted to design, implement, and document a production-ready CI/CD pipeline health dashboard.

## Key Learnings & Assumptions

- Simplified authentication and error handling for clarity.
- Logs are not streamed; a link to GitHub is provided for detailed logs.
- Further hardening and scalability improvements can be added as needed.
