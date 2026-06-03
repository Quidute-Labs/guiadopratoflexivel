import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Leaf,
  X,
  ShieldCheck,
  ChevronDown,
  Heart,
  BookOpen,
  Clock,
  Sparkles,
  Sprout,
  Coffee,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import logoMark from "@/assets/gpf-logo.png";
import hero from "@/assets/gpf-hero.jpg";
import bowlTop from "@/assets/gpf-bowl-top.png";
import ebook from "@/assets/gpf-ebook.png";
import bonus01 from "@/assets/gpf-bonus-1.png";
import bonus02 from "@/assets/gpf-bonus-2.png";
import bonus03 from "@/assets/gpf-bonus-3.png";
import creator from "@/assets/gpf-creator.jpg";
import garantiaImg from "@/assets/gpf-garantia.png";


import foodBroccoli from "@/assets/food-broccoli.png";
import foodTomato from "@/assets/food-tomato.png";
import foodBasil from "@/assets/food-basil.png";
import foodLime from "@/assets/food-lime.png";
import foodRice from "@/assets/food-rice.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guia do Prato Flexível — Comer melhor cabe na sua vida real" },
      {
        name: "description",
        content:
          "Aprenda a montar refeições equilibradas e possíveis no dia a dia, sem dieta rígida nem culpa. De R$ 97 por apenas R$ 37 à vista ou 4x de R$ 9,70.",
      },
      { property: "og:title", content: "Guia do Prato Flexível" },
      {
        property: "og:description",
        content:
          "Comer melhor sem transformar cada refeição em cobrança.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- shared ---------- */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

function PrimaryCTA({ children, href = "#oferta" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--fresh)] px-7 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <span>{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

/* ---------- top mark ---------- */

function TopMark() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container className="flex items-center justify-center pt-6">
        <img
          src={logoMark}
          alt="Guia do Prato Flexível"
          className="h-24 w-auto md:h-32"
        />
      </Container>
    </header>
  );
}

/* ---------- floating food parallax ---------- */

type FloatItem = {
  src: string;
  alt: string;
  className: string;
  depth?: number;
  rotate?: number;
  delay?: number;
};

