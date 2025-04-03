# HEALTH CLINIC APPOINTMENT SYSTEM

- Advanced Databases & Big Data Assessment 2 - Group Development Project

## Group Members

| Name | Contact Email Address |
|:-----|----------------------:|
|Jessica Excell|je398@canterbury.ac.uk|
|Ethan McGuiness|em814@canterbury.ac.uk|
|Alfie Skinner|as2679@canterbury.ac.uk|
|Alex Ward|aw949@canterbury.ac.uk|
|~~Trinity Sayer~~|~~ts560@canterbury.ac.uk~~|

## Assignment Deadline

- **Tuesday 20th May 2025 - 14:00**

## Assignment Work

| Brief Sec. Ref | Codebase | Work | Weighting | Description / Key Points | Group Member(s) |
|:--------------:|:--------:|:-----|:---------:|:-------------------------|:---------------:|
|**3A**|Document|Requirements Analysis|20%|Define project scope and objectives, understand clinic workflows, define system requirements and key features.|-----|
|**3B**|Document|Entity Relationship (ER) Conceptual Model|10%|Identify entities, define relationships, define data structures (deciding on embedding vs referencing for each), create fully formed and annotated ER model.|-----|
|**3B**|Document|Logical Schema Design (JSON Document Model)|15%|Create fully formed JSON DOcument Model complete with; field names; data types; and example documents for each collection, provide denormalization explanation.|-----|
|**3C**|Document & GitHub Repo - Database Workspace|Database Setup|20%|Setup MongoDB database based on logical schema, populate database with high volume of realistic sample data, ensure proper use of; collections; embedding; and referencing.|-----|
|**3C**|Document & GitHub Repo - API Workspace|Query Implementation (via API?)|15%|Implement queries to support user use cases, optimize queries with appropriate indexing strategies, ensure all CRUD operations for all applicable data are covered as outlined in requirements analysis.|-----|
|**3D**|Document & GitHub Repo - Web Workspace|Operational Web Interface|10%|Demonstraight operational capabilities of created database, develop a simple web user interface, test CRUD operations for accuracy and efficiency,|-----|
|**3E**|Document|Challenges & Future Considerations|10%|Propose and present solutions to the following; "*What do you propose for handling booking conflicts where 2 patients might try to book the same time slot?*"; "*As the clinic grows, the database should be able to handle a large number of records efficiently - what solutions can you propose to handle this?*".|-----|

# Repo Info

If you require any further information regarding the repo structure, commands, workspace codebases, or MongoDB beyond what is written below then feel free to come scream at Alex.

## Design

The ``/schema`` folder contains only design file such as the **Logical Data Schema** and is not linked to any part of the codebase.

## Commits

When making commits to this repo, please try and put a workspace prefix onto the front of the commit message to help specify which workspace your commit is for.
- If you're making global / root change, please prefix with '**Core:**'
- If you're working in the ``database`` workspace, please prefix with '**Database:**'
- If you're working in the ``api`` workspace, please prefix with '**API:**'
- If you're working in the ``web`` workspace, please prefix with '**Web:**'

It's not the end of the world if you forget, but these prefixes do help with keeping track of what people are working on.

## Overview

This is a monorepo comprised of **__3__** workspaces: "database", "api", and "web". The repo requires **NodeJS v20.18.1+**, uses the package manager **Yarn v4.0.2**, and utilizes Volta and Nodes Engine to enforce the Node version. Turbo is used to manage the monorepo.

Details on how to setup, use, and work with this monorepo are detailed below! Documentation for all tools and utilities can be found at the bottom of this file.

## Workspaces

This monorepo contains 3 workspaces / packages:

### Database

This code is located in: (``./database``).

**Content:** This workspace contains the core code for setting up and maintaining the database. This includes; creation script, insertion script, and any future migrations and standalone queries required for the assessment.

**Technology:** This is a simple Typescript scripting workspace that's compiled down to Javascript and executed like a shell script. This is currently executed with node, however, we may have to update this later to execute with MongoDB Shell.

### API

This code is located in: (``./api``).

