# Environment

The canonical, documented list of environment variables lives in [`.env.example`](../.env.example).

## Local

```bash
cp .env.example .env.local
```

Only `NEXT_PUBLIC_SITE_URL` is required for the public site to be fully correct. All other values are optional and only affect opt-in features:

| Feature               | Required env                                               |
| --------------------- | ---------------------------------------------------------- |
| Public site           | `NEXT_PUBLIC_SITE_URL`                                     |
| Contact form delivery | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| GitHub stats          | `NEXT_PUBLIC_GITHUB_USERNAME`, `GITHUB_TOKEN`              |
| Dashboard             | `ADMIN_TOKEN`                                              |
| Analytics / views     | `NEXT_PUBLIC_UMAMI_*`, `UPSTASH_REDIS_*`, `DATABASE_URL`   |

## Production (Vercel)

Set the same variables in the Vercel project dashboard → **Settings → Environment Variables**. Secrets are never committed.

> `NEXT_PUBLIC_*` variables are inlined at build time. Changing them requires a new deployment.
