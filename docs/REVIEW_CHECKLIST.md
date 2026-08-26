# Review Checklist

Before opening a PR:

- `npm run lint` passes.
- `npm run build` passes.
- New environment variables are added to `.env.example`.
- New feature code is inside `features/{feature-name}`.
- Shared code is genuinely reusable.
- Forms use React Hook Form and Zod.
- API calls are not written directly inside components.
- API errors use the shared normalized error shape.
- Unknown errors are normalized before being rendered.
- New routes include loading, empty, error, and not-found behavior when relevant.
- New global providers live in `shared/providers` and expose a clear hook.
- Public assets follow `docs/PUBLIC_FOLDER_RULES.md`.
