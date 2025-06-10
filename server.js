const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Admin-Key aus Umgebungsvariable
const ADMIN_KEY = process.env.ADMIN_KEY;

app.use(express.static(__dirname));

// Zugriffskontrolle
app.get('/shop-admin.html', (req, res) => {
  if (req.query.admin === ADMIN_KEY) {
    res.sendFile(path.join(__dirname, 'shop-admin.html'));
  } else {
    res.redirect('/shop.html');
  }
});

app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});
