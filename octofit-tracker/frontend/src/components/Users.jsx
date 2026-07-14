import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [];

        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card p-3">
      <h2>Users</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id ?? item.id ?? item.email} className="list-group-item">
            <strong>{item.name}</strong> — {item.email} ({item.level})
          </li>
        ))}
      </ul>
    </section>
  );
}
