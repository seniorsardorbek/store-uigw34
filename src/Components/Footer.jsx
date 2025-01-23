import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                {/* Left Section - Copyright */}
                <p className="text-sm">&copy; 2025 Your Company. All rights reserved.</p>

                {/* Right Section - Links */}
                <div className="space-x-6">
                    <a href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</a>
                    <a href="/terms-of-service" className="hover:text-blue-400 transition">Terms of Service</a>
                    <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
