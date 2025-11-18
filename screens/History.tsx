import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { LetterData } from '../types';
import Card from '../components/Card';

const History: React.FC = () => {
  const [letters, setLetters] = useLocalStorage<LetterData[]>('letters', []);

  const sortedLetters = [...letters].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const deleteLetter = (id: string) => {
    if(window.confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
        setLetters(prev => prev.filter(letter => letter.id !== id));
    }
  }

  return (
    <Card title="Riwayat Surat Dibuat">
      {sortedLetters.length === 0 ? (
        <p className="text-center text-slate-500">Belum ada surat yang dibuat.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">No. Surat</th>
                <th scope="col" className="px-6 py-3">Jenis</th>
                <th scope="col" className="px-6 py-3">Perihal</th>
                <th scope="col" className="px-6 py-3">Tanggal Dibuat</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedLetters.map((letter) => (
                <tr key={letter.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{letter.number}</td>
                  <td className="px-6 py-4">{letter.type}</td>
                  <td className="px-6 py-4">{letter.subject}</td>
                  <td className="px-6 py-4">{new Date(letter.createdAt).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteLetter(letter.id)} className="font-medium text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default History;