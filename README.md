# Project Name

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup (Prisma)](#database-setup-prisma)
- [Running the Project](#running-the-project)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SerhiiHurshal/fridge.git
   cd fridge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Environment Variables

Before running the project, configure your environment variables:

1. **Create a .env and .env.local files**
   Copy the example files:

   ```bash
   cp .env.example .env
   cp .env.local.example .env.local
   ```

2. **Edit the .env files**
   Update them with your credentials.

## Database Setup (Prisma)

1. **Run Migrations**
   Copy the example files:
   This will create or update your database schema:

   ```bash
   npx prisma migrate dev
   ```

2. **Generate the Prisma Client**
   Create the client used for database queries:
   ```bash
   npx prisma generate
   ```

## Running the Project

After configuring your environment and setting up the database, start the development server:

```bash
npm run dev
```

Your app should now be running on http://localhost:3000.
