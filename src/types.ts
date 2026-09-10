export type Project = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  description: string[]
  year: string
  role: string
  result?: string
  tags: string[]
  hierarchy: string[]
  cover: string
  gallery: string[]
  links?: { label: string; url: string }[]
  featured: boolean
}

export type Experience = {
  title: string
  organization: string
  period: string
  description: string
  type: 'Leadership' | 'Research' | 'Competition' | 'Education'
}

export type Award = {
  title: string
  issuer: string
  date: string
  description: string
  image?: string
}

export type GalleryItem = {
  src: string
  alt: string
  category: string
  caption: string
  orientation?: 'portrait' | 'landscape'
}
