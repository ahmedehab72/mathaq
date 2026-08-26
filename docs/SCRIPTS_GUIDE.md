# Scripts Guide

## Overview

All commands are defined in `package.json` under the `"scripts"` key and are run with `npm run <script>`.

| Script         | Command                | What it does                                                                    |
| -------------- | ---------------------- | ------------------------------------------------------------------------------- |
| `dev`          | `vite`                 | Starts the development server with hot module replacement. Used while coding.   |
| `build`        | `tsc -b && vite build` | Type-checks the project, then creates an optimized production build in `dist/`. |
| `preview`      | `vite preview`         | Serves the `dist/` output locally to verify the production build.               |
| `lint`         | `eslint .`             | Lints the whole project for code quality issues.                                |
| `format`       | `prettier . --write`   | Formats every file in the project.                                              |
| `format:check` | `prettier . --check`   | Checks that files are already formatted without changing them. Used in CI.      |
| `prepare`      | `husky`                | Installs Git hooks (e.g. `pre-commit`). Runs automatically on `npm install`.    |

## Notes

- `build` runs `tsc -b` before Vite, so type errors fail the build.
- `lint-staged` is configured in `package.json` and formats/lints only staged files on commit.
- Run `npm run lint` and `npm run build` after installing a fresh project to verify the setup.
