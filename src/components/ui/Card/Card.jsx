import React from "react";
import Buttons from "@/components/ui/Buttons";
import "./Card.css";

/**
 * Props attendues
 * - title: string
 * - image: { src, alt }
 * - fields: tableau d'objets [{label, value}]
 * - onEdit: fn (optionnel)
 */
export default function Card({ title, image, fields = [], onEdit }) {
  return (
    <article className="card">
      <div className="card__media">
        <img src={image?.src} alt={image?.alt || title} loading="lazy" />
      </div>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>

        <dl className="card__grid">
          {fields.map(({ label, value }, i) => (
            <div className="card__row" key={i}>
              <dt className="card__label">{label}</dt>
              <dd className="card__value">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="card__actions">
          <Buttons size="lg" fullWidth onClick={onEdit}>
            Edit listing
          </Buttons>
        </div>
      </div>
    </article>
  );
}
