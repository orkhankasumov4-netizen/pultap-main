import { ReactNode, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Search,
  Star,
  MapPin,
  Phone,
  Globe,
  Building2,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { institutions, Institution } from "@/data/finance";
import { useLocalePath } from "@/i18n/locale-routing";

type Sort = "rating-desc" | "name-asc" | "branches-desc" | "established-asc";

type Props = {
  type: Institution["type"];
  title: string;
  description: string;
  breadcrumbLabel: string;
  intro?: ReactNode;
};

export const InstitutionsList = ({ type, title, description, breadcrumbLabel, intro }: Props) => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("rating-desc");

  const list = useMemo(() => {
    let l = institutions.filter((i) => i.type === type);
    if (search) l = l.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    l = [...l].sort((a, b) => {
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "branches-desc") return b.branches - a.branches;
      return a.established - b.established;
    });
    return l;
  }, [type, search, sort]);

  const totals = useMemo(() => {
    const all = institutions.filter((i) => i.type === type);
    return {
      count: all.length,
      branches: all.reduce((s, i) => s + i.branches, 0),
      atms: all.reduce((s, i) => s + (i.atms ?? 0), 0),
      avgRating: (all.reduce((s, i) => s + i.rating, 0) / all.length).toFixed(1),
    };
  }, [type]);

  const Icon = type === "bank" ? Building2 : Banknote;

  return (
    <>
      <Helmet>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <title>{title} | Pultap.az</title>
        <meta name="description" content={description} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{breadcrumbLabel}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{description}</p>
        </div>
      </section>

      <section className="container py-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <Stat icon={Icon} label={type === "bank" ? t("institutions.stats.bank") : t("institutions.stats.bokt")} value={String(totals.count)} />
          <Stat icon={MapPin} label={t("institutions.stats.branches")} value={String(totals.branches)} />
          {type === "bank" && <Stat icon={Banknote} label={t("institutions.stats.atms")} value={String(totals.atms)} />}
          <Stat icon={Star} label={t("institutions.stats.avgRating")} value={totals.avgRating} accent />
        </div>

        {intro}

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={type === "bank" ? t("lists.searchPlaceholder.bank") : t("lists.searchPlaceholder.boktInst")}
              className="pl-9 h-11"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger className="h-11 sm:w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">{t("lists.sort.ratingDesc")}</SelectItem>
              <SelectItem value="name-asc">{t("lists.sort.nameAsc")}</SelectItem>
              <SelectItem value="branches-desc">{t("lists.sort.branchesDesc")}</SelectItem>
              <SelectItem value="established-asc">{t("lists.sort.establishedAsc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* List */}
        <div className="grid sm:grid-cols-2 gap-4">
          {list.map((inst) => (
            <article
              key={inst.id}
              className="group bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="h-14 w-14 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-sm"
                  style={{ background: inst.logoColor, fontSize: 18 }}
                >
                  {inst.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{inst.name}</h3>
                    <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/20 shrink-0">
                      <Star className="h-3 w-3 fill-success mr-0.5" />
                      {inst.rating}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{inst.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Mini label={t("institutions.mini.established")} value={String(inst.established)} />
                <Mini label={t("institutions.mini.branches")} value={String(inst.branches)} />
                <Mini label={type === "bank" ? t("institutions.mini.atms") : t("institutions.mini.reviews")} value={type === "bank" ? String(inst.atms) : String(inst.reviews)} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> {inst.website}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {inst.phone}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button asChild variant="outline" size="sm" className="rounded-full flex-1">
                  <Link to={type === "bank" ? lp("/kreditler") : lp("/bokt-kredit")}>
                    {t("institutions.viewProducts")}
                  </Link>
                </Button>
                <Button asChild size="sm" className="rounded-full bg-gradient-primary hover:opacity-90">
                  <Link to={lp(type === "bank" ? `/banks/${inst.id}` : `/bokt/${inst.id}`)}>
                    {t("institutions.details")} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="bg-card border border-border rounded-2xl p-10 text-center">
            <p className="text-sm text-muted-foreground">{t("common.noResults")}</p>
          </div>
        )}
      </section>
    </>
  );
};

const Stat = ({
  icon: Icon, label, value, accent,
}: { icon: typeof Star; label: string; value: string; accent?: boolean }) => (
  <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
    <Icon className={`h-5 w-5 mb-2 ${accent ? "text-accent" : "text-primary"}`} />
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`mt-0.5 text-xl font-bold ${accent ? "text-accent" : ""}`}>{value}</div>
  </div>
);

const Mini = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted rounded-lg p-2.5">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="text-sm font-semibold">{value}</div>
  </div>
);
