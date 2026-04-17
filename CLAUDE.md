# CLAUDE.md

## Project Overview

Fretune is a guitar tuning app built with Expo (managed workflow) and React Native. It supports chromatic tuning and per-string tuning with real-time pitch detection.

## Tech Stack

- **Framework**: Expo 54, React Native 0.81, React 19
- **Routing**: expo-router (file-based, app/ directory)
- **State**: Zustand
- **Animations**: react-native-reanimated
- **Audio**: expo-audio, react-native-pitchy, pitchfinder
- **Storage**: react-native-mmkv
- **Monitoring**: Sentry

## Commands

- `bun start` — start Expo dev server
- `bun run android` / `bun run ios` — platform builds
- `bun run lint` — eslint via `expo lint`
- `bun run typecheck` — `tsc --noEmit`

## Project Structure

- `app/` — Expo Router screens (`(tabs)/tune/`, `(tabs)/tools/`)
- `components/` — UI primitives (`components/ui/`) and feature components (`components/tuning/`)
- `hooks/` — custom hooks (pitch detection, smoothing, stores)
- `store/` — Zustand stores
- `services/` — logging and other services
- `utils/` — pure utility functions
- `types/` — shared TypeScript types

## Conventions

- Path aliases: `@/*` maps to project root
- React Compiler is active — do not use manual `useMemo`/`useCallback` unless there's a specific reason
- Reanimated for all animations — use `useAnimatedStyle`, `useSharedValue`, `withSpring`
- Component files use PascalCase, hooks use camelCase with `use` prefix
- Styles defined with `StyleSheet.create` at the bottom of component files
- Theme colors accessed via `useColors()` hook — never hardcode colors
- No test framework is set up currently
