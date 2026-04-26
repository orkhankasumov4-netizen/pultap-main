import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { ShieldCheck, User, Mail, Phone, Lock, Chrome } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocalePath } from "@/i18n/locale-routing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";

export const Register = () => {
  const navigate = useNavigate();
  const lp = useLocalePath();
  const { t } = useTranslation();
  const loginUser = useAuthStore((state) => state.loginUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error(t("auth.fillRequiredFields"));
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
          },
          emailRedirectTo: `${window.location.origin}${lp("/")}`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error(t("auth.emailAlreadyExists") || "Bu email artıq qeydiyyatdan keçib");
        } else if (error.message.includes("Password should be")) {
          toast.error(t("auth.passwordTooShort") || "Şifrə minimum 6 simvol olmalıdır");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        loginUser({
          id: data.user.id,
          name: formData.name,
          email: formData.email,
        });
        toast.success(t("auth.registerSuccess"));
        navigate(lp("/"));
      }
    } catch {
      toast.error(t("auth.loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
    } catch {
      toast.error(t("auth.googleRegisterFail"));
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{t("auth.registerPageTitle")}</title>
      </Helmet>
      
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-8 text-center border-b border-border bg-gradient-to-b from-muted/50 to-card">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t("auth.registerTitle")}</h2>
          <p className="text-sm text-muted-foreground mt-2">{t("auth.registerDesc1")}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("auth.fullName")} <span className="text-destructive">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    required 
                    autoComplete="name"
                    className="pl-9 h-11"
                    placeholder={t("auth.fullNamePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("auth.emailOptional") || "Email"} <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email"
                    required
                    autoComplete="email"
                    className="pl-9 h-11"
                    placeholder="adiniz@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("auth.phoneLabel")}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="tel"
                    autoComplete="tel"
                    className="pl-9 h-11"
                    placeholder="+994 (XX) XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("auth.passwordRequired")} <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    required 
                    autoComplete="new-password"
                    className="pl-9 h-11"
                    placeholder={t("auth.passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-medium">
              {isLoading ? t("auth.wait") : t("auth.registerBtn")}
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
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading}
            >
              <Chrome className="h-5 w-5" />
              {isGoogleLoading ? t("auth.wait") : t("auth.signUpWithGoogle") || "Google ilə qeydiyyat"}
            </Button>

            <div className="text-center text-sm text-muted-foreground pt-2">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link to={lp("/giris")} className="text-primary hover:underline font-medium">
                {t("auth.loginInsteadLink")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
