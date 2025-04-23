import { useCallback, useRef } from 'react'

function useDebounceCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number = 500
): ReturnType<typeof useCallback> {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
      timeoutId.current = setTimeout(() => func(...args), delay)
    },
    [func, delay]
  )
}

export default useDebounceCallback
