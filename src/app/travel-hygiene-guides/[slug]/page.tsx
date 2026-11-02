import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { TRAVEL_GUIDES } from '@/data/travel-guides';
import { SITE_URL } from '@/lib/site';
import { Clock, Calendar, MessageCircle, ArrowLeft, ShieldCheck, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';

export async function generateStaticParams() {
  return TRAVEL_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = TRAVEL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | Traliber',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${SITE_URL}/travel-hygiene-guides/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [`${SITE_URL}/about`],
      images: [
        {
          url: '/images/kit-display.webp',
          width: 1200,
          height: 630,
          alt: `${guide.title} - Traliber Travel Essentials`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: ['/images/kit-display.webp'],
    },
  };
}

export default async function TravelGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = TRAVEL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const guideUrl = `${SITE_URL}/travel-hygiene-guides/${guide.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    image: `${SITE_URL}/images/kit-display.webp`,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: {
      '@type': 'Organization',
      name: 'Traliber Editorial Team',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Traliber',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Travel Hygiene Guides',
        item: `${SITE_URL}/travel-hygiene-guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: guideUrl,
      },
    ],
  };

  const faqSchema =
    guide.faqs && guide.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/travel-hygiene-guides" className="hover:text-[#4F75FF] transition-colors">
                  Guides
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold line-clamp-1">{guide.category}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="space-y-4 mb-10 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#4F75FF] bg-[#4F75FF]/10 px-3 py-1 rounded-full">
              <span>{guide.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.15]">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-[#22213A]/80 leading-relaxed font-normal">
              {guide.excerpt}
            </p>

            <div className="flex items-center gap-6 text-xs text-[#22213A]/60 font-mono pt-3 border-t border-[#22213A]/10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#4F75FF]" />
                {guide.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#4F75FF]" />
                Published {guide.datePublished.substring(0, 10)}
              </span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none space-y-10 text-[#22213A]/85 text-base sm:text-lg leading-relaxed">
            {guide.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B] tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
                {section.bulletPoints && (
                  <ul className="space-y-2.5 my-4 bg-white/70 p-6 rounded-2xl border border-[#22213A]/10 list-none">
                    {section.bulletPoints.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[#1E1B4B] font-medium text-sm sm:text-base">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.callout && (
                  <div className="p-4 rounded-xl bg-[#8657F6]/10 border-l-4 border-[#8657F6] text-sm text-[#1E1B4B]">
                    {section.callout}
                  </div>
                )}
              </section>
            ))}

            {/* In-Article Product Context Box */}
            <div className="my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-[#F4F3FA] border border-[#22213A]/10 shadow-sm text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4F75FF]">
                    RECOMMENDED COMPANION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B4B]">
                    Traliber Complete Travel Essentials Kit
                  </h3>
                  <p className="text-sm text-[#22213A]/75 leading-relaxed">
                    10 coordinated travel hygiene and personal care items in one water-resistant pouch. Includes toothbrush set, toothpaste, 5 pocket sanitizers, wet wipes, wet towel, toilet seat covers, paper soap, face mask, and cutlery kit.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                  <Link
                    href="/travel-essentials-kit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1E1B4B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F75FF] transition-colors"
                  >
                    View The Kit (₹199)
                  </Link>
                  <a
                    href={WHATSAPP_CONFIG.getLink(`Inquiry from ${guide.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section if available */}
            {guide.faqs && guide.faqs.length > 0 && (
              <section className="space-y-6 pt-6 border-t border-[#22213A]/10">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B] flex items-center gap-2.5">
                  <HelpCircle className="w-6 h-6 text-[#4F75FF]" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-[#22213A]/10 space-y-2"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
                        {faq.question}
                      </h3>
                      <p className="text-sm sm:text-base text-[#22213A]/75 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-14 pt-8 border-t border-[#22213A]/10 flex items-center justify-between">
            <Link
              href="/travel-hygiene-guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E1B4B] hover:text-[#4F75FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Travel Hygiene Guides
            </Link>
            <Link
              href="/travel-essentials-kit"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F75FF] hover:underline"
            >
              Explore Traliber Travel Kit &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
