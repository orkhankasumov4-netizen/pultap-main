import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { MessageCircleQuestion, Search, User, Filter, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const TOPICS = ["Bütün Mövzular", "Kreditlər", "Depozitlər", "Plastik Kartlar", "İpoteka", "Hüquqi Məsələlər"];

const EXPERTS = [
  { id: 1, name: "Əli Əliyev", role: "Kredit Eksperti", answers: 142, rating: 4.9 },
  { id: 2, name: "Nigar Məmmədova", role: "Hüquqşünas", answers: 89, rating: 4.8 },
  { id: 3, name: "Rəşad Həsənov", role: "Maliyyə Analitiki", answers: 215, rating: 5.0 },
];

const QUESTIONS = [
  { id: 1, topic: "Kreditlər", q: "Nağd pul krediti alarkən hansı sənədlər tələb olunur?", a: "Adətən şəxsiyyət vəsiqəsi və iş yerindən arayış və ya əmək haqqı kartından çıxarış tələb olunur.", expert: "Əli Əliyev", views: 1204 },
  { id: 2, topic: "Plastik Kartlar", q: "Taksit kartı ilə debet kartın fərqi nədir?", a: "Taksit kartı sizə xərclərinizi aylara bölməyə imkan verir, debet kart isə yalnız öz vəsaitinizi istifadə etmək üçündür.", expert: "Rəşad Həsənov", views: 856 },
  { id: 3, topic: "İpoteka", q: "Dövlət ipotekasında ilkin ödəniş nə qədərdir?", a: "Güzəştli ipoteka üzrə ilkin ödəniş 10%, standart ipoteka üzrə isə minimum 15-20% təşkil edir.", expert: "Nigar Məmmədova", views: 2341 },
  { id: 4, topic: "Depozitlər", q: "Əmanətlərin sığortalanması necə işləyir?", a: "Əmanətlərin Sığortalanması Fondu tərəfindən 100,000 AZN-ə qədər olan və qorunan faiz dərəcəsi çərçivəsində olan əmanətlər tam sığortalanır.", expert: "Rəşad Həsənov", views: 1842 },
];

export default function QnaPage() {
  const { t } = useTranslation();
  const [activeTopic, setActiveTopic] = useState("Bütün Mövzular");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  
  // Filter questions
  const filteredQuestions = QUESTIONS.filter(q => {
    const matchesTopic = activeTopic === "Bütün Mövzular" || q.topic === activeTopic;
    const matchesSearch = q.q.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredQuestions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Helmet>
        <title>{t("qna.metaTitle")}</title>
        <meta name="description" content={t("qna.metaDesc")} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary/5 py-12 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <MessageCircleQuestion className="w-4 h-4" />
                <span>{t("qna.askExpert")}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                {t("qna.title")}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("qna.desc")}
              </p>
              
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder={t("qna.searchPlaceholder")} 
                  className="pl-10 h-12 bg-background border-primary/20 focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t("qna.experts")}
              </h3>
              <div className="flex flex-col gap-3">
                {EXPERTS.slice(0, 3).map(exp => (
                  <div key={exp.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {exp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{exp.name}</div>
                      <div className="text-xs text-muted-foreground">{exp.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Button 
              className="w-full h-12 text-base font-semibold shadow-md"
              onClick={() => setIsAsking(!isAsking)}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {t("qna.askBtn")}
            </Button>

            <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
              <h3 className="font-medium flex items-center gap-2 mb-4 text-muted-foreground uppercase text-xs tracking-wider">
                <Filter className="w-4 h-4" />
                {t("qna.topicFilters")}
              </h3>
              <div className="flex flex-col gap-1">
                {TOPICS.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setActiveTopic(topic)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTopic === topic 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {t(`qna.topics.${topic}`, topic)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
              <h3 className="font-medium mb-4 text-muted-foreground uppercase text-xs tracking-wider">{t("qna.popularExperts")}</h3>
              <div className="space-y-4">
                {EXPERTS.map(expert => (
                  <div key={expert.id} className="flex flex-col gap-1">
                    <div className="text-sm font-semibold">{expert.name}</div>
                    <div className="text-xs text-muted-foreground">{expert.role}</div>
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    <div className="text-sm font-medium mt-1 flex items-center text-amber-500">
                      ★ {expert.rating} <span className="text-muted-foreground ml-1">({expert.answers} {t("qna.answers")})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Ask Question Form */}
            {isAsking && (
              <div className="bg-card border border-primary/30 rounded-2xl p-6 mb-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <h2 className="text-xl font-bold mb-4">{t("qna.askExpertTitle")}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("qna.askDesc")}
                </p>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Göndərildi"); setIsAsking(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("qna.nameLabel")}</label>
                      <Input autoComplete="name" placeholder={t("qna.namePlaceholder")} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("qna.categoryLabel")}</label>
                      <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        {TOPICS.slice(1).map(tOpt => <option key={tOpt} value={tOpt}>{t(`qna.topics.${tOpt}`, tOpt)}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("qna.emailLabel")}</label>
                      <Input type="email" autoComplete="email" placeholder={t("qna.emailPlaceholder")} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("qna.phoneLabel")}</label>
                      <Input type="tel" autoComplete="tel" placeholder={t("qna.phonePlaceholder")} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("qna.questionLabel")}</label>
                    <Textarea placeholder={t("qna.questionPlaceholder")} className="min-h-[120px]" required />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="anonymous" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                    <label htmlFor="anonymous" className="text-sm text-muted-foreground cursor-pointer">{t("qna.anonymousLabel")}</label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button variant="outline" type="button" onClick={() => setIsAsking(false)}>{t("qna.cancel")}</Button>
                    <Button type="submit">{t("qna.submit")}</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display">
                {activeTopic === "Bütün Mövzular" ? t("qna.popularQuestions") : t("qna.questionsFor", { topic: t(`qna.topics.${activeTopic}`, activeTopic) })}
              </h2>
              <span className="text-sm text-muted-foreground">{t("qna.resultsCount", { count: filteredQuestions.length })}</span>
            </div>

            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map(q => (
                  <div key={q.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors shadow-sm group cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                        {t(`qna.topics.${q.topic}`, q.topic)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                        👁 {q.views} {t("qna.views")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                      {q.q}
                    </h3>
                    <div className="bg-muted/50 rounded-lg p-4 relative">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-foreground/90 leading-relaxed mb-2">
                            {q.a}
                          </p>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                            {t("qna.answeredBy")} <span className="text-primary">{q.expert}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
                  <MessageCircleQuestion className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-lg font-medium">{t("qna.noQuestions")}</p>
                  <p className="text-muted-foreground text-sm mt-1">{t("qna.noQuestionsDesc")}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
