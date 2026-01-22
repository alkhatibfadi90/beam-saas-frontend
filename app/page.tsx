'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('Checking backend...');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('Backend not reachable'));
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Beam SaaS</h1>
      <p>Backend status: {status}</p>
    </main>
  );
}
