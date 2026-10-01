document.addEventListener('DOMContentLoaded', () => {
  const statusDisplay = document.getElementById('status-display');

  fetch('/api/status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const timeString = new Date(data.timestamp).toLocaleTimeString();
      statusDisplay.textContent = `Status: ${data.status} | Version: ${data.version} | Time: ${timeString}`;
      statusDisplay.className = 'success';
    })
    .catch(error => {
      statusDisplay.textContent = 'Failed to load system status.';
      statusDisplay.className = 'error';
      console.error('Error fetching status:', error);
    });
});
