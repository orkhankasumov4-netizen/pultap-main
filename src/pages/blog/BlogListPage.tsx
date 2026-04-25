import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Clock, ArrowRight, Tag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/finance";
import { useLocalePath } from "@/i18n/locale-routing";

const categories = [...new Set(blogPosts.map((p) => p.category))];

export default function BlogListPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = blogPosts;
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  return (
    <>
      <Helmet>
        <title>{t("blog.pageTitle", { defaultValue: "Bloq | Pultap.az" })}</title>
        <meta
          name="description"
          content={t("blog.pageDesc", {
            defaultValue:
              "Maliyyə dünyasından ən son məqalələr, kredit məsləhətləri və depozit təhlilləri.",
          })}
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("blog.crumb", { defaultValue: "Bloq" })}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            {t("blog.title", { defaultValue: "Bloq" })}
          </h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">
            {t("blog.subtitle", {
              defaultValue:
                "Maliyyə dünyasından ən son məqalələr, kredit məsləhətləri və depozit təhlilləri.",
            })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8 md:py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("blog.searchPlaceholder", { defaultValue: "Məqalə axtar..." })}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("common.all", { defaultValue: "Hamısı" })}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          {t("blog.results", { defaultValue: "məqalə tapıldı" })}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={lp(`/bloq/${post.slug}`)}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img loading="lazy"
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readMin} {t("blog.min", { defaultValue: "dəq" })}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("blog.readMore", { defaultValue: "Oxu" })}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>{t("blog.noResults", { defaultValue: "Heç bir məqalə tapılmadı." })}</p>
          </div>
        )}
      </section>
    </>
  );
}
