# MATHAQ Engineering Guide

Read this directory before adding a feature or route.

## Start here

1. [Project structure](./PROJECT_STRUCTURE.md)
2. [Feature guide](./FEATURE_GUIDE.md)
3. [Routing guide](./ROUTING_GUIDE.md)
4. [Import guide](./IMPORTS_GUIDE.md)
5. [Provider guide](./PROVIDERS_GUIDE.md)
6. [API guide](./API_GUIDE.md)
7. [Form guide](./FORM_GUIDE.md)
8. [Error handling guide](./ERROR_HANDLING_GUIDE.md)
9. [Review checklist](./REVIEW_CHECKLIST.md)

## Feature workflow

1. Identify the owning feature.
2. Add or update the feature service, schema, hook, component, and skeleton in that feature folder as needed.
3. Keep the `app` route entry thin.
4. Promote code to `shared` only after a second feature needs it.
5. Use direct aliased imports. Avoid feature barrels.
6. Run `npm run lint` and `npm run build`.

This guide is the source of truth for future MATHAQ frontend work. When a new architectural need appears, update the relevant guide before introducing a new pattern.
