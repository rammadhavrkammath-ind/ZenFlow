package com.zenflow.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.zenflow.model.YogaAsana;
import com.zenflow.model.YogaRoutine;
import com.zenflow.patterns.BoxBreathingStrategy;
import com.zenflow.patterns.BreathingStrategy;
import com.zenflow.patterns.FourSevenEightStrategy;
import com.zenflow.patterns.SessionManager;
import com.zenflow.service.PoseRepository;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * ============================================================================
 * LIGHTWEIGHT REST API SERVER (Built with standard Java HttpServer)
 * 
 * Provides RESTful JSON API endpoints for the Next.js / Vercel frontend.
 * Enables the web application to query poses, routines, and user stats
 * generated directly by the Java OOP engine.
 * ============================================================================
 */
public class YogaHttpServer {

    private static final int PORT = 8080;
    private final PoseRepository poseRepository;
    private final SessionManager sessionManager;
    private HttpServer server;

    public YogaHttpServer() {
        this.poseRepository = new PoseRepository();
        this.sessionManager = SessionManager.getInstance();
    }

    public void start() throws IOException {
        server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // Register API Routes
        server.createContext("/api/poses", new PosesHandler());
        server.createContext("/api/breathe", new BreatheHandler());
        server.createContext("/api/stats", new StatsHandler());
        server.createContext("/api/health", new HealthHandler());

        server.setExecutor(null); // default executor
        server.start();
        System.out.println("🌿 ZenFlow Java REST API Server listening at http://localhost:" + PORT + "/");
        System.out.println("   Available endpoints:");
        System.out.println("   - GET http://localhost:" + PORT + "/api/poses");
        System.out.println("   - GET http://localhost:" + PORT + "/api/breathe");
        System.out.println("   - GET http://localhost:" + PORT + "/api/stats");
        System.out.println("   - GET http://localhost:" + PORT + "/api/health");
    }

    public void stop() {
        if (server != null) {
            server.stop(0);
        }
    }

    private class PosesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            List<YogaAsana> poses = poseRepository.getAllPoses();
            StringBuilder json = new StringBuilder("[");
            for (int i = 0; i < poses.size(); i++) {
                YogaAsana p = poses.get(i);
                json.append("{")
                    .append("\"id\":\"").append(p.getId()).append("\",")
                    .append("\"englishName\":\"").append(escapeJson(p.getEnglishName())).append("\",")
                    .append("\"sanskritName\":\"").append(escapeJson(p.getSanskritName())).append("\",")
                    .append("\"category\":\"").append(p.getCategory().name()).append("\",")
                    .append("\"categoryDisplay\":\"").append(p.getCategory().getDisplayName()).append("\",")
                    .append("\"difficulty\":\"").append(p.getDifficulty().name()).append("\",")
                    .append("\"durationSeconds\":").append(p.getHoldDurationSeconds()).append(",")
                    .append("\"metMultiplier\":").append(p.getMetMultiplier()).append(",")
                    .append("\"caloriesBurned\":").append(String.format("%.1f", p.calculateCalorieBurn(p.getHoldDurationSeconds()))).append(",")
                    .append("\"alignmentCues\":\"").append(escapeJson(p.getAlignmentCues())).append("\",")
                    .append("\"benefits\":\"").append(escapeJson(p.getPrimaryBenefits())).append("\",")
                    .append("\"chimeFrequencyHz\":").append(p.getChimeFrequencyHz())
                    .append("}");
                if (i < poses.size() - 1) json.append(",");
            }
            json.append("]");

            sendJsonResponse(exchange, 200, json.toString());
        }
    }

    private class BreatheHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            BreathingStrategy box = new BoxBreathingStrategy();
            BreathingStrategy relax = new FourSevenEightStrategy();

            String json = "["
                    + String.format("{\"name\":\"%s\",\"inhale\":%d,\"hold1\":%d,\"exhale\":%d,\"hold2\":%d,\"effect\":\"%s\"},",
                    box.getStrategyName(), box.getInhaleSeconds(), box.getInhaleHoldSeconds(), box.getExhaleSeconds(), box.getExhaleHoldSeconds(), escapeJson(box.getPhysiologicalEffect()))
                    + String.format("{\"name\":\"%s\",\"inhale\":%d,\"hold1\":%d,\"exhale\":%d,\"hold2\":%d,\"effect\":\"%s\"}",
                    relax.getStrategyName(), relax.getInhaleSeconds(), relax.getInhaleHoldSeconds(), relax.getExhaleSeconds(), relax.getExhaleHoldSeconds(), escapeJson(relax.getPhysiologicalEffect()))
                    + "]";

            sendJsonResponse(exchange, 200, json);
        }
    }

    private class StatsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            String json = String.format(
                    "{\"totalMinutes\":%d,\"completedSessions\":%d,\"currentStreak\":%d,\"badges\":%d}",
                    sessionManager.getUserProgress().getTotalMinutesPracticed(),
                    sessionManager.getUserProgress().getCompletedSessionsCount(),
                    sessionManager.getUserProgress().getCurrentStreakDays(),
                    sessionManager.getUserProgress().getUnlockedBadges().size()
            );

            sendJsonResponse(exchange, 200, json);
        }
    }

    private class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            String json = "{\"status\":\"UP\",\"engine\":\"Java-OOP-ZenFlow-Engine\",\"version\":\"1.0.0\"}";
            sendJsonResponse(exchange, 200, json);
        }
    }

    private void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private void sendJsonResponse(HttpExchange exchange, int statusCode, String jsonResponse) throws IOException {
        byte[] bytes = jsonResponse.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private String escapeJson(String raw) {
        if (raw == null) return "";
        return raw.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", " ").replace("\r", "");
    }

    public static void main(String[] args) throws IOException {
        YogaHttpServer server = new YogaHttpServer();
        server.start();
    }
}
