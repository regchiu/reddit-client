export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, delay = 500) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
