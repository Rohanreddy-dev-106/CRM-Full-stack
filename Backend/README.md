# CRM Backend

Node.js + Express CRM API with role-based auth, Zod request validation, and onboarding checklist automation.

## Features

- JWT auth with HTTP-only cookie support and Bearer token support
- Role-based authorization (`admin`, `manager`, `agent`)
- Card/prospect CRUD
- Notes per prospect
- Onboarding checklist per prospect
- Pagination support (`page`, `limit`)
- Zod validation for params, query, and request body
- Automatic onboarding checklist generation when a card stage changes to `Pilot Closed`

## Project Structure

```text
CRM/
  src/
    config/       # MongoDB connection
    controllers/  # HTTP handlers
    middleware/   # Auth + validation middleware
    models/       # Mongoose schemas
    repo/         # Data access layer
    routers/      # Route definitions
    service/      # Business logic
    utils/        # Checklist generation utility
    validation/   # Zod schemas
  index.js        # Express app setup
  server.js       # Startup + DB connection
  package.json
```

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `src/.env` and add:

```env
PORT=5000
MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/crm
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

3. Start the API

```bash
npm run dev
```

## Auth

Base path: `/api/auth`

- `POST /register`
- `POST /login`
- `GET /me` (requires auth)
- `POST /logout` (requires auth)

Token is returned in response and also set in `token` cookie. Protected routes accept either:

- `Authorization: Bearer <token>`
- `token` cookie

## Main API

Base path: `/api`

- `GET /cards` (admin, manager, agent)
- `GET /cards/:id` (admin, manager, agent)
- `POST /cards` (admin, manager)
- `PATCH /cards/:id` (admin, manager)
- `DELETE /cards/:id` (admin)
- `POST /cards/:cardId/notes` (admin, manager, agent)
- `GET /cards/:cardId/notes` (admin, manager, agent)
- `GET /cards/:cardId/checklist` (admin, manager, agent)
- `PATCH /checklist/:id` (admin, manager)

## Validation Rules (Zod)

- `id` / `cardId`: must be a valid MongoDB ObjectId (24-hex)
- `page`: integer >= 1 (default `1`)
- `limit`: integer 1-100 (default `10`)
- `register`:
  - `name` required
  - `email` valid email
  - `password` min 6 chars
  - `role` optional (`admin`, `manager`, `agent`)
- `login`:
  - `email` valid email
  - `password` required
- `create card`:
  - required: `name`, `school`
  - optional: `role`, `email`, `phone`, `source`, `stage`, `lastContactDate`, `nextFollowUpDate`
- `update card`:
  - same fields as create, all optional
  - at least one field required
- `add note`:
  - `content` required, max 2000 chars
- `update checklist`:
  - `status`: `todo` or `done`

## Business Rule: Auto Checklist Creation

When a card stage transitions from anything else to `Pilot Closed`, the service creates a 10-step onboarding checklist automatically.

Safety guard:

- If checklist items already exist for that prospect, no duplicate checklist is created.

Checklist steps are stored in `OnboardingChecklist` with ordered `stepNumber`, default `status: "todo"`, and incremental due dates.

## Scripts

- `npm run dev` - start with nodemon

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- Zod
- JWT + bcrypt
