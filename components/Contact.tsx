import React from 'react';

const ContactInfoCard: React.FC<{ icon: string; title: string; content: string; href?: string }> = ({ icon, title, content, href }) => (
    <div className="flex items-start space-x-4">
        <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className={`fas ${icon} text-xl`}></i>
        </div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            {href ? (
                 <a href={href} className="text-gray-600 hover:text-blue-600 transition-colors">{content}</a>
            ) : (
                <p className="text-gray-600">{content}</p>
            )}
        </div>
    </div>
);

const Contact: React.FC = () => {
  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Hubungi Kami</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui informasi di bawah ini.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactInfoCard 
                    icon="fa-map-marker-alt" 
                    title="Alamat Kampus"
                    content="Jl. Kemerdekaan Barat No.17, Kesugihan, Cilacap, Jawa Tengah"
                />
                <ContactInfoCard 
                    icon="fa-phone" 
                    title="Telepon"
                    content="(0282) 123-4567"
                    href="tel:+622821234567"
                />
                <ContactInfoCard 
                    icon="fa-envelope" 
                    title="Email"
                    content="sarpras@unugha.ac.id"
                    href="mailto:sarpras@unugha.ac.id"
                />
                <ContactInfoCard 
                    icon="fa-clock" 
                    title="Jam Operasional"
                    content="Senin - Jumat, 08:00 - 17:00 WIB"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;