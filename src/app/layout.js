import "./globals.css";
import Navigation from "./Navigation";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Elijah Rivero - Full Stack Developer",
  description: "Crafting scalable full-stack applications using modern technologies to deliver efficient and user-centered solutions. Explore my portfolio of web applications, management systems, and digital galleries.",
  keywords: ["Full Stack Developer", "Web Developer", "Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Elijah Rivero" }],
  creator: "Elijah Rivero",
  publisher: "Elijah Rivero",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elijahrivero.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Elijah Rivero - Full Stack Developer",
    description: "Crafting scalable full-stack applications using modern technologies to deliver efficient and user-centered solutions. Explore my portfolio of web applications, management systems, and digital galleries.",
    url: 'https://elijahrivero.vercel.app',
    siteName: 'Elijah Rivero Portfolio',
    images: [
      {
        url: 'https://elijahrivero.vercel.app/ej.png',
        width: 1200,
        height: 630,
        alt: 'Elijah Rivero - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elijah Rivero - Full Stack Developer",
    description: "Crafting scalable full-stack applications using modern technologies to deliver efficient and user-centered solutions.",
    images: ['https://elijahrivero.vercel.app/ej.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/ej.png',
    shortcut: '/ej.png',
    apple: '/ej.png',
  },
  verification: {
    google: 'f-I4u-5qnXGxnlBcU9-5KQsmWDiQ8S211Vf69nGsFeE',
  },
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Elijah Rivero',
    jobTitle: 'Full Stack Developer',
    description: 'Crafting scalable full-stack applications using modern technologies to deliver efficient and user-centered solutions.',
    url: 'https://elijahrivero.vercel.app',
    image: 'https://elijahrivero.vercel.app/ej.png',
    sameAs: [],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'Next.js',
      'React',
      'Node.js',
      'MongoDB',
      'Tailwind CSS'
    ],
    offers: {
      '@type': 'Service',
      serviceType: 'Web Development Services',
      description: 'Full-stack web application development, management systems, and digital galleries'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Navigation>
          {children}
        </Navigation>
      </body>
    </html>
  );
}
