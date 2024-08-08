# Cartelera

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Glossary
- CMS: Content Management System.
- CMA: Content Management Application. This is the part of a CMS which provides our users design, create, modify and remove their content without the need for HTML knowledge.
- CDA: Content Delivery Application. This is the part of a CMS which manages and delivers the content after being created.

The concept of CMA and CDA differs in projects. Sometimes it is explained as the CMA is the UI and the CDA is the backend service. Having different Bounded Contexts for guides, engagement and scalability, these concepts are our meaning for CMA and CDA inside this archicteture. This is our Ubuquitous Language, and it should not be used as the only source of truth.

## Monorepo Structure

### frontend

This is our CMA frontend, built with React.js.

### backend

This repo holds all the CMA and CDA services. It could be separated, but we prefer to start working focusing on a monolith.
