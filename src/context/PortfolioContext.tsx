import { createContext, useContext, useEffect, useState } from 'react'
import { awards as fallbackAwards, experiences as fallbackExperiences, gallery as fallbackGallery, projects as fallbackProjects, site as fallbackSite, skills as fallbackSkills } from '../data/content'
import { supabase } from '../services/supabase'
import type { Award, Experience, GalleryItem, Project } from '../types'

type PortfolioState = {
  site: typeof fallbackSite
  projects: Project[]
  experiences: Experience[]
  awards: Award[]
  gallery: GalleryItem[]
  skills: string[]
}

const fallback: PortfolioState = { site: fallbackSite, projects: fallbackProjects, experiences: fallbackExperiences, awards: fallbackAwards, gallery: fallbackGallery, skills: fallbackSkills }
const PortfolioContext = createContext(fallback)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(fallback)
  useEffect(() => {
    if (!supabase) return
    Promise.all([
      supabase.from('site_settings').select('value').eq('key', 'site').maybeSingle(),
      supabase.from('projects').select('*').eq('published', true).order('sort_order'),
      supabase.from('content_items').select('*').eq('published', true).order('sort_order'),
    ]).then(([settings, projectRows, items]) => {
      const rows = items.data || []
      const remoteProjects = (projectRows.data || []).map(row => ({ ...row.content, slug: row.slug, title: row.title, eyebrow: row.eyebrow, summary: row.summary, cover: row.cover_url, featured: row.featured })) as Project[]
      const byCollection = (name: string) => rows.filter(row => row.collection === name).map(row => ({ title: row.title, ...row.data }))
      setState({
        site: settings.data?.value ? { ...fallbackSite, ...settings.data.value } : fallbackSite,
        projects: remoteProjects.length ? remoteProjects : fallbackProjects,
        experiences: (byCollection('experience').length ? byCollection('experience') : fallbackExperiences) as Experience[],
        awards: (byCollection('award').length ? byCollection('award') : fallbackAwards) as Award[],
        gallery: (byCollection('gallery').length ? byCollection('gallery') : fallbackGallery) as GalleryItem[],
        skills: (byCollection('skill').length ? byCollection('skill').map((x: any) => x.title) : fallbackSkills) as string[],
      })
    })
  }, [])
  return <PortfolioContext.Provider value={state}>{children}</PortfolioContext.Provider>
}

export const usePortfolio = () => useContext(PortfolioContext)