**Content:** This is the backend API for the appointment system. This contains all backend project code including; all database CRUD operation code, all system logical code, and all querying, filtering, and data manipulation utilities.

**Technology:** This is a simple Fastify REST API written in Typescript. This API accesses the database via the Object Document Model (ODM) tool [Mongoose](https://mongoosejs.com/docs/) and runs on [Port 80](http://localhost:80).

- If you get a ``'Permission Denied'`` error when trying to boot the API, this is because you're OS requires elevated privileges in order to map to Ports below 1024 for security reasons. Sometimes these privileges are enabled by default and sometimes there not. If you get this error you will need to provide the NodeJS binary on your computer with Admin/Sudo privileges.

### Web

This code is located in: (``./web``).

**Content:** This is the simple front-end Web Interface for the system. All GUI code is written here and the UI is powered by data and HTTP requests sent to and from the backend API.

**Technology:** More-a-less the same as the Willowbank repo, Vite is the build tool, React is the core framework, and Typescript is the language. There is currently no UI builder installed, whoever works on the UI can decided how they want to build it and with what.

## Environment Variables

All 3 workspaces require Environment Variables in the form of ENV files. Wherever you find a ``.env.*.example`` file, you need to make a ``.env.*`` file next to it that contains the keys shown in the example file. The example files will tell you what values you need to put with the keys and in some cases, where to get the values.

- You do **NOT** need to wrap any ENV values in ``""``. Just past the raw value past the ``=`` sign on the respective key(s).

### For Example

If you see a ``.env.cloud.example`` file with the following key:
```env
DB_URL=
```
You need to make a ``.env.cloud`` file next to the example file with the same key(s):
```env
DB_URL=
```
Place all values after the ``=`` and place each key on a separate line.

All workspaces have additional type declarations for all ENVs so as long as you write out the ENV keys correctly, you will get autocomplete on the keys in the Typescript files on the ``process.env`` object.

**DO NOT PUT ANY ENV VALUES / SENSITIVE API KEYS / AUTHENTICATION TOKENS IN THE ``.env.*.example`` FILES & DO NOT COMMIT ANY ENV VALUES TO GITHUB!**

## Databases

This repo is setup to allow you to both; use your own locally hosted MongoDB database and connect to a shared online MongoDB database running on MongoDB Atlas. Most execution commands will have a ``:cloud`` or ``:local`` suffix, allowing you to switch databases **once you've set up all ENVs correctly**.

- To get an authentication token for the shared online Database, you will need to ask Alex for your DB credentials and connection string.

## Setup & Commands

**__NOTE:__** All commands for everything should be run in the **repository** root! **DO NOT** directly ``cd`` into a workspace.

### Initial Setup

- Ensure you have **NodeJS v20.18.1** installed.
- - If you do not have v20.18.1 installed, instead of manually downloading the version, I recommend installing either [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) or [Volta](https://volta.sh).
- - - [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) is a tool that can manage your installed Node versions for you and allow you to easily install other versions of node from the CLI using the command ``nvm install 20``, to install NodeJS v20 for example. It furthers lets you easily switch between your installed node versions using the command ``nvw use 20``, to switch to NodeJS v20.
- - - [Volta](https://volta.sh) is a tool that can automatically switch what Node version your using for each program / repo based on config fields in the ``package.json`` file.
- - This monorepo is setup to work with both [NVM](https://github.com/nvm-sh/nvm) and [Volta](https://volta.sh). If you have [NVM](https://github.com/nvm-sh/nvm) you can run ``nvm use`` in root to switch to the required node version. If you have [Volta](https://volta.sh) installed, it should detect and use the correct node version when you run any commands.
- Clone the repo:
- - Using HTTP, run: ``git clone https://github.com/AJGamesArchive/health-clinic-appointment-system.git``
- - Using SSH, run: ``git clone git@github.com:AJGamesArchive/health-clinic-appointment-system.git``
- Enable Corepack to prepare Yarn by running: ``corepack enable``
- Install dependencies by running: ``yarn``
- Create and setup all required ENV files based based on all ``.env.*.example`` files.
- Launch a DEV build of both the web-client and server-api by running: ``yarn all:dev:cloud``. This will connect you to the shared cloud database.

### All Monorepo Commands

**__NOTE:__** All commands for everything should be run in the **repository** root! **DO NOT** directly ``cd`` into a workspace.

#### Global

- ``yarn all:dev:cloud`` - Run a DEV build of both the web-client and server-api, connecting to the shared cloud database.
- ``yarn all:dev:local`` - Run a DEV build of both the web-client and server-api, connecting to you're local database.

#### Database Workspace

- ``yarn db:setup:cloud`` - Run the database creation & data insertion script on the shared cloud database.
- ``yarn db:setup:local`` - Run the database creation & data insertion script on you're local database.
- - *These commands will wipe all data in the respective database before creating the new collections and adding default data!* 

#### API Workspace

- ``yarn api:start:cloud`` - Run the most recently compiled production build of both the server-api, connecting to the shared cloud database.
- ``yarn api:start:local`` - Run the most recently compiled production build of both the server-api, connecting to you're local database.
- ``yarn api:build`` - Compile a production build of the API.
- ``yarn api:dev:cloud`` - Run a DEV build of the server-api, connecting to the shared cloud database.
- ``yarn api:dev:local`` - Run a DEV build of the server-api, connecting to you're local database.

#### Web-Client Workspace

- ``yarn web:preview`` - Run the most recently compiled production build of the web-client.
- ``yarn web:build`` - Compile a production build of the web-client.
- ``yarn web:dev`` - Run a DEB build of the web-client.
- ``yarn web:lint`` - Run ESLint on the web-client code.

#### Dependency Management Commands

- To initially install or further update you're dependencies run: ``yarn``.
- To add a dependency to a workspace run: ``yarn workspace <workspace_name> add <package_name>``.
- To add a DEV dependency to a workspace run: ``yarn workspace <workspace_name> add -D <package_name>``.
- To remove a dependency from a workspace run: ``yarn workspace <workspace_name> remove <package_name>``.
- All dependencies should be installed in 1 of the 3 workspaces, you should **NEVER** need to install a dependency in root but if you ever need to for some arbitrary reason, you can do so with: ``yarn add -W <package_name>`` or: ``yarn add -W -D <package_name>`` for a root DEV dependency.

## Tool & Utility Documentation

- [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) - Tool to help with managing and switching node versions.
- [Volta](https://volta.sh) - Tool to automatically detect a use different node versions in different repos.
- [Corepack](https://nodejs.org/api/corepack.html) - Useful pack of tools for NodeJS - *Comes pre-packed with NodeJS*.
- [Mongoose (ODM)](https://mongoosejs.com/docs/) - Object Document Model tool are aiding in accessing Document Object databases programmatically.
- [MongoDB](https://www.mongodb.com) - Database tool.
- [Fastify](https://fastify.dev) - REST API / Server Framework.
- [Vite](https://vite.dev) - NodeJS Build Tool / Bundler.
- [React](https://reactnative.dev) - Client Web-App Framework.
- [Typescript](https://www.typescriptlang.org/docs/) - Programming Language.

# Additional Assessment Notes

## Points Discussed and Confirmed with Amina 

- The database creation and MongoDB setup and preparation scripts can be created in any way we want.
- The database setup and operations will be graded by the evidence written up in the Documentation/Report and supported by the code submitted - **Amina will not be trying to run / execute the code**.
- Amina has confirmed we're good to use a third-party ODM tool (Mongoose) for aiding in database interactions and operations.
- Any and all schema validation implemented should be done at the **database level** instead of the application level - additional validation can be added to the application level but the database level should take priority.
- Amina confirmed we will get higher marks for writing a "JSON data generation script" to generate high volumes of sample data for the database instead of using an online generation tool.

## Misc Technical Notes

- I've currently got a programmatic Typescript database creation and population script setup that is executed with Node.
- This fits into a web-interface workflow much nicer than other options and allows us to utilize a ODM tool to aid in accessing and querying the database.
