import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import LetterPreview from '../components/LetterPreview';
import useLocalStorage from '../hooks/useLocalStorage';
import { LetterType } from '../types';
import type { OrganizationDetails, LetterData } from '../types';

const defaultOrgDetails: OrganizationDetails = {
  name: '', level: '', address: '', phone: '', email: '', chairman: '', secretary: '', logo: '',
};

const CreateLetter: React.FC = () => {
  const [orgDetails] = useLocalStorage<OrganizationDetails>('orgDetails', defaultOrgDetails);
  const [letters, setLetters] = useLocalStorage<LetterData[]>('letters', []);
  const [isOrgDetailsSet, setIsOrgDetailsSet] = useState(false);

  useEffect(() => {
    if (orgDetails && orgDetails.name && orgDetails.chairman) {
      setIsOrgDetailsSet(true);
    } else {
      setIsOrgDetailsSet(false);
    }
  }, [orgDetails]);

  const [letterData, setLetterData] = useState<Partial<LetterData>>({
    type: LetterType.INVITATION,
    date: new Date().toISOString().split('T')[0],
    attachments: '-',
    closing: 'Demikian surat ini kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.',
    tembusan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLetterData(prev => ({ ...prev, [name]: value }));
  };

  const generateLetterNumber = () => {
    const lastNumber = letters.filter(l => new Date(l.createdAt).getFullYear() === new Date().getFullYear()).length + 1;
    const orgCode = orgDetails.name.split(' ').map(w => w[0]).join('').toUpperCase();
    const monthRoman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newNumber = `${String(lastNumber).padStart(3, '0')}/KT-${orgCode}/${monthRoman[currentMonth]}/${currentYear}`;
    setLetterData(prev => ({ ...prev, number: newNumber }));
  };

  const handleExportAndSave = () => {
    if (!letterData.number || !letterData.subject || !letterData.recipient) {
      alert('Harap lengkapi nomor surat, perihal, dan tujuan surat.');
      return;
    }

    const newLetter: LetterData = {
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...letterData,
    } as LetterData;
    
    setLetters(prev => [...prev, newLetter]);

    const element = document.getElementById('letter-preview');
    const opt = {
      margin: 0,
      filename: `Surat_${letterData.type}_${letterData.number.replace(/\//g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  if (!isOrgDetailsSet) {
    return (
      <Card title="Pengaturan Belum Lengkap">
        <p className="text-center text-slate-600">
          Harap lengkapi detail organisasi di halaman Pengaturan terlebih dahulu sebelum membuat surat.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Formulir Surat">
        <div className="space-y-4">
          <div>
            <label className="font-medium">Jenis Surat</label>
            <select name="type" value={letterData.type} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md">
              {Object.values(LetterType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Tanggal Surat</label>
              <input type="date" name="date" value={letterData.date} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label className="font-medium">Lampiran</label>
              <input type="text" name="attachments" value={letterData.attachments} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>
          </div>
          <div>
            <label className="font-medium">Nomor Surat</label>
            <div className="flex gap-2">
                <input type="text" name="number" value={letterData.number} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
                <button onClick={generateLetterNumber} className="mt-1 px-3 bg-blue-100 text-blue-700 rounded-md text-sm">Generate</button>
            </div>
          </div>
          <div>
            <label className="font-medium">Perihal</label>
            <input type="text" name="subject" value={letterData.subject} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <hr/>
          <div>
            <label className="font-medium">Tujuan Surat (Yth.)</label>
            <input type="text" name="recipient" value={letterData.recipient} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label className="font-medium">Alamat Tujuan</label>
            <input type="text" name="recipientAddress" value={letterData.recipientAddress} onChange={handleInputChange} placeholder="di Tempat" className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <hr/>
          {letterData.type === LetterType.INVITATION && (
            <div className="p-3 bg-blue-50 rounded-md space-y-4">
               <h4 className="font-semibold">Detail Acara Undangan</h4>
               <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Tanggal Acara</label>
                  <input type="date" name="eventDate" value={letterData.eventDate} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div>
                  <label className="font-medium">Waktu</label>
                  <input type="text" name="eventTime" value={letterData.eventTime} placeholder="19:30 WIB - Selesai" onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
                </div>
               </div>
               <div>
                  <label className="font-medium">Tempat</label>
                  <input type="text" name="eventLocation" value={letterData.eventLocation} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
               </div>
               <div>
                  <label className="font-medium">Agenda</label>
                  <input type="text" name="eventAgenda" value={letterData.eventAgenda} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
               </div>
            </div>
          )}
          <div>
            <label className="font-medium">Isi Surat</label>
            <textarea name="body" value={letterData.body} onChange={handleInputChange} rows={8} className="w-full mt-1 p-2 border rounded-md" placeholder="Tulis isi surat di sini..."></textarea>
          </div>
          <div>
            <label className="font-medium">Kalimat Penutup</label>
            <input type="text" name="closing" value={letterData.closing} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label className="font-medium">Tembusan</label>
            <textarea name="tembusan" value={letterData.tembusan} onChange={handleInputChange} rows={3} className="w-full mt-1 p-2 border rounded-md" placeholder="1. Yth. Bapak/Ibu...&#10;2. Arsip"></textarea>
          </div>
          <button onClick={handleExportAndSave} className="w-full bg-amber-400 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors">
            Simpan & Ekspor ke PDF
          </button>
        </div>
      </Card>
      
      <div className="overflow-x-auto">
        <LetterPreview letterData={letterData} orgDetails={orgDetails} />
      </div>
    </div>
  );
};

export default CreateLetter;