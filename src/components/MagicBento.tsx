import Image from "next/image";
import "./MagicBento.css";

export type BentoCard = {
  src: string;
  alt: string;
  label: string;
  title: string;
};

export function MagicBento({ cards }: { cards: BentoCard[] }) {
  return (
    <div className="magic-bento-grid">
      {cards.map((card, index) => (
        <div key={card.src} className="magic-bento-card">
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(max-width: 599px) 90vw, (max-width: 1023px) 45vw, 25vw"
            className="magic-bento-card__image"
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="magic-bento-card__header">
            <span className="magic-bento-card__label">{card.label}</span>
          </div>
          <div className="magic-bento-card__content">
            <h3 className="magic-bento-card__title">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
