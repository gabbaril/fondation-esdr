import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'pkjltio5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
}

export interface GalleryImage {
  _id: string
  _key: string
  asset: {
    _ref: string
    url: string
  }
  alt?: string
}

export interface HomePage {
  _id: string
  heroTitle: string
  heroSubtitle: string
  missionTitle: string
  missionDescription: string
  values?: Array<{
    _key: string
    title: string
    description: string
  }>
  gallery?: GalleryImage[]
}
