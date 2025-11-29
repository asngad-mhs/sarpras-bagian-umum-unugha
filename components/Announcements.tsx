import React from 'react';
import type { Announcement } from '../types';

const announcementsData: Announcement[] = [
  {
    date: '25 Jul 2024',
    title: 'Jadwal Pemeliharaan AC Central Perpustakaan Pusat',
    content: 'Akan dilaksanakan pemeliharaan rutin AC di Perpustakaan Pusat pada tanggal 1-2 Agustus 2024. Mohon maaf atas ketidaknyamanannya.',
  },
  {
    date: '18 Jul 2024',
    title: 'Pembaruan Sistem Booking Ruang Diskusi & Aula',
    content: 'Sistem booking ruang diskusi dan aula telah diperbarui. Mahasiswa dan dosen dapat melakukan reservasi melalui portal Siakad.',
  },
  {
    date: '10 Jul 2024',
    title: 'Informasi Parkir Selama Acara Wisuda',
    content: 'Sehubungan dengan pelaksanaan Wisuda ke-XX, area parkir Gedung Rektorat akan ditutup untuk umum pada tanggal 15 Agustus 2024.',
  },
];

const Announcements: React.FC = () => {
  return (
    <section id="pengumuman" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Pengumuman Terkini</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Informasi dan berita terbaru dari Bagian Sarpras Umum UNUGHA.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {announcementsData.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="text-sm text-blue-600 font-semibold mb-1">{item.date}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;