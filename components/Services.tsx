import React from 'react';
import type { Service } from '../types';

const servicesData: Service[] = [
  {
    icon: 'fa-building',
    title: 'Pemeliharaan Gedung',
    description: 'Perawatan rutin dan perbaikan gedung, fasilitas, serta instalasi listrik dan air untuk kenyamanan seluruh civitas academica.',
  },
  {
    icon: 'fa-car',
    title: 'Manajemen Kendaraan',
    description: 'Pengelolaan dan pemeliharaan kendaraan dinas kampus untuk memastikan operasional berjalan lancar dan aman.',
  },
  {
    icon: 'fa-boxes-stacked',
    title: 'Pengadaan ATK & Aset',
    description: 'Penyediaan alat tulis kantor, barang habis pakai, dan pengelolaan aset universitas secara efisien.',
  },
  {
    icon: 'fa-calendar-check',
    title: 'Dukungan Acara',
    description: 'Penyediaan ruang, sound system, dan fasilitas untuk kelancaran acara akademik maupun kemahasiswaan.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Keamanan Lingkungan',
    description: 'Menjaga keamanan dan ketertiban di seluruh area lingkungan kampus 24/7 dengan tim profesional.',
  },
  {
    icon: 'fa-broom',
    title: 'Layanan Kebersihan',
    description: 'Memastikan kebersihan dan kerapian seluruh area kampus untuk menciptakan lingkungan yang sehat dan nyaman.',
  },
];

const ServiceCard: React.FC<Service> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform flex flex-col items-start">
    <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-5">
      <i className={`fas ${icon} text-2xl`}></i>
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Layanan Unggulan Kami</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Kami menyediakan berbagai layanan untuk mendukung kegiatan operasional Anda.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;