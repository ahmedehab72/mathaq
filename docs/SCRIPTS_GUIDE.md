# Scripts Guide

## Overview

All commands are defined in `package.json` under the `"scripts"` key and are run with `npm run <script>`.

| Script         | Command                | What it does                                                                    |
| -------------- | ---------------------- | ------------------------------------------------------------------------------- |
| `dev`          | `next dev`             | Starts the Next.js development server with hot reload.                          |
| `build`        | `next build`           | Type-checks and creates the optimized Next.js production build.                 |
| `start`        | `next start`           | Serves the production build locally.                                            |
| `lint`         | `eslint .`             | Lints the whole project for code quality issues.                                |
| `format`       | `prettier . --write`   | Formats every file in the project.                                              |
| `format:check` | `prettier . --check`   | Checks that files are already formatted without changing them. Used in CI.      |
| `prepare`      | `husky`                | Installs Git hooks (e.g. `pre-commit`). Runs automatically on `npm install`.    |

## Notes

- `build` runs Next.js type checking and static generation, so type errors fail the build.
- `lint-staged` is configured in `package.json` and formats/lints only staged files on commit.
- Run `npm run lint` and `npm run build` after installing a fresh project to verify the setup.
