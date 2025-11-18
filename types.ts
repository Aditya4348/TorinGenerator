export type ViewType = 'dashboard' | 'create-letter' | 'history' | 'settings';

export interface OrganizationDetails {
  name: string;
  level: string; // e.g., RT 01/RW 05, Desa Sukamaju
  address: string;
  phone: string;
  email: string;
  chairman: string;
  secretary: string;
  logo: string; // base64 string
}

export enum LetterType {
  INVITATION = 'Surat Undangan',
  NOTIFICATION = 'Surat Pemberitahuan',
  REQUEST = 'Surat Permohonan',
  ASSIGNMENT = 'Surat Tugas',
  PROPOSAL = 'Proposal Kegiatan',
  REPORT = 'Laporan Kegiatan',
}

export interface LetterData {
  id: string;
  type: LetterType;
  number: string;
  attachments: string;
  subject: string;
  date: string;
  recipient: string;
  recipientAddress: string;
  body: string;
  closing: string;
  createdAt: string;
  // Specific fields for different types
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventAgenda?: string;
  tembusan?: string;
}