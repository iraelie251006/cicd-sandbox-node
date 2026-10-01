const express = require('express');
const path = require('path');
const { getSystemStatus } = require('./status');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/status', (req, res) => {
  res.json(getSystemStatus());
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
