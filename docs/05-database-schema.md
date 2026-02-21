# Database Schema

## Overview

PostgreSQL database with Prisma ORM. Single primary table for contact form submissions. No user authentication or complex relationships required.

---

## Prisma Schema File

**File**: `prisma/schema.prisma`

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ContactSubmission {
  id        String   @id @default(cuid())
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())

  // Spam prevention fields
  ipHash    String   // hashed IP address (for rate limiting/fraud detection)
  userAgent String?  // user-agent string from browser (optional)

  // Admin tracking
  status    String   @default("new") // "new", "read", "replied" (future use)

  @@index([email])
  @@index([createdAt])
  @@index([ipHash])
  @@map("contact_submissions")
}
```

---

## Table: ContactSubmission

### Columns

| Column      | Type          | Null | Default  | Description                                        |
| ----------- | ------------- | ---- | -------- | -------------------------------------------------- |
| `id`        | String (cuid) | NO   | auto-gen | Unique identifier for submission                   |
| `email`     | String        | NO   | -        | Submitter's email address                          |
| `message`   | Text          | NO   | -        | Contact message (up to 500 chars)                  |
| `createdAt` | DateTime      | NO   | now()    | Timestamp of submission                            |
| `ipHash`    | String        | NO   | -        | SHA256 hash of submitter's IP (for spam detection) |
| `userAgent` | String        | YES  | NULL     | Browser user-agent string (optional)               |
| `status`    | String        | NO   | "new"    | Admin status: "new", "read", "replied"             |

### Indexes

- **Primary Key**: `id`
- **Index on `email`**: For searching submissions by email
- **Index on `createdAt`**: For retrieving recent submissions
- **Index on `ipHash`**: For rate limiting and spam detection

### Constraints

- All fields except `userAgent` are NOT NULL
- `status` defaults to "new" for all new submissions
- `email` and `message` must be validated by API before insert (enforced at application level)

---

## Initialization & Migrations

### First-Time Setup

```bash
# Install Prisma CLI (if not already installed)
npm install -D prisma

# Create migration (creates schema.prisma and migration files)
npx prisma migrate dev --name init

# This will:
# 1. Create the PostrgreSQL database (if not exists)
# 2. Run the migration to create tables
# 3. Generate Prisma Client
```

### Subsequent Schema Changes

```bash
# After editing schema.prisma:
npx prisma migrate dev --name <description>

# Example:
npx prisma migrate dev --name add_spam_score_field
```

### Production Migration

```bash
# Deploy migrations to production database
npx prisma migrate deploy

# This runs pending migrations without generating drift
```

---

## Prisma Client Usage

### Create a Submission

```typescript
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Hash IP address
const ipHash = crypto.createHash("sha256").update(ipAddress).digest("hex");

const submission = await prisma.contactSubmission.create({
  data: {
    email: "user@example.com",
    message: "I have a project idea...",
    ipHash: ipHash,
    userAgent: "Mozilla/5.0...",
    status: "new",
  },
});

console.log(submission);
```

### Query Submissions

```typescript
// Get all submissions for an email
const submissions = await prisma.contactSubmission.findMany({
  where: { email: "user@example.com" },
  orderBy: { createdAt: "desc" },
});

// Get recent submissions (last 30 days)
const recent = await prisma.contactSubmission.findMany({
  where: {
    createdAt: {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  },
  orderBy: { createdAt: "desc" },
});

// Count submissions from IP in last 15 minutes
const count = await prisma.contactSubmission.count({
  where: {
    ipHash: ipHash,
    createdAt: {
      gte: new Date(Date.now() - 15 * 60 * 1000),
    },
  },
});
```

---

## Environment Setup

### Local Development (SQLite Alternative)

For quick local testing without PostgreSQL, Prisma supports SQLite:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

**Pros**: Easy setup, no external database needed
**Cons**: Not production-ready, limited concurrency

### Local Development (PostgreSQL)

```bash
# Option 1: Docker Compose (if Docker installed)
# Create docker-compose.yml with PostgreSQL service
# Run: docker-compose up

# Option 2: PostgreSQL installed locally
# Ensure PostgreSQL is running
# Create database and user:
#   createdb contact_form_db
#   psql -U postgres -d contact_form_db

# Set DATABASE_URL
# DATABASE_URL="postgresql://user:password@localhost:5432/contact_form_db"
```

### Production (Vercel/Cloud Hosting)

- Use managed PostgreSQL service: Vercel Postgres, Supabase, AWS RDS, Azure Database, etc.
- Obtain connection string from service provider
- Store in environment variable on hosting platform (never commit to git)

---

## Data Retention & Privacy

### GDPR Compliance (Basic)

- Contact submissions are personal data
- Privacy policy must disclose retention period
- Recommended retention: 30-90 days (then delete)
- Future enhancement: Add `deletedAt` field for soft deletes

### Recommended Policy

> "We retain your contact information for 60 days to respond to your inquiry. After that, data is automatically deleted unless you consent to ongoing communication."

### Implementation (Future)

```prisma
model ContactSubmission {
  id        String   @id @default(cuid())
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())
  deletedAt DateTime? // for soft deletes

  ipHash    String
  userAgent String?
  status    String   @default("new")

  @@map("contact_submissions")
}
```

---

## Backup & Security

### Backup Strategy

- Most managed PostgreSQL services (Vercel, Supabase) provide automatic daily backups
- Verify backup retention in hosting dashboard
- Test restore process quarterly

### Access Control

- Limit database access to application only
- Use read-only credentials for analytics (future)
- Never expose DATABASE_URL in client-side code
- Rotate credentials if exposed

### Encryption

- Use SSL/TLS for database connections (enabled by default on cloud services)
- Consider encrypting sensitive fields at application level (future)

---

## Monitoring & Logging

### Queries to Monitor

```typescript
// Check submission volume (daily)
const today = new Date();
today.setHours(0, 0, 0, 0);
const count = await prisma.contactSubmission.count({
  where: {
    createdAt: { gte: today },
  },
});

// Check for spam patterns
const suspiciousIP = await prisma.contactSubmission.findMany({
  where: {
    ipHash: "xxxxx",
  },
  orderBy: { createdAt: "desc" },
  take: 10,
});
```

---

## Schema Evolution

### Future Enhancements (Not in Scope for Phase 1)

- `deletedAt`: Track deletion for GDPR compliance
- `spamScore`: Numeric score for spam detection (0-100)
- `category`: Project type/category selector
- `phone`: Optional phone number
- `company`: Company name
- `budget`: Project budget range
- `timeline`: Project timeline preference
- `replied`: Track if owner replied (boolean + timestamp)

### Backward Compatibility

- Always add new fields as nullable (`Type?`) or with defaults
- Never remove fields without migration
- Test migrations in staging before production
