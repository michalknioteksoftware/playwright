# Playwright Docker E2E Tests

This project contains a basic Playwright setup running inside Docker to test a web app available on your host at `http://localhost:8000/`.

The tests are written in TypeScript and use `@playwright/test`. Docker is used only to provide a consistent Playwright runtime; your application under test should already be running separately on the host.

---

## Prerequisites

- Docker and Docker Compose (`docker compose` command available)
- Your web app running on the host at `http://localhost:8000/`

> Note: You do **not** need Node.js or npm installed on the host; everything runs inside the container.

---

## Build and start the Playwright container

From the project root (`playwright` directory):

```bash
docker compose up -d --build
```

This will:

- Build the `playwright-tests` image from the `Dockerfile`
- Install Playwright and its browsers inside the image
- Start the `playwright-tests` container in the background (idle, ready to run tests)

You can verify the container is running:

```bash
docker compose ps
```

---

## Run tests (ad hoc)

With the container running, execute the Playwright test suite inside it:

```bash
docker compose exec playwright-tests npx playwright test
```

This will:

- Use the `BASE_URL` configured in `docker-compose.yml` (`http://host.docker.internal:8000`)
- Run all tests under the `tests` directory (configured in `playwright.config.ts`)

To run a specific test file:

```bash
docker compose exec playwright-tests npx playwright test tests/home.spec.ts
```

Or a specific test by title:

```bash
docker compose exec playwright-tests npx playwright test -g "home page shows Welcome header"
```

---

## Stopping the container

When you are done:

```bash
docker compose down
```

This stops and removes the `playwright-tests` container. The image will be reused on the next `docker compose up -d --build` (rebuilt only if files change).

