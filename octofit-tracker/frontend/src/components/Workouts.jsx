import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [];

        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card p-3">
      <h2>Workouts</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id ?? item.id} className="list-group-item">
            <strong>{item.title}</strong> — {item.difficulty} • {item.duration} min
          </li>
        ))}
      </ul>
    </section>
  );
}
