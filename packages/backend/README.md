# Backend

## Folder Structure

### The `src` folder
This folder holds all the source code for this project.

### api
We build here all the API controller and routing, being the most external layer of our DDD concept. This is an extra layer of concern for infrastructure, and we prefer to separate it.

### contexts
All of our Bounded Contexts are here. We structure our folders following the vertical slicing from Screaming Architecture.

The `cma` has all the content delivery application context.
The `cda` holds all the content management application context.
The `shared` contains information related to all of the other contexts. Please use with caution.