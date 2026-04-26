import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, CheckCircle2, AlertCircle, Car, ShieldCheck, Clock, Check, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/i18n/locale-routing";

import { BoktProductCard } from "@/components/site/BoktProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

import { useBoktProducts, useBokts } from "@/hooks/use-finance-api";

const PtsCredit = () => {
  const { t } = useTranslation();
  const getPath = useLocalePath();
  const { toast } = useToast();

  const { data: boktProducts = [], isLoading: productsLoading } = useBoktProducts();
  const { isLoading: boktsLoading } = useBokts();

  const [selectedBokts, setSelectedBokts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const ptsProducts = boktProducts.filter((p) => p.type === "pts");
  const topPicks = ptsProducts.slice(0, 4);
  const moreOffers = ptsProducts.slice(4, 12);

  const totalPages = Math.ceil(ptsProducts.length / itemsPerPage);
  const currentProducts = ptsProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectBokt = (boktId: string) => {
    setSelectedBokts((prev) =>
      prev.includes(boktId)
        ? prev.filter((id) => id !== boktId)
        : [...prev, boktId]
    );
  };

  const handleApply = () => {
    if (selectedBokts.length === 0) {
      toast({
        title: t("ptsCredit.error"),
        description: t("ptsCredit.selectAtLeastOne"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("ptsCredit.applySuccess"),
      description: t("ptsCredit.applySuccessDesc", { count: selectedBokts.length }),
    });
    setSelectedBokts([]);
  };

  const isLoading = productsLoading || boktsLoading;

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <title>{t("nav.items.ptsCredit")} | Pultap</title>
        <meta
          name="description"
          content={t("nav.items.ptsCreditDesc")}
        />
      </Helmet>

      <div className="flex-grow font-sans bg-background">
        {/* 1. Hero Banner */}
        <section className="bg-gradient-hero text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center text-sm mb-6 text-green-100">
              <Link to={getPath("/")} className="hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to={getPath("/bokt-kredit")} className="hover:text-white transition-colors">
                {t("nav.items.allBokt")}
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-white font-medium">{t("nav.items.ptsCredit")}</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {t("ptsCredit.title")}
              </h1>
              <p className="text-lg sm:text-xl text-green-50 mb-8 max-w-2xl">
                {t("ptsCredit.desc")}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center border border-white/20">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-100">{t("ptsCredit.maxAmount")}</div>
                    <div className="font-bold">{t("ptsCredit.upto80k")}</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center border border-white/20">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-100">{t("ptsCredit.duration")}</div>
                    <div className="font-bold">{t("ptsCredit.upto36m")}</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center border border-white/20">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-100">{t("ptsCredit.processing")}</div>
                    <div className="font-bold">{t("ptsCredit.within24h")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured (Top Picks) Block */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                <Car className="w-6 h-6 mr-2 text-primary" />
                {t("ptsCredit.bestOffers")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {t("ptsCredit.bestOffersDesc")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topPicks.map((product) => (
                <BoktProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Multi-apply Block */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-card border border-border flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t("ptsCredit.multiApply")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("ptsCredit.multiApplyDesc")}
                </p>
                <div className="space-y-3">
                  {topPicks.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
                      <Checkbox
                        id={`apply-${product.id}`}
                        checked={selectedBokts.includes(product.id)}
                        onCheckedChange={() => handleSelectBokt(product.id)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <label
                        htmlFor={`apply-${product.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                      >
                        {product.name}
                      </label>
                      <span className="text-sm font-bold text-primary">
                        {product.rate}{t("ptsCredit.fromPercent")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary rounded-2xl p-6 text-primary-foreground w-full md:w-80 text-center flex flex-col justify-center shadow-lg">
                <div className="text-4xl font-bold mb-2">
                  {selectedBokts.length}
                </div>
                <div className="text-green-100 mb-6">
                  {t("ptsCredit.orgsSelected")}
                </div>
                <Button 
                  onClick={handleApply}
                  variant="secondary" 
                  size="lg" 
                  className="w-full font-bold text-green-700 hover:bg-white bg-white/90"
                >
                  {t("ptsCredit.apply")}
                </Button>
                <p className="text-xs text-primary-foreground/80 mt-4">
                  {t("ptsCredit.applyNote")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Expanded List */}
        {moreOffers.length > 0 && (
          <section className="py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">{t("ptsCredit.moreOffers")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {moreOffers.map((product) => (
                  <BoktProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Engagement Banner */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("ptsCredit.decisionIn5")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {t("ptsCredit.decisionDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm">{t("ptsCredit.minDocs")}</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm">{t("ptsCredit.carStays")}</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm">{t("ptsCredit.highApproval")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Full Listing */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold text-foreground">{t("ptsCredit.allPtsCredits")}</h2>
              <div className="flex bg-card rounded-full p-1 shadow-sm border border-border self-start md:self-auto overflow-x-auto max-w-full hide-scrollbar">
                <Link to={getPath("/bokt-kredit")} className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                  {t("nav.items.allBokt")}
                </Link>
                <Link to={getPath("/bokt-kredit/nagd-pul")} className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                  {t("nav.items.boktCash")}
                </Link>
                <Link to={getPath("/bokt-kredit/lombard")} className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                  {t("nav.items.lombard")}
                </Link>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary shadow-sm cursor-default whitespace-nowrap">
                  {t("nav.items.ptsCredit")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product) => (
                <BoktProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PtsCredit;
