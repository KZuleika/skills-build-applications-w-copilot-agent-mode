import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [];

        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card p-3">
      <h2>Teams</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id ?? item.id} className="list-group-item">
            <strong>{item.name}</strong> — {item.members?.length ?? 0} members
          </li>
        ))}
      </ul>
    </section>
  );
}
