# MATHAQ Project Structure

This project uses Next.js App Router with a feature-first architecture adapted from the original template rules.

```txt
app/                         # Next route entries, layouts, metadata, and global CSS
  page.tsx
  about/page.tsx
  shop/page.tsx
  shop/[slug]/page.tsx
  brew/page.tsx
  cart/page.tsx
  checkout/page.tsx
  account/page.tsx
  admin/page.tsx

features/                    # Business domains. Feature code stays local.
  home/components/
  shop/
    components/
    services/
    constants/
    hooks/
    schemas/
    skeletons/
  about/components/
  brew/components/
  cart/
    components/
    stores/
  checkout/components/
  admin/components/

shared/                      # Reusable code used by two or more features
  components/
    ui/                      # shadcn/Radix primitives
    common/                  # reusable loading, empty, and error states
  hooks/
  layouts/
  guards/
  lib/
  providers/
  services/
  styles/

public/                      # Files that need a direct public URL
docs/                        # Project rules and implementation guides
```

## Next.js adaptation

- `app/**/page.tsx` files are thin route adapters. They compose feature screens and should not own feature business logic.
- Feature components, services, hooks, schemas, constants, and skeletons belong under `features/{feature-name}`.
- Shared UI, providers, layouts, utilities, and infrastructure belong under `shared`.
- `components/ui` is now `shared/components/ui`.
- Product data and product services are now in `features/shop/services`.
- Cart state is now in `features/cart/stores`.
- Do not add a new top-level `components` or `lib` folder.
- Use direct aliased imports. Do not create feature barrel `index.ts` files.

## Naming

- Folders and files use `kebab-case`.
- React components use `PascalCase`.
- Hooks start with `use`.
- Services end with `-service` when they represent an API client.
- Schemas and types use clear domain names.
