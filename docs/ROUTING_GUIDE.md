# Routing Guide

This project uses the Next.js App Router. Routes are represented by folders inside `app/`.

## Rules

- Keep route entries in `app/**/page.tsx` thin.
- Keep shared layout and providers in `app/layout.tsx` and `shared/providers`.
- Keep feature screens and feature logic inside `features/{feature-name}`.
- Keep route-specific loading, error, and not-found UI beside the route when needed.
- Preserve existing public slugs: `/`, `/about`, `/shop`, `/shop/[slug]`, `/brew`, `/cart`, `/checkout`, `/account`, `/admin`.
- Use `notFound()` for missing product slugs.
- Use route-level `loading.tsx` and `error.tsx` when a route introduces asynchronous or failure-prone work.

## Adding a route

1. Create the route folder under `app`.
2. Add a thin `page.tsx` route adapter.
3. Put the screen and business logic in the owning feature folder.
4. Add `loading.tsx`, `error.tsx`, or `not-found.tsx` when the route needs them.
5. Run `npm run lint` and `npm run build`.
