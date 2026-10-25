# DocNotes API (Spring Boot 4.1.2, Java 25)

Serves documentation topics from JSON files in the `docs/` folder. No database.

## Import into Spring Tool Suite (STS)
1. Unzip this folder anywhere.
2. STS: File > Import > Maven > Existing Maven Projects > Next.
3. Root Directory: select the unzipped `docnotes-api` folder. pom.xml should be ticked. Finish.
4. Wait for the dependency download to finish (bottom-right progress bar).
5. Right-click the project > Run As > Spring Boot App (or Boot Dashboard > start).
6. Open http://localhost:8080/api/topics

Needs JDK 25 or newer (STS > Window > Preferences > Java > Installed JREs).
If the project shows errors: right-click project > Maven > Update Project > Force Update.

## Add a topic
Drop a new `something.json` into `docs/`. It shows up immediately, no restart.
The file name is the topic slug. See docker.json for the format.

## Endpoints
- GET /api/topics
- GET /api/topics/{slug}

## Configuration

When running with Docker Compose, copy the root `.env.example` to `.env` and set
the values for your environment. `.env` is ignored by Git; do not commit secrets
or put real credentials in `.env.example`.

From the workspace root in PowerShell:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

| Variable | Purpose | Default |
| --- | --- | --- |
| `SERVER_PORT` | API port inside the container | `8080` |
| `DOCS_PATH` | Folder containing topic files | `/app/docs` in Docker; `./docs` locally |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |
| `API_URL` | API address used by the frontend container | `http://backend:8080` |

When running the API directly from an IDE, set `SERVER_PORT`, `DOCS_PATH`, and
`CORS_ORIGIN` in the run configuration. Spring Boot does not automatically load
the root Compose `.env` file for an IDE launch.
