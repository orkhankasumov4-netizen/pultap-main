const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add Suspense and lazy to react import
if (!code.includes('import { lazy, Suspense }')) {
  code = `import { lazy, Suspense } from "react";\n` + code;
}

// Find and replace default imports
code = code.replace(/import (\w+) from "\.\/pages\/([^"]+)";/g, 'const $1 = lazy(() => import("./pages/$2"));');

// Find and replace named imports that are pages
code = code.replace(/import { (\w+) } from "\.\/pages\/admin\/([^"]+)";/g, 'const $1 = lazy(() => import("./pages/admin/$2").then(m => ({ default: m.$1 })));');
code = code.replace(/import { (\w+) } from "\.\/pages\/auth\/([^"]+)";/g, 'const $1 = lazy(() => import("./pages/auth/$2").then(m => ({ default: m.$1 })));');
code = code.replace(/import { OfflinePage } from "\.\/pages\/OfflinePage";/, 'const OfflinePage = lazy(() => import("./pages/OfflinePage").then(m => ({ default: m.OfflinePage })));');

// We need to wrap the Routes in Suspense, or each Route individually.
// It's easiest to wrap `<Routes>` in `<Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>`

code = code.replace(/<Routes>/, `<Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>\n              <Routes>`);
code = code.replace(/<\/Routes>/, `</Routes>\n            </Suspense>`);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx patched for lazy loading');
