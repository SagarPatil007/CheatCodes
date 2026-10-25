package com.cheatcode;

/** Short info shown on the homepage and in the docs sidebar. */
public record TopicSummary(String slug, String title, String icon, String summary, int order) {}
