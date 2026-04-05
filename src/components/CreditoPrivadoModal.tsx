import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Banknote, TrendingUp, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreditoPrivadoModal({ open, onOpenChange }: Props) {
  const { t } = useLanguage();

  const highlights = [
    { icon: Banknote, key: "cp.h1" },
    { icon: Building2, key: "cp.h2" },
    { icon: TrendingUp, key: "cp.h3" },
    { icon: CheckCircle, key: "cp.h4" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-primary">{t("cp.title")}</DialogTitle>
          <p className="text-sm text-muted-foreground">{t("cp.subtitle")}</p>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <p className="text-sm text-foreground/80 leading-relaxed">{t("cp.desc")}</p>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map(({ icon: Icon, key }) => (
              <div key={key} className="border border-border rounded-xl p-4 bg-muted/30">
                <Icon className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">{t(key)}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
