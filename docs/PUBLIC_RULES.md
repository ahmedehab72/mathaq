# Public Rules

دي القواعد العامة للتيم داخل أي مشروع مبني على التمبليت.

## Architecture

- كل feature لازم تكون داخل `src/features/{feature-name}`.
- أي كود reusable بين أكتر من feature يتحط داخل `src/shared`.
- الصفحات العامة تتحط داخل `src/routes`.
- الـ providers والـ router يتحطوا داخل `src/shared/providers`.
- الـ layouts المشتركة تتحط داخل `src/shared/layouts`.
- ممنوع feature تستدعي feature تانية من ملفاتها الداخلية مباشرة.
- ممنوع استخدام `index.ts` كـ barrel داخل الـ feature.
- أي استيراد من feature يكون مباشر من ملفه، زي `@/features/users/components/users-page`.
- كل component داخل feature يتحط في ملف منفصل داخل `components`.

## Naming

- Folder names and file names use `kebab-case`.
- React components use `PascalCase`.
- Hooks start with `use`.
- Types and schemas should have clear names, like `User`, `UserFormValues`, `userSchema`.

## UI

- shadcn/ui base components live in `src/shared/components/ui`.
- Screens and features should use `src/shared/components/ui` primitives before creating custom markup.
- Do not add business logic inside shared UI components.
- Feature-specific UI stays inside the feature folder.
- If a shadcn component needs product-specific behavior, create a wrapper component.

## Forms

- All forms use `react-hook-form`.
- All validation uses `zod`.
- Connect schemas with `zodResolver` from `@hookform/resolvers`.
- Put schemas inside `schemas`.

## API

- API calls live inside `services`.
- Shared HTTP config lives in `src/shared/services/api-client.ts`.
- Normalize API errors through `src/shared/services/api-error.ts`.
- Do not hardcode API URLs in components.
- Add any new environment variable to `.env.example`.

## Error Handling

- Runtime UI errors must be handled by `ErrorBoundary`.
- Unknown routes must render `NotFoundPage`.
- Components should show `ErrorState` instead of raw error text.
- Unknown errors should be converted with `getErrorMessage` or `useErrorMessage`.
- Feature services should throw normalized errors or pass errors through `apiClient`.

## Providers

- أي provider عام يتحط داخل `src/shared/providers`.
- `AppProviders` يفضل composer فقط، من غير business logic.
- كل provider يصدّر hook واضح مثل `useTheme` أو `useLanguage`.
- ممنوع إضافة provider global إلا لو هيستخدمه التطبيق على مستوى واسع.
- Auth provider غير مطلوب حاليًا، وأي auth لاحقًا يتضاف كخطوة منفصلة.

## Pull Requests

- PR must pass `npm run lint`.
- PR must pass `npm run build`.
