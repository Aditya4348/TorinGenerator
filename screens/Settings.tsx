import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import useLocalStorage from '../hooks/useLocalStorage';
import type { OrganizationDetails } from '../types';
import { KARANG_TARUNA_YELLOW } from '../constants';

const defaultOrgDetails: OrganizationDetails = {
  name: '',
  level: '',
  address: '',
  phone: '',
  email: '',
  chairman: '',
  secretary: '',
  logo: '',
};

const Settings: React.FC = () => {
  const [storedDetails, setStoredDetails] = useLocalStorage<OrganizationDetails>('orgDetails', defaultOrgDetails);
  const [details, setDetails] = useState<OrganizationDetails>(storedDetails);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDetails(storedDetails);
  }, [storedDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredDetails(details);
    setMessage('Pengaturan berhasil disimpan!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Card title="Pengaturan Identitas Organisasi">
      <p className="text-slate-600 mb-6">
        Informasi yang Anda masukkan di sini akan digunakan secara otomatis pada kop surat dan bagian tanda tangan.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Nama Karang Taruna</label>
            <input type="text" name="name" value={details.name} onChange={handleInputChange} placeholder="Contoh: Tunas Harapan" className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div>
            <label className="font-medium">Tingkat/Wilayah</label>
            <input type="text" name="level" value={details.level} onChange={handleInputChange} placeholder="Contoh: RW 05, Kel. Sukajadi" className="w-full mt-1 p-2 border rounded-md" required />
          </div>
        </div>
        <div>
          <label className="font-medium">Alamat Sekretariat</label>
          <input type="text" name="address" value={details.address} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Nomor Telepon</label>
            <input type="tel" name="phone" value={details.phone} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input type="email" name="email" value={details.email} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Nama Ketua</label>
            <input type="text" name="chairman" value={details.chairman} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div>
            <label className="font-medium">Nama Sekretaris</label>
            <input type="text" name="secretary" value={details.secretary} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
        </div>
        <div>
          <label className="font-medium">Logo Organisasi</label>
          <div className="mt-1 flex items-center gap-4">
            {details.logo && <img src={details.logo} alt="Preview Logo" className="h-16 w-16 rounded-full object-cover" />}
            <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <button type="submit" className="text-slate-900 font-bold py-2 px-6 rounded-lg" style={{backgroundColor: KARANG_TARUNA_YELLOW}}>
            Simpan Pengaturan
          </button>
          {message && <p className="text-green-600 font-medium">{message}</p>}
        </div>
      </form>
    </Card>
  );
};

export default Settings;