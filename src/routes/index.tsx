import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Utensils,
  X,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Timer,
  Flame,
  ChefHat,
  Wallet,
  Dumbbell,
  Headphones,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

import hero from "@/assets/marmita-hero.jpg";
import heroBg from "@/assets/marmita-stove.jpg";
import creator from "@/assets/marmita-chef.jpg";
import a1 from "@/assets/avatar-1.jpg";
import a2 from "@/assets/avatar-2.jpg";
import a3 from "@/assets/avatar-3.jpg";
import a4 from "@/assets/avatar-4.jpg";
import a5 from "@/assets/avatar-5.jpg";

import method1 from "@/assets/marmita-menu.jpg";
import method2 from "@/assets/marmita-mise.jpg";
import method3 from "@/assets/marmita-stove.jpg";
import method4 from "@/assets/marmita-portion.jpg";
import timeline01 from "@/assets/timeline-01.jpg";
import bonus01 from "@/assets/bonus-01.png";
import bonus02 from "@/assets/bonus-02.png";
import finalCtaBg from "@/assets/final-cta-bg.jpg";
import bonus03 from "@/assets/bonus-03.png";
import timeline02 from "@/assets/timeline-02.jpg";
import timeline03 from "@/assets/timeline-03.jpg";
import timeline04 from "@/assets/timeline-04.jpg";

import garantiaImg from "@/assets/marmita-garantia.png";
import logoMark from "@/assets/marmita-logo.png";
import ebookCardapios from "@/assets/ebook-cardapios.png";

import foodChili from "@/assets/food-chili.png";
import foodLime from "@/assets/food-lime.png";
import foodBroccoli from "@/assets/food-broccoli.png";
import foodTomato from "@/assets/food-tomato.png";
import foodBasil from "@/assets/food-basil.png";
import foodChicken from "@/assets/food-chicken.png";
import foodRice from "@/assets/food-rice.png";
import foodMarmitaTop from "@/assets/food-marmita-top.png";
import foodFlatlay from "@/assets/food-flatlay.jpg";
import mod01 from "@/assets/mod-01.jpg";
import mod02 from "@/assets/mod-02.jpg";
import mod03 from "@/assets/mod-03.jpg";
import mod04 from "@/assets/mod-04.jpg";
import mod05 from "@/assets/mod-05.jpg";
import mod06 from "@/assets/mod-06.jpg";

