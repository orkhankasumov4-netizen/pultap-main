import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateSitemap() {
  try {
    const appTsxPath = path.resolve(__dirname, "../src/App.tsx");
    if (!fs.existsSync(appTsxPath)) return;
    
    const appTsxContent = fs.readFileSync(appTsxPath, "utf-8");
    
    const routeRegex = /<Route\s+path="([^"]+)"/g;
    let match;
    const staticRoutes = new Set<string>();
    
    while ((match = routeRegex.exec(appTsxContent)) !== null) {
      const route = match[1];
      if (!route.includes(":") && route !== "*") {
        const fullRoute = route.startsWith("/") ? route : "/" + route;
        if (fullRoute !== "/") {
          staticRoutes.add(fullRoute);
        }
      }
    }
    
    // Convert to array and put "/" at the beginning
    const allRoutes = ["/", ...Array.from(staticRoutes)];
    
    const langs = ["az", "en", "ru"];
    const baseUrl = "https://pultap.az"; 
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    allRoutes.forEach(route => {
      const pathPart = route === "/" ? "/" : route;
      const langPathPart = route === "/" ? "" : route;
      xml += `  <url>\n    <loc>${baseUrl}${pathPart}</loc>\n  </url>\n`;
      langs.slice(1).forEach(lang => {
        xml += `  <url>\n    <loc>${baseUrl}/${lang}${langPathPart}</loc>\n  </url>\n`;
      });
    });
    
    xml += `</urlset>`;
    
    const publicDir = path.resolve(__dirname, "../public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(path.resolve(publicDir, "sitemap.xml"), xml);
    console.log(`[Sitemap Generator] Generated sitemap.xml with ${staticRoutes.size * langs.length} URLs.`);
  } catch (error) {
    console.error("[Sitemap Generator] Failed to generate sitemap:", error);
  }
}
