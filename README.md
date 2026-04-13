<div align="center">

<img src="https://your-banner-image-url.png" alt="Slash UI Banner" width="100%" />

<br />

# ⚡ Slash UI

### A modern component library for the web — crafted for developers who care about motion, feel, and detail.

<br />

[![npm version](https://img.shields.io/npm/v/@ghatak/slash-ui?color=black&label=npm&style=flat-square)](https://www.npmjs.com/package/@ghatak/slash-ui)
[![npm downloads](https://img.shields.io/npm/dm/@ghatak/slash-ui?color=black&style=flat-square)](https://www.npmjs.com/package/@ghatak/slash-ui)
[![license](https://img.shields.io/npm/l/@ghatak/slash-ui?color=black&style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-black?style=flat-square)](./CONTRIBUTING.md)

<br />

[**Browse Components**](#components) · [**Quick Start**](#quick-start) · [**CLI Usage**](#cli-usage) · [**Contributing**](#contributing)

<br />

</div>

---

## ✦ What is Slash UI?

**Slash UI** is a CLI-powered component library for Next.js and React apps. It ships production-ready UI components with modern motion design — hover effects, preloaders, transitions, scroll animations, loaders, cursors, and more.

Unlike traditional component libraries, Slash UI copies components **directly into your project** — giving you full ownership and control over every line of code.

> Built for developers who want beautiful UI without sacrificing flexibility.

---

## ✦ Features

- 🎯 &nbsp;**CLI-first** — add components directly into your codebase
- 🌀 &nbsp;**Motion-ready** — every component is built with animation in mind
- 🖱️ &nbsp;**Custom Cursors** — drop-in cursor effects with zero config
- ⏳ &nbsp;**Preloaders & Loaders** — smooth page entry experiences
- 🔀 &nbsp;**Transitions** — fluid page and element transitions
- 📜 &nbsp;**Scroll Effects** — scroll-triggered animations and smooth scrolling
- 🧩 &nbsp;**Modular** — only add what you need, nothing more
- 🎨 &nbsp;**Fully customizable** — edit components after adding them

---

## ✦ Quick Start

### 1. Install the package

```bash
npm install @ghatak/slash-ui --ignore-scripts
```

### 2. Add a component via CLI

```bash
npx slash-ui add <component-name>
```

### 3. Use it in your project

```tsx
import { ButtonPulse } from '@/components/ui/buttons/ButtonPulse'

export default function Page() {
  return <ButtonPulse>Get Started</ButtonPulse>
}
```

---

## ✦ CLI Usage

Slash UI comes with a powerful CLI to manage your components.

```bash
npx slash-ui [command]
```

| Command | Description |
|--------|-------------|
| `npx slash-ui list` | List all available components |
| `npx slash-ui add <name>` | Add a component to your project |

---

## ✦ Components

Slash UI is organized into categories:

### 🖱️ Cursors
Custom cursor effects that replace or enhance the default browser cursor.

```bash
npx slash-ui add cursor-dot
npx slash-ui add cursor-ring
```

### 🔘 Buttons
Animated, interactive button variants with hover effects.

```bash
npx slash-ui add button-magnetic
npx slash-ui add button-pulse
```

### 🧭 Navbars
Modern navigation bars with scroll-aware behavior.

```bash
npx slash-ui add navbar-glass
npx slash-ui add navbar-minimal
```

### 📜 Scrollbars
Styled and animated scrollbar components.

```bash
npx slash-ui add scrollbar-smooth
```

### ⏳ Preloaders & Loaders
Page entry animations and loading states.

```bash
npx slash-ui add preloader-fade
npx slash-ui add loader-spin
```

### 🔀 Transitions
Smooth page and element transition effects.

```bash
npx slash-ui add transition-slide
npx slash-ui add transition-fade
```

---

## ✦ Requirements

- **Next.js** 13+ (App Router supported)
- **React** 18+
- **Tailwind CSS** v3+
- **Node.js** 18+

---

## ✦ Project Structure

After adding components, they'll appear in your project like this:

```
your-project/
└── components/
    └── ui/
        ├── buttons/
        ├── cursors/
        ├── navbars/
        └── scrollbars/
```

You own the code — edit freely.

---

## ✦ Contributing

Contributions are welcome! If you have a component idea or want to improve an existing one:

1. Fork the repository
2. Create a new branch: `git checkout -b feat/your-component`
3. Build your component inside `src/registry/ui/`
4. Submit a pull request

---

## ✦ License

MIT © [Rahul Ghatak](https://github.com/ghatak)

---

<div align="center">

Made with ⚡ by **Rahul Ghatak**

<br />

⭐ Star this repo if you find it useful!

</div>
