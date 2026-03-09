import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: 'Fondation ESDR Studio',
  projectId,
  dataset,
  basePath: '/admin',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool(),
  ],
})
