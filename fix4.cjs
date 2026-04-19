const fs = require('fs');

const svgPath = 'src/identity-5.svg';
let s = fs.readFileSync(svgPath, 'utf8');

// Find where <image starts
const imgStart = s.indexOf('<image ');
const imgEnd = s.lastIndexOf('</g></g></g></svg>');

if (imgStart == -1 || imgEnd == -1) {
  console.log("Could not find image tag or SVG end");
  process.exit(1);
}

const imageTag = s.substring(imgStart, imgEnd);

// Add filter to imageTag and close it properly
// The imageTag currently is: <image x="0" y="0" width="..." xlink:href="..." height="..." preserveAspectRatio="..." />
// Wait, the ending from my script output was: height="733" preserveAspectRatio="xMidYMid meet"/></g></g></g></svg>
// So the image string actually ends with "/>" !
let fixedImageTag = imageTag.replace('<image ', '<image filter="url(#recolor)" ');

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
    ` + fixedImageTag + `
  </g>
</svg>`;

fs.writeFileSync(svgPath, newSvg, 'utf8');
console.log("SUCCESS");
