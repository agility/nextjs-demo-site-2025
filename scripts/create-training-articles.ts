/**
 * Script to create TrainingArticles content items from markdown files
 *
 * This script reads markdown files from docs/training-guide and creates
 * corresponding content items in Agility CMS.
 */

import { readFileSync } from 'fs'
import { join } from 'path'

interface ArticleData {
  title: string
  slug: string
  description: string
  markdownContent: string
  sectionID: number
  conceptID: number
  filePath: string
}

// Section and Concept mappings
const SECTION_MAP: Record<string, number> = {
  'admin': 1321,        // Administrators
  'content-editor': 1323, // Editors (Content Editors)
  'developer': 1324,     // Developers
  'architect': 1322,     // Architects
  'concepts': 1320,     // Concepts
}

const CONCEPT_MAP: Record<string, number> = {
  'training': 1318,
  'concepts': 1326,
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

function extractDescription(content: string): string {
  // Get first paragraph after title (skip H1 and any images)
  const lines = content.split('\n')
  let foundTitle = false
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ')) {
      foundTitle = true
      continue
    }
    if (foundTitle && lines[i].trim() && !lines[i].startsWith('![') && !lines[i].startsWith('*')) {
      // Skip image lines and empty lines
      if (lines[i].trim().length > 20) {
        return lines[i].trim()
      }
    }
  }
  return ''
}

function createSlug(filePath: string): string {
  const parts = filePath.split('/')
  const filename = parts[parts.length - 1].replace('.md', '')
  const role = parts[parts.length - 2]

  // Handle special cases
  if (filename === 'README') {
    return role === 'concepts' ? 'concepts' : `${role}-overview`
  }

  return `${role}-${filename}`
}

function getSectionID(filePath: string): number {
  const parts = filePath.split('/')
  const role = parts[parts.length - 2]
  return SECTION_MAP[role] || 0
}

function getConceptID(filePath: string): number {
  const parts = filePath.split('/')
  const role = parts[parts.length - 2]

  if (role === 'concepts') {
    return CONCEPT_MAP['concepts']
  }
  return CONCEPT_MAP['training']
}

export function processMarkdownFile(filePath: string): ArticleData | null {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const title = extractTitle(content)
    const description = extractDescription(content)
    const slug = createSlug(filePath)
    const sectionID = getSectionID(filePath)
    const conceptID = getConceptID(filePath)

    if (!title) {
      console.warn(`No title found in ${filePath}`)
      return null
    }

    return {
      title,
      slug,
      description: description || title,
      markdownContent: content,
      sectionID,
      conceptID,
      filePath,
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
    return null
  }
}
