import { ref, computed } from 'vue'
import { getCachedImage } from '@/services/imagePreloader'

/**
 * Composable for managing image loading states
 */
export function useImages() {
  const loadedImages = ref<Set<string>>(new Set())
  const failedImages = ref<Set<string>>(new Set())

  /**
   * Check if an image is loaded
   */
  function isImageLoaded(url: string): boolean {
    return loadedImages.value.has(url) || !!getCachedImage(url)
  }

  /**
   * Check if an image failed to load
   */
  function isImageFailed(url: string): boolean {
    return failedImages.value.has(url)
  }

  /**
   * Load a single image and track its state
   */
  async function loadImage(url: string): Promise<HTMLImageElement> {
    if (!url) {
      return Promise.reject(new Error('Empty URL'))
    }

    // Check cache first
    const cached = getCachedImage(url)
    if (cached) {
      loadedImages.value.add(url)
      return Promise.resolve(cached)
    }

    // Check if already failed
    if (failedImages.value.has(url)) {
      return Promise.reject(new Error('Previously failed'))
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        loadedImages.value.add(url)
        failedImages.value.delete(url)
        resolve(img)
      }
      
      img.onerror = () => {
        failedImages.value.add(url)
        loadedImages.value.delete(url)
        reject(new Error(`Failed to load: ${url}`))
      }
      
      img.src = url
      
      // Handle already loaded from browser cache
      if (img.complete && img.naturalWidth !== 0) {
        loadedImages.value.add(url)
        resolve(img)
      }
    })
  }

  /**
   * Get a placeholder image URL
   */
  function getPlaceholder(width = 400, height = 300): string {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect fill='%23e5e7eb' width='${width}' height='${height}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ELoading...%3C/text%3E%3C/svg%3E`
  }

  /**
   * Get image with fallback
   */
  function getImageSrc(url: string | undefined, fallback?: string): string {
    if (!url) return fallback || getPlaceholder()
    if (isImageFailed(url)) return fallback || getPlaceholder()
    return url
  }

  return {
    loadedImages: computed(() => loadedImages.value),
    failedImages: computed(() => failedImages.value),
    isImageLoaded,
    isImageFailed,
    loadImage,
    getPlaceholder,
    getImageSrc,
  }
}
