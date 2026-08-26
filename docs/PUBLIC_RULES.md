# Public Rules

These rules apply to every feature added to MATHAQ.

## Architecture

- Feature code belongs in `features/{feature-name}`.
- Reusable code shared by two or more features belongs in `shared`.
- Public route entries belong in `app`.
- Providers and infrastructure belong in `shared/providers` and `shared/services`.
- Do not create a new top-level `components` or `lib` folder.
- Do not import one feature's private files into another feature unless the dependency is promoted to `shared`.
- Do not use feature barrel `index.ts` files.

## Naming

- Use `kebab-case` for folders and file names.
- Use PascalCase for React components.
- Prefix hooks with `use`.
- Keep schemas, API services, constants, and skeletons inside their owning feature.

## UI

- Base shadcn/Radix primitives live in `shared/components/ui`.
- Feature screens should use shared UI primitives before creating new primitives.
- Shared UI must not contain business logic.

## Forms and API

- Forms use React Hook Form and Zod.
- API calls live in feature `services` and use shared HTTP configuration.
- Never hardcode API base URLs in components.
- Add every public environment variable to `.env.example`.

## Quality

- Run `npm run lint` and `npm run build` before finishing a feature.
- Add route-level loading, error, and not-found UI when relevant.
- Keep direct public assets in `public` and organize them under `public/assets`.
