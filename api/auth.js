// api/auth.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'Missing code' });

  const CLIENT_ID = process.env.KICK_CLIENT_ID;
  const CLIENT_SECRET = process.env.KICK_CLIENT_SECRET;
  const REDIRECT_URI = process.env.KICK_REDIRECT_URI;

  try {
    const response = await fetch('https://kick.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
      })
    });
    const data = await response.json();

    if (!data.access_token) return res.status(400).json({ error: 'Failed to get token' });

    // Kirim token balik ke frontend
    res.redirect(`/index.html?token=${data.access_token}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
