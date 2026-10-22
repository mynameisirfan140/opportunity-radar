import { Fragment } from 'react';
import './HomePage.css';

const Hero = () => (
  <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 text-center">
    <h1 className="text-4xl font-extrabold mb-4">Spot emerging opportunities in real time</h1>
    <p className="text-lg mb-6">
      Opportunity Radar continuously scans job boards, LinkedIn, and local news for emerging opportunities that match your skills, delivering real‑time alerts.
    </p>
    <a
      href="#workspace"
      className="inline-block bg-white text-indigo-600 font-medium px-6 py-3 rounded hover:bg-indigo-500 transition"
      role="button"
      aria-label="Get Started"
    >
      Get Started
    </a>
  </section>
);

const Features = () => (
  <section className="py-12">
    <h2 className="text-2xl font-semibold mb-6 text-center">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium mb-2">Real‑time Scanning</h3>
        <p className="text-gray-700">Automatically monitors job boards, LinkedIn, and news for new listings.</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium mb-2">Skill‑based Matching</h3>
        <p className="text-gray-700">Custom filters let you focus on roles that match your expertise.</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium mb-2">Live Alerts</h3>
        <p className="text-gray-700">Receive browser notifications and in‑app toast messages instantly.</p>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
      <ol className="list-decimal list-inside space-y-4 text-left">
        <li className="text-gray-700">Our scraper runs on a schedule, gathering fresh opportunities.</li>
        <li className="text-gray-700">Matches are filtered by your custom criteria and stored in the database.</li>
        <li className="text-gray-700">You receive real‑time alerts via browser notifications or in‑app toasts.</li>
      </ol>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-6 text-center">
    <p className="mb-2">© 2025 Opportunity Radar. All rights reserved.</p>
    <p className="text-sm">
      Built with React, TypeScript, and Prisma. <a
        href="https://github.com/yourorg/opportunity-radar"
        className="text-indigo-400 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open source
      </a>
    </p>
  </footer>
);

const HomePage = () => (
  <div className="min-h-screen flex flex-col">
    <Hero />
    <Features />
    <HowItWorks />
    <Footer />
  </div>
);

export default HomePage;