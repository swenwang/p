# Ssu-Wen Wang — Portfolio

A desktop-first, multi-page portfolio for FinTech, machine learning, and applied research. Built with React, Vite, TypeScript, and Supabase.

**Live website:** [https://swenwang.github.io/p/](https://swenwang.github.io/p/)

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The public site works with built-in portfolio content before Supabase is configured.

## Admin and Supabase

1. Create a Supabase project.
2. Replace `YOUR_EMAIL@example.com` in `supabase/schema.sql`, then run the script in the Supabase SQL editor.
3. Create your administrator user in Supabase Authentication.
4. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_ADMIN_EMAIL` to `.env.local` and the deployment environment.
5. Visit `/admin` to sign in.

Never commit `.env.local` or the Supabase service-role key.

## Deployment

Pushes to `main` are built and published to GitHub Pages by `.github/workflows/deploy-pages.yml`.

## Content

Initial portfolio content lives in `src/data/content.ts`. After Supabase is connected, the admin dashboard manages site settings and the database can become the public content source.
