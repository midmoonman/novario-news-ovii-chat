const https = require('https');
https.get('https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2', (res) => {
  console.log('Status:', res.statusCode);
});
