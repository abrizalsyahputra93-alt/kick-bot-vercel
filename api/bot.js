import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { channel, message, token } = req.body;
  if (!channel || !message || !token) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${channel}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message })
    });

    const data = await response.json();
    if (data.error) return res.status(400).json(data);

    res.status(200).json({ message: 'Pesan terkirim!' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
