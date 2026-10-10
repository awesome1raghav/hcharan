import './globals.css';

export const metadata = {
  title: 'HIMA CHARAN — AI · Backend · Agentic',
  description: 'HIMA CHARAN — AI-focused developer building intelligent systems, backend architecture and agentic AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js");' }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
