# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The repo root holds two things:

- `app_outline/`: the product spec. These files are the source of truth for what to build.
  - `user_journey.md`: the end-to-end flow.
  - `style_guide.md`: colors, typography and interaction rules.
  - `pages/<page>/`: one folder per page, each with a `user_story.md` and a wireframe PNG (`home`, `movie_description`, `personal_watch_list`).
- `netflix-clone/`: the actual app (Vite + React 19, plain JSX, no TypeScript). Run all npm commands from this directory, not from the repo root. The root `package-lock.json` is an empty stub.

## Commands (run in `netflix-clone/`)

```bash
npm install
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # oxlint (config: .oxlintrc.json; react + oxc plugins)
```

There is no test runner configured yet.

## Current state

`src/App.jsx`, `App.css` and `index.css` still contain the Vite starter template. Replace them when you build the real app. `react-router-dom` (v7) is installed but not wired up yet. Entry point: `index.html` → `src/main.jsx` → `App`.

## Intended app (from `app_outline/`)

1. **Onboarding:** the user is asked for their age, genre preference and regional preference (e.g. Korean dramas vs. American dramas).
2. **Home (`/home`):** horizontal rows/carousels of movie posters, with recommendations shown prominently. Clicking a movie opens the **movie description** popup. Home also links to the watchlist.
3. **Movie description:** a large poster or backdrop, the title and description, and a prominent add/remove-watchlist button. Adding a movie leads to the watchlist popup.
4. **Personal watchlist:** the saved movies. From here the user can view a movie's description or remove the movie.

The user stories call the description and watchlist views "popups" opened from Home, so plan for modal/overlay views on top of Home, not only separate routes. Onboarding answers and the watchlist are shared across all views, so they need app-level state.

## Style constraints (`app_outline/style_guide.md`)

- Colors:
  - Backgrounds: `#141414` (primary), `#181818` (secondary).
  - Accent: `#E50914`.
  - Text: `#FFFFFF` (primary), `#B3B3B3` (secondary).
  - Card hover background: `#252525`.
- Font: Arial, Helvetica, sans-serif.
- Sticky nav that highlights the active page.
- Movie cards: consistent poster aspect ratio, subtly rounded corners, and a slight scale-up on hover.
- Use subtle, purposeful animations: smooth carousel scrolling and color transitions on buttons.
- Responsive layout with no horizontal page overflow. Show fewer cards per row on tablet and mobile.
- Build with reusable React components, and match the wireframe PNGs for layout.
