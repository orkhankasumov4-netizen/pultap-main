import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApplicationDialogProps {
  trigger: React.ReactNode;
  productName: string;
  productType: string;
}

export function ApplicationDialog({ trigger, productName, productType }: ApplicationDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const full_name = fd.get("full_name") as string;
    const phone = fd.get("phone") as string;
    const fin_code = fd.get("fin_code") as string;
    const amount = fd.get("amount") as string;

    if (!full_name || !phone) {
      toast.error(t("application.form.toast.fillRequired") || "Ad və nömrə mütləqdir");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://pultap.duckdns.org/api/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name,
          phone,
          fin_code,
          amount: amount ? Number(amount) : null,
          credit_type: `${productType}: ${productName}`,
        }),
      });

      if (!response.ok) {
        throw new Error("API xətası");
      }

      toast.success(t("application.form.toast.success") || "Müraciətiniz uğurla qəbul edildi!");
      setOpen(false);
    } catch (error) {
      console.error("Lead submission error:", error);
      toast.error(t("application.form.toast.error") || "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("application.form.title") || "Müraciət Formu"}</DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-primary">{productName}</span> {t("application.form.desc") || "üçün müraciət edirsiniz. Zəhmət olmasa məlumatlarınızı daxil edin."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">{t("application.form.fields.name.label") || "Ad, Soyad"} <span className="text-destructive">*</span></Label>
            <Input id="full_name" name="full_name" placeholder="Ad və soyadınızı daxil edin" required className="bg-muted/50" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{t("application.form.fields.phone.label") || "Mobil Nömrə"} <span className="text-destructive">*</span></Label>
            <Input id="phone" name="phone" type="tel" placeholder="050 000 00 00" required className="bg-muted/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fin_code">{t("application.form.fields.fin.label") || "FİN Kod"}</Label>
            <Input id="fin_code" name="fin_code" placeholder="FİN kodunuzu daxil edin" className="bg-muted/50 uppercase" maxLength={7} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">{t("application.form.fields.amount.label") || "İstədiyiniz məbləğ (₼)"}</Label>
            <Input id="amount" name="amount" type="number" placeholder="1000" className="bg-muted/50" />
          </div>
          
          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-primary rounded-xl text-md font-medium">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>{t("common.apply")} <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
