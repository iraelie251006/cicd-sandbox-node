function getSystemStatus() {
  return {
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  };
}

module.exports = { getSystemStatus };
