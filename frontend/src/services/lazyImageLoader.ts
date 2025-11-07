/**
 * Lazy image loader with progressive loading strategy
 * Loads images in batches as user navigates through content
 */

type LoadCallback = (loaded: number, total: number) => void

interface LoaderState {
  loadedUrls: Set<string>
  loadingUrls: Set<string>
  failedUrls: Set<string>
  batchSize: number
  currentBatch: number
}

const state: LoaderState = {
  loadedUrls: new Set(),
  loadingUrls: new Set(),
  failedUrls: new Set(),
  batchSize: 3,
  currentBatch: 0,
}

/**
 * Load a single image
 */
async function loadSingleImage(url: string): Promise<HTMLImageElement> {
  if (!url) return Promise.reject(new Error('Empty URL'))
  
  // Already loaded
  if (state.loadedUrls.has(url)) {
    return Promise.resolve(new Image())
  }
  
  // Previously failed
  if (state.failedUrls.has(url)) {
    return Promise.reject(new Error('Previously failed'))
  }
  
  // Currently loading
  if (state.loadingUrls.has(url)) {
    // Wait for existing load
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        if (state.loadedUrls.has(url)) {
          clearInterval(checkInterval)
          resolve(new Image())
        } else if (state.failedUrls.has(url)) {
          clearInterval(checkInterval)
          reject(new Error('Failed to load'))
        }
      }, 100)
    })
  }

  state.loadingUrls.add(url)

  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      state.loadedUrls.add(url)
      state.loadingUrls.delete(url)
      state.failedUrls.delete(url)
      resolve(img)
    }
    
    img.onerror = () => {
      state.failedUrls.add(url)
      state.loadingUrls.delete(url)
      reject(new Error(`Failed to load: ${url}`))
    }
    
    img.src = url
    
    // Handle browser cache
    if (img.complete && img.naturalWidth !== 0) {
      state.loadedUrls.add(url)
      state.loadingUrls.delete(url)
      resolve(img)
    }
  })
}

/**
 * Load a batch of images
 */
export async function loadImageBatch(
  urls: string[],
  startIndex: number,
  batchSize: number = state.batchSize,
  onProgress?: LoadCallback
): Promise<void> {
  const batch = urls.slice(startIndex, startIndex + batchSize)
  const total = batch.length
  let loaded = 0

  const promises = batch.map(async (url) => {
    try {
      await loadSingleImage(url)
      loaded++
      onProgress?.(loaded, total)
    } catch (err) {
      loaded++
      onProgress?.(loaded, total)
      console.warn(`Failed to load image: ${url}`)
    }
  })

  await Promise.all(promises)
}

/**
 * Progressive loader that loads images in batches
 * Initial batch loads immediately, subsequent batches load when threshold is reached
 */
export class ProgressiveImageLoader {
  private urls: string[]
  private batchSize: number
  private loadedBatches: number = 0
  private totalBatches: number = 0
  private onProgress?: LoadCallback
  private preloadThreshold: number = 0.5 // Load next batch when 50% through current

  constructor(urls: string[], batchSize: number = 3, onProgress?: LoadCallback) {
    this.urls = urls.filter(Boolean)
    this.batchSize = batchSize
    this.totalBatches = Math.ceil(this.urls.length / batchSize)
    this.onProgress = onProgress
  }

  /**
   * Load initial batch
   */
  async loadInitial(): Promise<void> {
    if (this.urls.length === 0) return
    await this.loadBatch(0)
  }

  /**
   * Load next batch
   */
  async loadNext(): Promise<void> {
    if (this.loadedBatches >= this.totalBatches) return
    await this.loadBatch(this.loadedBatches)
  }

  /**
   * Load batch at specific index
   */
  private async loadBatch(batchIndex: number): Promise<void> {
    if (batchIndex >= this.totalBatches) return
    
    const startIndex = batchIndex * this.batchSize
    await loadImageBatch(
      this.urls,
      startIndex,
      this.batchSize,
      this.onProgress
    )
    
    this.loadedBatches = Math.max(this.loadedBatches, batchIndex + 1)
  }

  /**
   * Check if we should preload next batch based on current index
   */
  shouldPreloadNext(currentIndex: number): boolean {
    const currentBatch = Math.floor(currentIndex / this.batchSize)
    const progressInBatch = (currentIndex % this.batchSize) / this.batchSize
    
    return (
      progressInBatch >= this.preloadThreshold &&
      currentBatch + 1 === this.loadedBatches &&
      this.loadedBatches < this.totalBatches
    )
  }

  /**
   * Handle index change - preload next batch if needed
   */
  async onIndexChange(currentIndex: number): Promise<void> {
    if (this.shouldPreloadNext(currentIndex)) {
      await this.loadNext()
    }
  }

  /**
   * Get loading progress
   */
  getProgress(): { loaded: number; total: number; percentage: number } {
    const loaded = this.loadedBatches * this.batchSize
    const total = this.urls.length
    return {
      loaded: Math.min(loaded, total),
      total,
      percentage: total > 0 ? (Math.min(loaded, total) / total) * 100 : 0,
    }
  }

  /**
   * Check if image is loaded
   */
  isImageLoaded(url: string): boolean {
    return state.loadedUrls.has(url)
  }

  /**
   * Reset loader
   */
  reset(): void {
    this.loadedBatches = 0
  }
}

/**
 * Check if an image URL is loaded
 */
export function isImageLoaded(url: string): boolean {
  return state.loadedUrls.has(url)
}

/**
 * Get loader state for debugging
 */
export function getLoaderState() {
  return {
    loaded: state.loadedUrls.size,
    loading: state.loadingUrls.size,
    failed: state.failedUrls.size,
  }
}

/**
 * Clear all state
 */
export function clearLoaderState(): void {
  state.loadedUrls.clear()
  state.loadingUrls.clear()
  state.failedUrls.clear()
  state.currentBatch = 0
}
