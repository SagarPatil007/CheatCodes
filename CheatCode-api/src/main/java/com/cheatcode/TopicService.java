package com.cheatcode;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;
import tools.jackson.core.JacksonException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Stream;

/**
 * Reads topics straight from JSON files on every request, so new or edited
 * files show up without restarting the server. No database involved.
 */
@Service
public class TopicService {

    private static final Pattern SLUG = Pattern.compile("^[a-z0-9-]+$");

    private final ObjectMapper mapper;
    private final Path dir;

    public TopicService(ObjectMapper mapper, @Value("${docs.path}") String docsPath) {
        this.mapper = mapper;
        this.dir = Path.of(docsPath).toAbsolutePath().normalize();
    }

    public List<TopicSummary> list() {
        if (!Files.isDirectory(dir)) return List.of();
        try (Stream<Path> files = Files.list(dir)) {
            return files
                .filter(p -> p.getFileName().toString().endsWith(".json"))
                .map(this::toSummary)
                .filter(Objects::nonNull)
                .sorted(Comparator.comparingInt(TopicSummary::order).thenComparing(TopicSummary::title))
                .toList();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public Optional<JsonNode> get(String slug) {
        if (!SLUG.matcher(slug).matches()) return Optional.empty(); // blocks ../ tricks
        Path file = dir.resolve(slug + ".json");
        if (!Files.isRegularFile(file)) return Optional.empty();
        try {
            JsonNode node = mapper.readTree(file.toFile());
            if (node instanceof ObjectNode obj) obj.put("slug", slug);
            return Optional.of(node);
        } catch (JacksonException e) {
            return Optional.empty();
        }
    }

    @SuppressWarnings("deprecation")
	private TopicSummary toSummary(Path file) {
        try {
            String name = file.getFileName().toString();
            String slug = name.substring(0, name.length() - 5);
            if (!SLUG.matcher(slug).matches()) return null;
            JsonNode n = mapper.readTree(file.toFile());
            return new TopicSummary(
                slug,
                n.path("title").asText(slug),
                n.path("icon").asText("📘"),
                n.path("summary").asText(""),
                n.path("order").asInt(100));
        } catch (JacksonException e) {
            return null; // skip broken files instead of breaking the whole site
        }
    }
}
