import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { ShieldCheck, User, Lock, Chrome } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocalePath } from "@/i18n/locale-routing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";

export const Login = () => {
  const navigate = useNavigate();
  const lp = useLocalePath();
  const { t } = useTranslation();
  const loginUser = useAuthStore((state) => state.loginUser);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error(t("auth.invalidCredentials") || "Email və ya şifrə yanlışdır");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error(t("auth.emailNotConfirmed") || "Email-iniz təsdiqlənməyib");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        const meta = data.user.user_metadata;
        loginUser({
          id: data.user.id,
          name: meta?.full_name || meta?.name || data.user.email?.split("@")[0] || "İstifadəçi",
          email: data.user.email || "",
          avatar: meta?.avatar_url,
        });
        toast.success(t("auth.loginSuccess"));
        navigate(lp("/"));
      }
    } catch {
      toast.error(t("auth.loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${lp("/")}`,
        },
      });
      if (error) {
        toast.error(error.message);
        setIsGoogleLoading(false);
      }
      // On success, browser redirects — no further action needed here
    } catch {
      toast.error(t("auth.googleLoginFail"));
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{t("auth.loginPageTitle")}</title>
      </Helmet>
      
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-8 text-center border-b border-border bg-gradient-to-b from-muted/50 to-card">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t("auth.welcomeTitle")}</h2>
          <p className="text-sm text-muted-foreground mt-2">{t("auth.loginDesc")}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("auth.emailOrPhone")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    required 
                    type="text"
                    autoComplete="username"
                    className="pl-9 h-11"
                    placeholder={t("auth.emailOrPhonePlaceholder")}
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t("auth.password")}</label>
                  <a href="#" className="text-xs text-primary hover:underline">{t("auth.forgotPassword")}</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    required 
                    autoComplete="current-password"
                    className="pl-9 h-11"
                    placeholder={t("auth.passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-medium">
              {isLoading ? t("auth.loggingIn") : t("auth.loginBtn")}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t("auth.orWithGoogle")}</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-2"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              <Chrome className="h-5 w-5" />
              {isGoogleLoading ? t("auth.loggingIn") : t("auth.continueWithGoogle") || "Google ilə davam et"}
            </Button>

            <div className="text-center text-sm text-muted-foreground pt-2">
              {t("auth.noAccount")}{" "}
              <Link to={lp("/qeydiyyat")} className="text-primary hover:underline font-medium">
                {t("auth.registerLink")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
