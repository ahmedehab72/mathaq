# Import Sorting Guide

Import order is enforced by `eslint-plugin-import` (see `eslint.config.js`). `npm run lint` fails when imports are in the wrong group;
`eslint --fix` (or the pre-commit hook) fixes supported ordering issues automatically.

## Groups

Imports are split into groups separated by a blank line, in this order:

1. **Side-effect imports** — `import "@/shared/styles/globals.css"`
2. **External packages** — `react`, `react-router-dom`, `lucide-react`, ...
3. **Internal aliased imports** — `@/...`
4. **Relative imports** — `./...`, `../...`

Within each group, do not manually depend on alphabetical ordering. Keep imports in the groups above and let `eslint --fix` apply the configured order.

## Examples

import "@/shared/styles/globals.css";

import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/button";
import { useLanguage } from "@/shared/providers/language";

import { Header } from "./header";
import { Footer } from "../footer";

### Component file

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/button";
import { useLanguage } from "@/shared/providers/language";
```

### Side-effect imports first (`main.tsx`)

```ts
import "@/shared/i18n";
import "@/shared/styles/globals.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "@/App";
```

### Named specifiers

Use the inline `type` modifier when a file mixes types and values. Do not manually sort named specifiers alphabetically; let `eslint --fix` handle the final order:

```ts
import { type PropsWithChildren, useEffect, useMemo, useState } from "react";

import { type MiddlewareFunction, redirect } from "react-router-dom";
```

Use a separate `import type` statement only for pure type-only imports:

```ts
import type { UserFormValues } from "@/features/users/schemas/user-schema";
```

### Feature imports

Do not import from a feature-level `index.ts` barrel. Import the exact file you need:

```ts
import { UsersPage } from "@/features/users/components/users-page";
import type { UserFormValues } from "@/features/users/schemas/user-schema";
```

## Common paths

| Path prefix                      | What lives there                                               |
| -------------------------------- | -------------------------------------------------------------- |
| `@/shared/components/ui/...`     | shadcn UI primitives (`button`, `card`, `input`, `label`, ...) |
| `@/shared/components/common/...` | app-level components (`errors`, `states`, ...)                 |
| `@/shared/hooks/...`             | shared hooks                                                   |
| `@/shared/lib/...`               | environment config and utilities                               |
| `@/shared/providers/...`         | providers and their hooks                                      |
| `@/shared/services/...`          | API clients and error normalization                            |
| `@/features/{feature}/...`       | feature-local code (components, hooks, schemas, ...)           |
| `@/routes/...`                   | page adapters                                                  |
