import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Clock, Tag, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/use-finance-api";
import { useLocalePath } from "@/i18n/locale-routing";

export default function BlogPostPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { slug } = useParams<{ slug: string }>();

  const { data: blogPosts = [], isLoading } = useBlogPosts();
  const post = blogPosts.find((p: Record<string, unknown>) => p.slug === slug);

  // Find related posts (same category, excluding current)
  const related = post ? blogPosts.filter(
    (p: Record<string, unknown>) => p.category === post.category && p.id !== post.id
  ) : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!post) return <Navigate to={lp("/bloq")} replace />;

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Pultap.az`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={lp("/bloq")} className="hover:text-primary-foreground">
              {t("blog.crumb", { defaultValue: "Bloq" })}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate max-w-[200px]">{post.title}</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-display font-bold tracking-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readMin} {t("blog.min", { defaultValue: "dəq" })}{" "}
              {t("blog.readTime", { defaultValue: "oxuma" })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Cover */}
          <div className="rounded-2xl overflow-hidden mb-8 shadow-card">
            <img loading="lazy"
              src={post.cover}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Article body */}
          <article className="prose prose-lg max-w-none">
            {post.body.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-foreground/85 leading-relaxed mb-4 text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Back button */}
          <div className="mt-10 pt-6 border-t border-border">
            <Link to={lp("/bloq")}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t("blog.backToList", { defaultValue: "Bütün məqalələr" })}
              </Button>
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-4">
                {t("blog.related", { defaultValue: "Oxşar məqalələr" })}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={lp(`/bloq/${r.slug}`)}
                    className="group flex gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-card transition-all"
                  >
                    <img loading="lazy"
                      src={r.cover}
                      alt={r.title}
                      className="h-20 w-28 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </h4>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {r.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
