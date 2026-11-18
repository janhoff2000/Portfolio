import type { ReactNode } from 'react'

/** The "you can use this" cue above a device: a tap icon and one short line. */
export function TryHint({ children }: { children: ReactNode }) {
  return (
    <p className="try-hint">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10" />
        <path d="M12 9.5a1.5 1.5 0 0 1 3 0V11" />
        <path d="M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.6-2.1L4.2 15.6a1.5 1.5 0 0 1 2.2-2L9 16V11" />
        <path d="M6 5.5a3 3 0 0 1 6-1.5" />
      </svg>
      <span>{children}</span>
    </p>
  )
}
