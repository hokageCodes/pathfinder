import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: {
    default: "PathFinder - Discover Your Perfect Tech Career Path",
    template: "%s | PathFinder - Tech Career Guidance"
  },
  description: "Find your ideal tech career with PathFinder's AI-powered quiz. Get personalized recommendations for software engineering, data science, UI/UX design, product management, DevOps, and cybersecurity careers. Free, accurate, and beginner-friendly.",
  keywords: [
    "tech career quiz",
    "career guidance",
    "software engineering career",
    "data science career",
    "UI UX design career",
    "product management career",
    "DevOps career",
    "cybersecurity career",
    "tech career path",
    "career assessment",
    "AI career recommendations",
    "tech job finder",
    "programming career",
    "tech skills assessment",
    "career planning tool"
  ],
  authors: [{ name: "PathFinder Team" }],
  creator: "PathFinder",
  publisher: "PathFinder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pathfinder.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PathFinder - Discover Your Perfect Tech Career Path",
    description: "Find your ideal tech career with PathFinder's AI-powered quiz. Get personalized recommendations for software engineering, data science, UI/UX design, product management, DevOps, and cybersecurity careers.",
    url: 'https://pathfinder.tech',
    siteName: 'PathFinder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PathFinder - Tech Career Guidance Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PathFinder - Discover Your Perfect Tech Career Path",
    description: "Find your ideal tech career with PathFinder's AI-powered quiz. Get personalized recommendations for software engineering, data science, UI/UX design, and more.",
    images: ['/twitter-image.png'],
    creator: '@pathfinder_tech',
    site: '@pathfinder_tech',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Career Guidance Tool',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0ea5e9' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0ea5e9',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#0ea5e9',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PathFinder",
    "description": "AI-powered tech career guidance platform that helps users discover their ideal career path through personalized quizzes and recommendations.",
    "url": "https://pathfinder.tech",
    "applicationCategory": "Career Guidance",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "PathFinder Team"
    },
    "featureList": [
      "AI-powered career assessment",
      "Personalized career recommendations",
      "Software engineering career guidance",
      "Data science career path",
      "UI/UX design career advice",
      "Product management career planning",
      "DevOps career guidance",
      "Cybersecurity career recommendations",
      "Free career quiz",
      "Beginner-friendly interface"
    ],
    "screenshot": "https://pathfinder.tech/og-image.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "permissions": "browser",
    "memoryRequirements": "256MB",
    "storageRequirements": "10MB"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="pinterest-site-verification" content="your-pinterest-verification-code" />
        <meta name="facebook-domain-verification" content="your-facebook-verification-code" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} pt-16 min-h-screen flex flex-col overflow-x-hidden`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
