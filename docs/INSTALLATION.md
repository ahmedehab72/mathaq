# Installation

## Requirements

- Node.js 20 or newer.
- npm 10 or newer.

## Start the project

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and update the values.

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=MATHAQ Coffee
```

Never use an environment variable in code before adding it to `.env.example`.

## Recommended First Check

```bash
npm run lint
npm run build
```
