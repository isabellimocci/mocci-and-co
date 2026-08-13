<div align="center">
    <img width="1000" alt="Mocci & Co. Handwork banner: a fictional handmade plush toy store" src="https://github.com/user-attachments/assets/b2c0d955-027e-4c21-98e6-c13e2ff4034d" />
  <br><br>

![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript 5.8](https://img.shields.io/badge/TypeScript_5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite 6.3](https://img.shields.io/badge/Vite_6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion 12](https://img.shields.io/badge/Framer_Motion_12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router 7.6](https://img.shields.io/badge/React_Router_7.6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

  # Mocci & Co. Handwork E-commerce

  A fictional handmade plush toy store, built as a portfolio project to showcase production-minded frontend engineering.

  <strong><a href="https://mocci-and-co-handwork.vercel.app/">View the live demo</a></strong>

</div>

<br>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture and Design Decisions](#architecture-and-design-decisions)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Visual Showcase](#visual-showcase)
- [Roadmap](#roadmap)
- [Known Limitations](#known-limitations)
- [Conventions](#conventions)
- [License and Copyright](#license-and-copyright)

<br>

## Overview

**Mocci & Co. Handwork** is a fictional e-commerce site specializing in handmade plush toys. It was developed as a portfolio project to demonstrate frontend engineering with an emphasis on:

- Scalable, feature-oriented software architecture
- Componentization and code reuse through custom hooks
- Modern, accessible user experience
- Mobile-first responsive design
- Performance and bundle optimization

The project covers a realistic e-commerce flow end to end on the client: browsing, filtering, search, cart management, and a complete multi-step checkout with simulated payments.

> This is a frontend project. It runs entirely in the browser against mock data. A backend API is in progress (see [Roadmap](#roadmap)); it is intentionally not documented as a feature here until it ships.

<br>

## Features

### Product Catalog
- **Multi-criteria filtering**: filter by category, color, and price range
- **Debounced text search**: responsive search that avoids re-filtering on every keystroke (`useDebouncedValue`)
- **Dynamic sorting**: by price (ascending/descending), name (A-Z / Z-A), and best-selling
- **Memoized filtering and sorting**: computed with `useMemo` so results update instantly without unnecessary work
- **Responsive filter UI**: adapted sidebar and controls for mobile and desktop

### Product Experience
- **Interactive image gallery** with smooth transitions
- **Mobile-optimized carousel** for touch navigation
- **Full-screen lightbox** via `yet-another-react-lightbox`
- **Recommended products** section ("You might also like")
- **Reviews and ratings** with a reusable rating component
- **Share** using the Web Share API, with a clipboard-copy fallback

### Cart and Checkout
- **Stock-aware cart**: quantities are clamped to available stock on both add and update
- **Persistent cart**: cart contents are saved to `localStorage` and restored across sessions
- **Multi-step checkout**: guided shipping and payment steps
- **Simulated payment methods**: credit card (with installments), Pix (mocked QR code), and bank slip / boleto
- **Discount codes**: a discount engine built on the Strategy pattern, structured so new coupon types can be added without touching call sites
- **Gift options** at checkout
- **Form validation**: real-time, type-safe validation driven by a reusable validation hook

### User Experience
- **Toast notifications** using `react-hot-toast`
- **Micro-interactions** powered by Framer Motion
- **Persistent wishlist**: favorites saved to `localStorage`
- **Error boundary** with a custom error page, plus a dedicated 404 page
- **Loading states**: a custom loading screen used as the route-level Suspense fallback

### Engagement and Communication
- **Newsletter signup**: an email capture form with its own validation hook
- **Contact form**: a dedicated contact form with field-level validation
- **Content pages**: FAQ, Privacy Policy, and Shipping & Returns

### SEO
- **Native React 19 metadata**: per-page `<title>`, meta description, and canonical link rendered without any third-party library (no `react-helmet`)
- **Open Graph and Twitter Card**: full social preview tags (title, description, type, url, image) for rich link sharing
- **Structured data (JSON-LD)**: schema blocks injected per page, with XSS-safe serialization
- **Indexing control**: optional per-page `noindex` / `nofollow`
- All of the above delivered through a single reusable `Seo` component, applied across every page

<br>

## Tech Stack

| Category         | Technology                                                    |
| ---------------- | ------------------------------------------------------------- |
| **Framework**    | React 19                                                      |
| **Language**     | TypeScript 5.8                                                |
| **Build tool**   | Vite 6.3 (with the SWC React plugin)                          |
| **Styling**      | Tailwind CSS 3.4                                              |
| **Animation**    | Framer Motion 12                                              |
| **Routing**      | React Router DOM 7.6                                          |
| **Notifications**| React Hot Toast                                               |
| **Icons**        | React Icons, Heroicons                                        |
| **Media**        | Yet Another React Lightbox, qrcode-svg                        |
| **Testing**      | Vitest, React Testing Library, jsdom                          |
| **Code quality** | ESLint 9 (flat config) with typescript-eslint                |
| **Deployment**   | Vercel                                                        |

<br>

## Architecture and Design Decisions

The project follows a **feature-oriented, component-based architecture**. State and business rules live in **custom hooks** and **context providers**, keeping UI components focused on rendering.

- **Custom hooks (26)**: cart, favorites, checkout state, form validation, filters, debounced input, discounts, and more. Business logic is extracted from components so it stays testable and reusable.
- **Context, split by concern**: each global store separates its context definition from its provider (for example `CartContext.ts` + `CartProvider.tsx`, `DiscountContext.ts` + `DiscountProvider.tsx`). This keeps fast-refresh friendly boundaries and avoids re-render surprises.
- **Strategy pattern for discounts** (`utils/discountStrategies.utils.ts`): a `DiscountStrategy` interface plus a resolver, so adding a new coupon type is a matter of adding a strategy rather than editing conditionals across the app.
- **Route-level code splitting**: every page is loaded with `React.lazy` and rendered inside a single `Suspense` boundary with a custom loading fallback, so the initial bundle stays small.
- **Error boundary**: the app is wrapped in an error boundary that renders a friendly error page, sharing one component with the 404 route.
- **Stock-aware pricing helpers**: cart math (subtotal, item count, stock clamping) is implemented as small pure helpers, which keeps the logic predictable and easy to cover with tests.

<br>

## Project Structure

```
src/
├── assets/        # Fonts, images, favicon
├── components/
│   ├── common/    # Generic UI (buttons, display, feedback, form, icons)
│   ├── features/  # Feature components (cart, checkout, payment, product, filter, contact)
│   ├── layout/    # Header and footer
│   └── sections/  # Page sections (home, product, policy, common)
├── constants/     # Global constants
├── context/       # Global state (context + provider files)
├── data/          # Mock data (products, filters)
├── hooks/         # Custom hooks
├── models/        # Domain models
├── pages/         # Route pages
├── styles/        # Global styles
├── types/         # Shared type definitions
└── utils/         # Pure helpers (currency, discounts, filters, order, payment, qrcode)
```

**Pages / routes**: Home (`/`), Products (`/products`), Product Detail (`/products/:id`), About (`/about`), Contact (`/contact`), Cart (`/cart`), Wishlist (`/wishlist`), Checkout (`/checkout`), FAQ (`/faq`), Privacy Policy (`/privacy-policy`), Shipping & Returns (`/shipping-returns`), and a 404 fallback.

<br>

## Getting Started

### Prerequisites
- **Node.js 18 or higher** (Node 20 LTS recommended; required by Vite 6)
- **npm** (the repo ships a `package-lock.json`)

No environment variables are required to run the project. It uses mock data and does not call an external API.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/isabellimocci/handwork-ecommerce.git
cd handwork-ecommerce

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at the URL Vite prints in the terminal (by default `http://localhost:5173`).

### Production build

```bash
npm run build     # type-checks with tsc, then builds with Vite
npm run preview   # serves the production build locally
```

<br>

## Available Scripts

| Script            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server                       |
| `npm run build`   | Type-check (`tsc -b`) and produce a production build    |
| `npm run preview` | Preview the production build locally                    |
| `npm run lint`    | Run ESLint across the project                           |
| `npm run test`    | Run the test suite with Vitest                          |

<br>

## Testing

Tests run on **Vitest** with **React Testing Library** and **jsdom**.

```bash
npm run test
```

Current coverage focuses on the checkout flow (rendering of shipping fields and shipping options). Coverage is being expanded toward the pure business logic that is most valuable to guard: discount validation (`validateDiscount`), cart subtotal and stock clamping, and currency formatting. Contributions to tests follow the existing `*.test.tsx` colocated pattern.

<br>

## Accessibility

Accessibility is a first-class concern in this project. The interface is built with semantic HTML, keyboard-operable controls, and meaningful labels, and the visual layer targets sufficient color contrast.

> To keep this section honest and current, run an audit (Lighthouse and/or axe DevTools) against the deployed build and record the results below.

| Audit             | Score |
| ----------------- | ----- |
| Lighthouse (a11y) | _run and fill in_ |

<br>

## Performance

Performance is supported by:
- **Route-level code splitting** with `React.lazy` and `Suspense`
- **SWC-based compilation** via `@vitejs/plugin-react-swc`
- **Memoized filtering and sorting** to avoid redundant computation
- **Optimized image assets** for the showcase and product media

> Lighthouse numbers change with every meaningful UI change. Re-run against the current deployment and update the table below rather than trusting older results.

| Metric          | Score |
| --------------- | ----- |
| Performance     | _run and fill in_ |
| Best Practices  | _run and fill in_ |
| SEO             | _run and fill in_ |

<br>

## Visual Showcase

The clips below are looping animations. For a non-animated, fully interactive version, visit the [live demo](https://mocci-and-co-handwork.vercel.app/).

### Desktop

<div align="center">
  <img src="./public/desktop-demo.gif" alt="Animated walkthrough of the desktop store: browsing the plush toy catalog, filtering products, opening a product page, and adding an item to the cart">
</div>

Desktop walkthrough: browsing the catalog, filtering products, opening a product page, and adding an item to the cart.

### Mobile

<div align="center">
  <img src="./public/mobile-demo.gif" alt="Animated walkthrough of the mobile store: the responsive layout, mobile navigation, and adding a product to the cart" width="200px">
</div>

Mobile walkthrough: the responsive layout, mobile navigation, and adding a product to the cart.

<br>

## Roadmap

- [ ] **Backend API** (in progress): move products, cart, and orders behind a real service
- [ ] **User authentication**: accounts, sessions, and protected checkout
- [ ] **Real inventory**: server-driven stock with live availability
- [ ] **Order persistence and history**
- [ ] **Broader automated test coverage** across hooks and business logic

<br>

## Known Limitations

- **Mock data**: products and filters come from static data, not a live API
- **Simulated payments**: the checkout completes a fake payment flow with no real transactions
- **No authentication yet**: there are no user accounts in this version
- **Client-side stock only**: stock levels are static and enforced in the browser; there is no real-time inventory
- **Forms are client-side**: the contact and newsletter forms validate input but do not yet persist or send it, pending the backend

<br>

## Conventions

- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`)
- **Components** use PascalCase filenames; **hooks** use the `useX` convention; **pure helpers** use the `*.utils.ts` suffix and **domain models** use `*.model.ts`
- **Path aliases** are configured in the TypeScript and Vite config for clean imports
- **Suggested addition**: declare a supported Node version in `package.json` via an `engines` field (for example `"engines": { "node": ">=18" }`) so contributors and CI use a compatible runtime

<br>

---

<div align="center">

## License and Copyright

© 2025-2026 Isabelli Mocci. All rights reserved.

This is a personal portfolio project. The design, code, and concept may not be copied, modified, or distributed without permission.

<br>

Made with 🩷 by <a href="https://www.isabellimocci.com/">Isabelli Mocci</a>

[🌐 Portfolio](https://www.isabellimocci.com/)
| [💼 LinkedIn](https://www.linkedin.com/in/isabellimocci/)
| [🐱 GitHub](https://github.com/isabellimocci)
| [📬 Email](mailto:isabellimocci.tech@gmail.com)

</div>
