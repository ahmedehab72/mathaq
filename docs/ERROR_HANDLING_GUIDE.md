# Error Handling Guide

The template handles errors in three layers: UI runtime errors, route errors, and API errors.

## UI Runtime Errors

Use `src/shared/components/common/errors/error-boundary.tsx` to catch unexpected React render errors.

`src/App.tsx` wraps the app with `ErrorBoundary`, so unhandled UI errors show a safe fallback instead of a blank screen. The fallback includes a retry button that resets the boundary.

## Route Errors

Unknown routes render `src/routes/not-found-page.tsx`.

Route object failures render `src/routes/route-error-page.tsx` through `errorElement`.

Add new top-level routes in `src/shared/providers/router.tsx`. Feature route screens should stay inside `src/features/{feature-name}/routes`.

## API Errors

Use `src/shared/services/api-client.ts` for requests and `src/shared/services/api-error.ts` for error normalization.

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

`src/shared/providers/app-providers.tsx` contains default retry behavior:

- Do not retry 4xx client errors.
- Retry server or network errors once.
- Do not refetch on window focus by default.

## UI Rules

- Use `ErrorState` for user-facing errors.
- Use `useErrorMessage` when a component receives `unknown` errors.
- Never render raw backend error objects.
- Keep technical logging inside infrastructure files or monitoring integrations.
- Feature services should throw normalized errors through `apiClient`.
