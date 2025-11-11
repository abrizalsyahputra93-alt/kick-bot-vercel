// /api/auth.js
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code OAuth tidak ada' });
  }

  const CLIENT_ID = process.env.KICK_CLIENT_ID;       // simpan di Vercel Env
  const CLIENT_SECRET = process.env.KICK_CLIENT_SECRET; // simpan di Vercel Env
  const REDIRECT_URI = process.env.KICK_REDIRECT_URI;   // misal: https://project.vercel.app/index.html

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI
  });

  try {
    const tokenRes = await fetch('https://kick.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await tokenRes.json();

    if (data.access_token) {
      return res.status(200).json({ access_token: data.access_token });
    } else {
      return res.status(400).json({ error: data.error_description || 'Gagal tukar token' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
