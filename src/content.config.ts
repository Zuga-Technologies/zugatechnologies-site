// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bibleSection = defineCollection({
  loader: glob({ pattern: '[0-9]*.md', base: './docs/bible' }),
  schema: z.object({
    section: z.number().int().min(1).max(18),
    title: z.string(),
    summary: z.string(),
    mikeCheckpoint: z.boolean().default(false),
    lastReviewed: z.string().optional(),
  }),
});

const components = defineCollection({
  loader: glob({ pattern: '*.md', base: './docs/bible/11-components' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    anatomy: z.array(z.string()).min(1),
    variants: z.array(z.string()).min(1),
    accessibility: z.object({
      keyboard: z.array(z.string()).min(1),
      ariaRoles: z.array(z.string()),
      contrastNotes: z.string(),
      focusBehavior: z.string(),
    }),
    examples: z.array(z.object({
      framework: z.enum(['astro', 'vue', 'plain-html']),
      code: z.string(),
    })).min(1),
    donts: z.array(z.string()),
    tokens: z.array(z.string()),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: '*.md', base: './docs/bible/12-patterns' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    components: z.array(z.string()).min(1),
    flow: z.array(z.string()).min(1),
    a11y: z.string(),
  }),
});

const adr = defineCollection({
  loader: glob({ pattern: '[0-9]*.md', base: './docs/bible/adr' }),
  schema: z.object({
    id: z.number().int(),
    title: z.string(),
    date: z.string(),
    status: z.enum(['proposed', 'accepted', 'deprecated', 'superseded']),
    context: z.string(),
    decision: z.string(),
    consequences: z.string(),
    supersededBy: z.number().int().optional(),
  }),
});

const profiles = defineCollection({
  loader: glob({ pattern: '*.md', base: './docs/bible/profiles' }),
  schema: z.object({
    profile: z.string(),
    consumer: z.string(),
    family: z.enum(['master', 'wellness', 'markets', 'creative', 'dev', 'cloud', 'music', 'forge', 'education', 'security', 'internal']),
    accentRamp: z.string(),
    rationale: z.string().min(40),
    deviations: z.array(z.string()).default([]),
  }),
});

export const collections = { bibleSection, components, patterns, adr, profiles };
