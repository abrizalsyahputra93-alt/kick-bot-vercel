// api/auth.js
export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"});

  const { code, client_id, client_secret, redirect_uri, verifier } = req.body;
  if(!code || !client_id || !client_secret || !redirect_uri || !verifier){
    return res.status(400).json({error:"Missing fields"});
  }

  try {
    const tokenRes = await fetch("https://kick.com/oauth/token", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id,
        client_secret,
        redirect_uri,
        code_verifier: verifier
      })
    });

    const data = await tokenRes.json();
    if(tokenRes.ok) res.status(200).json(data);
    else res.status(400).json({error: data});
  } catch(e){
    res.status(500).json({error: e.message});
  }
}
