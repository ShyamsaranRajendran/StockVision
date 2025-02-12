import React from "react";
import { Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Subscribe Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe to Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">
            Stay updated with our latest news and offers.
          </p>
          <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white px-3 py-2 w-full focus:outline-none"
            />
            <button className="bg-indigo-600 px-4 py-2 hover:bg-indigo-700">
              <Mail className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Pages Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400 text-sm">
            Email: <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a>
          </p>
          <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
          <p className="text-gray-400 text-sm">Location: Bengaluru, India</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} YourCompany. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
