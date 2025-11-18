import React from 'react';
import type { ViewType } from './types';

export const KARANG_TARUNA_BLUE = '#0D47A1';
export const KARANG_TARUNA_YELLOW = '#FFC107';

// FIX: Changed JSX.Element to React.ReactElement to fix 'Cannot find namespace JSX' error.
export const navigationItems: { name: string; view: ViewType; icon: React.ReactElement }[] = [
  { name: 'Beranda', view: 'dashboard', icon: <HomeIcon /> },
  { name: 'Buat Surat', view: 'create-letter', icon: <MailIcon /> },
  { name: 'Riwayat Surat', view: 'history', icon: <HistoryIcon /> },
  { name: 'Pengaturan', view: 'settings', icon: <SettingsIcon /> },
];

export function KarangTarunaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#0D47A1"/>
        <path d="M50 10L86.6 30V70L50 90L13.4 70V30L50 10Z" fill="white"/>
        <path d="M50 18.5L79.39 34.25V65.75L50 81.5L20.61 65.75V34.25L50 18.5Z" fill="#FFC107"/>
        <path d="M50 25.5L72.5 38.25V61.75L50 74.5L27.5 61.75V38.25L50 25.5Z" fill="#0D47A1"/>
        <path d="M50 35.5C55.2467 35.5 59.5 39.7533 59.5 45C59.5 50.2467 55.2467 54.5 50 54.5C44.7533 54.5 40.5 50.2467 40.5 45C40.5 39.7533 44.7533 35.5 50 35.5Z" fill="white"/>
    </svg>
  );
}

function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function MailIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}
function HistoryIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M12 8v4l2 2"/></svg>;
}
function SettingsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.24l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.24l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
}