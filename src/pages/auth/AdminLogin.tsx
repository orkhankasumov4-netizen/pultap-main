/* eslint-disable i18next/no-literal-string */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Lock, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginAdmin = useAuthStore((state) => state.loginAdmin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Supabase vasitəsilə təhlükəsiz giriş yoxlanışı
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("E-poçt və ya şifrə yanlışdır.");
        return;
      }

      // 2. Təhlükəsizlik üçün yalnız xüsusi admin e-poçtuna icazə veririk
      // (VITE_ADMIN_EMAIL .env faylında qeyd edilə bilər, edilməsə admin@pultap.az sayılır)
      const allowedAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@pultap.az";
      
      if (data.user?.email !== allowedAdminEmail && allowedAdminEmail !== "*") {
        await supabase.auth.signOut();
        toast.error("Bu hesabın admin panelinə giriş hüququ yoxdur.");
        return;
      }

      // 3. Hər şey qaydasındadırsa Admin kimi daxil ol
      loginAdmin();
      toast.success("Admin panelinə uğurla daxil oldunuz");
      navigate("/admin");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Sistemə giriş zamanı xəta baş verdi.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Helmet>
        <title>Admin Giriş | Pultap.az</title>
      </Helmet>
      
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-8 text-center border-b border-border bg-muted/10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-primary">Pultap Admin</h1>
          <p className="text-sm text-muted-foreground mt-2">Sistemə daxil olmaq üçün məlumatları daxil edin</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin E-poçt</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  required 
                  autoComplete="username"
                  className="pl-9 h-11"
                  placeholder="admin@pultap.az"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Şifrə</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  required 
                  autoComplete="current-password"
                  className="pl-9 h-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full h-11 bg-primary hover:bg-primary-hover font-semibold">
              {isLoading ? "Yoxlanılır..." : "Sistemə daxil ol"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
