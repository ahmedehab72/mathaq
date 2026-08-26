# Installation

## Requirements

- Node.js 20 or newer.
- npm 10 or newer.

## Start a New Project

Use this repository as a GitHub Template Repository, then clone the new repo.

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and update the values.

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=React Feature Template
```

Never use an environment variable in code before adding it to `.env.example`.

## Recommended First Check

```bash
npm run lint
npm run build
```