import { StaggerCardapios } from "@/components/StaggerCardapios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marmita 60 — 10 marmitas fitness em uma hora de domingo" },
      {
        name: "description",
        content:
          "O método de cozinha paralela que produz 10 marmitas fitness em 60 minutos. Cardápios calculados, vídeos cronometrados e suporte de chef.",
      },
      { property: "og:title", content: "Marmita 60 — 10 marmitas em 60 minutos" },
      {
        property: "og:description",
        content:
          "Sem delivery, sem domingo perdido. A sequência paralela que profissional de cozinha usa, adaptada pro seu fogão de 4 bocas.",
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

function PrimaryCTA({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#oferta"
      className="group relative inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
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
          alt="Marmita 60"
          className="h-32 w-auto md:h-44"
        />
      </Container>
    </header>
  );
}

/* ---------- floating food parallax ---------- */

type FloatItem = {
  src: string;
  alt: string;
  className: string; // positioning + size (top/left/right/bottom + w-*)
  depth?: number;    // 0..1, higher = more parallax travel
  rotate?: number;   // degrees, base rotation
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
      className={`absolute select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)] ${item.className}`}
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
          className="absolute -top-32 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.66 0.19 38 / 0.45), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      {/* parallax floating ingredients */}
      <FloatingFood
        containerRef={heroRef}
        items={[
          { src: foodTomato, alt: "", className: "left-[3%] top-[18%] w-[110px] md:w-[150px]", depth: 0.6, rotate: -8 },
          { src: foodBasil, alt: "", className: "right-[4%] top-[12%] w-[120px] md:w-[170px]", depth: 0.45, rotate: 14, delay: 0.1 },
          { src: foodChili, alt: "", className: "left-[8%] bottom-[14%] w-[100px] md:w-[140px]", depth: 0.7, rotate: 22, delay: 0.15 },
          { src: foodLime, alt: "", className: "right-[6%] bottom-[20%] w-[100px] md:w-[140px]", depth: 0.55, rotate: -18, delay: 0.05 },
          { src: foodBroccoli, alt: "", className: "hidden md:block left-[12%] top-[55%] w-[120px]", depth: 0.35, rotate: -6, delay: 0.2 },
        ]}
      />

      <Container className="relative z-10">
        <div className="fade-up mx-auto max-w-[860px] text-center">
          <h1 className="display display-tight text-balance text-[34px] sm:text-[46px] md:text-[60px]">
            Dez marmitas fitness ficam prontas em uma hora de domingo.
          </h1>

          <p className="mx-auto mt-7 max-w-[640px] text-pretty text-[16px] leading-relaxed text-muted-foreground md:text-[17.5px]">
            A cozinha funciona como linha de produção quando você sabe a sequência.
            Quatro panelas, um forno, sessenta minutos. O resultado vai pro
            congelador e segura a semana inteira sem delivery.
          </p>

          <ul className="mx-auto mt-10 grid max-w-[860px] gap-3 text-left sm:grid-cols-3">
            {[
              "Treino para de ser sabotado pela próxima refeição que você não tem pronta.",
              "Cartão deixa de fechar com R$ 800 de delivery todo mês.",
              "Balança volta a mexer porque o macro da semana não depende mais da fome de terça à noite.",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-2xl bg-surface-raised/80 px-4 py-3 text-[13.5px] leading-snug text-foreground/85 shadow-float backdrop-blur-sm"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-ember" strokeWidth={2.25} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero image / VSL slot */}
        <div className="fade-up mt-14 md:mt-20">
          <div className="relative mx-auto aspect-video max-w-[820px] overflow-hidden rounded-3xl bg-black shadow-float">
            <img
              src={hero}
              alt="Dez marmitas fitness prontas em fila"
              width={1600}
              height={1024}
              className="size-full object-cover opacity-90"
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="rounded-full bg-white/95 px-5 py-3 text-[13px] font-medium text-ink shadow-xl">
                ▶ Insira sua VSL aqui
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up mt-12 flex flex-col items-center gap-6">
          <PrimaryCTA>Quero a sequência completa</PrimaryCTA>
          <div className="flex items-center gap-6 text-[12.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-3.5 text-ember" />
              7 dias de garantia incondicional
            </span>
            <span className="hidden h-3 w-px bg-hairline sm:block" />
            <span>+3.400 alunos formados</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- anatomia da marmita (visual) ---------- */

function AnatomiaMarmita() {
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{
        backgroundImage: `linear-gradient(180deg, color-mix(in oklab, var(--color-background) 92%, transparent) 0%, color-mix(in oklab, var(--color-background) 70%, transparent) 60%, var(--color-background) 100%), url(${foodFlatlay})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />

      <FloatingFood
        containerRef={sectionRef}
        items={[
          { src: foodChicken, alt: "", className: "left-[2%] top-[14%] w-[140px] md:w-[200px]", depth: 0.55, rotate: -14 },
          { src: foodRice, alt: "", className: "right-[3%] top-[10%] w-[130px] md:w-[180px]", depth: 0.4, rotate: 12, delay: 0.1 },
          { src: foodBroccoli, alt: "", className: "right-[6%] bottom-[12%] w-[120px] md:w-[170px]", depth: 0.65, rotate: -8, delay: 0.15 },
          { src: foodTomato, alt: "", className: "left-[5%] bottom-[16%] w-[110px] md:w-[160px]", depth: 0.5, rotate: 18, delay: 0.2 },
          { src: foodBasil, alt: "", className: "hidden md:block left-[18%] top-[58%] w-[110px]", depth: 0.3, rotate: -22, delay: 0.25 },
          { src: foodLime, alt: "", className: "hidden md:block right-[20%] top-[50%] w-[100px]", depth: 0.35, rotate: 28, delay: 0.3 },
        ]}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="display display-tight text-balance text-[36px] md:text-[56px]">
            Proteína, carbo, vegetal. Calculado.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
            Cada marmita sai com 35g de proteína, carboidrato medido e
            vegetal pesado. Sem app, sem balança digital. A fórmula tá nos
            cardápios e você só executa.
          </p>
        </div>

        {/* central marmita with halo */}
        <div className="relative mx-auto mt-16 flex max-w-[640px] items-center justify-center">
          <div
            className="absolute inset-10 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.66 0.19 38 / 0.45), transparent 70%)",
            }}
          />
          <motion.img
            src={foodMarmitaTop}
            alt="Marmita fitness pronta: frango grelhado, arroz, brócolis e tomate"
            width={1024}
            height={1024}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] drop-shadow-[0_60px_60px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* macro chips */}
        <div className="relative mx-auto mt-12 grid max-w-[820px] grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["35 g", "proteína magra"],
            ["45 g", "carbo complexo"],
            ["150 g", "vegetal fibroso"],
            ["480 kcal", "média por marmita"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-2xl bg-surface-raised/90 px-5 py-4 text-center shadow-float backdrop-blur-sm"
            >
              <div className="display text-[22px] md:text-[26px]">{n}</div>
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

/* ---------- números rápidos (substitui logos) ---------- */

function StatsStrip() {
  const stats = [
    ["60 min", "para 10 marmitas, do fogão ao congelador"],
    ["R$ 580", "média de delivery cortado no 1º mês"],
    ["12", "cardápios com macros já calculados"],
    ["3.400+", "alunos aplicando o método no domingo"],
  ];
  return (
    <section className="section-dark hairline-t hairline-b py-12 md:py-16" style={{ backgroundColor: "#2f7d3a" }}>
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="text-center md:text-left">
              <div className="display text-[28px] text-white md:text-[34px]">{n}</div>
              <div className="mt-1 text-[12.5px] leading-tight text-white/70">
                {l}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- cardápios (stagger) ---------- */

function Cardapios() {
  return (
    <section
      id="cardapios"
      className="hairline-t relative overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.66 0.19 38 / 0.35), transparent 60%)",
          }}
        />
      </div>
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="display display-tight text-balance text-[36px] md:text-[54px]">
            Toca pra escolher o cardápio da semana.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]">
            Cada cardápio vem com lista de compras, sequência cronometrada e
            macros calculados. Você só escolhe o sabor da semana.
          </p>
        </div>

        <div className="mt-16">
          <StaggerCardapios />
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
            <h2 className="display text-[34px] md:text-[52px]">
              Por que a marmita do domingo termina às 22h, e mesmo assim você pede iFood na terça.
            </h2>
          </div>

          <div className="space-y-6 text-[16.5px] leading-[1.75] text-foreground/80 md:col-span-7 md:text-[17px]">
            <p>
              Domingo de tarde planejado pra cozinhar. Você descongela o frango,
              pica cebola, refoga, espera o arroz, espera o brócolis, lava a
              panela, vai pro próximo alimento. São 16h, ainda faltam quatro
              itens. Quando termina, são 21h e o domingo já era. Cinco marmitas
              que vão durar até quarta no máximo.
            </p>
            <p>
              Terça à noite, depois do treino, você abre a marmita, olha o que
              tem, e pede iFood mesmo assim. R$ 47 do pedido, R$ 12 de taxa,
              R$ 8 de gorjeta. Fim do mês, o extrato mostra R$ 870 só de
              delivery. Os mesmos R$ 870 que pagariam um personal trainer mais
              um pote de whey.
            </p>
            <p className="text-foreground">
              A causa não é falta de força de vontade. É que você aprendeu a
              cozinhar do jeito de quem faz uma refeição, não de quem produz
              dez. Quem trabalha em restaurante sabe disso. Quem cozinha em casa
              quase nunca sabe.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- prova social ---------- */

const proofs = [
  {
    name: "Carla Mendes",
    role: "Analista financeira, 34 anos",
    avatar: a1,
    before: "Cozinhava domingo das 14h às 19h e ainda pedia iFood 3x na semana.",
    after:
      "Em 6 semanas fechou marmita pra semana toda em 1h13 e cortou R$ 720 de delivery no primeiro mês.",
  },
  {
    name: "Rafael Lopes",
    role: "Engenheiro civil, 29 anos",
    avatar: a2,
    before: "Treinava 5x por semana e a balança não mexia há 8 meses.",
    after:
      "Em 4 semanas seguindo o cardápio de déficit, perdeu 3,4kg com o mesmo treino e sem trocar de academia.",
  },
  {
    name: "Júlia Antunes",
    role: "Mãe de dois, 41 anos",
    avatar: a3,
    before: "Cozinhava domingo até 22h e jantava na exaustão.",
    after:
      "Hoje fecha 12 marmitas em 58 minutos. O domingo à tarde virou parque com os filhos.",
  },
];

function ProvaSocial() {
  return (
    <section className="section-dark hairline-t relative bg-ink py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-[34px] md:text-[54px]">
            O que três pessoas de rotina cheia fizeram diferente em 30 dias.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {proofs.map((p, i) => (
            <article
              key={p.name}
              className="group relative flex flex-col rounded-3xl bg-surface-raised/70 p-7 ring-1 ring-hairline backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-surface-raised hover:ring-ember/40"
              style={{ transform: `rotate(${(i - 1) * 0.4}deg)` }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.avatar}
                  alt={p.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover ring-1 ring-hairline"
                />
                <div>
                  <div className="text-[15px] font-medium">{p.name}</div>
                  <div className="text-[12.5px] text-muted-foreground">{p.role}</div>
                </div>
              </div>

              <div className="mt-7 space-y-4 text-[14.5px] leading-relaxed">
                <div>
                  <div className="text-[11px] tracking-[0.18em] text-muted-foreground/80 uppercase">
                    Antes
                  </div>
                  <p className="mt-1.5 text-foreground/80">{p.before}</p>
                </div>
                <div className="hairline-t pt-4">
                  <div className="text-[11px] tracking-[0.18em] text-ember uppercase">
                    Depois
                  </div>
                  <p className="mt-1.5 text-foreground">{p.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- CTA intermediário ---------- */

function CTAMid() {
  return (
    <section className="relative isolate overflow-hidden py-32 md:py-44">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-black/75"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 grain opacity-40" />

      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-[34px] text-white md:text-[52px]">
            Se você se reconheceu em pelo menos duas dessas cenas, a saída cabe numa tarde de domingo.
          </h2>
          <p className="mx-auto mt-7 max-w-[620px] text-[16.5px] leading-relaxed text-white/75">
            A sequência paralela que cozinheiro profissional usa, traduzida pra
            um fogão de 4 bocas. 4 macroetapas, 60 minutos cronometrados.
          </p>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA>Quero ver a sequência completa</PrimaryCTA>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- método ---------- */

const pillars = [
  {
    n: "01",
    title: "Mapa de Sabor",
    image: method1,
    desc:
      "No sábado à noite, você define 5 sabores da semana usando uma matriz de 4 proteínas e 4 carboidratos. A lista de compras inteira sai em 4 minutos.",
  },
  {
    n: "02",
    title: "Mise en Place de 12 minutos",
    image: method2,
    desc:
      "Antes de ligar o fogo, você prepara TODOS os ingredientes ao mesmo tempo. Lavar, picar, temperar, separar. 12 minutos cronometrados que economizam 40 depois.",
  },
  {
    n: "03",
    title: "Sequência Paralela",
    image: method3,
    desc:
      "Quatro panelas e o forno funcionando juntos, em ordem específica de cocção. Carboidrato e proteína longa entram primeiro. Verdes entram por último. 38 minutos no total.",
  },
  {
    n: "04",
    title: "Porcionamento Calculado",
    image: method4,
    desc:
      "Dividir em 10 marmitas com proteína, carboidrato e legume mensurados. Cada uma sai com macros calculados, pronta pro congelador. 10 minutos.",
  },
];

function Metodo() {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
      setCurrent(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <section id="metodo" className="section-dark hairline-t relative bg-ink py-28 md:py-36">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[680px]">
            <h2 className="display text-[34px] md:text-[52px]">
              Por que o profissional faz dez pratos em uma hora e o cozinheiro de casa faz um.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
              A cozinha profissional trabalha em paralelo. Quatro bocas, forno e
              bancada operando juntos, em ordem ensaiada. Em série, dez itens
              levam quatro horas. Em paralelo, levam uma. A diferença não é
              talento. É ordem.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Etapa anterior"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              className="grid size-11 place-items-center rounded-full ring-1 ring-hairline text-foreground/80 transition hover:bg-foreground/[0.04] hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Próxima etapa"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              className="grid size-11 place-items-center rounded-full ring-1 ring-hairline text-foreground/80 transition hover:bg-foreground/[0.04] hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-14">
          <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4 md:-ml-6">
              {pillars.map((p) => (
                <CarouselItem
                  key={p.n}
                  className="basis-[88%] pl-4 sm:basis-[60%] md:basis-[44%] md:pl-6 lg:basis-[36%]"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface-raised/60">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        width={1280}
                        height={1600}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className="absolute top-5 left-5 font-mono text-[12px] tracking-[0.18em] text-ember">
                        ETAPA {p.n}
                      </div>
                      <div className="absolute inset-x-5 bottom-5">
                        <h3 className="display text-[26px] leading-tight text-white md:text-[30px]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[14px] leading-relaxed text-white/75">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-2">
            {pillars.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para etapa ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  current === i ? "w-8 bg-ember" : "w-4 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-20 grid gap-10 overflow-hidden rounded-3xl bg-[#0d0d0d] p-8 ring-1 ring-white/10 md:grid-cols-[1fr_0.9fr_1fr] md:items-center md:gap-8 md:p-12">
          <div>
            <h3 className="display text-[26px] text-white md:text-[34px]">
              12 cardápios, 60 combinações principais, 5 sabores por semana.
            </h3>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 blur-3xl">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/30" />
            </div>
            <img
              src={ebookCardapios}
              alt="Mockup do ebook 12 cardápios, 60 combinações"
              width={928}
              height={1152}
              loading="lazy"
              className="relative w-full max-w-[280px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] md:max-w-none"
            />
            <img
              src={foodChili}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-4 top-6 w-20 -rotate-12 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] md:-left-8 md:w-28"
            />
            <img
              src={foodBasil}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-2 top-0 w-24 rotate-12 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] md:-right-6 md:w-32"
            />
            <img
              src={foodTomato}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-6 bottom-4 w-20 -rotate-6 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] md:-left-10 md:w-28"
            />
            <img
              src={foodLime}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-4 bottom-10 w-16 rotate-6 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] md:-right-8 md:w-24"
            />
            <img
              src={foodBroccoli}
              alt=""
              aria-hidden
              className="pointer-events-none absolute right-6 -bottom-4 w-20 rotate-12 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] md:w-28"
            />
          </div>
          <p className="text-[15.5px] leading-relaxed text-white/75">
            4 cardápios de bulk com média de 600 kcal por marmita, 4 de déficit
            com 380 kcal, 4 de manutenção com 480 kcal. Cada um vem com vídeo
            de execução cronometrada de 1h, gravado em cozinha doméstica padrão.
            Você cozinha JUNTO com o vídeo, vendo a sequência paralela acontecer
            em tempo real.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ---------- pra quem é ---------- */

function ParaQuem() {
  const yes = [
    "Treina 3x ou mais por semana e quer que o resultado apareça na balança ou no espelho",
    "CLT ou autônomo que sai cedo e chega tarde, sem tempo de cozinhar durante a semana",
    "Já tentou marmita no domingo, gastou 4 horas e desistiu na semana seguinte",
    "Fecha o mês com mais de R$ 500 de delivery e quer cortar pelo menos metade",
    "Mãe ou pai com filho pequeno que quer recuperar o domingo à tarde",
    "Segue plano do nutricionista mas não consegue executar por falta de tempo",
  ];
  const no = [
    "Quer dieta líquida ou jejum prolongado — aqui é comida de verdade no almoço",
    "Não tem fogão de 4 bocas ou forno — a sequência paralela depende dos dois",
    "Espera resultado de balança sem cozinhar uma única vez por semana",
    "Busca receita instagramável com salmão importado e quinoa — aqui é proteína popular brasileira",
  ];

  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <h2 className="display mx-auto max-w-[820px] text-center text-[34px] md:text-[52px]">
          Quem aproveita esse método, e quem provavelmente não vai aproveitar.
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-ember/10 via-surface/60 to-surface/30 p-8 md:p-10">
            <div className="text-[12px] tracking-[0.2em] text-ember uppercase">É pra você se</div>
            <ul className="mt-6 space-y-4">
              {yes.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-[15.5px] leading-relaxed text-foreground/90"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ember/15 ring-1 ring-ember/30">
                    <Utensils className="size-3.5 text-ember" strokeWidth={2.25} />
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
      </Container>
    </section>
  );
}

/* ---------- entregáveis ---------- */

const modules = [
  { t: "12 cardápios semanais completos", s: "5 sabores, 10 marmitas, macros calculados", v: "R$ 297", img: mod01 },
  { t: "12 vídeos de execução cronometrada", s: "1h cada, cozinha doméstica padrão", v: "R$ 197", img: mod02 },
  { t: "Acesso vitalício à plataforma", s: "Sem mensalidade, sem renovação", v: "R$ 97", img: mod03 },
  { t: "Atualizações trimestrais", s: "Novos cardápios a cada 3 meses", v: "R$ 188", img: mod04 },
  { t: "Comunidade fechada no Telegram", s: "Plantão de chef toda quarta-feira", v: "R$ 324", img: mod05 },
  { t: "3 bônus de execução", s: "Lista, substituições e calculadora", v: "R$ 201", img: mod06 },
];

function Entregaveis() {
  return (
    <section className="hairline-t relative isolate overflow-hidden py-28 md:py-40" style={{ backgroundColor: "#3a201a" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[720px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,220,180,0.55), transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-[34px] text-white md:text-[56px]">
            O que entra na sua mão no minuto que você confirma a inscrição.
          </h2>
          <p className="mt-5 text-[15px] text-white/75 md:text-[16px]">
            Tudo já calculado, gravado e pronto pra usar no próximo domingo.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1180px] auto-rows-[minmax(180px,auto)] gap-5 md:grid-cols-3">
          {modules.map((m, i) => {
            const featured = i === 0;
            return (
              <Card
                key={m.t}
                className={`group relative overflow-hidden border-0 bg-[#1a0e09] ring-0 transition-all duration-300 hover:-translate-y-0.5 ${
                  featured ? "md:col-span-2 md:row-span-2 min-h-[420px]" : "min-h-[240px]"
                }`}
              >
                <img
                  src={m.img}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-100 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0604] via-[#0a0604]/60 via-35% to-transparent"
                />
                <div className="relative flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[12px] tracking-[0.18em] text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[12.5px] text-white/70">
                      {m.v}
                    </span>
                  </div>
                  <div className="mt-auto flex flex-col gap-2 pt-10">
                    <h3
                      className={`font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${
                        featured ? "display text-[28px] md:text-[36px]" : "text-[18px]"
                      }`}
                    >
                      {m.t}
                    </h3>
                    <p
                      className={`text-white/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] ${
                        featured ? "text-[15px]" : "text-[13.5px]"
                      }`}
                    >
                      {m.s}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-[820px] text-center">
          <a
            href="#oferta"
            className="inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3 text-white shadow-[0_20px_40px_-15px_rgba(217,83,30,0.5)] transition-transform hover:-translate-y-0.5"
          >
            <span className="text-[14px] font-semibold">Ver oferta completa</span>
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-white/20 text-white">
              <ArrowRight className="size-3.5" />
            </span>
          </a>
          <div className="mt-6 font-mono text-[12.5px] text-white/80">
            Total dos componentes: R$ 1.304
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
      title: "Lista de Compras Inteligente",
      desc: "Planilha que cruza os 12 cardápios e imprime a lista pronta pro mercado em qualquer semana. Tempo médio na compra: 18 minutos.",
      v: "R$ 87",
      img: bonus01,
    },
    {
      n: "02",
      title: "Guia de Substituições Estratégicas",
      desc: "PDF de 24 páginas. Sem lactose, sem glúten, vegetariano, vegano, low carb, low fodmap. Cada troca mantém os macros do cardápio original.",
      v: "R$ 67",
      img: bonus02,
    },
    {
      n: "03",
      title: "Calculadora de Macros por Marmita",
      desc: "Ferramenta online que mostra, marmita por marmita, gramas de proteína, carbo, gordura e kcal. Aponta qual cardápio fecha seu macro com folga.",
      v: "R$ 47",
      img: bonus03,
    },
  ];

  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-[34px] md:text-[52px]">
            Três bônus de execução que entram junto.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {bonuses.map((b) => (
            <article
              key={b.n}
              className="flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-hairline"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f5efe6]">
                <img
                  src={b.img}
                  alt={b.title}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="font-mono text-[11px] tracking-[0.22em] text-ember">
                  BÔNUS {b.n}
                </div>
                <h3 className="display mt-5 text-[24px] leading-tight">{b.title}</h3>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">
                  {b.desc}
                </p>
                <div className="hairline-t mt-6 pt-4 font-mono text-[13px] text-foreground">
                  Valor: {b.v}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- depoimentos longos ---------- */

const longTestimonials = [
  {
    name: "Carla Mendes",
    role: "Analista financeira, São Paulo",
    image: a1,
    text: "Cozinhava domingo das 14h às 19h e completava com delivery, R$ 760/mês de iFood. Apliquei Mapa de Sabor + Sequência Paralela no primeiro domingo e fechei 10 marmitas em 1h21. Em 30 dias cortei R$ 580 de delivery. Em 12 semanas perdi 4,2kg sem trocar de academia.",
  },
  {
    name: "Rafael Lopes",
    role: "Engenheiro civil, Belo Horizonte",
    image: a2,
    text: "Treinava 5x por semana e a balança parada há 8 meses. Comia 'qualquer coisa' no almoço. Comecei pelos cardápios de cut. Em 4 semanas perdi 3,4kg com o mesmo treino e zero ajuda de nutricionista. Hoje mantenho marmita há 7 meses sem interrupção.",
  },
  {
    name: "Júlia Antunes",
    role: "Mãe de dois, Curitiba",
    image: a3,
    text: "O domingo era da cozinha das 13h às 22h, sempre brigando por causa do tempo perdido. Cronometrei o primeiro cardápio em 58 minutos. Recuperei 4 horas todo domingo. Em 3 meses a família reduziu iFood pra 1x por mês, e as crianças passaram a comer o mesmo prato dos pais.",
  },
  {
    name: "Pedro Vasconcelos",
    role: "Médico plantonista, Salvador",
    image: a4,
    text: "24h de plantão por semana, alimentação zerada, IMC subindo. Já tinha tentado 3 nutricionistas. Imprimi a Lista de Compras e fiz o primeiro cardápio entre dois plantões. Em 6 semanas baixei 5,1kg. Hoje levo 3 marmitas congeladas pro hospital.",
  },
  {
    name: "Marina Tavares",
    role: "Professora de educação física, Florianópolis",
    image: a5,
    text: "Ensinava nutrição esportiva e comia pão na chapa porque 'não tinha tempo'. Comecei pelos cardápios de manutenção, fui pro bulk depois de 2 meses. Ganhei 2,8kg de massa magra em 14 semanas. Hoje indico o método pros próprios alunos.",
  },
  {
    name: "Marcelo Brito",
    role: "Comercial, 32 anos",
    image: a1,
    text: "Fechei o primeiro cardápio em 1h08, com 52 segundos de margem. Ainda sobrou tempo pra lavar tudo antes do jogo começar. Não pedi iFood na semana inteira pela primeira vez em 3 anos.",
  },
];

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof longTestimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-3xl bg-surface-raised/70 ring-1 ring-hairline shadow-lg shadow-black/5 max-w-xs w-full"
                key={i}
              >
                <p className="text-[14.5px] leading-relaxed text-foreground/85">{text}</p>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-[14px]">{name}</div>
                    <div className="leading-5 text-[12.5px] text-muted-foreground tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const firstColumn = longTestimonials.slice(0, 2);
const secondColumn = longTestimonials.slice(2, 4);
const thirdColumn = longTestimonials.slice(4, 6);

function Depoimentos() {
  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-[34px] md:text-[52px]">
            Cinco pessoas de rotina exaustiva que voltaram a cozinhar e mudaram a balança em 30 dias.
          </h2>
        </div>

        <div className="mt-16 flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </Container>
    </section>
  );
}

/* ---------- criadora ---------- */

function Criador() {
  return (
    <section className="section-dark hairline-t relative overflow-hidden bg-ink py-28 md:py-36">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={creator}
                alt="Beatriz Marçal, chef instrutora"
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
                <div className="text-[18px] font-medium">Beatriz Marçal</div>
                <div className="mt-1 text-[12.5px] text-muted-foreground">
                  Chef formada pelo Senac SP, 6 anos em cozinha de restaurante
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <h2 className="display text-[34px] md:text-[52px]">
              Quem vai cronometrar 60 minutos com você no domingo.
            </h2>

            <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted-foreground md:text-[16.5px]">
              <p>
                Beatriz Marçal trabalhou 6 anos em cozinha de restaurante,
                incluindo 2 como sous-chef em uma casa de R$ 280 de couvert em
                Pinheiros. Saiu em 2020 pra resolver o próprio problema:
                treinava crossfit 5x por semana, faturava R$ 18 mil como chef, e
                mesmo assim chegava em casa às 23h sem ter o que comer.
              </p>
              <p>
                A virada veio quando percebeu que aplicava no restaurante uma
                sequência paralela que cortava 75% do tempo. E em casa cozinhava
                do jeito amador. Em 2021 começou a traduzir a sequência pra um
                fogão doméstico de 4 bocas. Validou em 2.000 marmitas próprias
                antes de ensinar pra primeira aluna.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                ["+3.400", "alunos formados desde 2022"],
                ["17", "estados brasileiros aplicando"],
                ["42%", "cortaram +R$ 500/mês em delivery"],
              ].map(([n, l]) => (
                <div key={l} className="p-1">
                  <div className="display text-[28px] md:text-[34px]">{n}</div>
                  <div className="mt-1 text-[12px] leading-tight text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- suporte / diferenciais ---------- */

function Suporte() {
  const items = [
    {
      icon: Timer,
      title: "Vídeo cronometrado",
      desc: "Você cozinha JUNTO com o vídeo no seu fogão. Sequência paralela acontecendo em tempo real.",
    },
    {
      icon: Flame,
      title: "Plantão de chef",
      desc: "Toda quarta, das 19h às 21h, foto da panela é respondida em até 4 minutos.",
    },
    {
      icon: ChefHat,
      title: "Aulas ao vivo mensais",
      desc: "Uma aula por mês com um cardápio novo, cronometrado, gravada na plataforma.",
    },
    {
      icon: Wallet,
      title: "Macros já calculados",
      desc: "Cada marmita sai com proteína, carbo, gordura e kcal medidos. Sem planilha extra.",
    },
    {
      icon: Dumbbell,
      title: "Cardápios por objetivo",
      desc: "4 de bulk, 4 de cut, 4 de manutenção. Você muda de faixa sem trocar de método.",
    },
    {
      icon: Headphones,
      title: "Tira-dúvidas 24h",
      desc: "Fora do plantão, dúvida escrita no grupo é respondida em até 24h pela monitoria.",
    },
  ];

  return (
    <section className="section-light relative py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display text-balance text-[36px] md:text-[56px]">
            O que acontece se a sua marmita der errado na quarta-feira.
          </h2>
          <p className="mx-auto mt-7 max-w-[640px] text-[16.5px] leading-relaxed text-muted-foreground">
            Você não fica travado sozinho na cozinha. Seis frentes de suporte e
            execução pra garantir que o domingo termine com 10 marmitas no
            congelador.
          </p>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center text-foreground">
                <Icon className="size-10" strokeWidth={1.4} />
              </div>
              <h3 className="display mt-6 text-[22px] md:text-[24px]">{title}</h3>
              <p className="mt-3 max-w-[320px] text-[14.5px] leading-relaxed text-muted-foreground">
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
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 p-4 md:grid-cols-[auto_1fr] md:gap-16 md:p-8">
          <img
            src={garantiaImg}
            alt="Garantia de 7 dias"
            className="h-80 w-80 object-contain md:h-[520px] md:w-[520px]"
          />

          <div>
            <h2 className="display text-[28px] md:text-[40px]">
              7 dias de risco zero pra testar o método no seu domingo.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground md:text-[16.5px]">
              Você entra hoje, baixa todos os cardápios, assiste aos vídeos, faz
              o primeiro domingo de cozinha. Se em qualquer momento dentro dos 7
              primeiros dias decidir que não é pra você, pede o reembolso.
              Devolvemos 100%. Sem pergunta, sem formulário. A garantia vale
              mesmo se você já tiver cozinhado o primeiro cardápio inteiro.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- oferta ---------- */

function Oferta() {
  const stack = [
    ["12 cardápios semanais completos", "R$ 297"],
    ["12 vídeos de execução cronometrada", "R$ 197"],
    ["Acesso vitalício à plataforma", "R$ 97"],
    ["Atualizações trimestrais (1 ano)", "R$ 188"],
    ["Comunidade no Telegram (1 ano)", "R$ 324"],
    ["Bônus 1, Lista de Compras Inteligente", "R$ 87"],
    ["Bônus 2, Guia de Substituições", "R$ 67"],
    ["Bônus 3, Calculadora de Macros", "R$ 47"],
  ];
  return (
    <section id="oferta" className="section-dark hairline-t relative overflow-hidden bg-ink py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.14 55 / 0.35), transparent 60%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="display text-[36px] md:text-[56px]">
            O que você leva pra casa quando confirma agora.
          </h2>
        </div>

        {/* Shopping list paper */}
        <div className="relative mx-auto mt-14 max-w-[760px]">
          {/* Tape on top */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 z-20 h-7 w-36 -translate-x-1/2 -translate-y-1/2 -rotate-2 rounded-[2px] shadow-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,232,140,0.85) 0%, rgba(252,213,90,0.85) 100%)",
              boxShadow: "0 4px 14px -6px rgba(0,0,0,0.45)",
            }}
          />
          <div
            className="relative -rotate-[0.6deg] overflow-hidden rounded-[6px] text-[#1d1a14] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{
              background:
                "repeating-linear-gradient(180deg, #fbf5e6 0px, #fbf5e6 35px, #f3e9cf 35px, #f3e9cf 36px), #fbf5e6",
              backgroundBlendMode: "multiply",
            }}
          >
            {/* Red margin line */}
            <div
              aria-hidden
              className="absolute left-12 top-0 hidden h-full w-px md:block"
              style={{ background: "rgba(200,60,50,0.45)" }}
            />
            {/* Hole punches */}
            <div aria-hidden className="absolute left-3 top-0 hidden h-full flex-col items-center justify-around py-10 md:flex">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="block size-3 rounded-full bg-ink/20 shadow-inner" />
              ))}
            </div>

            <div className="relative px-7 pb-10 pt-9 md:px-16 md:pb-14 md:pt-12">


              <ul className="space-y-[12px]">
                {stack.map(([t, v]) => (
                  <li
                    key={t}
                    className="grid grid-cols-[24px_1fr_auto] items-center gap-3 text-[14px] md:text-[15px]"
                  >
                    <span
                      aria-hidden
                      className="flex size-5 items-center justify-center rounded-[3px] border-2 border-[#1d1a14]/70 text-[#c0392b]"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12 L10 19 L21 5" />
                      </svg>
                    </span>
                    <span className="relative font-medium text-[#1d1a14]/85">
                      <span className="relative z-[1]">{t}</span>
                      <span
                        aria-hidden
                        className="absolute left-0 right-2 top-1/2 -z-0 h-px -translate-y-1/2"
                        style={{ background: "rgba(193,60,50,0.35)" }}
                      />
                    </span>
                    <span className="font-mono text-[13px] tabular-nums text-[#1d1a14]/75">
                      {v}
                    </span>
                  </li>
                ))}
                <li className="mt-3 grid grid-cols-[24px_1fr_auto] items-center gap-3 border-t-2 border-dashed border-[#1d1a14]/40 pt-4 text-[14px] md:text-[15px] font-semibold text-[#1d1a14]">
                  <span aria-hidden />
                  <span>Subtotal dos componentes</span>
                  <span className="font-mono text-[13px] tabular-nums text-[#1d1a14]/55 line-through">R$ 1.304</span>
                </li>
              </ul>

              {/* Total stamp + CTA */}
              <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
                <div className="relative">
                  <div
                    className="display mt-7 text-[56px] leading-none md:text-[72px] text-[#1d1a14]"
                  >
                    R$ 197
                  </div>
                  <div className="mt-2 text-[13px] text-[#1d1a14]/70">
                    à vista, ou 12× de R$ 19,90 no cartão
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <a
                    href="#oferta"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#1d1a14] px-7 py-4 text-[15px] font-semibold text-[#fbf5e6] ring-2 ring-[#1d1a14]/90 ring-offset-2 ring-offset-[#fbf5e6] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black hover:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.55)]"
                  >
                    <span>Quero garantir minha vaga</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <div className="text-right text-[12.5px] text-[#1d1a14]/70">
                    Acesso liberado em até 5 min após a confirmação
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[920px] gap-2.5 text-[14px] text-foreground/85 sm:grid-cols-2">
          {[
            "12 cardápios com lista de compras e macros calculados",
            "12 vídeos cronometrados de 1h, prontos pra cozinhar junto",
            "Acesso vitalício, sem mensalidade",
            "Atualizações trimestrais sem custo adicional",
            "Comunidade fechada no Telegram",
            "Plantão de chef toda quarta-feira",
            "Lista de Compras Inteligente",
            "Guia de Substituições Estratégicas",
            "Calculadora de Macros por Marmita",
            "Garantia incondicional de 7 dias",
          ].map((i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-ember" strokeWidth={2.25} />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs = [
  {
    q: "E se eu nunca cozinhei na vida?",
    a: "O método assume que você sabe ligar o fogão e usar uma faca. Não pede técnica de chef. A sequência paralela é decorada nos primeiros 2 cardápios. A partir do terceiro domingo, vira automático. Mais de 800 alunos começaram sem saber refogar cebola.",
  },
  {
    q: "Não tenho tempo nem pra esse 1h de domingo.",
    a: "Se você realmente não tem 1h livre no domingo, esse método não é pra você. Mas a pesquisa interna mostra que 91% dos alunos achavam que não tinham 1h e tinham. O que faltava era a ordem. Domingo 11h–12h ou 19h–20h cobre quase todo mundo.",
  },
  {
    q: "Funciona pra cutting agressivo, tipo déficit de 800 kcal/dia?",
    a: "Funciona. 4 dos 12 cardápios são de cut, média de 380 kcal por marmita e até 28g de proteína. Você fecha 1.500 kcal/dia com 4 marmitas pequenas se for o caso. A Calculadora ajusta porção por porção.",
  },
  {
    q: "E se eu não tiver freezer grande?",
    a: "Cada marmita ocupa cerca de 14×11×5 cm. 10 cabem em uma gaveta padrão de 45 cm. Se você só tem freezer pequeno, cozinhe 2 vezes na semana — 5 marmitas em 30 minutos no domingo e mais 5 na quarta.",
  },
  {
    q: "Qual a diferença pra um nutricionista online?",
    a: "Nutricionista te dá a planilha alimentar. Aqui você aprende a executar. 78% dos alunos chegam vindos de plano que não conseguiram seguir. O método não substitui o nutricionista — ele entrega o pedaço que falta entre a planilha e a marmita pronta no congelador.",
  },
  {
    q: "Tem suporte se eu travar no meio do domingo?",
    a: "Tem. O plantão de quarta das 19h às 21h responde foto em até 4 minutos. Dúvida escrita no grupo é respondida em até 24h em qualquer dia.",
  },
  {
    q: "Vou conseguir variar o cardápio ou enjoa rápido?",
    a: "São 12 cardápios com 5 sabores cada — 60 combinações principais. Com as substituições do Bônus 2, viram +240 variações. Aluna que aplica há 14 meses ainda não repetiu cardápio na mesma sequência.",
  },
  {
    q: "Posso parcelar?",
    a: "Sim. 12× de R$ 19,90 no cartão. Acesso liberado no mesmo minuto da confirmação do pagamento.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-light hairline-t py-28 md:py-36">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="display text-[32px] md:text-[44px]">
              As perguntas que a gente mais recebe antes da inscrição.
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
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-ember"
                    >
                      <span className="text-[16.5px] font-medium md:text-[18px]">{f.q}</span>
                      <ChevronDown
                        className={`mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          active ? "rotate-180 text-ember" : ""
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

/* ---------- linha do tempo ---------- */

function LinhaDoTempo() {
  const steps = [
    {
      tag: "Sábado, 22h",
      title: "Mapa de Sabor pronto em 4 minutos",
      desc: "Você define 5 sabores da semana e a lista de compras inteira sai pronta pro mercado.",
      bullets: ["Matriz de 4 proteínas × 4 carbos", "Lista impressa em PDF", "18 minutos no mercado"],
      duracao: "23 minutos",
      img: timeline01,
    },
    {
      tag: "Domingo, 11h00",
      title: "Mise en Place cronometrado",
      desc: "12 minutos picando, lavando e temperando TUDO ao mesmo tempo. Nada cozinha ainda.",
      bullets: ["12 minutos cronometrados", "Todos os recipientes prontos", "Bancada limpa antes do fogo"],
      duracao: "15 minutos",
      img: timeline02,
    },
    {
      tag: "Domingo, 11h12",
      title: "Sequência Paralela no fogo",
      desc: "Quatro panelas e o forno funcionando juntos, em ordem ensaiada. 38 minutos até a última retirada.",
      bullets: ["4 bocas + forno simultâneos", "Verdes entram por último", "Cozinhando junto com o vídeo"],
      duracao: "35 minutos",
      img: timeline03,
    },
    {
      tag: "Domingo, 11h50",
      title: "10 marmitas no congelador",
      desc: "Porcionamento com macros medidos, marmita por marmita. Cinco sabores, sete dias resolvidos.",
      bullets: ["10 marmitas seladas", "Macros calculados", "Semana inteira sem delivery"],
      duracao: "5 minutos",
      img: timeline04,
    },
  ];

  return (
    <section className="section-light hairline-t py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-[820px]">
          <h2 className="display text-[34px] leading-[1.05] md:text-[52px]">
            Como a sua tarde de domingo passa a parecer.
          </h2>
          <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
            Do sábado 22h ao domingo 11h50. Cronometrado e replicável.
          </p>
        </div>

        <ol className="mx-auto mt-16 max-w-[1080px] divide-y divide-hairline">
          {steps.map((s, i) => (
            <motion.li
              key={s.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-[1.05fr_1fr] md:gap-14"
            >
              <div className="flex gap-5 md:gap-6">
                <div className="shrink-0">
                  <span className="grid size-12 place-items-center rounded-full bg-ember text-white shadow-[0_8px_20px_-8px_color-mix(in_oklab,var(--ember)_60%,transparent)]">
                    <span className="font-mono text-[14px] font-semibold tracking-[0.04em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                    {s.tag}
                  </div>
                  <h3 className="display mt-2 text-[24px] leading-[1.1] md:text-[30px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[440px] text-[14.5px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[14px] text-foreground/85"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-ember" strokeWidth={2.75} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-ember/10 px-4 py-2 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-ember">
                      <Timer className="size-3.5" strokeWidth={2.5} />
                      {s.duracao}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full max-h-[340px] w-full rounded-[28px] object-cover shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
                />
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- final CTA + footer ---------- */

function FridgeVideo() {
  return (
    <section className="section-dark relative isolate overflow-hidden bg-ink">
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/fridge-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/fridge.webm" type="video/webm" />
        <source src="/videos/fridge.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      <div className="relative z-[2] mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-center justify-center px-6 py-32 text-center md:min-h-[80vh] md:py-44">
        <p className="text-xs uppercase tracking-[0.32em] text-white/70">Sua semana, resolvida</p>
        <h2 className="display mt-6 max-w-[18ch] text-balance text-4xl text-white md:text-6xl lg:text-7xl">
          Abra a geladeira. Sua comida já está pronta.
        </h2>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-dark hairline-t relative overflow-hidden bg-ink py-28 md:py-36">
      <img
        src={finalCtaBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.72 0.14 55 / 0.35), transparent 60%)",
        }}
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="display display-tight text-[40px] md:text-[68px]">
            Dez marmitas. Sessenta minutos. Próximo domingo.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] text-muted-foreground md:text-[17px]">
            R$ 197 à vista ou 12× de R$ 19,90. Garantia incondicional de 7 dias.
            Acesso liberado em minutos.
          </p>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA>Quero garantir minha vaga agora</PrimaryCTA>
          </div>
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
          Marmita 60
        </div>
        <div>© 2026, Todos os direitos reservados</div>
        <div>Termos de uso, Política de privacidade</div>
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
      <AnatomiaMarmita />
      <StatsStrip />
      <Cardapios />
      <Dor />
      <ProvaSocial />
      <CTAMid />
      <Metodo />
      <LinhaDoTempo />
      <ParaQuem />
      <Entregaveis />
      <Bonus />
      <Depoimentos />
      <FridgeVideo />
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
