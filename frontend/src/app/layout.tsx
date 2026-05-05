import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SantéConnect — Plateforme médecin-patient',
  description: 'Messagerie sécurisée, gestion des rendez-vous et suivi des traitements.',
  robots: { index: false, follow: false }, // Ne pas indexer (données médicales)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
