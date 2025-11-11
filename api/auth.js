import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  if(!code) return res.status(400).json({ error:'Missing code' });

  const client_id = process.env.KICK_CLIENT_ID;
  const client_secret = process.env.KICK_CLIENT_SECRET;
  const redirect_uri = process.env.KICK_REDIRECT_URI;

  const params = new URLSearchParams({
    client_id, client_secret,
    code,
    grant_type:'authorization_code',
    redirect_uri
  });

  try {
    const r = await fetch('https://kick.com/oauth/token', {
      method:'POST',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
