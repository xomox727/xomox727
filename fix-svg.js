const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'src', 'identity-5.svg');
let svgContent = fs.readFileSync(svgPath, 'utf8');

// Extract the base64 image part
const imageMatch = svgContent.match(/<image.*?(xlink:href="data:image\/png;base64,[^"]+").*?\/>/);
if (!imageMatch) {
    console.error("Could not find base64 image");
    process.exit(1);
}

const hrefAttr = imageMatch[1]; // this captures xlink:href="..."

// Build the new SVG content
const newSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1125 2430">
  <defs>
    <filter id="recolor">
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.341176 
        0 0 0 0 0.341176 
        0 0 0 0 0.341176 
        -0.2126 -0.7152 -0.0722 0 1" />
    </filter>
  </defs>
  <g transform="matrix(0.939185, 0, 0, 0.938904, 222.634763, 870.410208)">
    <image filter="url(#recolor)" x="0" y="0" width="724" ${hrefAttr} />
  </g>
</svg>`;

fs.writeFileSync(svgPath, newSvg, 'utf8');
console.log("Successfully rewrote identity-5.svg");
