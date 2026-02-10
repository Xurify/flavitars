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
