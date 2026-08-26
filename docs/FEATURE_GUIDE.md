# Feature Guide

Each business domain owns its UI and logic under `features/{feature-name}`.

```txt
features/orders/
  components/
    order-form.tsx
    order-card.tsx
    orders-page.tsx
  constants/
  hooks/
    use-orders.ts
  schemas/
    order-schema.ts
  services/
    orders-service.ts
  skeletons/
    orders-page-skeleton.tsx
```

## Rules

- Keep each feature component in its own file.
- Keep feature-specific code inside its feature folder.
- Move code to `shared` only when at least two features need it.
- Keep API calls inside `services`.
- Keep validation schemas inside `schemas`.
- Keep route screens inside the feature folder when the screen is feature-owned.
- Keep loading placeholders inside `skeletons`.
- Keep feature constants inside `constants`.
- Keep feature hooks inside `hooks`.
- Do not create feature-level barrel `index.ts` files.
- Import exact files, for example `@/features/shop/components/shop-grid`.
