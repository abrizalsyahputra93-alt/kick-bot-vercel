// api/send.js
export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const { channel, message, token } = req.body;
  if(!channel || !message || !token) return res.status(400).json({error:"Missing fields"});

  try {
    const response = await fetch(`https://kick.com/api/v1/channels/${channel}/messages`, {
      method:"POST",
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ content: message })
    });

    const data = await response.json();
    if(response.ok) res.status(200).json({success:true, data});
    else res.status(400).json({success:false, error:data});
  } catch(e){
    res.status(500).json({success:false, error:e.message});
  }
}
