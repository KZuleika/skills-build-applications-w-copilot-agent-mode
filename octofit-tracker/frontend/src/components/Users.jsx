import { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users/`);
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