function FloatingFood({
  items,
  containerRef,
}: {
  items: FloatItem[];
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {items.map((it, i) => (
        <ParallaxFood key={i} item={it} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function ParallaxFood({
  item,
  progress,
}: {
  item: FloatItem;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const depth = item.depth ?? 0.4;
  const travel = 140 * depth;
  const y = useTransform(progress, [0, 1], [-travel, travel]);
  const rotate = useTransform(progress, [0, 1], [
    (item.rotate ?? 0) - 12 * depth,
    (item.rotate ?? 0) + 12 * depth,
  ]);

  return (
    <motion.img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        delay: item.delay ?? 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)] ${item.className}`}
    />
  );
}

/* ---------- hero ---------- */

function Hero() {
  const heroRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.10 145 / 0.5), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <FloatingFood
        containerRef={heroRef}
        items={[
          { src: foodTomato, alt: "", className: "left-[3%] top-[18%] w-[90px] md:w-[130px]", depth: 0.6, rotate: -8 },
          { src: foodBasil, alt: "", className: "right-[4%] top-[12%] w-[100px] md:w-[150px]", depth: 0.45, rotate: 14, delay: 0.1 },
          { src: foodLime, alt: "", className: "right-[6%] bottom-[20%] w-[90px] md:w-[120px]", depth: 0.55, rotate: -18, delay: 0.05 },
          { src: foodBroccoli, alt: "", className: "hidden md:block left-[10%] top-[55%] w-[110px]", depth: 0.35, rotate: -6, delay: 0.2 },
        ]}
      />

      <Container className="relative z-10">
        <div className="fade-up mx-auto max-w-[880px] text-center">
          <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.28em] text-[var(--fresh)]">
            Guia do Prato Flexível
          </p>
          <h1 className="display display-tight text-balance text-[36px] sm:text-[48px] md:text-[64px]">
            Comer melhor cabe na sua vida real.
          </h1>

          <p className="mx-auto mt-7 max-w-[680px] text-pretty text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
            Você não precisa copiar a rotina alimentar perfeita de quem vive
            uma realidade completamente diferente da sua. Aprenda a montar
            refeições equilibradas, práticas e possíveis para o dia a dia —
            mantendo espaço para os alimentos que você gosta.
          </p>

          <ul className="mx-auto mt-10 grid max-w-[920px] gap-3 text-left sm:grid-cols-3">
            {[
              "Pare de travar na hora de montar o prato e tenha um caminho simples para organizar suas refeições.",
              "Saia da culpa depois de comer algo diferente e entenda como equilíbrio funciona na prática.",
              "Transforme uma alimentação “mais ou menos” em escolhas melhores, mesmo em semanas corridas.",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-2xl bg-surface-raised/80 px-4 py-3 text-[13.5px] leading-snug text-foreground/85 shadow-float backdrop-blur-sm"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--fresh)]" strokeWidth={2.25} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up mt-14 md:mt-20">
          <div className="relative mx-auto aspect-video max-w-[860px] overflow-hidden rounded-3xl shadow-float">
            <img
              src={hero}
              alt="Prato equilibrado com arroz, frango, brócolis e tomate"
              width={1600}
              height={900}
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="fade-up mt-12 flex flex-col items-center gap-6">
          <PrimaryCTA>Quero comer melhor na vida real</PrimaryCTA>
          <div className="flex items-center gap-6 text-[12.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-3.5 text-[var(--fresh)]" />
              7 dias de garantia incondicional
            </span>
            <span className="hidden h-3 w-px bg-hairline sm:block" />
            <span>De R$ 97 por apenas R$ 37 à vista ou 4x de R$ 9,70</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- anatomia do prato flexível ---------- */

function AnatomiaPrato() {
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.94 0.018 90)" }}
    >
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <FloatingFood
        containerRef={sectionRef}
        items={[
          { src: foodRice, alt: "", className: "right-[3%] top-[10%] w-[120px] md:w-[170px]", depth: 0.4, rotate: 12, delay: 0.1 },
          { src: foodBroccoli, alt: "", className: "right-[6%] bottom-[12%] w-[110px] md:w-[160px]", depth: 0.65, rotate: -8, delay: 0.15 },
          { src: foodTomato, alt: "", className: "left-[5%] bottom-[16%] w-[100px] md:w-[150px]", depth: 0.5, rotate: 18, delay: 0.2 },
          { src: foodBasil, alt: "", className: "hidden md:block left-[8%] top-[20%] w-[110px]", depth: 0.3, rotate: -22, delay: 0.25 },
          { src: foodLime, alt: "", className: "hidden md:block right-[20%] top-[55%] w-[90px]", depth: 0.35, rotate: 28, delay: 0.3 },
        ]}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="display display-tight text-balance text-[36px] md:text-[56px]">
            Um prato equilibrado não precisa ser um prato perfeito.
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
            O Prato Flexível é uma forma simples de olhar para a refeição e
            entender se ela tem o que ajuda na saciedade, na energia e na
            variedade — usando alimentos comuns, sem regra rígida.
          </p>
        </div>

        <div className="relative mx-auto mt-16 flex max-w-[640px] items-center justify-center">
          <div
            className="absolute inset-10 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.78 0.10 145 / 0.55), transparent 70%)",
            }}
          />
          <motion.img
            src={bowlTop}
            alt="Prato com arroz, frango, brócolis, cenoura e tomate"
            width={1024}
            height={1024}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] drop-shadow-[0_60px_60px_rgba(0,0,0,0.25)]"
          />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-[920px] grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Carboidrato", "energia para o dia"],
            ["Proteína", "saciedade e construção"],
            ["Vegetais", "fibras e variedade"],
            ["O que gosta", "sem culpa, com equilíbrio"],
          ].map(([n, l]) => (
            <div
              key={l as string}
              className="rounded-2xl bg-surface-raised/95 px-5 py-5 text-center shadow-float backdrop-blur-sm"
            >
              <div className="display text-[20px] md:text-[24px]">{n}</div>
              <div className="mt-1 text-[12px] uppercase tracking-wider text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- dor ---------- */

function Dor() {
  return (
    <section className="section-light hairline-t relative py-28 md:py-36">
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ember)]">
              A culpa do prato perfeito
            </p>
            <h2 className="display text-[34px] md:text-[52px]">
              A culpa não vem da comida, vem da comparação errada.
            </h2>
          </div>

          <div className="space-y-6 text-[16.5px] leading-[1.75] text-foreground/80 md:col-span-7 md:text-[17px]">
            <p>
              Você abre o celular e vê alguém montando marmitas perfeitas,
              fazendo compras organizadas, comendo limpo a semana inteira e
              falando sobre alimentação como se todo mundo tivesse tempo,
              dinheiro, energia e disposição para viver daquele jeito.
            </p>
            <p>
              Só que a sua vida não funciona assim. Você trabalha, estuda,
              chega cansado, come o que dá, improvisa no almoço e, quando
              percebe, vem aquela sensação de que falhou em algo que parecia
              básico.
            </p>
            <p className="text-foreground">
              O problema não é falta de força de vontade. É que você está
              tentando melhorar sua alimentação usando uma régua que não foi
              feita para a sua rotina. Comer melhor precisa começar por
              entender o que torna uma refeição equilibrada — e como adaptar
              isso ao seu dia.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- CTA intermediário ---------- */

/* ---------- CTA intermediário ---------- */

function CTAMid() {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36" style={{ backgroundColor: "oklch(0.96 0.015 95)" }}>
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-[34px] md:text-[52px]">
            Você não precisa esperar uma vida menos corrida para começar.
          </h2>
          <p className="mx-auto mt-7 max-w-[620px] text-[16.5px] leading-relaxed text-muted-foreground">
            A primeira mudança não precisa ser perfeita. Ela precisa ser
            possível. Quando você entende o que colocar no prato, comer melhor
            deixa de parecer um projeto distante e começa a caber na rotina
            que você já tem.
          </p>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA>Quero montar meu prato com mais leveza</PrimaryCTA>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- método ---------- */

const steps = [
  { n: "01", t: "Entender o que é se alimentar bem de verdade", d: "Por que alimentação saudável não é sinônimo de restrição, perfeição ou prato de influenciador." },
  { n: "02", t: "Aprender o básico da nutrição sem complicação", d: "Carboidratos, proteínas, gorduras, fibras, água e saciedade em linguagem direta." },
  { n: "03", t: "Montar o Prato Flexível", d: "Combinar alimentos comuns em refeições mais equilibradas, práticas e sustentáveis." },
  { n: "04", t: "Melhorar sua relação com a comida", d: "Sair da culpa, da comparação e da mentalidade de “já errei mesmo”." },
  { n: "05", t: "Adaptar a alimentação à rotina corrida", d: "Caminhos simples para comer melhor mesmo em dias cansativos ou com pouco tempo." },
  { n: "06", t: "Usar o Guia Alimentar Brasileiro na prática", d: "Aplicar orientações oficiais sem transformar isso em regra difícil de seguir." },
  { n: "07", t: "Incluir doces e comidas favoritas com tranquilidade", d: "Manter esses alimentos na rotina sem culpa e sem achar que estragou tudo." },
  { n: "08", t: "Saber quando buscar uma dieta personalizada", d: "Entender o momento em que um acompanhamento individual pode fazer sentido." },
];

function Metodo() {
  return (
    <section id="metodo" className="section-dark hairline-t relative py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ember)]">
            O método
          </p>
          <h2 className="display text-[34px] md:text-[54px]">
            O prato fica mais simples quando você entende a lógica.
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
            Em vez de decorar regras rígidas, você aprende a montar combinações
            que fazem sentido para o seu dia. Uma sequência de 8 passos para
            sair da confusão alimentar.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex gap-5 rounded-2xl bg-surface-raised/60 p-6 ring-1 ring-hairline transition-colors hover:bg-surface-raised/80"
            >
              <span className="font-mono text-[13px] tracking-[0.18em] text-[var(--ember)] shrink-0">
                {s.n}
              </span>
              <div>
                <h3 className="display text-[20px] md:text-[22px]">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- pra quem é ---------- */

function ParaQuem() {
  const yes = [
    "Você tem entre 18 e 30 anos e sente que sua alimentação poderia ser melhor, mas não sabe por onde começar.",
    "Você trabalha, estuda ou vive uma rotina corrida e precisa de orientações que caibam na vida real.",
    "Você se sente perdido com tantas informações diferentes sobre alimentação na internet.",
    "Você quer aprender a montar um prato equilibrado usando alimentos comuns.",
    "Você sente culpa quando come doce, lanche ou alguma comida que gosta.",
    "Você quer melhorar seus hábitos sem fazer da comida um motivo de ansiedade.",
  ];
  const no = [
    "Você procura uma dieta individualizada com quantidades calculadas para o seu corpo.",
    "Você quer um plano alimentar com foco em emagrecimento ou ganho de massa.",
    "Você busca uma lista rígida de alimentos proibidos e permitidos.",
    "Você espera uma promessa rápida de mudança corporal.",
    "Você precisa de acompanhamento nutricional específico por condição clínica.",
  ];

  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <h2 className="display mx-auto max-w-[820px] text-center text-[34px] md:text-[52px]">
          Este guia é para quem quer comer melhor sem transformar comida em cobrança.
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-[var(--fresh)]/10 via-surface/60 to-surface/30 p-8 md:p-10">
            <div className="text-[12px] tracking-[0.2em] text-[var(--fresh)] uppercase">É pra você se</div>
            <ul className="mt-6 space-y-4">
              {yes.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-[15.5px] leading-relaxed text-foreground/90"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--fresh)]/15 ring-1 ring-[var(--fresh)]/30">
                    <Leaf className="size-3.5 text-[var(--fresh)]" strokeWidth={2.25} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-muted/40 via-surface/40 to-surface/20 p-8 md:p-10">
            <div className="text-[12px] tracking-[0.2em] text-muted-foreground uppercase">
              Não é pra você se
            </div>
            <ul className="mt-6 space-y-4">
              {no.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-[15.5px] leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-muted-foreground/10 ring-1 ring-muted-foreground/20">
                    <X className="size-3.5 text-muted-foreground" strokeWidth={2.25} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[720px] text-center text-[14px] leading-relaxed text-muted-foreground">
          O guia não substitui uma consulta com nutricionista. Ele te ajuda a
          entender a base e chegar com mais clareza ao ponto em que uma dieta
          personalizada pode fazer sentido.
        </p>
      </Container>
    </section>
  );
}

/* ---------- entregáveis ---------- */

function Entregaveis() {
  return (
    <section className="hairline-t relative isolate overflow-hidden py-28 md:py-40" style={{ backgroundColor: "oklch(0.30 0.030 145)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[720px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.10 145 / 0.6), transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[oklch(0.85_0.10_55)]">
            O que você recebe
          </p>
          <h2 className="display text-[34px] text-white md:text-[54px]">
            Um material prático para começar a comer melhor com mais clareza.
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 blur-3xl">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ember)]/30" />
            </div>
            <img
              src={ebook}
              alt="Capa do Guia do Prato Flexível"
              width={928}
              height={1152}
              loading="lazy"
              className="relative w-full max-w-[340px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </div>

          <div>
            <h3 className="display text-[26px] text-white md:text-[34px]">
              Guia do Prato Flexível
            </h3>
            <p className="mt-3 text-[15px] text-white/75">
              E-book completo para aprender a montar refeições equilibradas com
              alimentos comuns, entender o básico da nutrição e aplicar
              escolhas melhores na rotina real.
            </p>
            <ul className="mt-6 space-y-2.5 text-[14.5px] text-white/85">
              {[
                "O que é se alimentar bem de verdade, sem terrorismo nutricional.",
                "Conceitos básicos de nutrição explicados de forma simples.",
                "Como montar um prato equilibrado sem depender de dieta rígida.",
                "Como melhorar sua relação com a comida.",
                "Como se alimentar melhor em uma rotina corrida.",
                "Como usar o Guia Alimentar Brasileiro no dia a dia.",
                "Como incluir doces e comidas favoritas com tranquilidade.",
                "Quando procurar uma dieta personalizada.",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--ember)]" strokeWidth={2.25} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- bônus ---------- */

function Bonus() {
  const bonuses = [
    {
      n: "01",
      title: "15 receitas práticas para o dia a dia",
      desc: "Ideias simples para variar as refeições sem depender de preparos difíceis ou ingredientes fora da realidade.",
      v: "R$ 37",
      img: bonus01,
    },
    {
      n: "02",
      title: "Guia “o que ter em casa”",
      desc: "Uma lista prática de alimentos coringas para facilitar refeições rápidas durante a semana.",
      v: "R$ 27",
      img: bonus02,
    },
    {
      n: "03",
      title: "SOS rotina corrida",
      desc: "Refeições de emergência para dias em que você chegou cansado, não cozinhou ou não sabe o que preparar.",
      v: "R$ 27",
      img: bonus03,
    },
  ];

  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ember)]">
            Bônus inclusos
          </p>
          <h2 className="display text-[34px] md:text-[52px]">
            Três apoios para reduzir o espaço entre “eu entendi” e “eu consegui fazer”.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {bonuses.map((b) => (
            <article
              key={b.n}
              className="flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-hairline"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[oklch(0.96_0.015_90)]">
                <img
                  src={b.img}
                  alt={b.title}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="font-mono text-[11px] tracking-[0.22em] text-[var(--ember)]">
                  BÔNUS {b.n}
                </div>
                <h3 className="display mt-5 text-[22px] leading-tight">{b.title}</h3>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">
                  {b.desc}
                </p>
                <div className="hairline-t mt-6 pt-4 font-mono text-[13px] text-foreground">
                  Valor de mercado: {b.v}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- criador ---------- */

/* ---------- criador ---------- */

function Criador() {
  return (
    <section className="section-dark hairline-t relative overflow-hidden py-28 md:py-36">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={creator}
                alt="Calebe Clayton, estudante de Nutrição"
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6">
                <div className="text-[18px] font-medium text-white">Calebe Clayton</div>
                <div className="mt-1 text-[12.5px] text-white/70">
                  Estudante de Nutrição
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ember)]">
              Quem criou
            </p>
            <h2 className="display text-[32px] md:text-[48px]">
              Criado por quem estuda nutrição e vive essa relação com a comida.
            </h2>

            <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted-foreground md:text-[16.5px]">
              <p>
                O Guia do Prato Flexível foi criado por <strong className="text-foreground">Calebe Clayton</strong>,
                estudante de Nutrição, com o objetivo de tornar a alimentação
                saudável mais simples, flexível e possível para jovens que
                querem melhorar seus hábitos, mas ainda se sentem perdidos com
                tanta informação.
              </p>
              <p>
                Desde pequeno, Calebe sempre gostou de cozinha, de experimentar
                alimentos diferentes e de preparar doces. Com o tempo,
                percebeu que esse gosto pela comida não precisava ser tratado
                como problema — era possível continuar comendo o que gostava
                enquanto aprendia a construir uma alimentação mais equilibrada.
              </p>
              <p>
                Esse olhar formou a ideia central do guia: alimentação
                saudável não precisa começar por restrição, culpa ou medo. Ela
                pode começar por entendimento, equilíbrio e escolhas mais
                conscientes no dia a dia.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- suporte ---------- */

function Suporte() {
  const items = [
    { icon: BookOpen, title: "Material autoexplicativo", desc: "Leia, entenda e aplique no seu ritmo, sem depender de acompanhamento individual para começar." },
    { icon: Sparkles, title: "Vídeos explicativos", desc: "Acompanhamento em vídeo mostrando como acessar o material e usar os conteúdos de apoio." },
    { icon: Heart, title: "Suporte por WhatsApp", desc: "Atendimento para dúvidas de acesso, recebimento e uso dos materiais. Resposta em até 2 dias úteis." },
    { icon: Clock, title: "Acesso imediato", desc: "Tudo liberado dentro da plataforma logo após a confirmação do pagamento." },
    { icon: Sprout, title: "Linguagem direta", desc: "Conteúdo escrito em linguagem simples, para você aplicar mesmo sem saber nada de nutrição." },
    { icon: Coffee, title: "Para a vida real", desc: "Materiais pensados para quem trabalha, estuda, chega cansado e não vive uma rotina perfeita." },
  ];

  return (
    <section className="section-light relative py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-balance text-[34px] md:text-[52px]">
            Você recebe orientação para começar com clareza.
          </h2>
          <p className="mx-auto mt-7 max-w-[620px] text-[16px] leading-relaxed text-muted-foreground">
            O Guia do Prato Flexível foi criado para ser simples, direto e
            autoexplicativo — com apoio sempre que você precisar.
          </p>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-start">
              <div className="flex size-12 items-center justify-center rounded-full bg-[var(--fresh)]/12 text-[var(--fresh)]">
                <Icon className="size-6" strokeWidth={1.6} />
              </div>
              <h3 className="display mt-5 text-[22px]">{title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- garantia ---------- */

function Garantia() {
  return (
    <section className="section-light hairline-t py-28 md:py-32">
      <Container>
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 p-4 md:grid-cols-[auto_1fr] md:gap-16 md:p-8">
          <img
            src={garantiaImg}
            alt="7 dias de garantia"
            className="h-72 w-72 object-contain md:h-[420px] md:w-[420px]"
          />

          <div>
            <h2 className="display text-[28px] md:text-[44px]">
              Você tem 7 dias para decidir com calma.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground md:text-[16.5px]">
              Depois da compra, você terá <strong className="text-foreground">7 dias de garantia incondicional</strong> para
              acessar o material, ler o conteúdo, conhecer os bônus e avaliar
              se o guia faz sentido para o seu momento. Se entender que não é
              pra você, basta solicitar o reembolso conforme as orientações da
              plataforma de pagamento. Você recebe seu dinheiro de volta de
              forma simples — sem pressão, sem medo de errar na escolha.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- oferta ---------- */

function Oferta() {
  const stack: [string, string][] = [
    ["Guia do Prato Flexível (e-book completo)", "R$ 97"],
    ["Bônus 1 — 15 receitas práticas para o dia a dia", "R$ 37"],
    ["Bônus 2 — Guia “o que ter em casa”", "R$ 27"],
    ["Bônus 3 — SOS rotina corrida", "R$ 27"],
  ];
  return (
    <section id="oferta" className="section-dark hairline-t relative overflow-hidden py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.12 55 / 0.35), transparent 60%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="display text-[36px] md:text-[56px]">
            Comece pelo prato que cabe na sua rotina.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] text-muted-foreground md:text-[16.5px]">
            Você leva o guia principal e os três apoios para aplicar na vida real.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-[760px]">
          <div
            className="relative overflow-hidden rounded-[6px] text-[#1d1a14] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "repeating-linear-gradient(180deg, #fbf5e6 0px, #fbf5e6 35px, #f3e9cf 35px, #f3e9cf 36px), #fbf5e6",
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="relative px-7 pb-10 pt-9 md:px-16 md:pb-14 md:pt-12">
              <ul className="space-y-[12px]">
                {stack.map(([t, v]) => (
                  <li
                    key={t}
                    className="grid grid-cols-[24px_1fr_auto] items-center gap-3 text-[14px] md:text-[15px]"
                  >
                    <span
                      aria-hidden
                      className="flex size-5 items-center justify-center rounded-[3px] border-2 border-[#1d1a14]/70 text-[oklch(0.55_0.075_145)]"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12 L10 19 L21 5" />
                      </svg>
                    </span>
                    <span className="font-medium text-[#1d1a14]/85">{t}</span>
                    <span className="font-mono text-[13px] tabular-nums text-[#1d1a14]/75">
                      {v}
                    </span>
                  </li>
                ))}
                <li className="mt-3 grid grid-cols-[24px_1fr_auto] items-center gap-3 border-t-2 border-dashed border-[#1d1a14]/40 pt-4 text-[14px] md:text-[15px] font-semibold text-[#1d1a14]">
                  <span aria-hidden />
                  <span>Valor total de referência</span>
                  <span className="font-mono text-[13px] tabular-nums text-[#1d1a14]/55 line-through">R$ 188</span>
                </li>
              </ul>

              <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
                <div className="relative">
                  <div className="text-[13px] text-[#1d1a14]/70 line-through">
                    De R$ 97
                  </div>
                  <div className="display text-[56px] leading-none md:text-[72px] text-[#1d1a14]">
                    R$ 37
                  </div>
                  <div className="mt-2 text-[13px] text-[#1d1a14]/70">
                    à vista, ou 4× de R$ 9,70 no cartão
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <a
                    href="#oferta"
                    className="group inline-flex items-center gap-3 rounded-full bg-[oklch(0.40_0.06_145)] px-7 py-4 text-[15px] font-semibold text-[#fbf5e6] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.45)]"
                  >
                    <span>Quero acessar o Guia</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <div className="text-right text-[12.5px] text-[#1d1a14]/70">
                    7 dias de garantia incondicional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs = [
  { q: "O Guia do Prato Flexível é uma dieta?", a: "Não. O guia não entrega um plano alimentar individualizado, com quantidades calculadas ou cardápio fechado. Ele é um material de educação alimentar para te ajudar a entender o básico da nutrição, montar refeições mais equilibradas e melhorar sua relação com a comida." },
  { q: "O guia serve para emagrecer ou ganhar massa?", a: "Esse não é o foco do produto. O guia foi criado para mudança de hábitos, melhora da alimentação e construção de uma relação mais leve com a comida. Para objetivos estéticos específicos, o ideal é procurar um nutricionista." },
  { q: "Eu preciso cortar doces ou comidas que gosto?", a: "Não. Um dos pontos centrais do guia é mostrar que alimentação saudável pode incluir alimentos que você gosta. A proposta é te ajudar a entender equilíbrio, frequência e composição do prato — sem transformar doce em culpa." },
  { q: "Eu tenho uma rotina muito corrida. Ainda assim consigo usar?", a: "Sim. O guia foi pensado justamente para jovens que trabalham, estudam, chegam cansados e não conseguem seguir uma rotina perfeita. Além do conteúdo principal, você recebe materiais de apoio para facilitar refeições simples em dias comuns." },
  { q: "Eu não sei quase nada sobre nutrição. Vou conseguir entender?", a: "Sim. O conteúdo foi escrito em linguagem simples e direta. A ideia é explicar conceitos básicos como carboidratos, proteínas, gorduras, fibras e saciedade de um jeito que você consiga aplicar na sua rotina." },
  { q: "O guia substitui uma consulta com nutricionista?", a: "Não. O guia não substitui acompanhamento profissional, diagnóstico, tratamento ou prescrição individualizada. Ele te ajuda a criar uma base de educação alimentar." },
  { q: "Como recebo o material depois da compra?", a: "Após a compra, você terá acesso ao material pela plataforma. Dentro dela, estarão o e-book, os bônus, os vídeos explicativos e as orientações sobre como usar tudo." },
  { q: "E se eu comprar e perceber que não é para mim?", a: "Você tem 7 dias de garantia incondicional. Dentro desse prazo, pode acessar o material com calma e, se entender que ele não faz sentido para você, solicitar o reembolso conforme as orientações da plataforma de pagamento." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="display text-[32px] md:text-[44px]">
              As principais dúvidas antes de começar.
            </h2>
          </div>

          <div className="md:col-span-8">
            <ul className="divide-y divide-hairline">
              {faqs.map((f, i) => {
                const active = open === i;
                return (
                  <li key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(active ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-[var(--fresh)]"
                    >
                      <span className="text-[16.5px] font-medium md:text-[18px]">{f.q}</span>
                      <ChevronDown
                        className={`mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          active ? "rotate-180 text-[var(--fresh)]" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ${
                        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="pb-7 pr-10 text-[15.5px] leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- final CTA + footer ---------- */

function FinalCTA() {
  return (
    <section className="section-dark hairline-t relative overflow-hidden py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.72 0.12 55 / 0.35), transparent 60%)",
        }}
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display display-tight text-[40px] md:text-[64px]">
            Comer melhor cabe na sua vida real.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] text-muted-foreground md:text-[17px]">
            De R$ 97 por apenas R$ 37 à vista ou 4× de R$ 9,70. Garantia incondicional de 7 dias.
            Acesso liberado em minutos.
          </p>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA>Quero acessar o Guia do Prato Flexível</PrimaryCTA>
          </div>
          <p className="mt-8 text-[12.5px] text-muted-foreground">
            Compra segura pela plataforma. Ao finalizar, você terá acesso ao
            material, aos bônus, aos vídeos explicativos e às orientações de
            suporte.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="hairline-t py-12">
      <Container className="flex flex-col items-center justify-between gap-4 text-[12.5px] text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2 tracking-[0.22em] uppercase">
          Guia do Prato Flexível
        </div>
        <div>© 2026, Todos os direitos reservados</div>
        <div>Termos de uso · Política de privacidade</div>
      </Container>
    </footer>
  );
}

/* ---------- page ---------- */

function Landing() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll",
        `${Math.min(window.scrollY, 600)}px`,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <TopMark />
      <Hero />
      <AnatomiaPrato />
      <Dor />
      
      <CTAMid />
      <Metodo />
      <ParaQuem />
      <Entregaveis />
      <Bonus />
      
      <Criador />
      <Suporte />
      <Garantia />
      <Oferta />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
