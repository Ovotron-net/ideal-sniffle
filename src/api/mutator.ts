export type ErrorType<T> = T

const baseUrl = import.meta.env.VITE_API_URL ?? '/api/v1'

export const customInstance = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || response.statusText)
  }

  const data = await response.json()

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T
}

export default customInstance