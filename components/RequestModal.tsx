import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { AnalyzedRequest } from '../types';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalState = 'form' | 'loading' | 'success' | 'error';

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [modalState, setModalState] = useState<ModalState>('form');
  const [analysisResult, setAnalysisResult] = useState<AnalyzedRequest | null>(null);
  const [error, setError] = useState('');

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // In a real app, you'd want to handle this more gracefully.
    // For this example, we'll just log an error if the key is missing.
    console.error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey });

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setModalState('form');
      setName('');
      setDepartment('');
      setDescription('');
      setAnalysisResult(null);
      setError('');
    }
  }, [isOpen]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !department || !description) return;
    
    setModalState('loading');
    setError('');

    const serviceCategories = [
      'Pemeliharaan Gedung', 
      'Manajemen Kendaraan', 
      'Pengadaan ATK & Aset', 
      'Dukungan Acara', 
      'Keamanan Lingkungan', 
      'Layanan Kebersihan'
    ];

    const prompt = `
      Analisis permintaan layanan berikut dari seorang civitas academica.
      Nama: ${name}
      Fakultas / Unit Kerja: ${department}
      Deskripsi Permintaan: "${description}"

      Berdasarkan deskripsi, lakukan hal berikut:
      1.  Tentukan kategori layanan yang paling sesuai dari daftar ini: ${serviceCategories.join(', ')}.
      2.  Buat ringkasan singkat dari permintaan tersebut dalam satu kalimat.
      3.  Tentukan tingkat prioritas (Rendah, Sedang, atau Tinggi) berdasarkan urgensi yang tersirat dalam teks. Misalnya, jika ada kata "segera", "urgent", "bocor", "rusak parah", atau "mengganggu perkuliahan", prioritaskan sebagai "Tinggi".

      Kembalikan jawaban HANYA dalam format JSON yang sesuai dengan skema yang diberikan.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING, description: `Salah satu dari: ${serviceCategories.join(', ')}` },
              summary: { type: Type.STRING, description: 'Ringkasan satu kalimat dari permohonan.' },
              priority: { type: Type.STRING, enum: ['Rendah', 'Sedang', 'Tinggi'] },
            },
            required: ['category', 'summary', 'priority'],
          },
        },
      });

      const resultText = response.text.trim();
      const resultJson = JSON.parse(resultText) as AnalyzedRequest;
      setAnalysisResult(resultJson);
      setModalState('success');

    } catch (err) {
        console.error("Error calling Gemini API:", err);
        setError('Gagal menganalisis permohonan. Silakan coba lagi.');
        setModalState('error');
    }
  };

  const priorityStyles = {
    'Rendah': 'bg-green-100 text-green-800',
    'Sedang': 'bg-yellow-100 text-yellow-800',
    'Tinggi': 'bg-red-100 text-red-800',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative transform transition-transform duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl z-20">
          <i className="fas fa-times-circle"></i>
        </button>

        <div className="p-8">
          {modalState === 'form' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulir Permohonan Layanan</h2>
              <p className="text-gray-500 mb-6">Silakan isi detail permohonan Anda di bawah ini.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">Fakultas / Unit Kerja</label>
                  <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi Permohonan</label>
                  <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: Proyektor di ruang kelas 3.4 Gedung B mati, padahal akan dipakai untuk kuliah jam 10 pagi." required></textarea>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400" disabled={!name || !department || !description}>
                    Kirim Permohonan
                  </button>
                </div>
              </form>
            </>
          )}

          {modalState === 'loading' && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-semibold">Menganalisis permohonan Anda...</p>
            </div>
          )}

          {modalState === 'success' && analysisResult && (
            <div>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <i className="fas fa-check text-green-600 text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Permohonan Terkirim!</h2>
                <p className="text-gray-500 mt-1">Berikut adalah hasil analisis dari permohonan Anda.</p>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-500">Kategori Layanan</span>
                    <span className="font-bold text-gray-800 text-right">{analysisResult.category}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-500">Prioritas</span>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${priorityStyles[analysisResult.priority]}`}>{analysisResult.priority}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-500 block mb-1">Ringkasan</span>
                    <p className="text-gray-700 bg-gray-100 p-3 rounded-md">{analysisResult.summary}</p>
                </div>
              </div>
               <div className="mt-8">
                  <button onClick={onClose} className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    Tutup
                  </button>
                </div>
            </div>
          )}

          {modalState === 'error' && (
             <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <i className="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Terjadi Kesalahan</h2>
                <p className="text-gray-500 mt-2">{error}</p>
                 <div className="mt-6">
                  <button onClick={() => setModalState('form')} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Coba Lagi
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestModal;