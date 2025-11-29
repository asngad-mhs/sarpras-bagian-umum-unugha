import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#layanan', text: 'Layanan' },
    { href: '#prosedur', text: 'Prosedur' },
    { href: '#pengumuman', text: 'Pengumuman' },
    { href: '#kontak', text: 'Kontak' },
  ];

  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    onOpenModal();
    setIsMenuOpen(false);
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <i className="fas fa-university text-2xl text-blue-600"></i>
            <span className="text-xl font-bold text-gray-800">Sarpras UNUGHA</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {link.text}
              </a>
            ))}
          </nav>

          <a href="#prosedur" onClick={handleOpenModal} className="cursor-pointer hidden md:inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            Buat Permohonan
          </a>
          
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl">
             <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-gray-100 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </a>
                ))}
                <a href="#prosedur" onClick={handleOpenModal} className="cursor-pointer bg-blue-600 text-white text-center font-semibold mt-2 px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    Buat Permohonan
                </a>
             </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;