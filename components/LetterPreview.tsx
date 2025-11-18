import React from 'react';
import type { LetterData, OrganizationDetails } from '../types';

interface LetterPreviewProps {
  letterData: Partial<LetterData>;
  orgDetails: OrganizationDetails;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ letterData, orgDetails }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div id="letter-preview" className="p-6 bg-white shadow-lg rounded-sm text-black" style={{ width: '210mm', height: '297mm', fontFamily: 'Times New Roman, serif', fontSize: '11pt' }}>
      {/* KOP SURAT */}
      <div className="flex items-center border-b-4 border-black pb-2 mb-2">
        {orgDetails.logo && (
          <img src={orgDetails.logo} alt="Logo Organisasi" className="h-24 w-24 mr-4" />
        )}
        <div className="text-center flex-grow">
          <h1 className="text-xl font-bold uppercase">PENGURUS KARANG TARUNA</h1>
          <h2 className="text-xl font-bold uppercase">{orgDetails.name}</h2>
          <p className="text-sm">{orgDetails.level}</p>
          <p className="text-xs mt-1">{orgDetails.address}</p>
          <p className="text-xs">Telp: {orgDetails.phone} | Email: {orgDetails.email} </p>
        </div>
      </div>

      {/* NOMOR & TANGGAL SURAT */}
      <div className="flex justify-between items-start mt-8">
        <div>
          <p>Nomor: {letterData.number || '...'}</p>
          <p>Lampiran: {letterData.attachments || '-'} </p>
          <p>Perihal: <strong>{letterData.subject || '...'}</strong></p>
        </div>
        <div>
          <p>{orgDetails.level}, {formatDate(letterData.date)}</p>
        </div>
      </div>

      {/* TUJUAN SURAT */}
      <div className="mt-8">
        <p className="mb-1">Kepada Yth.</p>
        <p><strong>{letterData.recipient || '...'}</strong></p>
        <p>di</p>
        <p>{letterData.recipientAddress || 'Tempat'}</p>
      </div>

      {/* ISI SURAT */}
      <div className="mt-8 space-y-4">
        <p>Dengan hormat,</p>
        <div
          className="whitespace-pre-wrap text-justify"
          dangerouslySetInnerHTML={{ __html: letterData.body?.replace(/\n/g, '<br />') || '...' }}
        />
        {letterData.type === 'Surat Undangan' && (
          <div>
            <p>Adapun acara tersebut akan dilaksanakan pada:</p>
            <table className="my-2">
              <tbody>
                <tr><td className="pr-4">Hari, tanggal</td><td>: {formatDate(letterData.eventDate)}</td></tr>
                <tr><td className="pr-4">Waktu</td><td>: {letterData.eventTime || '...'}</td></tr>
                <tr><td className="pr-4">Tempat</td><td>: {letterData.eventLocation || '...'}</td></tr>
                <tr><td className="pr-4">Acara</td><td>: {letterData.eventAgenda || '...'}</td></tr>
              </tbody>
            </table>
          </div>
        )}
        <p>{letterData.closing || 'Demikian surat ini kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.'}</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-16 flex justify-center text-center">
        <div className="w-2/3">
          <p className="mb-1">Hormat kami,</p>
          <p>Pengurus Karang Taruna {orgDetails.name}</p>
          <div className="flex justify-around mt-8">
            <div className="flex flex-col items-center">
              <p>Ketua</p>
              <div className="h-16"></div>
              <p className="font-bold underline">{orgDetails.chairman || '..................'}</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Sekretaris</p>
              <div className="h-16"></div>
              <p className="font-bold underline">{orgDetails.secretary || '....................'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TEMBUSAN */}
      {letterData.tembusan && (
        <div className="mt-12 text-xs">
          <p className="underline">Tembusan:</p>
          <div className="whitespace-pre-line">
            {letterData.tembusan}
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterPreview;