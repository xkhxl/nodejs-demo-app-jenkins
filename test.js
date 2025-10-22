const http = require('http');

const options = { method: 'GET', host: 'localhost', port: 3000, path: '/' };

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (data.includes('Hello')) {
      console.log('OK');
      process.exit(0);
    } else {
      console.error('Unexpected response:', data);
      process.exit(2);
    }
  });
});

req.on('error', err => { console.error('Request failed', err); process.exit(2); });
req.end();
