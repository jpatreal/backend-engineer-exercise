# My Server App

This server app is a backend service built with **Node.js**, **TypeScript**, **GraphQL**, **Sequelize**, and **PostgreSQL**. It provides an API for managing users, leads, and services, with robust features such as pagination, environment variable management, and modular architecture for scalability.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Scripts](#scripts)
7. [Database Setup](#database-setup)
8. [GraphQL Endpoints](#graphql-endpoints)
9. [Project Structure](#project-structure)
10. [Contributing](#contributing)
11. [License](#license)

---

## Features

- **GraphQL API** with resolvers and schemas for users, leads, and services.
- **Pagination** support for querying leads.
- **Sequelize ORM** for database interactions.
- **PostgreSQL** as the database backend.
- Modular architecture for scalability.
- Built-in **TypeScript** support for type safety.
- Environment variable management using **dotenv**.

---

## Technologies Used

- **Node.js**
- **TypeScript**
- **GraphQL**
- **Apollo Server**
- **Sequelize**
- **PostgreSQL**
- **dotenv** for configuration
- **ts-node-dev** for development

---

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jpatreal/backend-engineer-exercise.git
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

> **Note:** Replace placeholders (`your_db_user`, `your_db_password`, etc.) with your actual database credentials.

---

## Scripts

The following scripts are available in `package.json`:

- **`npm start`**: Runs the server in production mode.
- **`npm run dev`**: Runs the server in development mode with hot reload.
- **`npm run build`**: Compiles TypeScript files to JavaScript.
- **`npm run lint`**: Runs ESLint on the codebase.

---

## GraphQL Endpoints

The GraphQL server is accessible at:
```
http://localhost:<PORT>/graphql
```

Example queries:

**Fetch Leads with Pagination:**
```graphql
query GetLeads($limit: Int!, $page: Int!) {
  leads(limit: $limit, page: $page) {
    leads {
      id
      name
      email
      services
    }
    totalCount
  }
}
```

**Create a New User:**
```graphql
mutation CreateUser($input: CreateUserInput!) {
  register(input: $input) {
    id
    name
    email
  }
}
```

---

## Project Structure

```plaintext
src/
├── models/              # Sequelize models
├── resolvers/           # GraphQL resolvers
├── schemas/             # GraphQL schemas
├── config/              # Database and environment configurations
├── app.ts               # Main application entry point
```