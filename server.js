const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Lost?');
});

app.get('/proxy', async (req, res) => {
  const targetUrl = 'https://www.gadgets360.com/home-appliances/air-conditioners-price-list/';

  try {
    const response = await axios.get(targetUrl);

    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Frame-Options');

    res.set('Content-Type', 'text/html');

    res.send(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).send('Error fetching content from the target URL');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






// const express = require('express');
// const puppeteer = require('puppeteer');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Enable CORS
// app.use(cors());

// // In-memory cache to store fetched content
// const cache = new Map();

// // Proxy endpoint to fetch content using Puppeteer (for rendering ads and JS)
// app.get('/proxy', async (req, res) => {
//   const targetUrl = 'https://www.gadgets360.com/';

//   // Check if the content is cached
//   if (cache.has(targetUrl)) {
//     console.log('Returning cached content...');
//     return res.send(cache.get(targetUrl));  // Send cached content
//   }

//   try {
//     // Launch Puppeteer browser
//     const browser = await puppeteer.launch({ headless: true });  // 'headless: true' runs Puppeteer in background (no GUI)
//     const page = await browser.newPage();

//     // Set a user agent to simulate a real browser (important for ad serving)
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    
//     // Navigate to the target URL and wait for the page to fully load
//     await page.goto(targetUrl, { waitUntil: 'networkidle2' });  // 'networkidle2' ensures that the page has finished loading all resources

//     // Get the fully rendered HTML
//     const content = await page.content();

//     // Cache the rendered HTML for future requests
//     cache.set(targetUrl, content);

//     // Send the rendered content to the client
//     res.set('Content-Type', 'text/html');  // Ensure the response is treated as HTML
//     res.send(content);

//     // Close the Puppeteer browser instance after content is fetched
//     await browser.close();
//   } catch (error) {
//     console.error('Error fetching content with Puppeteer:', error);
//     res.status(500).send('Error rendering content with Puppeteer');
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
