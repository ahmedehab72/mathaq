# Providers Guide

Global providers live in `src/shared/providers`.

Each provider owns its own folder:

```txt
providers/
  app-providers.tsx
  router.tsx
  query/
    index.ts
    query-provider.tsx
  theme/
    index.ts
    theme-context.ts
    theme-provider.tsx
    use-theme.ts
  language/
    index.ts
    language-context.ts
    language-provider.tsx
    use-language.ts
```

## AppProviders

`AppProviders` is only a composer. It should arrange global providers and avoid owning business logic directly.

Current order:

```tsx
<ThemeProvider>
  <QueryProvider>{children}</QueryProvider>
</ThemeProvider>
```

`LanguageProvider` is mounted inside the router so it can read the locale from the URL. See `src/shared/providers/router.tsx`.

## QueryProvider

`QueryProvider` owns TanStack Query setup.

- Do not retry 4xx client errors.
- Retry server or network errors once.
- Do not refetch on window focus by default.

## ThemeProvider

`ThemeProvider` owns app theme state.

- Supports `light`, `dark`, and `system`.
- Defaults to `system`.
- Adds the resolved theme class to `document.documentElement`.
- Use `useTheme` from `src/shared/providers/theme` inside React components.
- `AppSettingsControls` on the home page shows a small ready-to-use theme button.

## LanguageProvider

`LanguageProvider` owns locale routing basics.

- Uses `defaultLocale` and `supportedLocales` from `src/shared/i18n/config.ts`.
- Supports `en` and `ar`.
- Reads the current locale from the `:lang` URL segment and keeps it in sync when `setLocale` is called.
- Sets `document.documentElement.lang`.
- Sets `document.documentElement.dir`.
- Mounted on the `:lang` route in `src/shared/providers/router.tsx`, so it must stay inside the router tree.
- Use `useLanguage` from `src/shared/providers/language` inside React components.
- `AppSettingsControls` on the home page shows a small ready-to-use language button.

## Rules

- Add global providers only when the whole app needs them.
- Keep provider logic infrastructure-focused.
- Export a clear hook for each provider, like `useTheme` or `useLanguage`.
- Keep provider components separate from hooks/context files to keep Fast Refresh clean.
- Add an `index.ts` file for each provider folder as the public API.
- Do not add an auth provider until auth is actually needed.
