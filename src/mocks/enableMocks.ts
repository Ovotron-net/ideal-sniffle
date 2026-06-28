export async function enableMocks() {
  if (!import.meta.env.DEV) return
  if (import.meta.env.VITE_USE_MSW === 'false') return

  const { worker } = await import('./browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}