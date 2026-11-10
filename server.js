const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head><title>VibeZone</title></head>
    <body style="margin:0;font-family:Arial;text-align:center;background:linear-gradient(135deg,#7c3aed,#db2777);color:white;padding:60px 20px;min-height:100vh">
      <h1 style="font-size:50px">🔥 VibeZone 🔥</h1>
      <p style="font-size:20px">Welcome to the coolest place on the internet!</p>
      <div style="background:white;color:#333;padding:20px;border-radius:15px;max-width:400px;margin:30px auto">
        <h2>What's your vibe today?</h2>
        <p>😎 Chill &nbsp; 🎉 Party &nbsp; ❤️ Love</p>
        <button onclick="alert('Vibe received! Welcome to VibeZone!')" style="background:#7c3aed;color:white;border:none;padding:12px 25px;border-radius:25px;font-size:16px">Join The Vibe</button>
      </div>
      <p>Made with ❤️ in Lagos</p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`VibeZone running on port ${PORT}`);
});
