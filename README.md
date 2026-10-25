<div align="center">

# CheatCodes

### The commands you need, without the digging.

Search practical guides, learn what each command does, and copy examples in a
click. Add your own topics without a database.

[Get started](#run-locally) · [Features](#features) · [Add a guide](#add-a-guide)

</div>

## Preview

The screenshots below show the actual CheatCodes layout and bundled Docker and
Git topics. Use the switch in the top navigation to choose light or dark mode.

<p align="center">
  <img src="CheatCode-api/docs/images/home-preview.svg" alt="CheatCodes home page with Docker and Git guide cards and a dark-mode switch" width="860" />
</p>

<p align="center"><strong>Find a topic and get straight to the useful bits.</strong></p>

<p align="center">
  <img src="CheatCode-api/docs/images/topic-preview.svg" alt="CheatCodes Docker guide with searchable command examples and copy buttons in dark mode" width="860" />
</p>

<p align="center"><strong>Search a guide, switch themes, and copy commands as you go.</strong></p>

## Features

- **Quick references:** Docker and Git guides are included to get you started.
- **Search in a guide:** Filter the current topic by command, flag, or keyword.
- **Copy-ready examples:** Copy commands from their code blocks with one click.
- **Light and dark themes:** Switch from the header; your choice is saved in this
  browser. By default, the app follows your system theme.
- **File-based content:** Add or update a JSON guide without a database or API
  restart.
- **Responsive layout:** Use the guides on desktop or smaller screens.

## Run locally

### Requirements

- Java 25+
- Node.js 20+ and npm
- Docker Desktop with Docker Compose (for the Docker option)

### Start the app with Docker Compose

The Dockerfiles package the API JAR and Next.js standalone build, so build both
artifacts before starting Compose.

From the repository root in PowerShell:

```powershell
Copy-Item .env.example .env

.\CheatCode-api\mvnw.cmd -f .\CheatCode-api\pom.xml -DskipTests package

Set-Location .\CheatCode-web
npm ci
npm run build
Set-Location ..

docker compose up --build
```

Visit **http://localhost:3000**. The API is available at
**http://localhost:8080/api/topics**.

Stop the app with `Ctrl+C`; remove the stopped containers with:

```powershell
docker compose down
```

The root `.env` is ignored by Git. Keep private or environment-specific values
there, and never commit credentials.

| Variable | Purpose | Default |
| --- | --- | --- |
| `SERVER_PORT` | API port inside the container | `8080` |
| `DOCS_PATH` | Directory containing topic JSON files | `/app/docs` |
| `CORS_ORIGIN` | Frontend origin allowed by the API | `http://localhost:3000` |
| `API_URL` | API address used by the frontend container | `http://backend:8080` |

## Add a guide

Add a JSON file to [`CheatCode-api/docs/`](CheatCode-api/docs/). Its filename
becomes its URL slug (for example, `kubernetes.json` is available at
`/docs/kubernetes`). Use lowercase letters, numbers, and hyphens in the
filename. The API reads the files as requests arrive, so new or edited guides
appear without an API restart.

Each guide has a title, icon, summary, and sections. Sections can include
command cards, code blocks, tips, facts, and platform-specific tabs. For the
full format, start from the included [Docker](CheatCode-api/docs/docker.json) or
[Git](CheatCode-api/docs/git.json) guide.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/topics` | List available guide summaries |
| `GET` | `/api/topics/{slug}` | Get a guide and its sections |

## Built with

- **Web:** Next.js 14, React 18, TypeScript
- **API:** Spring Boot, Java 25
- **Content:** JSON files
- **Local deployment:** Docker Compose

## Contributing

Suggestions, bug fixes, and new guides are welcome. To contribute a guide, add
a JSON file under `CheatCode-api/docs/` and open a pull request.
