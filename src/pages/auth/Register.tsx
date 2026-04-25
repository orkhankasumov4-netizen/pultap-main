import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/store/auth-store";
import { ShieldCheck, User, Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocalePath } from "@/i18n/locale-routing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const navigate = useNavigate();
  const lp = useLocalePath();
  const { t } = useTranslation();
  const loginUser = useAuthStore((state) => state.loginUser);

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.password) {
      toast.error(t("auth.fillRequiredFields"));
      return;
    }
    
    setIsLoading(true);
    // Simulating API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast.info(t("auth.testOtpSent", { phone: formData.phone }), {
        duration: 10000,
      });
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp !== "123456") {
      toast.error(t("auth.invalidOtp"));
      return;
    }

    setIsLoading(true);
    // Simulating final registration API
    setTimeout(() => {
      loginUser({
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email || formData.phone,
      });
      toast.success(t("auth.registerSuccess"));
      navigate(lp("/"));
    }, 1000);
  };

  const handleGoogleSuccess = (credentialResponse: { credential: string }) => {
    try {
      const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      loginUser({
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture
      });
      toast.success(t("auth.loginSuccess"));
      navigate(lp("/"));
    } catch (e) {
      toast.error(t("auth.loginError"));
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
          <p className="text-sm text-muted-foreground mt-2">
            {step === 1 ? t("auth.registerDesc1") : t("auth.registerDesc2")}
          </p>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("auth.fullName")}</label>
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
                  <label className="text-sm font-medium">{t("auth.phoneLabel")}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      required 
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
                  <label className="text-sm font-medium">{t("auth.emailOptional")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="email"
                      autoComplete="email"
                      className="pl-9 h-11"
                       
                      placeholder="adiniz@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("auth.passwordRequired")}</label>
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

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error(t("auth.googleRegisterFail"))}
                  useOneTap
                  theme="outline"
                  text="signup_with"
                  width="300"
                />
              </div>

              <div className="text-center text-sm text-muted-foreground pt-2">
                {t("auth.alreadyHaveAccount")}{" "}
                <Link to={lp("/giris")} className="text-primary hover:underline font-medium">
                  {t("auth.loginInsteadLink")}
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center text-sm mb-6">
                <p><strong>{formData.phone}</strong> {t("auth.otpSentMsg")}</p>
              </div>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-14 text-lg" />
                    <InputOTPSlot index={1} className="w-12 h-14 text-lg" />
                    <InputOTPSlot index={2} className="w-12 h-14 text-lg" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-12 h-14 text-lg" />
                    <InputOTPSlot index={4} className="w-12 h-14 text-lg" />
                    <InputOTPSlot index={5} className="w-12 h-14 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button type="submit" disabled={isLoading || otp.length < 6} className="w-full h-11 text-base font-medium mt-6">
                {isLoading ? t("auth.verifying") : t("auth.verifyAndContinue")}
              </Button>

              <div className="text-center pt-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> {t("auth.goBackToChangePhone")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
