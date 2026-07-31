"use client"

import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

/**
 * Returns `true` only after the component has mounted on the client.
 *
 * Implemented with `useSyncExternalStore` so it is hydration-safe: the
 * server snapshot is `false`, the client snapshot is `true`, and React
 * reconciles the two after hydration. No effects, no state-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
