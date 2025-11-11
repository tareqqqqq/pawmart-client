import React from "react";
import { Link } from "react-router";
import { PawPrint } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 text-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <PawPrint className="w-8 h-8 text-rose-500" />
            <h2 className="text-2xl font-bold text-rose-600">PawMart</h2>
          </div>
          <p className="text-gray-700 max-w-xs">
            PawMart connects local pet owners and buyers for adoption and pet care products.
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3 text-rose-600">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-rose-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-rose-500 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-rose-500 transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3 text-rose-600">Contact Us</h3>
          <p>Email: support@pawmart.com</p>
          <p>Phone: +880-123-456-789</p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-rose-500 transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-rose-500 transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-rose-500 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-700">
        © {new Date().getFullYear()} PawMart — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
