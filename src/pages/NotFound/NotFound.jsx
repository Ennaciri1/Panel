// src/pages/NotFound/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-brand-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button as="a" href="/dashboard" size="lg">
            Go to Dashboard
          </Button>
          <Link 
            to="/"
            className="px-6 py-3 text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
