# Victor Paul Noel — Portfolio

An interactive, responsive portfolio for Victor Paul Noel, Senior Software Engineer and Full-Stack Developer.

## Navigation and design

Five views share one fixed viewport: Overview, Experience, Projects, Technology, and Contact. Use the section tabs, footer arrows, Page Up/Page Down, or a vertical scroll gesture to move between views. Touch swipes are supported when the content fits. On small screens or at enlarged text sizes, only the active panel can scroll to keep all content accessible.

Experience and all 11 résumé projects have selectors and previous/next controls. The persistent technology dock and grouped toolkit use locally hosted Devicon and Simple Icons logos, with accessible names on hover, focus, or tap. The interface uses Segoe UI Light with system fallbacks and the industrial-blue palette. Theme preference stays on the visitor's device.

Run the gesture regression checks with `node --test tests/navigation.test.mjs`.

## Run locally

```bash
pnpm install
pnpm dev
```

## Publish on GitHub Pages

This project is configured for the `devpauln.github.io` repository with GitHub Pages publishing from the root of the `main` branch. The included workflow rebuilds the portfolio and refreshes the published root files whenever the source changes.

Live site: `https://devpauln.github.io/`

The résumé is available from the contact section, and the lightbulb in the navigation switches between light and dark themes.
