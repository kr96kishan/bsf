import React, { useEffect, useState } from 'react';
import type { Bus } from '../services/api';
import { fetchBuses } from '../services/api';
import '../styles/TransportCard.css';

interface BusesComponentProps {
  searchTerm?: string;
}

export const BusesComponent: React.FC<BusesComponentProps> = ({ searchTerm = '' }) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBuses = async () => {
      try {
        setLoading(true);
        const data = await fetchBuses();
        if (searchTerm) {
          const filtered = data.filter(bus =>
            bus.routeNumber.includes(searchTerm) ||
            bus.routeName.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setBuses(filtered);
        } else {
          setBuses(data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load buses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBuses();
  }, [searchTerm]);

  if (loading) return <div className="loading">Loading buses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transport-section">
      <h2>🚌 Buses in Bangalore</h2>
      <div className="transport-grid">
        {buses.length > 0 ? (
          buses.map(bus => (
            <div key={bus.id} className="transport-card">
              <div className="card-header">
                <h3>Route {bus.routeNumber}</h3>
                <span className={`status ${bus.status.toLowerCase().replace(' ', '-')}`}>
                  {bus.status}
                </span>
              </div>
              <div className="card-body">
                <p><strong>Route:</strong> {bus.routeName}</p>
                <p><strong>Next Stop:</strong> {bus.nextStop}</p>
                <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
                <p><strong>Occupancy:</strong> {bus.occupancy}</p>
              </div>
              <div className="card-footer">
                <button className="btn-track">Track Bus</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No buses found</p>
        )}
      </div>
    </div>
  );
};
