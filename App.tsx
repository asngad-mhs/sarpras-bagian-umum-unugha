
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Procedure from './components/Procedure';
import Announcements from './components/Announcements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RequestModal from './components/RequestModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero />
        <Services />
        <Procedure onOpenModal={() => setIsModalOpen(true)} />
        <Announcements />
        <Contact />
      </main>
      <Footer />
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;