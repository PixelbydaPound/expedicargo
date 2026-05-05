import { useLanguage } from "../contexts/LanguageContext";
import { Article } from "../data/articles";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
}

export function ArticlePage({ article, onBack }: ArticlePageProps) {
  const { language, t } = useLanguage();
  
  const title = article.title[language];
  const description = article.description[language];
  const date = article.date[language];
  const content = article.content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('Volver a artículos', 'Back to articles')}
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-[21/9] max-h-[500px] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <ImageWithFallback
          src={article.image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
            {t('Artículo', 'Article')} — {date}
          </p>
          <h1 className="text-4xl md:text-5xl mb-6 dark:text-white">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </header>

        {/* Content Sections */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              {section.heading && (
                <h2 className="text-2xl md:text-3xl mb-4 dark:text-white">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {/* Conclusion */}
          {content.conclusion && (
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl mb-4 dark:text-white">
                {t('Conclusión', 'Conclusion')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.conclusion}
              </p>
            </section>
          )}

          {/* Source Reference */}
          {article.source && (
            <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('Referencia', 'Reference')}:
                </p>
                <a
                  href={article.source[language].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors inline-flex items-center gap-2"
                >
                  <span>{article.source[language].text}</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              </div>
            </section>
          )}
        </div>

        {/* Back to Articles CTA */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onBack}
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            {t('Ver más artículos', 'View more articles')}
          </Button>
        </div>
      </article>
    </div>
  );
}