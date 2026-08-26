# Folder Structure Graph

```txt
root
│
├── .husky/
│   └── pre-commit
│
├── public/
│   │
│   └── assets/
│       ├── fonts/
│       ├── icons/
│       └── images/
│
├── docs/
│   ├── API_GUIDE.md
│   ├── ERROR_HANDLING_GUIDE.md
│   ├── FEATURE_GUIDE.md
│   ├── FOLDER_STRUCTURE_GRAPH.md
│   ├── FORM_GUIDE.md
│   ├── INSTALLATION.md
│   ├── PROVIDERS_GUIDE.md
│   ├── PROJECT_STRUCTURE.md
│   ├── PUBLIC_FOLDER_RULES.md
│   ├── PUBLIC_RULES.md
│   ├── REVIEW_CHECKLIST.md
│   └── ROUTING_GUIDE.md
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
│   │
│   ├── routes/
│   │   ├── home-page.tsx
│   │   ├── not-found-page.tsx
│   │   └── route-error-page.tsx
│   │
│   ├── features/
│   │   │
│   │   └── users/
│   │       ├── components/
│   │       │   ├── user-card.tsx
│   │       │   ├── user-form.tsx
│   │       │   ├── users-list.tsx
│   │       │   └── users-page.tsx
│   │       │
│   │       ├── constants/
│   │       │   └── user-constants.ts
│   │       │
│   │       ├── hooks/
│   │       │   └── use-users.ts
│   │       │
│   │       ├── schemas/
│   │       │   └── user-schema.ts
│   │       │
│   │       ├── services/
│   │       │   └── users-service.ts
│   │       │
│   │       └── skeletons/
│   │           └── users-page-skeleton.tsx
│   │
│   └── shared/
│       ├── assets/
│       ├── hooks/
│       │   └── use-error-message.ts
│       │
│       ├── guards/
│       │   └── auth-guard.tsx
│       │
│       ├── utils/
│       │
│       ├── components/
│       │   ├── common/
│       │   │   ├── app-settings-controls.tsx
│       │   │   │
│       │   │   ├── errors/
│       │   │   │   └── error-boundary.tsx
│       │   │   │
│       │   │   └── states/
│       │   │       ├── empty-state.tsx
│       │   │       ├── error-state.tsx
│       │   │       └── loading-state.tsx
│       │   │
│       │   └── ui/
│       │       ├── badge.tsx
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       ├── input.tsx
│       │       └── label.tsx
│       │
│       ├── i18n/
│       │   ├── messages/
│       │   └── config.ts
│       │
│       ├── layouts/
│       │   └── root-layout.tsx
│       │
│       ├── lib/
│       │   ├── env.ts
│       │   └── utils.ts
│       │
│       ├── providers/
│       │   ├── app-providers.tsx
│       │   ├── router.tsx
│       │   │
│       │   ├── language/
│       │   │   ├── index.ts
│       │   │   ├── language-context.ts
│       │   │   ├── language-provider.tsx
│       │   │   └── use-language.ts
│       │   │
│       │   ├── query/
│       │   │   ├── index.ts
│       │   │   └── query-provider.tsx
│       │   │
│       │   └── theme/
│       │       ├── index.ts
│       │       ├── theme-context.ts
│       │       ├── theme-provider.tsx
│       │       └── use-theme.ts
│       │
│       ├── services/
│       │   ├── api-client.ts
│       │   └── api-error.ts
│       │
│       └── styles/
│           └── globals.css
│
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── prettier.config.js
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
