# Project Context: Pragmatic Node.js API

This document provides context for AI agents and human developers working on the Pragmatic Node.js API project. It outlines the project's architecture, conventions, and collaboration model.

## 1. Project Overview

A pragmatic foundation for building maintainable REST APIs with Node.js, Express, and TypeScript.

## 2. Core Architectural Principles

- **Modularity:** The application is divided into feature-based modules (e.g., `products`). Each module is self-contained, with its own routes, controllers, and (eventually) services and data access layers.
- **Separation of Concerns (SoC):** A strict separation is maintained between different layers of the application:
  - **Routing (`...-routes.ts`):** Defines API endpoints and maps them to controller methods.
  - **Controllers (`...-controller.ts`):** Handles HTTP requests and responses, orchestrating business logic. It should not contain raw business logic itself.
  - **Services (Future):** Encapsulates business logic.
  - **Data Access Layer (Future):** Manages database interactions.
- **Dependency Injection:** The `Server` class and routers are designed to receive dependencies (like other routers), promoting loose coupling and testability.
- **Configuration Management:** A centralized, type-safe configuration module (`src/config`) manages environment variables, providing default values and preventing common runtime errors.

## 3. Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Transpiler/Runner:** `tsx` for development, `tsc` for production builds.
- **Linter/Formatter:** BiomeJS for code quality and consistent styling.

## 4. Project Structure

The project follows a feature-oriented directory structure.

```
src/
├── app.ts               # Main application entry point
├── server.ts            # Core Server class (Express wrapper)
├── routes.ts            # Main application router
│
├── config/
│   └── config.ts        # Environment variable management
│
└── features/            
    └── products         # Example feature module
        ├── products-controller.ts
        └── products-routes.ts
```

## 5. Development Workflow

Key scripts are defined in `package.json`:

- `npm run dev`: Starts the application in development mode with hot-reloading using `tsx`.
- `npm run build`: Compiles the TypeScript code into JavaScript in the `dist` directory.
- `npm run start`: Builds and starts the production version of the application.
- `npm run biome:lint`: Lints the codebase for errors.
- `npm run biome:lint:fix`: Lints and fixes the codebase.
- `npm run biome:format`: Formats the codebase.
- `npm run biome:format:fix`: Formats and writes the changes to the codebase.

## 6. API Style Guide

- **Routing:** All API routes are prefixed with `/api`. Feature-based routes are nested (e.g., `/api/products`).
- **Naming Conventions:**
  - Files: `kebab-case.ts`
  - Classes: `PascalCase`
  - Functions/Variables: `camelCase`
- **Responses:** Controllers should return JSON responses with appropriate HTTP status codes.

## 7. LLM Collaboration Model

**Directive:** The LLM agent for this project acts as an **architectural consultant and pair programmer**, not as an automated code modifier. The primary goal of the interaction is to discuss architecture, design patterns, and best practices to arrive at a well-reasoned solution, which the user will then implement manually.

**Rules of Engagement:**

- **Source Code Modification:** The LLM **must not** use tools (`write_file`, `replace`) to modify source code files (e.g., `.ts`, `.json`, `.sql`). All suggestions for code changes must be provided as text or code snippets in the chat response.
- **Documentation File Modification:** The LLM **may only** use file modification tools (`write_file`, `replace`) for documentation and context files (e.g., `AGENTS.md`, `README.md`), and **only when explicitly instructed** to do so by the user.
- **Shell Commands:** The LLM should avoid running shell commands (`run_shell_command`) unless explicitly asked, especially for commands that modify the file system or git state.
