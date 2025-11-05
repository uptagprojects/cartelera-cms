# Cartelera

This is a [Next.js](https://nextjs.org/) project for PNFi department with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Containers
First, run the containers with docker (or podman):
```bash
docker compose up
```

Then connect to the database through the terminal and run the migrations:
```
docker exec -it cms_db bash
```

There you can create the tables with:
```
cd /docker-entrypoint-initdb.d/ && ls | awk '/\.sql$/ {print "cat " $1}' | bash | psql -U $POSTGRES_USER $POSTGRES_DB
```

### 2. Event Bus

In another terminal, onfigure the event bus with:
```bash
npm run configure-rabbitmq
```

And then, to handle each new message from the message queue:
```bash
npm run consume-rabbitmq
```

### 3. Development server

You can run the server by following this comand
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Testing

This project follows a comprehensive testing strategy with three levels of testing: unit tests, integration tests, and acceptance tests.

### Test Structure

Tests are organized in the `tests/` directory following the same structure as the source code:

- **Unit Tests** (`tests/contexts/**/*/application`): Test application layer logic in isolation
- **Integration Tests** (`tests/contexts/**/*/infrastructure`): Test infrastructure components and external integrations
- **Acceptance Tests** (`tests/features/**/*.feature`): Behavior-driven tests written in Gherkin format using Cucumber

### Running Tests

#### Run All Tests

```bash
npm test
```

This command runs the complete test suite: unit tests, integration tests, and acceptance tests.

#### Run Unit Tests Only

```bash
npm run test:unit
```

Unit tests verify the business logic in the application layer. They run fast and don't require external dependencies.

#### Run Integration Tests Only

```bash
npm run test:integration
```

Integration tests verify that infrastructure components (repositories, external services, etc.) work correctly.

#### Run Acceptance Tests Only

```bash
npm run test:acceptance
```

Acceptance tests are end-to-end tests that verify complete user scenarios. They build the application, configure dependencies (like RabbitMQ), and run Cucumber feature files.

#### Run Individual Feature Tests

```bash
npm run test:features
```

This runs just the Cucumber feature files without the build and configuration steps.

### Test Frameworks

- **Jest**: Used for unit and integration tests (TypeScript)
- **Cucumber**: Used for acceptance/BDD tests with Gherkin syntax
- **Playwright**: Configured for browser-based end-to-end tests

### Writing Tests

Tests follow the Object Mother pattern for creating test data. You can find test data builders (Mothers) in the `tests/contexts/**/domain` directories.

Example unit test structure:
```typescript
describe("Component should", () => {
  it("perform expected behavior", async () => {
    // Arrange: Create test data using Mothers
    const expectedData = DataMother.create();
    
    // Act: Execute the behavior
    await component.execute(expectedData);
    
    // Assert: Verify the outcome
    expect(mock).toHaveBeenCalledWith(expectedData);
  });
});
```

## Glossary
- CMS: Content Management System.
- CMA: Content Management Application. This is the part of a CMS which provides our users design, create, modify and remove their content without the need for HTML knowledge.
- CDA: Content Delivery Application. This is the part of a CMS which manages and delivers the content after being created.

The concept of CMA and CDA differs in projects. Sometimes it is explained as the CMA is the UI and the CDA is the backend service. Having different Bounded Contexts for guides, engagement and scalability, these concepts are our meaning for CMA and CDA inside this archicteture. This is our Ubuquitous Language, and it should not be used as the only source of truth.

## Folder Structure

### The `src` folder
This folder holds all the source code for this project.

### api
We build here all the API controller and routing, being the most external concept of our DDD concept. This is an extra layer of concern to make sure we can extend any of the .

### app
This is all the Next.js app. There is also an `api` folder, that uses our api handler.

### contexts
All of our Bounded Contexts are here. We structure our folders following the vertical slicing from Screaming Architecture.