import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Flame, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

import c1 from "@/assets/cardapio-1.jpg";
import c2 from "@/assets/cardapio-2.jpg";
import c3 from "@/assets/cardapio-3.jpg";
import c4 from "@/assets/cardapio-4.jpg";
import c5 from "@/assets/cardapio-5.jpg";
import c6 from "@/assets/cardapio-6.jpg";

type Cardapio = {
  tempId: number;
  nome: string;
  descricao: string;
  kcal: string;
  prep: string;
  img: string;
};

const cardapios: Cardapio[] = [
  {
    tempId: 0,
    nome: "Frango Grelhado Clássico",
    descricao: "Frango grelhado, arroz branco, brócolis no vapor e tomate cereja.",
    kcal: "480 kcal",
    prep: "55 min",
    img: c1,
  },
  {
    tempId: 1,
    nome: "Salmão & Quinoa",
    descricao: "Salmão grelhado, quinoa em grão, aspargos assados e limão siciliano.",
    kcal: "540 kcal",
    prep: "60 min",
    img: c2,
  },
  {
    tempId: 2,
    nome: "Carne Magra Rústica",
    descricao: "Patinho moído, batata-doce em cubos, abobrinha e pimentão vermelho.",
    kcal: "510 kcal",
    prep: "50 min",
    img: c3,
  },
  {
    tempId: 3,
    nome: "Frango Desfiado Mexicano",
    descricao: "Frango desfiado, feijão preto, arroz integral e milho assado.",
    kcal: "495 kcal",
    prep: "58 min",
    img: c4,
  },
  {
    tempId: 4,
    nome: "Tilápia & Purê de Mandioquinha",
    descricao: "Tilápia grelhada, purê de mandioquinha, vagem e cenoura baby.",
    kcal: "430 kcal",
    prep: "52 min",
    img: c5,
  },
  {
    tempId: 5,
    nome: "Almôndegas de Peru",
    descricao: "Almôndegas de peru ao sugo, espaguete integral, espinafre e parmesão.",
    kcal: "520 kcal",
    prep: "55 min",
    img: c6,
  },
];

interface CardProps {
  position: number;
  cardapio: Cardapio;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const CardapioCard: React.FC<CardProps> = ({
  position,
  cardapio,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-card text-card-foreground shadow-float ring-2 ring-ember"
          : "z-0 bg-card text-card-foreground ring-1 ring-hairline hover:ring-ember/40",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -40 : position % 2 ? 18 : -18}px)
          rotate(${isCenter ? 0 : position % 2 ? 3 : -3}deg)
          scale(${isCenter ? 1 : 0.92})
        `,
        boxShadow: isCenter
          ? "0 30px 80px -20px color-mix(in oklab, var(--color-ember) 45%, transparent)"
          : "0 10px 30px -10px rgba(0,0,0,0.15)",
      }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={cardapio.img}
          alt={cardapio.nome}
          loading="lazy"
          width={768}
          height={768}
          className="h-3/5 w-full object-cover"
        />
        <div className="flex h-2/5 flex-col justify-between p-5">
          <div>
            <h3 className="display text-[18px] leading-tight md:text-[20px]">
              {cardapio.nome}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">
              {cardapio.descricao}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11.5px] font-medium text-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <Flame className="size-3.5 text-ember" />
              {cardapio.kcal}
            </span>
            <span className="h-3 w-px bg-hairline" />
            <span className="inline-flex items-center gap-1.5">
              <Timer className="size-3.5 text-ember" />
              {cardapio.prep}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StaggerCardapios: React.FC = () => {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState<Cardapio[]>(cardapios);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 360 : 260);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: cardSize + 120 }}
    >
      {list.map((cardapio, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <CardapioCard
            key={cardapio.tempId}
            position={position}
            cardapio={cardapio}
            handleMove={handleMove}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <button
          onClick={() => handleMove(-1)}
          aria-label="Cardápio anterior"
          className="flex size-12 items-center justify-center rounded-full bg-surface-raised ring-1 ring-hairline shadow-float transition-colors hover:bg-ember hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          aria-label="Próximo cardápio"
          className="flex size-12 items-center justify-center rounded-full bg-surface-raised ring-1 ring-hairline shadow-float transition-colors hover:bg-ember hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
};
