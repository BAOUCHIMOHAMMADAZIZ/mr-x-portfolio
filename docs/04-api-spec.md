# API Specification

## Overview

Single REST API endpoint for contact form submissions. No authentication required (public endpoint, but rate-limited).

---

## Endpoint: POST /api/contact

### Purpose

Receive and process contact form submissions. Validate input, store in database, send email notification to site owner, and return status to client.

### Request Headers

```
Content-Type: application/json
```

### Request Body Schema

```json
{
  "email": "user@example.com", // Required, valid email format
  "message": "Project details here", // Required, 10-500 characters
  "website": "" // Honeypot field (hidden from UI, should be empty)
}
```

### Request Validation (Server-Side)

- **email**:
  - Type: string
  - Required: yes
  - Format: valid email (regex or email validator library)
  - Max length: 254 (RFC 5321)
  - Reject: obvious spam patterns (e.g., "test", "spam@spam.com")

- **message**:
  - Type: string
  - Required: yes
  - Min length: 10 characters (prevent "hello world" spam)
  - Max length: 500 characters
  - Trim whitespace before validation
  - Reject: obvious spam (repeated characters, all caps, suspicious links)

- **website** (Honeypot):
  - Type: string
  - Expected: empty string or not present
  - If filled: reject submission immediately (flag as spam)
  - Do not store or process

- **IP Address** (from request context):
  - Extract from `x-forwarded-for` header (Vercel/proxy aware) or `req.socket.remoteAddress`
  - Hash for storage (do not store raw IP)
  - Use for rate limiting

- **User-Agent**:
  - Extract from request headers
  - Store for debugging/validation

### Response Schemas

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Message received! We'll get back to you soon.",
  "submissionId": "uuid-string-here"
}
```

#### Validation Error (400 Bad Request)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email address",
    "message": "Message must be between 10 and 500 characters"
  }
}
```

#### Rate Limited (429 Too Many Requests)

```json
{
  "success": false,
  "error": "Too many submissions. Please try again later.",
  "retryAfter": 900 // seconds
}
```

#### Spam Detected (400 Bad Request)

```json
{
  "success": false,
  "error": "Submission failed validation"
}
```

#### Server Error (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Server error. Please try again later."
}
```

---

## Side Effects on Success

### 1. Database Storage

- Insert record into `ContactSubmission` table:
  - `id`: UUID (auto-generated)
  - `email`: user's email
  - `message`: user's message
  - `createdAt`: timestamp
  - `ipHash`: hashed IP address
  - `userAgent`: user-agent string
  - `status`: "new" or "pending" (for admin review, not implemented yet)

### 2. Email Notification

- **To**: `OWNER_EMAIL` environment variable (e.g., owner@example.com)
- **From**: noreply@resend.dev (Resend) or configured SMTP sender
- **Subject**: "New Contact Form Submission from {email}"
- **Body**: Plain text or HTML template

  ```
  New submission received:

  From: {email}
  Message: {message}

  Submitted at: {timestamp}
  ---
  Click here to reply: mailto:{email}
  ```

- **Timeout**: 5 seconds (non-blocking if email service is slow)
- **Failure handling**: Log error but return success to user (graceful degradation)

---

## Rate Limiting

### Strategy

- Track submissions per IP address
- Limit: 5 submissions per 15 minutes
- After limit: return 429 with retryAfter value

### Implementation Options

1. **Upstash Redis** (serverless, simple): Install `@upstash/ratelimit` package
   - Connect to Upstash Redis URL from env
   - Use sliding window algorithm

2. **In-Memory Fallback** (if Redis unavailable):
   - Maintain in-memory Map of IP → [timestamps]
   - Expire old entries every minute
   - Less reliable (resets on server restart) but works for local dev

### Code Pattern

```typescript
// Pseudocode
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
});

const { success, limit, remaining, reset, pending } =
  await rateLimit.limit(ipAddress);
if (!success) {
  return Response.json(
    { success: false, error: "Rate limited" },
    { status: 429 },
  );
}
```

---

## Spam Detection Rules

### Honeypot

- If `website` field is filled: reject immediately
- Log as spam attempt
- Return generic validation error (do not reveal honeypot)

### Content Validation

- Reject if message contains:
  - More than 5 links (e.g., "http://", "https://")
  - Repeated patterns (e.g., "aaaaaa" equals 6+ identical chars in a row)
  - Known spam keywords (optional: "viagra", "casino", "lottery" etc.)
- Reject if email is obviously fake:
  - Test@test.com
  - Admin@admin.com
  - No @ symbol

### IP/User-Agent Checks

- Log suspicious patterns (optional for phase 1)
- Block if same IP + User-Agent submits > 10 times in 1 hour (future enhancement)

---

## Environment Variables Required

```
DATABASE_URL=postgresql://user:pass@host/dbname
OWNER_EMAIL=your-email@example.com
RESEND_API_KEY=re_xxxxx  # or SMTP_xxx for nodemailer fallback
UPSTASH_REDIS_REST_URL=https://...  # optional, for rate limiting
UPSTASH_REDIS_REST_TOKEN=xxxxx       # optional
```

---

## Error Handling & Logging

- All errors logged to console (or logging service)
- Validation errors returned to client with details
- Server errors return generic message (do not leak stack traces)
- Email sending failure: log warning but return success to user
- Rate limit: log exceeded events for monitoring

---

## Security Considerations

1. **Input Validation**: Zod schema enforced server-side (client-side is UX only)
2. **No SQL Injection**: Prisma ORM escapes all queries
3. **CSRF**: Next.js middleware provides CSRF protection by default
4. **Honeypot**: Hidden from UI, flagged if completed
5. **Rate Limiting**: Per-IP blocking
6. **Email Enumeration**: Do not reveal if email exists in database
7. **Email Header Injection**: Sanitize email before using in headers
8. **Timeout**: API should respond within 10 seconds max (prevent DoS)

---

## Testing Checklist

- [ ] Valid submission: email + message → success, stored to DB, email sent
- [ ] Empty email: rejected with error message
- [ ] Invalid email format: rejected with error message
- [ ] Message too short (< 10 chars): rejected with error message
- [ ] Message too long (> 500 chars): rejected with error message
- [ ] Honeypot filled: rejected (no error details exposed)
- [ ] Rapid-fire submissions (6 in 15 min): 6th fails with 429
- [ ] Rate limit reset after 15 minutes: new submission allowed
- [ ] User-Agent captured: visible in database record
- [ ] Email notification received: content correct, from/to correct
- [ ] Success response includes submissionId: UI can use for confirmation
- [ ] No sensitive data in logs: passwords, full IPs, etc. excluded
