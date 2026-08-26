# Form Guide

The default form stack is:

- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- shared UI components

## Pattern

1. Create a schema in `schemas`.
2. Infer the form type from the schema.
3. Use `zodResolver(schema)`.
4. Keep submit behavior in the route/page or feature container.

See `src/features/users` for a working example.

## Error Rules

- Show validation errors next to the field.
- Show submit/API errors with `ErrorState`.
- Convert unknown submit errors with `getErrorMessage` or `useErrorMessage`.
- Keep schema messages user-friendly.
