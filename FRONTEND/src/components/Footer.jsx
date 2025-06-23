import React from 'react'

const Footer = () => {
 return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="max-w-screen-xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer