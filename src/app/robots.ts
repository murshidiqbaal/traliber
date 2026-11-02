import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Robots.txt configuration for Traliber (https://traliber.in)
 * 
 * Crawler Access Strategy:
 * 1. Traditional Search Engines: Googlebot, Bingbot, Applebot, DuckDuckBot
 *    - Full access to all public content and products for search indexing.
 * 2. AI Search Discovery & Retrieval: OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot
 *    - Explicitly allowed on all public routes for AI citation & direct search answering.
 * 3. Protected / Disallowed Routes:
 *    - /admin, /admin/* (Administrative content manager)
 *    - /api/* (Internal serverless endpoints)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all general crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
      // Traditional search engines
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'Slurp',
          'Baiduspider',
          'YandexBot',
        ],
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
      // AI Search & Discovery bots (real-time search answering & citations)
      {
        userAgent: [
          'OAI-SearchBot', // OpenAI Search
          'ChatGPT-User',  // ChatGPT browsing actions triggered by users
          'GPTBot',        // OpenAI general crawler
          'PerplexityBot', // Perplexity AI search retrieval
          'ClaudeBot',     // Anthropic Claude search retrieval
          'anthropic-ai',  // Anthropic discovery
          'cohere-ai',     // Cohere retrieval
          'Applebot-Extended', // Apple AI search discovery
          'Bytespider',    // ByteDance search retrieval
          'Diffbot',       // Structured data extraction
        ],
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
