import { useState } from 'react';
import HomePage from './pages/HomePage';
import './App.css';

const Workspace = () => (
  <div className="p-4">
    <h2 className="text-lg font-medium">Workspace</h2>
    <p className="text-gray-600">Workspace view will display opportunities.</p>
  </div>
);

const App = () => {
  const [view, setView] = useState<'home' | 'workspace'>('home');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-xl font-semibold">Opportunity Radar</h1>
      </header>

      <main className="flex-1 p-4">
        {view === 'home' ? <HomePage /> : <Workspace />}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 Opportunity Radar. All rights reserved.
      </footer>

      <div className="p-4 text-center space-x-4">
        <button
          onClick={() => setView('home')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Home
        </button>
        <button
          onClick={() => setView('workspace')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Workspace
        </button>
      </div>
    </div>
  );
};

export default App;