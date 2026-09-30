import './globals.css';

export const metadata = {
  title: 'The Fatima Gazette - Snapchat Gaming Legend',
  description: 'An interactive chronicle of Urooj Fatima, the Snapchat Gaming Legend.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
