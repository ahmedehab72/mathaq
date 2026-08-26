# MATHAQ Folder Structure Graph

```txt
root
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── shop/page.tsx
│   ├── shop/[slug]/page.tsx
│   ├── brew/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── account/page.tsx
│   └── admin/page.tsx
├── features/
│   ├── home/components/
│   ├── shop/components/
│   ├── shop/services/
│   ├── about/components/
│   ├── brew/components/
│   ├── cart/components/
│   ├── cart/stores/
│   ├── checkout/components/
│   └── admin/components/
├── shared/
│   ├── components/ui/
│   ├── components/common/
│   ├── lib/
│   └── providers/
├── public/assets/
└── docs/
```

The graph is intentionally domain-oriented. Add `hooks`, `schemas`, `constants`, and `skeletons` inside a feature only when that feature needs them. Keep `app` as the routing boundary and keep reusable infrastructure in `shared`.
