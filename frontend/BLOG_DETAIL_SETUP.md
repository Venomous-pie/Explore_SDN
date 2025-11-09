# Blog Post Detail Page - Setup Complete

## What Was Done

### ✅ Blog List Navigation
Updated `BlogView.vue` to navigate to blog detail pages when clicking:
- **Featured post** - Entire card is clickable
- **Blog post cards** - All cards navigate to `/blog/:id`

### ✅ Router Configuration
Added new route in `src/router/index.ts`:
```typescript
{
  path: '/blog/:id',
  name: 'BlogPostDetail',
  component: () => import('../views/BlogPostDetailView.vue')
}
```

### ✅ Blog Detail View Created
Created `src/views/BlogPostDetailView.vue` by copying `PlaceDetailView.vue` structure.

## Next Steps - Adapt BlogPostDetailView

The file currently has PlaceDetailView code and needs to be adapted for blog posts. Here's what needs to be changed:

### 1. **Update Imports and Data Structure**
```typescript
// Remove place-specific imports
// Remove: useDataStore, useImages, useAuth, AuthModal

// Keep:
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Add blog post interface (copy from BlogView.vue)
interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  categoryColor: string
  image: string
  date: string
  readTime: string
  author: string
  tags: string[]
  featured?: boolean
}
```

### 2. **Replace Data Fetching Logic**
```typescript
// Instead of:
const place = computed(() => dataStore.places.find(p => p.id === placeId.value))

// Use:
const blogPosts = ref<BlogPost[]>([...]) // Copy from BlogView.vue
const post = computed(() => blogPosts.value.find(p => p.id === postId.value))
```

### 3. **Update Template Sections**

#### Header Section (lines 16-38)
- Remove reviewer avatars and ratings
- Show: Category badge, title, author info, date, read time
- Add: Tags display

#### Main Image (lines 40-44)
- Change from `place.images[0]` to `post.image`
- Keep same styling

#### Content Section (replace Wikipedia section)
```vue
<!-- Article Content -->
<div class="bg-white rounded-lg p-6 shadow-sm mb-4 border border-gray-200">
  <div class="prose prose-sm max-w-none">
    <div v-html="articleContent"></div>
  </div>
</div>
```

#### Replace "Dining near here" with "Share Section"
```vue
<div class="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
  <h2 class="text-base font-bold text-gray-900 mb-3">Share this article</h2>
  <div class="flex gap-3">
    <button @click="shareOnFacebook" class="flex-1 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors">
      📘 Facebook
    </button>
    <button @click="shareOnTwitter" class="flex-1 px-4 py-2 bg-sky-500 text-white text-xs font-semibold rounded-md hover:bg-sky-600 transition-colors">
      🐦 Twitter
    </button>
    <button @click="copyLink" class="flex-1 px-4 py-2 bg-gray-700 text-white text-xs font-semibold rounded-md hover:bg-gray-800 transition-colors">
      {{ linkCopied ? '✓ Copied!' : '🔗 Copy Link' }}
    </button>
  </div>
</div>
```

#### Replace "Places to stay" with "Related Articles"
```vue
<div class="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
  <h2 class="text-base font-bold text-gray-900 mb-3">Related Articles</h2>
  <div v-if="relatedPosts.length > 0" class="overflow-x-auto scrollbar-hover">
    <div class="flex gap-3 pb-2">
      <router-link 
        v-for="relatedPost in relatedPosts" 
        :key="relatedPost.id"
        :to="`/blog/${relatedPost.id}`"
        class="flex-shrink-0 w-56 bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200 cursor-pointer">
        <img :src="relatedPost.image" :alt="relatedPost.title" class="w-full h-32 object-cover" />
        <div class="p-3">
          <div :class="getCategoryColorClass(relatedPost.categoryColor)" class="text-xs font-bold mb-1 uppercase tracking-wide">
            {{ relatedPost.category }}
          </div>
          <h3 class="font-semibold text-xs text-gray-900 mb-2 line-clamp-2">{{ relatedPost.title }}</h3>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>{{ relatedPost.date.split(',')[0] }}</span>
            <span>{{ relatedPost.readTime }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</div>
```

