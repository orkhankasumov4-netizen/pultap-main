import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Search, BookA, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { glossaryData, alphabetsAz } from "@/data/glossary";

export default function GlossaryPage() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Filter the glossary terms based on search and selected letter
  const filteredTerms = useMemo(() => {
    return glossaryData.filter((term) => {
      const currentTermStr = 
        i18n.language === "en" ? term.termEn : 
        i18n.language === "ru" ? term.termRu : 
        term.termAz;
        
      const currentTermStrFallback = currentTermStr || term.termAz;

      const matchesSearch = currentTermStrFallback.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = selectedLetter ? currentTermStrFallback.toUpperCase().startsWith(selectedLetter) : true;

      return matchesSearch && matchesLetter;
    }).sort((a, b) => {
      const aTerm = i18n.language === "en" ? a.termEn : i18n.language === "ru" ? a.termRu : a.termAz;
      const bTerm = i18n.language === "en" ? b.termEn : i18n.language === "ru" ? b.termRu : b.termAz;
      return (aTerm || a.termAz).localeCompare(bTerm || b.termAz, 'az');
    });
  }, [searchQuery, selectedLetter, i18n.language]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>{t("glossary.metaTitle")}</title>
        <meta name="description" content={t("glossary.metaDesc")} />
      </Helmet>
      <div className="container">
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4 text-primary">
            <BookA className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            {t("glossary.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t("glossary.desc")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm mb-10">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder={t("glossary.searchPlaceholder")} 
              className="pl-12 h-14 bg-background border-border/50 text-lg rounded-xl focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (selectedLetter) setSelectedLetter(null);
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">{t("glossary.alphabetSearch")}</h3>
              {selectedLetter && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedLetter(null)}
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8"
                >
                  {t("lists.clear")}
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {alphabetsAz.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter === selectedLetter ? null : letter);
                    setSearchQuery("");
                  }}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold flex items-center justify-center transition-all ${
                    selectedLetter === letter 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                      : "bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:text-primary"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {t("glossary.resultsCount", { count: filteredTerms.length })}
            </h2>
          </div>

          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTerms.map((term) => {
                const termName = i18n.language === "en" ? term.termEn : i18n.language === "ru" ? term.termRu : term.termAz;
                const definition = i18n.language === "en" ? term.definitionEn : i18n.language === "ru" ? term.definitionRu : term.definitionAz;
                
                return (
                  <div key={term.id} className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-md transition-shadow group">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {termName || term.termAz}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {definition || term.definitionAz}
                    </p>
                    {/* Related term link placeholder */}
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-end">
                      <Button variant="link" className="p-0 h-auto text-primary gap-1 group-hover:gap-2 transition-all">
                        {t("common.details")} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("glossary.noResults")}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t("glossary.noResultsDesc")}
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLetter(null);
                }}
              >
                {t("glossary.all")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
