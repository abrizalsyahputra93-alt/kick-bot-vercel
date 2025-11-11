import fetch from 'node-fetch';

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const { token, channel, message } = req.body;
  if(!token || !channel || !message) return res.status(400).json({ error:'Missing parameters' });

  try {
    const r = await fetch(`https://kick.com/api/v2/messages/send/${channel}`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message })
    });
    const data = await r.json();
    res.status(200).json({ message: 'Pesan terkirim!' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
