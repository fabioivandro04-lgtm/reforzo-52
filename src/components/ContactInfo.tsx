import React from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';
const ContactInfo = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <div className="flex justify-center space-x-8">
          <a href="mailto:contact@reforzo.com" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
            <Mail className="w-5 h-5" />
            <span>contact@reforzo.com</span>
          </a>
          <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
            <Phone className="w-5 h-5" />
            <span>+1 (234) 567-890</span>
          </a>
          <a href="https://linkedin.com/company/reforzo" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};
export default ContactInfo;