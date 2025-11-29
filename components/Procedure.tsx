
import React from 'react';
import type { ProcedureStep } from '../types';

const stepsData: ProcedureStep[] = [
  {
    icon: 'fa-file-alt',
    title: 'Isi Formulir',
    description: 'Pilih jenis layanan yang Anda butuhkan dan isi formulir permohonan secara online dengan lengkap.',
  },
  {
    icon: 'fa-paper-plane',
    title: 'Kirim Permohonan',
    description: 'Setelah formulir terisi, periksa kembali data Anda dan kirimkan permohonan melalui sistem kami.',
  },
  {
    icon: 'fa-cogs',
    title: 'Proses & Verifikasi',
    description: 'Tim kami akan menerima, memverifikasi, dan menjadwalkan permohonan Anda sesuai dengan prioritas.',
  },
  {
    icon: 'fa-check-circle',
    title: 'Layanan Diberikan',
    description: 'Layanan akan dieksekusi oleh tim terkait. Anda akan menerima notifikasi setelah selesai.',
  },
];

interface ProcedureProps {
    onOpenModal: () => void;
}

const Procedure: React.FC<ProcedureProps> = ({ onOpenModal }) => {
  return (
    <section id="prosedur" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Prosedur Permohonan Layanan</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Ikuti langkah-langkah mudah berikut untuk mendapatkan layanan kami.</p>
        </div>
        <div className="relative">
          {/* Dotted line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-0">
            {stepsData.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 z-10 ring-8 ring-white">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-16">
          <button 
            onClick={onOpenModal}
            className="bg-green-500 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg">
            <i className="fas fa-plus-circle mr-2"></i> Ajukan Permohonan Sekarang
          </button>
        </div>
      </div>
    </section>
  );
};

export default Procedure;