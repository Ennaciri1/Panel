// src/components/common/LoadingSpinner.jsx
import React from "react";

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12"
};

export default function LoadingSpinner({ 
  size = "md", 
  className = "", 
  color = "text-brand-primary" 
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizes[size]} ${color}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}