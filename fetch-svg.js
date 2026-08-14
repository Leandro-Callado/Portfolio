const https = require('https');

https.get('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/python.svg', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/d="([^"]+)"/);
    if (match) {
      console.log(match[1]);
    }
  });
});
