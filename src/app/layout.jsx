import './globals.css';

export const metadata = {
  metadataBase: new URL('https://fatimagazette.local'),
  title: 'The Fatima Gazette | Urooj Fatima: The Unstoppable Snapchat Gaming Overlord',
  description: 'Historic Special Investigation: How Urooj Fatima proved every doubter wrong and conquered every Snapchat mini-game with an unholy 100% win rate. Official Dossier by Massna Ijaz.',
  openGraph: {
    title: 'The Fatima Gazette - Urooj Fatima',
    description: 'The Unstoppable Snapchat Gaming Overlord Who Proved Every Doubter Wrong.',
    images: ['/urooj-fatima.jpg'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
