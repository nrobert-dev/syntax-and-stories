import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' for markdown/mdx, 'data' for json/yaml
  schema: z.object({
    title: z.string(),
    description: z.string(), // Used for SEO and previews
    pubDate: z.date(),
    // Optional fields:
    author: z.string().optional(),
    image: z.object({ // Example for an optional cover image
      url: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()).optional(), // Example tags
    draft: z.boolean().optional().default(false), // To hide unfinished posts
  }),
});

export const collections = {
  'blog': blogCollection,
};