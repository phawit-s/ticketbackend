# Ticket Backend

## Getting Started

### 1. Start Redis and Postgres with Docker

```sh
docker-compose up -d
```

This will start the required Redis and Postgres containers.

### 2. Install Dependencies

```sh
bun i
```

### 3. Run Database Migrations

```sh
bun db:migrate
```

### 4. Seed the Database

```sh
bun db:seed
```

### 5. Start Development Server

```sh
bun dev
```

---

**Services:**

- Postgres: `localhost:5432`
- Redis: `localhost:6379`
- Bullui: `http://localhost:3333/queues/ui`

**Environment variables:**  
Configure your `.env` file as needed.
