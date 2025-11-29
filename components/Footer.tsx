import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
            <a href="#" className="mx-2 text-gray-400 hover:text-white transition-colors"><i className="fab fa-facebook-f text-xl"></i></a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white transition-colors"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white transition-colors"><i className="fab fa-instagram text-xl"></i></a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white transition-colors"><i className="fab fa-linkedin-in text-xl"></i></a>
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Sarpras Umum UNUGHA Cilacap. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;