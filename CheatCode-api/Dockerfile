FROM eclipse-temurin:25-jre

WORKDIR /app

RUN useradd --system --uid 10001 appuser
COPY --chown=appuser:appuser target/cheatcode-api-1.0.0.jar ./app.jar
COPY --chown=appuser:appuser docs ./docs

USER appuser

ENV SERVER_PORT=8080
ENV DOCS_PATH=/app/docs

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
