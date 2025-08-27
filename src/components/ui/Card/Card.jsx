// src/components/ui/Card/Card.jsx
import React from "react";
import Button from "../Button/Button";
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
      {image && (
        <div className="card__media">
          <img 
            src={image.src} 
            alt={image.alt || title} 
            loading="lazy"
            onError={(e) => {
              // Image de fallback en cas d'erreur
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI0MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDQuNSA2MEMxMDQuNSA2Ni42Mjc0IDk5LjEyNzQgNzIgOTIuNSA3MkM4NS44NzI2IDcyIDgwLjUgNjYuNjI3NCA4MC41IDYwQzgwLjUgNTMuMzcyNiA4NS44NzI2IDQ4IDkyLjUgNDhDOTkuMTI3NCA0OCAxMDQuNSA1My4zNzI2IDEwNC41IDYwWiIgZmlsbD0iIzkxOTdBNiIvPgo8cGF0aCBkPSJNNjAgMTIwVjk0QzYwIDkwLjQgNjAuNCAxMDkgOTEgMTA5UzEyMyA5OC4yIDEyMyA5NEMxMjMgODkuOCAxMjkuNCA5NCAxMzUgOTRDMTQwLjYgOTQgMTQ2IDk4LjIgMTQ2IDEwMlYxMjBINjBaIiBmaWxsPSIjOTE5N0E2Ii8+Cjx0ZXh0IHg9IjEyMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTE5N0E2Ij5Ob3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
            }}
          />
        </div>
      )}

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
          <Button size="lg" fullWidth onClick={onEdit}>
            Edit listing
          </Button>
        </div>
      </div>
    </article>
  );
}