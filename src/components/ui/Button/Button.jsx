// src/components/ui/Button/Button.jsx
import React from "react";
import "./Button.css";

/**
 * Bouton réutilisable
 *
 * Props:
 * - children: contenu du bouton
 * - size: "sm" | "md" | "lg" | "xl" (default: "lg")
 * - fullWidth: boolean (mobile = full width par défaut via CSS; sur desktop, force 100%)
 * - disabled: boolean
 * - as: "button" | "a" (default: "button")
 * - href: string (si as="a")
 * - onClick: function
 * - type: "button" | "submit" | "reset" (si as="button")
 * - className: string (classes sup)
 * - leftIcon / rightIcon: ReactNode (optionnel)
 */
export default function Button({
  children,
  size = "lg",
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  onClick,
  type = "button",
  className = "",
  leftIcon,
  rightIcon,
  ...rest
}) {
  const baseClass = [
    "btn",
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (as === "a") {
    return (
      <a
        className={baseClass}
        href={href}
        aria-disabled={disabled ? "true" : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          } else if (onClick) {
            onClick(e);
          }
        }}
        {...rest}
      >
        {leftIcon ? <span className="btn__icon btn__icon--left">{leftIcon}</span> : null}
        <span className="btn__label">{children}</span>
        {rightIcon ? <span className="btn__icon btn__icon--right">{rightIcon}</span> : null}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClass}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {leftIcon ? <span className="btn__icon btn__icon--left">{leftIcon}</span> : null}
      <span className="btn__label">{children}</span>
      {rightIcon ? <span className="btn__icon btn__icon--right">{rightIcon}</span> : null}
    </button>
  );
}