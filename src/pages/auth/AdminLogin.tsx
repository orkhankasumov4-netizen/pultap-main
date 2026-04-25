/* eslint-disable i18next/no-literal-string */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Lock, User } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginAdmin = useAuthStore((state) => state.loginAdmin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME || "admin";
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || "Admin123";

    if (username === expectedUsername && password === expectedPassword) {
      loginAdmin();
      navigate("/admin");
    } else {
      setError("İstifadəçi adı və ya şifrə yalnışdır.");
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
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6 border border-destructive/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">İstifadəçi adı</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  required 
                  autoComplete="username"
                  className="pl-9 h-11"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
            
            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary-hover font-semibold">
              Sistemə daxil ol
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
