# API Guide

## Shared Client

Use `src/shared/services/api-client.ts` for shared HTTP configuration.

```ts
import { apiClient } from "@/shared/services/api-client";
```

## Feature Services

Feature-specific API calls belong in:

```txt
src/features/{feature-name}/services/
```

## Error Shape

All API errors should use the normalized shape from `src/shared/services/api-error.ts`.

```ts
type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};
```

## Rules

- Components should not build raw URLs.
- Components should not know API base URLs.
- Use TanStack Query for server state.
- Use feature services for request functions.
- Normalize API errors with `normalizeApiError`.
- Use `getErrorMessage` or `useErrorMessage` before rendering errors.
- Show user-friendly error messages through `ErrorState`.
- Add all public environment variables to `.env.example`.
