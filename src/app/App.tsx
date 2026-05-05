import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ValueProps } from "./components/ValueProps";
import { HowItWorks } from "./components/HowItWorks";
import { ConsultationSection } from "./components/ConsultationSection";
import { ClientsSection } from "./components/ClientsSection";
import { AboutSection } from "./components/AboutSection";
import { ArticlesSection } from "./components/ArticlesSection";
import { ArticlePage } from "./components/ArticlePage";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WebhookTester } from "./components/WebhookTester";
import { InsuranceFieldTest } from "./components/InsuranceFieldTest";
import { CookieBanner } from "./components/CookieBanner";
import { useState, useEffect } from "react";
import { Article } from "./data/articles";

export default function App() {
  // Check URL for webhook test mode: ?webhook-test=true OR insurance test: ?insurance-test=true
  const [showWebhookTest, setShowWebhookTest] = useState(false);
  const [showInsuranceTest, setShowInsuranceTest] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('webhook-test') === 'true') {
      setShowWebhookTest(true);
    }
    if (params.get('insurance-test') === 'true') {
      setShowInsuranceTest(true);
    }
  }, []);

  // Scroll to top when viewing an article
  useEffect(() => {
    if (selectedArticle) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedArticle]);

  // If insurance test mode, show only the insurance tester
  if (showInsuranceTest) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <InsuranceFieldTest />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // If webhook test mode, show only the tester
  if (showWebhookTest) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <WebhookTester />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // If an article is selected, show the article page
  if (selectedArticle) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <ArticlePage 
              article={selectedArticle} 
              onBack={() => setSelectedArticle(null)}
            />
            <Footer />
            <Toaster />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <ValueProps />
            <HowItWorks />
            <ConsultationSection />
            <ClientsSection />
            <ArticlesSection onArticleClick={setSelectedArticle} />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
          <Toaster />
          
          {/* Cookie Consent Banner - Shows on first visit */}
          <CookieBanner />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}