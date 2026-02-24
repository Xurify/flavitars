# AGENTS.md — flavitars

## Commands
- **Dev**: `bun dev`
- **Build**: `bun build` — always run after changes
- **Lint**: `bun lint` (eslint) — always run after changes

## Architecture
Next.js 16 with React 19 and App Router. Standard structure: `app/` (routes), `components/` (UI), `hooks/`, `lib/` (utilities). Uses React Compiler (babel-plugin-react-compiler).

## Code Style
- **Package manager**: Bun
- **Types**: Strict TypeScript; prefix unused vars with `_`; `any` is a warning
- **Components**: Radix UI primitives, shadcn/ui, CVA for variants, Tailwind CSS 4
- **Formatting**: ESLint with Next.js config; follow existing patterns in codebase
- **Validation**: Zod for schemas
- **State**: nuqs for URL search params
- **Errors**: Avoid unescaped entities in JSX

## Cursor Cloud specific instructions

- **Bun runtime**: Bun is not pre-installed on cloud VMs. The update script handles installation via `curl -fsSL https://bun.sh/install | bash`. After install, Bun is at `~/.bun/bin/bun`; ensure `PATH` includes `$HOME/.bun/bin`.
- **Build command gotcha**: `bun build` invokes Bun's bundler (not Next.js). Use `bun run build` to run the Next.js build.
- **No external services**: The app is fully self-contained — no databases, Docker, env vars, or API keys needed. `bun install && bun run dev` is sufficient.
- **Dev server**: Runs on `http://localhost:3000`. Avatar API is at `/api/avatar/[id]` (returns SVG).