#### Add Author Bio Section
```vue
<div class="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-200">
  <h2 class="text-base font-bold text-gray-900 mb-3">About the Author</h2>
  <div class="flex gap-4">
    <img :src="`https://i.pravatar.cc/150?u=${post.author}`" :alt="post.author"
      class="w-16 h-16 rounded-full object-cover flex-shrink-0" />
    <div>
      <h3 class="font-bold text-sm text-gray-900 mb-1">{{ post.author }}</h3>
      <p class="text-xs text-gray-600 leading-relaxed">
        {{ getAuthorBio(post.author) }}
      </p>
    </div>
  </div>
</div>
```

#### Update Review Section to Comments
- Change "Leave a review" to "Comments"
- Remove star rating selector
- Keep textarea and post button
- Update validation logic
- Change storage key from `reviews_place_${id}` to `comments_blog_${id}`

### 4. **Add Helper Functions**

```typescript
// Category color classes
const getCategoryColorClass = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    green: 'text-green-600',
    red: 'text-red-600'
  }
  return colors[color] || 'text-gray-600'
}

// Related posts (same category)
const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogPosts.value
    .filter(p => p.id !== post.value!.id && p.category === post.value!.category)
    .slice(0, 4)
})

// Article content (simulated rich content)
const articleContent = computed(() => {
  if (!post.value) return ''
  return `
    <p>${post.value.excerpt}</p>
    <h2>Introduction</h2>
    <p>Welcome to our comprehensive guide about ${post.value.title.toLowerCase()}...</p>
    <h2>What Makes It Special</h2>
    <p>The unique characteristics of this location...</p>
    <!-- Add more sections -->
  `
})

// Author bios
const getAuthorBio = (author: string): string => {
  const bios: Record<string, string> = {
    'Maria Santos': 'Maria is a travel writer and photographer based in Manila...',
    'Jake Rodriguez': 'Jake is an adventure enthusiast and surf instructor...',
    'Chef Elena Cruz': 'Elena is a culinary expert specializing in Filipino cuisine...',
    'Carlos Mendoza': 'Carlos is a budget travel expert and digital nomad...'
  }
  return bios[author] || 'A passionate traveler and writer sharing stories from Surigao del Norte.'
}

// Share functions
const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.value?.title || '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  linkCopied.value = true
  setTimeout(() => linkCopied.value = false, 2000)
}
```

### 5. **Update Not Found State**
```vue
<div v-else class="max-w-4xl mx-auto px-4 py-20 text-center">
  <div class="text-6xl mb-4">📄</div>
  <h1 class="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h1>
  <p class="text-sm text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
  <router-link to="/blog"
    class="inline-block bg-black text-white font-medium text-xs py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
    Back to Blog
  </router-link>
</div>
```

## Testing Checklist

Once adapted, test:
- [ ] Click featured post → navigates to detail page
- [ ] Click blog card → navigates to detail page
- [ ] Detail page loads correct post data
- [ ] Related articles show same category posts
- [ ] Share buttons work
- [ ] Copy link works
- [ ] Comments can be posted
- [ ] Comments persist in localStorage
- [ ] Back button returns to blog list
- [ ] 404 state for invalid post ID
- [ ] Responsive on mobile/tablet/desktop

## File Structure

```
frontend/
├── src/
│   ├── views/
│   │   ├── BlogView.vue (✅ Updated with navigation)
│   │   └── BlogPostDetailView.vue (⚠️ Needs adaptation)
│   └── router/
│       └── index.ts (✅ Route added)
└── BLOG_DETAIL_SETUP.md (this file)
```

## Quick Start

1. Open `src/views/BlogPostDetailView.vue`
2. Follow the adaptation steps above
3. Test by running `npm run dev`
4. Navigate to `/blog` and click any post

## Related Documentation

- `BLOG_IMPLEMENTATION.md` - Blog list page implementation
- `IMPLEMENTATION_COMPLETE.md` - Original blog page creation
- `SCROLL_TO_TOP.md` - Page navigation behavior
