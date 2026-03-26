import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const teamMembers = [
  { id: "m1", nameKey: "team.m1.name", roleKey: "team.m1.role", bioKey: "team.m1.bio", photo: "" },
  { id: "m2", nameKey: "team.m2.name", roleKey: "team.m2.role", bioKey: "team.m2.bio", photo: "" },
  { id: "m3", nameKey: "team.m3.name", roleKey: "team.m3.role", bioKey: "team.m3.bio", photo: "" },
  { id: "m4", nameKey: "team.m4.name", roleKey: "team.m4.role", bioKey: "team.m4.bio", photo: "" },
  { id: "m5", nameKey: "team.m5.name", roleKey: "team.m5.role", bioKey: "team.m5.bio", photo: "" },
  { id: "m6", nameKey: "team.m6.name", roleKey: "team.m6.role", bioKey: "team.m6.bio", photo: "" },
];

export function TeamSection() {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const selected = teamMembers.find((m) => m.id === selectedMember);

  return (
    <section
      id="nuestro-equipo"
      className="snap-start min-h-screen flex items-center py-24 bg-background"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
          {t("team.title")}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          {t("team.subtitle")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member, i) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member.id)}
              className="group border border-border rounded-xl p-6 md:p-8 hover:bg-muted/50 transition-all duration-300 cursor-pointer text-center active:scale-95"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Avatar className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                {member.photo && <AvatarImage src={member.photo} alt={t(member.nameKey)} />}
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg md:text-xl">
                  {t(member.nameKey).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h4 className="font-bold text-foreground text-sm md:text-base">{t(member.nameKey)}</h4>
              <p className="text-xs md:text-sm text-muted-foreground/70 mt-1">{t(member.roleKey)}</p>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedMember} onOpenChange={(v) => !v && setSelectedMember(null)}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)]">
          {selected && (
            <div className="flex flex-col items-center text-center pt-2">
              <Avatar className="w-24 h-24 mb-4">
                {selected.photo && <AvatarImage src={selected.photo} alt={t(selected.nameKey)} />}
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                  {t(selected.nameKey).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-foreground">{t(selected.nameKey)}</h3>
              <p className="text-sm text-muted-foreground/60 mb-4">{t(selected.roleKey)}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(selected.bioKey)}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
