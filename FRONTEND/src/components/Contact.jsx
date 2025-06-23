// src/Contact.js
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">Contact Us</h1>
        <form className="space-y-4 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Your message"
            className="w-full px-4 py-2 border border-gray-300 rounded h-32"
          />
          <button className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
