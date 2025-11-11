import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const params = new URLSearchParams();
  params.append('client_id', process.env.KICK_CLIENT_ID);
  params.append('client_secret', process.env.KICK_CLIENT_SECRET);
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', process.env.KICK_REDIRECT_URI);

  try {
    const r = await fetch('https://kick.com/api/v1/oauth/token', {
      method: 'POST',
      body: params
    });
    const data = await r.json();
    if (data.access_token) {
      res.json({ access_token: data.access_token });
    } else {
      res.status(400).json({ error: data.error || 'Failed to get token' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
