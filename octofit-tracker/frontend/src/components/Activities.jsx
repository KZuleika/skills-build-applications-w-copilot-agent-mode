import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [];

        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card p-3">
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id ?? item.id} className="list-group-item">
            <strong>{item.type}</strong> — {item.duration} min • {item.calories} cal
          </li>
        ))}
      </ul>
    </section>
  );
}
