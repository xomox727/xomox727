import https from 'https';

https.get('https://xomox727.github.io/xomox727/assets/index-BAyTeh6b.js', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Look for image strings
    const matches = data.match(/assets\/[^"']+\.(png|jpg|svg)/g);
    if (matches) {
      console.log('Found paths:', [...new Set(matches)]);
    } else {
      console.log('No assets found');
    }
  });
});
