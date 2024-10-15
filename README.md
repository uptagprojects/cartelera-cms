# Cartelera

This is a [Next.js](https://nextjs.org/) project for PNFi department with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Folder Structure

### The `src` folder
This folder holds all the source code for this project.

### api
We build here all the API controller and routing, being the most external concept of our DDD concept. This is an extra layer of concern to make sure we can extend any of the .

### app
This is all the Next.js app. There is also an `api` folder, that uses our api handler.

### contexts
All of our Bounded Contexts are here. We structure our folders following the vertical slicing from Screaming Architecture.