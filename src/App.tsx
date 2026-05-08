import { useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { BusesComponent } from './components/BusesComponent';
import { TrainsComponent } from './components/TrainsComponent';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'bus' | 'train'>('all');

  const handleSearch = (term: string, type: 'all' | 'bus' | 'train') => {
    setSearchTerm(term);
    setFilterType(type);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚌 Bangalore Transportation Tracker 🚇</h1>
        <p className="subtitle">Real-time buses and metro trains information</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <main className="app-main">
        {(filterType === 'all' || filterType === 'bus') && (
          <BusesComponent searchTerm={searchTerm} />
        )}

        {(filterType === 'all' || filterType === 'train') && (
          <TrainsComponent searchTerm={searchTerm} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Bangalore Transportation Tracker. All rights reserved.</p>
        <p>Data provided by BMTC and Bangalore Metro Rail Corporation Limited</p>
      </footer>
    </div>
  );
}

export default App;
