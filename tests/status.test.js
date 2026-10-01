const { getSystemStatus } = require('../src/status');

describe('System Status', () => {
  it('should return healthy status', () => {
    const result = getSystemStatus();
    expect(result.status).toBe('healthy');
  });

  it('should include version and timestamp', () => {
    const result = getSystemStatus();
    expect(result.version).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });
});
