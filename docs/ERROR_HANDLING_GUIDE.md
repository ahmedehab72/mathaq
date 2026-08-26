# Error Handling Guide

The template handles errors in three layers: UI runtime errors, route errors, and API errors.

## UI Runtime Errors

Use a shared error boundary under `shared/components/common/errors` when client UI needs a runtime fallback.

The root layout is the place to compose the error boundary and provider shell, so unhandled UI errors show a safe fallback instead of a blank screen.

## Route Errors

Unknown routes use Next.js `not-found.tsx` or `notFound()`.

Route failures use a route-local `error.tsx` boundary.

Add new top-level routes under `app/`. Feature route screens should stay inside `features/{feature-name}`.

## API Errors

Use `shared/services/api-client.ts` for requests and `shared/services/api-error.ts` for error normalization.

The normalized error shape is:

```ts
type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};
```

## TanStack Query

The TanStack Query provider in `shared/providers` contains default retry behavior:

- Do not retry 4xx client errors.
- Retry server or network errors once.
- Do not refetch on window focus by default.

## UI Rules

- Use `ErrorState` for user-facing errors.
- Use `useErrorMessage` when a component receives `unknown` errors.
- Never render raw backend error objects.
- Keep technical logging inside infrastructure files or monitoring integrations.
- Feature services should throw normalized errors through `apiClient`.
