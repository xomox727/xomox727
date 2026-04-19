const fs = require('fs');

const b64 = fs.readFileSync('image_node.txt', 'utf8');
const match = b64.match(/base64,([^"]+)/);
if (!match) {
  console.log("No base64 found");
  process.exit(1);
}

const buffer = Buffer.from(match[1], 'base64');
fs.writeFileSync('temp.png', buffer);
console.log("Wrote temp.png");
