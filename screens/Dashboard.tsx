import React from 'react';
import Card from '../components/Card';
import { KARANG_TARUNA_BLUE, KARANG_TARUNA_YELLOW } from '../constants';
import type { ViewType } from '../types';

interface DashboardProps {
  setView: (view: ViewType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="space-y-6">
      <Card className="!bg-cover !bg-center" style={{ backgroundImage: 'linear-gradient(to right, rgba(13, 71, 161, 0.9), rgba(13, 71, 161, 0.7)), url(https://picsum.photos/1200/300?grayscale)'}}>
        <div className="p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">Selamat Datang di Generator Surat Karang Taruna</h2>
          <p className="text-slate-200">Buat surat resmi Karang Taruna dengan cepat, mudah, dan profesional. Semua proses dilakukan di browser Anda, tanpa perlu server atau login.</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <h3 className="text-xl font-semibold mb-2" style={{color: KARANG_TARUNA_BLUE}}>Mulai Cepat</h3>
            <p className="text-slate-600 mb-4">Langsung buat surat baru atau atur detail organisasi Anda terlebih dahulu.</p>
            <div className="flex flex-col sm:flex-row gap-3">
                <button 
                    onClick={() => setView('create-letter')}
                    className="w-full text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                    style={{backgroundColor: KARANG_TARUNA_BLUE}}>
                    Buat Surat Baru
                </button>
                <button 
                    onClick={() => setView('settings')}
                    className="w-full bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                    Pengaturan
                </button>
            </div>
        </Card>
        
        <Card>
            <h3 className="text-xl font-semibold mb-2" style={{color: KARANG_TARUNA_BLUE}}>Fitur Utama</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Generator Surat Otomatis</li>
                <li>Preview Surat Real-time</li>
                <li>Ekspor ke PDF</li>
                <li>Simpan Data Organisasi</li>
                <li>Riwayat Surat Tersimpan</li>
            </ul>
        </Card>

        <Card>
            <h3 className="text-xl font-semibold mb-2" style={{color: KARANG_TARUNA_BLUE}}>Tips</h3>
            <p className="text-slate-600">
                Untuk hasil terbaik, pastikan Anda telah mengisi data organisasi di halaman <a href="#" onClick={(e) => { e.preventDefault(); setView('settings'); }} className="font-semibold" style={{color: KARANG_TARUNA_YELLOW, textShadow:'1px 1px 2px rgba(0,0,0,0.2)'}}>Pengaturan</a> sebelum membuat surat.
            </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;