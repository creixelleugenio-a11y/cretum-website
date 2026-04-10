import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import officeImg from "@/assets/office-interior.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const directivos = [
  { id: "d1", nameKey: "team.d1.name", roleKey: "team.d1.role", bioKey: "team.d1.bio", photo: "/team/d1.jpg" },
  { id: "d2", nameKey: "team.d2.name", roleKey: "team.d2.role", bioKey: "team.d2.bio", photo: "/team/d2.jpg" },
  { id: "o1", nameKey: "team.o1.name", roleKey: "team.o1.role", bioKey: "team.o1.bio", photo: "/team/o1.jpg" },
];

const operativo = [
  { id: "d3", nameKey: "team.d3.name", roleKey: "team.d3.role", bioKey: "team.d3.bio", photo: "/team/d3.jpg" },
  { id: "o2", nameKey: "team.o2.name", roleKey: "team.o2.role", bioKey: null, photo: "/team/o2.jpg" },
  { id: "o3", nameKey: "team.o3.name", roleKey: "team.o3.role", bioKey: null, photo: "/team/o3.jpg" },
  { id: "o4", nameKey: "team.o4.name", roleKey: "team.o4.role", bioKey: null, photo: "/team/o4.jpg" },
  { id: "o5", nameKey: "team.o5.name", roleKey: "team.o5.role", bioKey: null, photo: "/team/o5.jpg" },
  { id: "o6", nameKey: "team.o6.name", roleKey: "team.o6.role", bioKey: null, photo: "/team/o6.jpg" },
  { id: "o7", nameKey: "team.o7.name", roleKey: "team.o7.role", bioKey: "team.o7.bio", photo: "/team/o7.jpg" },
  { id: "o8", nameKey: "team.o8.name", roleKey: "team.o8.role", bioKey: null, photo: "" },
];

const consejeros = [
  { id: "c1", nameKey: "team.c1.name", roleKey: "team.c1.role", bioKey: "team.c1.bio", photo: "/team/c1.jpg" },
  { id: "c2", nameKey: "team.c2.name", roleKey: "team.c2.role", bioKey: "team.c2.bio", photo: "/team/c2.jpg" },
  { id: "c3", nameKey: "team.c3.name", roleKey: "team.c3.role", bioKey: "team.c3.bio", photo: "/team/c3.jpg" },
  { id: "c4", nameKey: "team.c4.name", roleKey: "team.c4.role", bioKey: "team.c4.bio", photo: "/team/c4.jpg" },
];

type Member = { id: string; nameKey: string; roleKey: string; bioKey: string | null; photo: string };

function MemberCard({ member, onClick }: { member: Member; onClick: () => void }) {
  const { t } = useLanguage();
  const initials = t(member.nameKey).split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <button
      onClick={onClick}
      className="group border border-border rounded-xl p-5 md:p-6 hover:bg-muted/50 transition-all duration-300 cursor-pointer text-center active:scale-95 w-full h-full flex flex-col items-center justify-center"
    >
      <Avatar className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
        <AvatarImage src={member.photo} alt={t(member.nameKey)} className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary font-bold text-base md:text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      <h4 className="font-bold text-foreground text-sm md:text-base">{t(member.nameKey)}</h4>
      <p className="text-xs text-muted-foreground/70 mt-1">{t(member.roleKey)}</p>
    </button>
  );
}

export function TeamSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Member | null>(null);

  return (
    <section id="nuestro-equipo" className="min-h-screen pt-56 pb-44 bg-background relative overflow-hidden">
      <div className="hidden lg:block absolute right-0 top-0 w-[28%] h-full pointer-events-none select-none">
        <img src={officeImg} alt="" className="w-full h-full object-cover object-center grayscale opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background" />
      </div>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">{t("team.title")}</h2>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="text-muted-foreground mb-14 max-w-xl">{t("team.subtitle")}</p>
        </Reveal>

        {/* Equipo Directivo */}
        <div className="mb-12">
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("team.directivos")}</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {directivos.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.32}>
                <MemberCard member={m} onClick={() => setSelected(m)} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Equipo Operativo */}
        <div className="mb-12">
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("team.operativo")}</h3>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
            {operativo.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.32} className="h-full">
                <MemberCard member={m} onClick={() => setSelected(m)} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Consejeros Independientes */}
        <div>
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("team.consejeros")}</h3>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {consejeros.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.32}>
                <MemberCard member={m} onClick={() => setSelected(m)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)]">
          {selected && (
            <div className="flex flex-col items-center text-center pt-2">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={selected.photo} alt={t(selected.nameKey)} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                  {t(selected.nameKey).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-foreground">{t(selected.nameKey)}</h3>
              <p className="text-sm text-primary/80 mb-4">{t(selected.roleKey)}</p>
              {selected.bioKey && (
                <p className="text-sm text-muted-foreground leading-relaxed">{t(selected.bioKey)}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
