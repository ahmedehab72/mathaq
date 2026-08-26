# Feature Guide

## Add a New Feature

Create a folder under `src/features`.

```txt
src/features/orders/
  components/
    order-form.tsx
    order-card.tsx
    orders-list.tsx
    orders-page.tsx
  constants/
    order-constants.ts
  hooks/
    use-orders.ts
  schemas/
    order-schema.ts
  services/
    orders-service.ts
  skeletons/
    orders-page-skeleton.tsx
  routes/
```

## Rules

- Do not create a feature-level `index.ts` barrel.
- Import feature files directly from their folder, like `@/features/orders/components/orders-page`.
- Keep each feature component in its own file inside `components`.
- Keep feature-specific code inside the feature folder.
- Move code to `shared` only when at least two features need it.
- Keep API calls inside `services`.
- Keep validation schemas inside `schemas`.
- Keep route screens inside `routes`.
- Keep loading placeholders inside `skeletons`.
- Keep feature constants inside `constants`.
- Keep feature hooks inside `hooks`.
