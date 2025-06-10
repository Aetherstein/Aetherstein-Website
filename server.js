const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const ADMIN_KEY = process.env.ADMIN_KEY;

// ⚠️ WICHTIG: Datei darf nicht automatisch ausgeliefert werden:
app.use(express.static(__dirname, {
  index: 'index.html',
  // blockiere shop-admin.html
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('shop-admin.html')) {
      res.status(403).end(); // blockiert direkten Zugriff
    }
  }
}));

// Manuell geschützte Route
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
