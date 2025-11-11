// /api/bot.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, channel, message } = req.body;
  if (!token || !channel || !message) return res.status(400).json({ error: 'Missing token, channel, or message' });

  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${channel}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: message })
    });

    const data = await response.json();
    if (response.ok) {
      res.status(200).json({ message: 'Pesan terkirim!', data });
    } else {
      res.status(400).json({ error: data });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
