# Open CLI

[opencli.co](https://opencli.co) is a curated directory of command-line tools.

It helps people:
- discover useful terminal apps
- compare popularity and momentum
- copy install commands
- understand what to run first
- spot new launches from respected builders

## Stack
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vercel

## Local development

```bash
npm install
npm run dev
```

## Deploy
Open CLI is deployed on Vercel and connected to GitHub for automatic production and preview deployments.

## Content workflow

Builder launches are stored in:
- `src/content/builder-launches.json`

Use this template when adding a new launch:
- `src/content/builder-launch-template.json`

You can also submit a launch from the site:
- `https://opencli.co/submit`

## Admin and Supabase

Optional env vars:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GITHUB_TOKEN`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Files:
- Supabase schema: `supabase/schema.sql`
- Env example: `.env.example`
- Admin page: `https://opencli.co/admin`

If Supabase is configured:
- builder launches can be read from Supabase
- launch submissions can be stored in Supabase
- the admin page can sync npm + GitHub metadata into Supabase

## Links
- Production: https://opencli.co
- Submit: https://opencli.co/submit
- Vercel project: https://open-cli.vercel.app
- GitHub: https://github.com/gvkhosla/open-cli
