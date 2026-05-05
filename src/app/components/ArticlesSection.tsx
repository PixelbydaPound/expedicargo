import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { getCurrentArticleSet } from "../utils/articleRotation";
import { Article } from "../data/articles";

interface ArticlesSectionProps {
  onArticleClick?: (article: Article) => void;
}

export function ArticlesSection({ onArticleClick }: ArticlesSectionProps) {
  const { language, t } = useLanguage();

  // Get the current set of articles based on 7-day rotation
  const currentArticles = getCurrentArticleSet();

  const handleArticleClick = (article: Article) => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 dark:text-white">
            {t(
              'Los últimos artículos e insights de la industria',
              'The latest articles and industry insights'
            )}
          </h2>
        </div>

        {/* Articles Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* First Row: Large Featured + Medium */}
          <Card 
            className="group overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer md:col-span-2"
            onClick={() => handleArticleClick(currentArticles[0])}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <ImageWithFallback 
                src={currentArticles[0].image}
                alt={currentArticles[0].title[language]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {t('Artículo', 'Article')} — {currentArticles[0].date[language]}
              </p>
              <h3 className="text-xl mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {currentArticles[0].title[language]}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentArticles[0].description[language]}
              </p>
            </div>
          </Card>

          <Card 
            className="group overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer md:col-span-1"
            onClick={() => handleArticleClick(currentArticles[1])}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <ImageWithFallback 
                src={currentArticles[1].image}
                alt={currentArticles[1].title[language]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {t('Artículo', 'Article')} — {currentArticles[1].date[language]}
              </p>
              <h3 className="text-xl mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {currentArticles[1].title[language]}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentArticles[1].description[language]}
              </p>
            </div>
          </Card>

          {/* Second Row: Three Equal Cards */}
          {currentArticles.slice(2, 5).map((article, index) => (
            <Card 
              key={article.id}
              className="group overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer md:col-span-1"
              onClick={() => handleArticleClick(article)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback 
                  src={article.image}
                  alt={article.title[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {t('Artículo', 'Article')} — {article.date[language]}
                </p>
                <h3 className="text-xl mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {article.description[language]}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}