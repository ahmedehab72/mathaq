# Routing Guide

Routes are configured in `src/shared/providers/router.tsx` with React Router object routes.

## Rules

- Layouts live in `src/shared/layouts`.
- Top-level static pages live in `src/routes`.
- Feature screens live in `src/features/{feature-name}/routes`.
- Import feature route components directly from their file path.
- Unknown routes should render `src/routes/not-found-page.tsx`.
- Route errors should render `src/routes/route-error-page.tsx` through `errorElement`.

## Add a Route

1. Create the route component in `src/routes` or inside a feature `routes` folder.
2. Import feature route components directly from their file path when needed.
3. Register the route in `src/shared/providers/router.tsx`.

Current template routes:

- `/` redirects to `/{defaultLocale}`
- `/{locale}` (e.g. `/en`, `/ar`)
- `/{locale}/user` (e.g. `/en/user`, `/ar/user`)

## Locale in the URL

- The locale lives in the first URL segment via the `:lang` param.
- Invalid locales redirect to `/{defaultLocale}` using the `localeLoader`.
- `LanguageProvider` reads `:lang` from the URL and keeps it in sync when `setLocale` is called.
- Build internal links with the current locale, e.g. via `useLanguage`.

## Protected Routes

Auth and permission wrappers live in `src/shared/guards`.
