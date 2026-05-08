import React, { useEffect, useState } from 'react';
import type { Train } from '../services/api';
import { fetchTrains } from '../services/api';
import '../styles/TransportCard.css';

interface TrainsComponentProps {
  searchTerm?: string;
}

export const TrainsComponent: React.FC<TrainsComponentProps> = ({ searchTerm = '' }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrains = async () => {
      try {
        setLoading(true);
        const data = await fetchTrains();
        if (searchTerm) {
          const filtered = data.filter(train =>
            train.lineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setTrains(filtered);
        } else {
          setTrains(data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load trains');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTrains();
  }, [searchTerm]);

  if (loading) return <div className="loading">Loading metro trains...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transport-section">
      <h2>🚇 Metro Trains in Bangalore</h2>
      <div className="transport-grid">
        {trains.length > 0 ? (
          trains.map(train => (
            <div key={train.id} className="transport-card">
              <div className="card-header">
                <h3>{train.lineName}</h3>
                <span className={`status ${train.status.toLowerCase().replace(' ', '-')}`}>
                  {train.status}
                </span>
              </div>
              <div className="card-body">
                <p><strong>Train:</strong> {train.trainNumber}</p>
                <p><strong>Current:</strong> {train.currentStation}</p>
                <p><strong>Next:</strong> {train.nextStation}</p>
                <p><strong>Arrival:</strong> {train.arrivalTime}</p>
                <p><strong>Occupancy:</strong> {train.occupancy}</p>
                <p><strong>Direction:</strong> {train.direction}</p>
              </div>
              <div className="card-footer">
                <button className="btn-track">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No trains found</p>
        )}
      </div>
    </div>
  );
};
