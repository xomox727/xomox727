import https from 'https';

https.get('https://ithelp.ithome.com.tw/articles/10391007', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/<code[^>]*>([\s\S]*?)<\/code>/g);
    if (match) {
      console.log(match.join('\n\n').substring(0, 4000));
    } else {
      console.log("No code blocks found.");
    }
  });
}).on('error', (err) => {
  console.error(err);
});
