import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-dark border-top mt-auto py-4">
      <div className="container text-center">
        <p className="mb-2">
          <strong>MyBusiness</strong> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
        </p>
        <div>
          {/* Social icons (replace '#' with your links) */}
          <a href="#" className="mx-2 text-secondary" aria-label="Facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="mx-2 text-secondary" aria-label="Twitter">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="mx-2 text-secondary" aria-label="LinkedIn">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}