// Lightweight image preloader with concurrency control and in-memory cache
type ProgressCallback = (loaded: number, total: number, url?: string) => void

const cache = new Map<string, HTMLImageElement | 'error'>()

/**
 * Preload a list of image URLs.
 * @param urls list of image URLs to preload
 * @param onProgress optional progress callback
 * @param concurrency number of parallel loads
 */
export async function preloadImages(urls: string[], onProgress?: ProgressCallback, concurrency = 6): Promise<void> {
    if (!urls || urls.length === 0) return

    // normalize and unique
    const unique = Array.from(new Set(urls.filter(Boolean)))
    const total = unique.length
    let loaded = 0

    const enqueue = async (tasks: string[]) => {
        while (tasks.length) {
            const batch = tasks.splice(0, concurrency)
            await Promise.all(batch.map(u => load(u).then(() => {
                loaded++
                onProgress?.(loaded, total, u)
            }).catch(() => {
                loaded++
                onProgress?.(loaded, total, u)
            })))
        }
    }

    await enqueue(unique)
}

async function load(url: string): Promise<HTMLImageElement> {
    if (!url) return Promise.reject(new Error('empty url'))

    // Return cached success
    const cached = cache.get(url)
    if (cached && cached !== 'error') return Promise.resolve(cached)
    if (cached === 'error') return Promise.reject(new Error('previous load error'))

    return new Promise((resolve, reject) => {
        try {
            const img = new Image()
            // Allow CORS images to be used in canvas if needed
            img.crossOrigin = 'anonymous'
            img.onload = () => {
                cache.set(url, img)
                resolve(img)
            }
            img.onerror = () => {
                cache.set(url, 'error')
                reject(new Error(`Failed to load image: ${url}`))
            }
            img.src = url
            // If already complete (from browser cache), resolve immediately
            if (img.complete && img.naturalWidth !== 0) {
                cache.set(url, img)
                resolve(img)
            }
        } catch (err) {
            cache.set(url, 'error')
            reject(err)
        }
    })
}

/**
 * Get a cached HTMLImageElement if available
 */
export function getCachedImage(url: string): HTMLImageElement | undefined {
    const v = cache.get(url)
    return v && v !== 'error' ? v : undefined
}

/**
 * Optionally add a <link rel="preload" as="image"> tag to head for critical images.
 */
export function addPreloadLink(url: string) {
    try {
        if (!document) return
        const existing = document.querySelectorAll(`link[rel=\"preload\"][href=\"${url}\"]`)
        if (existing && existing.length) return
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = url
        document.head.appendChild(link)
    } catch (e) {
        // ignore in non-browser environments
    }
}

export default {
    preloadImages,
    getCachedImage,
    addPreloadLink,
}
