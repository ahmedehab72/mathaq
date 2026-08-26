# Public Folder Rules

قواعد استخدام فولدر `public`.

- Use `public` only for static files that need a direct URL.
- Do not put secrets, API keys, or private config in `public`.
- Do not put business logic in `public`.
- Prefer `shared/assets` for images imported by React components. Remote image hosts must be explicitly configured in `next.config.ts`.
- Keep public assets organized:

```txt
public/assets/icons/
public/assets/images/
public/assets/fonts/
```

- Use `kebab-case` for asset file names.
- Compress large images before adding them.
- Remove unused assets during feature cleanup.
