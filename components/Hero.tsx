import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center bg-cover bg-center text-white" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1770')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          Sarana & Prasarana Kampus UNUGHA
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow-md">
          Mendukung kegiatan akademik dan kemahasiswaan melalui pengelolaan sarana dan prasarana yang handal di lingkungan Universitas Nahdlatul Ulama Al-Ghazali.
        </p>
        <a 
          href="#layanan" 
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Lihat Layanan Kami
        </a>
      </div>
    </section>
  );
};

export default Hero;