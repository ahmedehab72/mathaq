# Project Structure

For the full tree view, see [Folder Structure Graph](./FOLDER_STRUCTURE_GRAPH.md).

```txt
public/
src/
  App.tsx
  main.tsx
  routes/
  features/
  shared/
docs/
```

## Root Files

- `src/main.tsx` mounts React and imports global styles.
- `src/App.tsx` wires the app providers, router, and error boundary.

## routes

Top-level application pages live in `src/routes`.

Feature-owned pages should stay inside `src/features/{feature-name}/routes`.

## features

Each business feature owns its components, hooks, schemas, services, constants, skeletons, and routes.

```txt
features/users/
  components/
    user-form.tsx
    user-card.tsx
    users-list.tsx
    users-page.tsx
  constants/
    user-constants.ts
  hooks/
    use-users.ts
  schemas/
    user-schema.ts
  services/
    users-service.ts
  skeletons/
    users-page-skeleton.tsx
  routes/
```

## shared

Reusable code used by more than one feature lives here.

```txt
shared/
  assets/
  components/
    common/
      errors/
      states/
    ui/
  hooks/
  i18n/
  layouts/
  guards/
  lib/
  providers/
    app-providers.tsx
    router.tsx
    language/
    query/
    theme/
  services/
  styles/
  utils/
```

- `components/ui` contains shadcn-style primitives.
- `components/common/states` contains reusable loading, empty, and error states.
- `components/common/errors` contains error boundaries and related error UI helpers.
- `components/ui` should contain shadcn/base UI primitives used by screens and features.
- `guards` contains reusable route guards like `AuthGuard`.
- `providers` contains app-level provider composition, router setup, and provider modules.
- `services` contains shared service clients and error normalization.

## public

Only static files that need a direct public URL should live here.
