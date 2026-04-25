import fs from "fs";
import path from "path";

// A simple script to extract routes and generate sitemap.xml
function generateSitemap() {
  const appTsxContent = fs.readFileSync(path.resolve(__dirname, "src/App.tsx"), "utf-8");
  
  // Extract static routes
  const routeRegex = /<Route\s+path="([^"]+)"/g;
  let match;
  const staticRoutes = new Set<string>();
  
  while ((match = routeRegex.exec(appTsxContent)) !== null) {
    const route = match[1];
    if (!route.includes(":") && route !== "*") {
      staticRoutes.add("/" + route);
    }
  }
  
  // Base routes always present
  staticRoutes.add("/");
  
  const langs = ["az", "en", "ru"];
  const baseUrl = "https://pultap.az"; // Replace with actual domain
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  staticRoutes.forEach(route => {
    // For default language (AZ)
    xml += `  <url>\n    <loc>${baseUrl}${route === "/" ? "" : route}</loc>\n  </url>\n`;
    // For other languages
    langs.slice(1).forEach(lang => {
      xml += `  <url>\n    <loc>${baseUrl}/${lang}${route === "/" ? "" : route}</loc>\n  </url>\n`;
    });
  });
  
  // TODO: we can also parse finance.ts to get dynamic slugs if we want.
  
  xml += `</urlset>`;
  
  fs.writeFileSync(path.resolve(__dirname, "public/sitemap.xml"), xml);
  console.log("✅ sitemap.xml generated with", staticRoutes.size * langs.length, "routes.");
}

generateSitemap();
