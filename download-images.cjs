const fs = require('fs');
const path = require('path');
const https = require('https');

// Create necessary directories
const createDirs = () => {
  const dirs = [
    'public/images',
    'src/assets',
    'src/assets/fonts',
    'src/assets/images',
    'src/components',
    'src/pages'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Download a file from URL
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
};

// Main function to download all assets
const downloadAssets = async () => {
  createDirs();
  
  // List of files to download (URL and destination path)
  const filesToDownload = [
    // Fonts
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a208be9cc791c_PPRightGrotesk-SpatialBlack.woff2',
      dest: 'src/assets/fonts/PPRightGrotesk-SpatialBlack.woff2'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a207a27cc791b_PPRightGrotesk-SpatialBlack.eot',
      dest: 'src/assets/fonts/PPRightGrotesk-SpatialBlack.eot'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a203d52cc791d_PPRightGrotesk-SpatialBlack.woff',
      dest: 'src/assets/fonts/PPRightGrotesk-SpatialBlack.woff'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a206cdacc791e_PPRightGrotesk-SpatialBlack.ttf',
      dest: 'src/assets/fonts/PPRightGrotesk-SpatialBlack.ttf'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a209dc5cc791f_PPRightGrotesk-SpatialBlack.otf',
      dest: 'src/assets/fonts/PPRightGrotesk-SpatialBlack.otf'
    },
    
    // Images
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a2076edcc793c_icon-256w.png',
      dest: 'public/images/icon-256w.png'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a2027c9cc7921_single-bot%402x.png',
      dest: 'public/images/single-bot@2x.png'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20d421cc792f_pattern-bg.png',
      dest: 'src/assets/images/pattern-bg.png'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a203344cc7933_diagrams.png',
      dest: 'src/assets/images/diagrams.png'
    },
    
    // Robot SVGs
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20469ccc7929_hero-image11.svg',
      dest: 'public/images/hero-image11.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20761fcc792b_hero-image01.svg',
      dest: 'public/images/hero-image01.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20a3d2cc7924_hero-image10.svg',
      dest: 'public/images/hero-image10.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20a3d2cc7924_hero-image04.svg',
      dest: 'public/images/hero-image04.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a207e33cc7926_hero-image04.svg',
      dest: 'public/images/hero-image04.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a200123cc7923_hero-image07.svg',
      dest: 'public/images/hero-image07.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a2072b6cc7927_hero-image05.svg',
      dest: 'public/images/hero-image05.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a202e6ecc792c_hero-image03.svg',
      dest: 'public/images/hero-image03.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20e1a7cc7928_hero-image08.svg',
      dest: 'public/images/hero-image08.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20d19fcc792d_hero-image09.svg',
      dest: 'public/images/hero-image09.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20726acc792e_hero-image06.svg',
      dest: 'public/images/hero-image06.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20c04acc792a_hero-image02.svg',
      dest: 'public/images/hero-image02.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20a27dcc795d_rarity.svg',
      dest: 'public/images/rarity.svg'
    },
    
    // FAQ section images
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a205232cc7934_80s%20Pop.svg',
      dest: 'public/images/80s Pop.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20725bcc796d_Body.svg',
      dest: 'public/images/Body.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20fcd3cc7970_Gradient%20Shades.svg',
      dest: 'public/images/Gradient Shades.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a203db1cc796c_light.svg',
      dest: 'public/images/light.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a201202cc7938_Helmet.svg',
      dest: 'public/images/Helmet.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20811dcc7936_Ear.svg',
      dest: 'public/images/Ear.svg'
    },
    {
      url: 'https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a2005f6cc7937_Exploded%20Head.svg',
      dest: 'public/images/Exploded Head.svg'
    },
  ];
  
  // Download each file sequentially
  for (const file of filesToDownload) {
    try {
      await downloadFile(file.url, file.dest);
    } catch (error) {
      console.error(`Error downloading ${file.url}: ${error.message}`);
    }
  }
  
  console.log('Download completed!');
};

// Execute the download function
downloadAssets().catch(console.error);