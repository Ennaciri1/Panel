import React from "react";
import "./Input.css";

/**
 * Composant Input générique
 *
 * Props:
 * - label: string (titre affiché au-dessus)
 * - type: "text" | "password" | "email" | "number" | "date" | "file" | etc.
 * - placeholder: string
 * - name: string
 * - value: string
 * - onChange: fn
 * - textarea: bool (si true => <textarea>)
 * - select: bool + options [{value, label}] (si true => <select>)
 * - required, disabled, multiple, accept, min, max... => passent direct
 */
export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  textarea = false,
  select = false,
  options = [],
  required = false,
  disabled = false,
  ...rest
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name} className="input-label">{label}</label>}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          className="input-field input-textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...rest}
        />
      ) : select ? (
        <select
          id={name}
          name={name}
          className="input-field input-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...rest}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...rest}
        />
      )}
    </div>
  );
}
