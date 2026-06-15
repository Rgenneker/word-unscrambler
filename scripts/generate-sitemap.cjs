const fs = require("fs-extra");
const path = require("path");

const words = require("an-array-of-english-words");

const SITE_URL = "https://wordshuffl.com";
const MAX_URLS_PER_SITEMAP = 50000;

function createUrlBlock(word) {
  const cleanWord = encodeURIComponent(word.toLowerCase());

  return `
  <url>
    <loc>${SITE_URL}/word/${cleanWord}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

async function generateSitemaps() {
  const cleanWords = words.filter((word) => word && typeof word === "string");

  const chunks = [];
  for (let i = 0; i < cleanWords.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(cleanWords.slice(i, i + MAX_URLS_PER_SITEMAP));
  }

  for (let i = 0; i < chunks.length; i++) {
    const urls = chunks[i].map(createUrlBlock).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    await fs.writeFile(
      path.join(__dirname, `../public/sitemap-${i + 1}.xml`),
      sitemap.trim()
    );
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks
  .map(
    (_, i) => `
  <sitemap>
    <loc>${SITE_URL}/sitemap-${i + 1}.xml</loc>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

  await fs.writeFile(
    path.join(__dirname, "../public/sitemap-index.xml"),
    sitemapIndex.trim()
  );

  console.log(`Generated ${chunks.length} sitemap files for ${cleanWords.length} word URLs.`);
}

generateSitemaps();