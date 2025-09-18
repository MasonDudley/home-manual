This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This project is configured to statically export and deploy to GitHub Pages.

1. Create a GitHub repository (e.g., `yourname/home-manual`).
2. Push this project to GitHub:

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

3. The workflow `.github/workflows/deploy.yml` builds on pushes to `main` and publishes to GitHub Pages.
4. In your repo settings, enable Pages with the source set to "GitHub Actions".

Local preview of the static export:

```bash
npm run build
npx serve out
```

If your repository name is not `home-manual`, the workflow automatically sets the correct base path. For local testing with a base path, run:

```bash
NEXT_PUBLIC_BASE_PATH=/YOUR_REPO npm run build
```
