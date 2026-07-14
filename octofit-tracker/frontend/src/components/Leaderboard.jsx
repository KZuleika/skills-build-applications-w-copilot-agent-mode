import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [];

        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card p-3">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id ?? item.id ?? item.rank} className="list-group-item">
            <strong>#{item.rank}</strong> — user {item.userId} • {item.score} pts
          </li>
        ))}
      </ul>
    </section>
  );
}
