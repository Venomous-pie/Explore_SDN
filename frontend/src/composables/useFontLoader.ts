import { ref } from 'vue'

export function useFontLoader() {
  const fontsLoaded = ref(false)
  const fontLoadError = ref<Error | null>(null)

  const loadFonts = async (timeout = 10000): Promise<boolean> => {
    try {
      // Check if Font Loading API is available
      if (!document.fonts) {
        console.warn('Font Loading API not supported, skipping font check')
        fontsLoaded.value = true
        return true
      }

      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Font loading timeout'))
        }, timeout)
      })

      // Race between font loading and timeout
      await Promise.race([
        document.fonts.ready,
        timeoutPromise,
      ])

      fontsLoaded.value = true
      return true
    } catch (error) {
      console.warn('Font loading failed or timed out:', error)
      fontLoadError.value = error instanceof Error ? error : new Error('Unknown font loading error')
      
      // Still mark as loaded to prevent blocking the app
      fontsLoaded.value = true
      return false
    }
  }

  const checkFontLoaded = (fontFamily: string, timeout = 5000): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!document.fonts || !document.fonts.check) {
        resolve(false)
        return
      }

      const startTime = Date.now()
      const checkInterval = setInterval(() => {
        if (document.fonts.check(`12px "${fontFamily}"`)) {
          clearInterval(checkInterval)
          resolve(true)
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval)
          resolve(false)
        }
      }, 100)
    })
  }

  return {
    fontsLoaded,
    fontLoadError,
    loadFonts,
    checkFontLoaded,
  }
}
