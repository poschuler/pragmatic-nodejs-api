# Project Context: Pragmatic Node.js API

This document provides context for AI agents and human developers working on the Pragmatic Node.js API project. It outlines the project's architecture, conventions, and collaboration model.

## 1. Project Overview

A pragmatic foundation for building maintainable REST APIs with Node.js, Express, and TypeScript. The project follows a **Vertical Slice Architecture**, where each feature is self-contained with its own endpoints, services, domain logic, and validation.

## 2. Core Architectural Principles

- **Vertical Slice Architecture:** The application is organized by feature (e.g., `products`). Each feature contains all its layers: routes, endpoints, services, DTOs (request/response), mappers, and validation schemas.
- **Separation of Concerns (SoC):** A strict separation is maintained between different layers:
  - **Routing (`...-routes.ts`):** Defines API endpoints and maps them to endpoint handlers. Acts as a factory that receives dependencies.
  - **Endpoints (`...-endpoint.ts`):** Handles individual HTTP operations (one file per action). Receives the service via closure injection.
  - **Services (`...-service.ts`):** Encapsulates business logic and orchestrates domain operations.
  - **Domain (`domain/`):** Contains entity classes with factory methods and business invariants (e.g., `Product.create()`).
  - **DTOs:** Request (`...-request.ts`) and Response (`...-response.ts`) classes define the shape of data entering and leaving the API.
  - **Mappers (`...-mapper.ts`):** Transform domain entities into response DTOs.
  - **Schemas (`...-schema.ts`):** Zod schemas for request validation, colocated with their endpoint.
  - **Data Access Layer (Future):** Repository interfaces and persistence adapters will be added in a future iteration.
- **Dependency Injection:** The `Server` class, routers, and endpoints receive dependencies (services) via constructor or closure injection, promoting loose coupling and testability.
- **Configuration Management:** A centralized, type-safe configuration module (`src/config`) manages environment variables using `dotenv`, providing default values and preventing common runtime errors.
- **Global Error Handling:** A centralized `ExceptionHandlerMiddleware` catches all errors. Custom exception types (e.g., `ValidationException`) allow structured error responses.
- **Schema Validation:** Request validation is performed using Zod schemas through a shared `validateRequestWithSchema` utility, which throws `ValidationException` on failure.

## 3. Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Language:** TypeScript
- **Validation:** Zod v4
- **Env Management:** dotenv
- **Transpiler/Runner:** `tsx` for development, `tsc` for production builds.
- **Linter/Formatter:** BiomeJS for code quality and consistent styling.

## 4. Project Structure

The project follows a vertical-slice, feature-oriented directory structure.

```
src/
├── app.ts                          # Main application entry point
├── server.ts                       # Core Server class (Express wrapper)
├── routes.ts                       # Main application router & middleware composition
│
├── config/
│   └── config.ts                   # Environment variable management
│
├── domain/
│   └── product.entity.ts           # Product domain entity with factory method
│
├── exceptions/
│   ├── validation-error.ts         # ValidationError interface
│   └── validation-exception.ts     # ValidationException class
│
├── middlewares/
│   └── exception-handler.middleware.ts  # Global error handling middleware
│
├── shared/
│   └── validations/
│       └── validate-request-with-schema.ts  # Zod schema validation utility
│
└── features/
    └── products/                   # Products feature module
        ├── products.routes.ts      # Products router factory
        ├── products.service.ts     # Products business logic service
        │
        ├── create-product/         # Create Product endpoint (vertical slice)
        │   ├── create-product.endpoint.ts
        │   ├── create-product.mapper.ts
        │   ├── create-product.request.ts
        │   ├── create-product.response.ts
        │   └── create-products.schema.ts
        │
        └── get-products/           # Get Products endpoint (vertical slice)
            ├── get-products.endpoint.ts
            ├── get-products.mapper.ts
            └── get-products.response.ts
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

- **Routing:** All API routes are prefixed with `/api`. Feature-based routes are nested (e.g., `/api/products`). A `/health` endpoint is available at the root.
- **Endpoint Pattern:** Each API action has its own directory containing the endpoint handler, DTOs, mapper, and schema (one action per file).
- **Naming Conventions:**
  - Files: `kebab-case.ts`
  - Classes: `PascalCase`
  - Functions/Variables: `camelCase`
  - Endpoint directories: `verb-noun/` (e.g., `create-product/`, `get-products/`)
- **Responses:** Endpoint handlers return JSON responses with appropriate HTTP status codes (e.g., `200` for GET, `201` for POST). Error responses follow a structured format with `code`, `message`, and `errors` fields.
- **Validation:** All incoming requests are validated against Zod schemas before reaching business logic. Validation errors return `400` with structured error details.

## 7. LLM Collaboration Model

**Directive:** The LLM agent for this project acts as an **architectural consultant and pair programmer**, not as an automated code modifier. The primary goal of the interaction is to discuss architecture, design patterns, and best practices to arrive at a well-reasoned solution, which the user will then implement manually.

**Rules of Engagement:**

- **Source Code Modification:** The LLM **must not** use tools (`write_file`, `replace`) to modify source code files (e.g., `.ts`, `.json`, `.sql`). All suggestions for code changes must be provided as text or code snippets in the chat response.
- **Documentation File Modification:** The LLM **may only** use file modification tools (`write_file`, `replace`) for documentation and context files (e.g., `AGENTS.md`, `README.md`), and **only when explicitly instructed** to do so by the user.
- **Shell Commands:** The LLM should avoid running shell commands (`run_shell_command`) unless explicitly asked, especially for commands that modify the file system or git state.
