# Project Codebase Dump

## File: check_error.js

```js
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText)
  );

  await page.goto('http://localhost:5174/');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();

```

---

## File: components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

---

## File: eslint.config.js

```js
import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
);

```

---

## File: firebase.ts

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDITTDkAnnltIZA1EZAKxY4A7KBUbAqqpM",
  authDomain: "zulad-89115.firebaseapp.com",
  projectId: "zulad-89115",
  storageBucket: "zulad-89115.firebasestorage.app",
  messagingSenderId: "389509460096",
  appId: "1:389509460096:web:cfe55f4ebded136bbf7665",
  measurementId: "G-LMN9LKP9WG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

```

---

## File: index.html

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>Novario — Premium news, every hour</title>
    <meta name="description" content="Novario delivers premium, fast, and independent news from India and the world." />
    <meta name="theme-color" content="#1a1d2e" />
    <meta property="og:title" content="Novario — Premium news, every hour" />
    <meta property="og:description" content="Premium, fast, independent news." />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="dark bg-background text-foreground">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').catch(() => {});
        });
      }
    </script>
  </body>
</html>

```

---

## File: package-lock.json

```json
{
  "name": "novario-news-ovii-chat",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "novario-news-ovii-chat",
      "dependencies": {
        "@hookform/resolvers": "^5.2.2",
        "@radix-ui/react-accordion": "^1.2.12",
        "@radix-ui/react-alert-dialog": "^1.1.15",
        "@radix-ui/react-aspect-ratio": "^1.1.8",
        "@radix-ui/react-avatar": "^1.1.11",
        "@radix-ui/react-checkbox": "^1.3.3",
        "@radix-ui/react-collapsible": "^1.1.12",
        "@radix-ui/react-context-menu": "^2.2.16",
        "@radix-ui/react-dialog": "^1.1.15",
        "@radix-ui/react-dropdown-menu": "^2.1.16",
        "@radix-ui/react-hover-card": "^1.1.15",
        "@radix-ui/react-label": "^2.1.8",
        "@radix-ui/react-menubar": "^1.1.16",
        "@radix-ui/react-navigation-menu": "^1.2.14",
        "@radix-ui/react-popover": "^1.1.15",
        "@radix-ui/react-progress": "^1.1.8",
        "@radix-ui/react-radio-group": "^1.3.8",
        "@radix-ui/react-scroll-area": "^1.2.10",
        "@radix-ui/react-select": "^2.2.6",
        "@radix-ui/react-separator": "^1.1.8",
        "@radix-ui/react-slider": "^1.3.6",
        "@radix-ui/react-slot": "^1.2.4",
        "@radix-ui/react-switch": "^1.2.6",
        "@radix-ui/react-tabs": "^1.1.13",
        "@radix-ui/react-toggle": "^1.1.10",
        "@radix-ui/react-toggle-group": "^1.1.11",
        "@radix-ui/react-tooltip": "^1.2.8",
        "@tanstack/react-query": "^5.83.0",
        "@tanstack/react-router": "^1.168.0",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "cmdk": "^1.1.1",
        "date-fns": "^4.1.0",
        "embla-carousel-react": "^8.6.0",
        "emoji-picker-react": "^4.19.1",
        "firebase": "^12.12.1",
        "framer-motion": "^12.38.0",
        "input-otp": "^1.4.2",
        "lucide-react": "^0.575.0",
        "react": "^19.2.0",
        "react-day-picker": "^9.14.0",
        "react-dom": "^19.2.0",
        "react-hook-form": "^7.71.2",
        "react-resizable-panels": "^4.6.5",
        "recharts": "^2.15.4",
        "sonner": "^2.0.7",
        "tailwind-merge": "^3.5.0",
        "tailwindcss": "^4.2.1",
        "tw-animate-css": "^1.3.4",
        "vaul": "^1.1.2",
        "wavesurfer.js": "^7.12.6",
        "zod": "^3.24.2"
      },
      "devDependencies": {
        "@eslint/js": "^9.32.0",
        "@tailwindcss/vite": "^4.2.1",
        "@types/node": "^22.16.5",
        "@types/react": "^19.2.0",
        "@types/react-dom": "^19.2.0",
        "@vitejs/plugin-react": "^5.0.4",
        "eslint": "^9.32.0",
        "eslint-config-prettier": "^10.1.1",
        "eslint-plugin-prettier": "^5.2.6",
        "eslint-plugin-react-hooks": "^5.2.0",
        "eslint-plugin-react-refresh": "^0.4.20",
        "globals": "^15.15.0",
        "prettier": "^3.7.3",
        "typescript": "^5.8.3",
        "typescript-eslint": "^8.56.1",
        "vite": "^6.3.5",
        "vite-tsconfig-paths": "^6.0.2"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.2.tgz",
      "integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.2.tgz",
      "integrity": "sha512-JiDShH45zKHWyGe4ZNVRrCjBz8Nh9TMmZG1kh4QTK8hCBTWBi8Da+i7s1fJw7/lYpM4ccepSNfqzZ/QvABBi5g==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@date-fns/tz": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/@date-fns/tz/-/tz-1.4.1.tgz",
      "integrity": "sha512-P5LUNhtbj6YfI3iJjw5EL9eUAG6OitD0W3fWQcpQjDRc/QIsL0tRNuO1PcDvPccWL1fSTXXdE1ds+l95DV/OFA==",
      "license": "MIT"
    },
    "node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.12.tgz",
      "integrity": "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.12.tgz",
      "integrity": "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.12.tgz",
      "integrity": "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.12.tgz",
      "integrity": "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.12.tgz",
      "integrity": "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.12.tgz",
      "integrity": "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.12.tgz",
      "integrity": "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.12.tgz",
      "integrity": "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.12.tgz",
      "integrity": "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.12.tgz",
      "integrity": "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.12.tgz",
      "integrity": "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.12.tgz",
      "integrity": "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.12.tgz",
      "integrity": "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.12.tgz",
      "integrity": "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.12.tgz",
      "integrity": "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.12.tgz",
      "integrity": "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.12.tgz",
      "integrity": "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.12.tgz",
      "integrity": "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.12.tgz",
      "integrity": "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.12.tgz",
      "integrity": "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.12.tgz",
      "integrity": "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.12.tgz",
      "integrity": "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.12.tgz",
      "integrity": "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.12.tgz",
      "integrity": "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.5.tgz",
      "integrity": "sha512-4IlJx0X0qftVsN5E+/vGujTRIFtwuLbNsVUe7TO6zYPDR1O6nFwvwhIKEKSrl6dZchmYBITazxKoUYOjdtjlRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.1",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.4.tgz",
      "integrity": "sha512-nE7DEIchvtiFTwBw4Lfbu59PG+kCofhjsKaCWzxTpt4lfRjRMqG6uMBzKXuEcyXhOHoUp9riAm7/aWYGhXZ9cw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@firebase/ai": {
      "version": "2.11.1",
      "resolved": "https://registry.npmjs.org/@firebase/ai/-/ai-2.11.1.tgz",
      "integrity": "sha512-WGTF81W3WBKJY+c7xqTzO15OGAkCAs8cpADqflAI0skhTZjIkhF0qyf55rq4Ctt6jKygkv99rPfMrjAHTgXaVQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check-interop-types": "0.3.3",
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x",
        "@firebase/app-types": "0.x"
      }
    },
    "node_modules/@firebase/analytics": {
      "version": "0.10.21",
      "resolved": "https://registry.npmjs.org/@firebase/analytics/-/analytics-0.10.21.tgz",
      "integrity": "sha512-j2y2q65BlgLGB5Pwjhv/Jopw2X/TBTzvAtI5z/DSp56U4wBj7LfhBfzbdCtFPges+Wz0g55GdoawXibOH5jGng==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/installations": "0.6.21",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/analytics-compat": {
      "version": "0.2.27",
      "resolved": "https://registry.npmjs.org/@firebase/analytics-compat/-/analytics-compat-0.2.27.tgz",
      "integrity": "sha512-ZObpYpAxL6JfgH7GnvlDD0sbzGZ0o4nijV8skatV9ZX49hJtCYbFqaEcPYptT94rgX1KUoKEderC7/fa7hybtw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/analytics": "0.10.21",
        "@firebase/analytics-types": "0.8.3",
        "@firebase/component": "0.7.2",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/analytics-types": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/@firebase/analytics-types/-/analytics-types-0.8.3.tgz",
      "integrity": "sha512-VrIp/d8iq2g501qO46uGz3hjbDb8xzYMrbu8Tp0ovzIzrvJZ2fvmj649gTjge/b7cCCcjT0H37g1gVtlNhnkbg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/app": {
      "version": "0.14.11",
      "resolved": "https://registry.npmjs.org/@firebase/app/-/app-0.14.11.tgz",
      "integrity": "sha512-yxADFW35LYkP8oSGobGsYIrI42I+GPCvKTNHx4meT9Yq3C950IVz1eANoBk822I9tbKv1wyv9P4Bv1G5TpucFw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "idb": "7.1.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/app-check": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@firebase/app-check/-/app-check-0.11.2.tgz",
      "integrity": "sha512-jcXQVMHAQ5AEKzVD5C7s5fmAYeFOuN6lAJeNTgZK2B9aLnofWaJt8u1A8Idm8gpsBBYSaY3cVyeH5SWMOVPBLQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/app-check-compat": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@firebase/app-check-compat/-/app-check-compat-0.4.2.tgz",
      "integrity": "sha512-M91NhxqbSkI0ChkJWy69blC+rPr6HEgaeRllddSaU1pQ/7IiegeCQM9pPDIgvWnwnBSzKhUHpe6ro/jhJ+cvzw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check": "0.11.2",
        "@firebase/app-check-types": "0.5.3",
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/app-check-interop-types": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/@firebase/app-check-interop-types/-/app-check-interop-types-0.3.3.tgz",
      "integrity": "sha512-gAlxfPLT2j8bTI/qfe3ahl2I2YcBQ8cFIBdhAQA4I2f3TndcO+22YizyGYuttLHPQEpWkhmpFW60VCFEPg4g5A==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/app-check-types": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/@firebase/app-check-types/-/app-check-types-0.5.3.tgz",
      "integrity": "sha512-hyl5rKSj0QmwPdsAxrI5x1otDlByQ7bvNvVt8G/XPO2CSwE++rmSVf3VEhaeOR4J8ZFaF0Z0NDSmLejPweZ3ng==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/app-compat": {
      "version": "0.5.11",
      "resolved": "https://registry.npmjs.org/@firebase/app-compat/-/app-compat-0.5.11.tgz",
      "integrity": "sha512-KaACDjXkK5VLpI01vEs592R7/8s5DjFdIXfKoR385ly1SmK3Tu+jMHCIB4MsiY5jsez6v7VlEX/3rJ90dVkHyA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app": "0.14.11",
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/app-types": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/@firebase/app-types/-/app-types-0.9.4.tgz",
      "integrity": "sha512-crX9TA5SVYZwLPG7/R16IsH8FLlgkPXjJUVhsVpHVDSqJiq3D/NuFTM5ctxGTExXAOeIn//69tQw47CPerM8MQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/logger": "0.5.0"
      }
    },
    "node_modules/@firebase/auth": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@firebase/auth/-/auth-1.13.0.tgz",
      "integrity": "sha512-mKkSLNym3UbnnZ06dAmtqzp5EpPGCANGCZDJbkoR135aoUdKG6Aizwcnp29RzsQpwH0nmy5nay17Sfbsh9oY8A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x",
        "@react-native-async-storage/async-storage": "^2.2.0 || ^3.0.0"
      },
      "peerDependenciesMeta": {
        "@react-native-async-storage/async-storage": {
          "optional": true
        }
      }
    },
    "node_modules/@firebase/auth-compat": {
      "version": "0.6.5",
      "resolved": "https://registry.npmjs.org/@firebase/auth-compat/-/auth-compat-0.6.5.tgz",
      "integrity": "sha512-IfVsafZ3QiXbsydXTP/XMI0wVYbJLI1rkb8Qqf03/h5FnL+upbbPOb+6Yj3RpcX+Y1iP5Uh18lxTHlXfbiyAow==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/auth": "1.13.0",
        "@firebase/auth-types": "0.13.0",
        "@firebase/component": "0.7.2",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/auth-interop-types": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/@firebase/auth-interop-types/-/auth-interop-types-0.2.4.tgz",
      "integrity": "sha512-JPgcXKCuO+CWqGDnigBtvo09HeBs5u/Ktc2GaFj2m01hLarbxthLNm7Fk8iOP1aqAtXV+fnnGj7U28xmk7IwVA==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/auth-types": {
      "version": "0.13.0",
      "resolved": "https://registry.npmjs.org/@firebase/auth-types/-/auth-types-0.13.0.tgz",
      "integrity": "sha512-S/PuIjni0AQRLF+l9ck0YpsMOdE8GO2KU6ubmBB7P+7TJUCQDa3R1dlgYm9UzGbbePMZsp0xzB93f2b/CgxMOg==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x",
        "@firebase/util": "1.x"
      }
    },
    "node_modules/@firebase/component": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/@firebase/component/-/component-0.7.2.tgz",
      "integrity": "sha512-iyVDGc6Vjx7Rm0cAdccLH/NG6fADsgJak/XW9IA2lPf8AjIlsemOpFGKczYyPHxm4rnKdR8z6sK4+KEC7NwmEg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/data-connect": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@firebase/data-connect/-/data-connect-0.6.0.tgz",
      "integrity": "sha512-OiugPRcdlhqXF97oR9CjVObILmsWU0dFUS0gXNYEe4bDfpW8pZmQ5GqhIPPtLWbT/0W2lMJJD7VILFMk+xuHPg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/auth-interop-types": "0.2.4",
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/database": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@firebase/database/-/database-1.1.2.tgz",
      "integrity": "sha512-lP96CMjMPy/+d1d9qaaHjHHdzdwvEOuyyLq9ehX89e2XMKwS1jHNzYBO+42bdSumuj5ukPbmnFtViZu8YOMT+w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check-interop-types": "0.3.3",
        "@firebase/auth-interop-types": "0.2.4",
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "faye-websocket": "0.11.4",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/database-compat": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/@firebase/database-compat/-/database-compat-2.1.3.tgz",
      "integrity": "sha512-GMyfWjD8mehjg/QpNkY/tl9G/MoeugPeg91n9D0atggxbWuKF/2KhVPHZDH+XmoP0EKYqMWYTtKxBsaBaNKLYQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/database": "1.1.2",
        "@firebase/database-types": "1.0.19",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/database-types": {
      "version": "1.0.19",
      "resolved": "https://registry.npmjs.org/@firebase/database-types/-/database-types-1.0.19.tgz",
      "integrity": "sha512-FqewjUZmV9LqFfuEnmgdcUpiOUz7qwLXxnm/H8BcMFEzQXtd1yyUDm8ex5VRad2nuTE+ahOuCjUAM/cyDncO+g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-types": "0.9.4",
        "@firebase/util": "1.15.0"
      }
    },
    "node_modules/@firebase/firestore": {
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/@firebase/firestore/-/firestore-4.14.0.tgz",
      "integrity": "sha512-bZc6YOjRkMBVA16527tgzi6iN9n//xRB3Mmx/R+Gr6UAP/+xrIKOejQIcn1hh+tCzNT8jO0jI+kWox5J4tB/qQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "@firebase/webchannel-wrapper": "1.0.5",
        "@grpc/grpc-js": "~1.9.0",
        "@grpc/proto-loader": "^0.7.8",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/firestore-compat": {
      "version": "0.4.8",
      "resolved": "https://registry.npmjs.org/@firebase/firestore-compat/-/firestore-compat-0.4.8.tgz",
      "integrity": "sha512-WK9NJRpnosGD2nuyjdr7K+Ht7AxRYJlTF62myI4rRA7ibJOosbecvjacR5oirJ7s1BgNS6qzcBw7n4fD3a5w1w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/firestore": "4.14.0",
        "@firebase/firestore-types": "3.0.3",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/firestore-types": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@firebase/firestore-types/-/firestore-types-3.0.3.tgz",
      "integrity": "sha512-hD2jGdiWRxB/eZWF89xcK9gF8wvENDJkzpVFb4aGkzfEaKxVRD1kjz1t1Wj8VZEp2LCB53Yx1zD8mrhQu87R6Q==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x",
        "@firebase/util": "1.x"
      }
    },
    "node_modules/@firebase/functions": {
      "version": "0.13.3",
      "resolved": "https://registry.npmjs.org/@firebase/functions/-/functions-0.13.3.tgz",
      "integrity": "sha512-csO7ckK3SSs+NUZW1nms9EK7ckHe/1QOjiP8uAkCYa7ND18s44vjE9g3KxEeIUpyEPqZaX1EhJuFyZjHigAcYw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check-interop-types": "0.3.3",
        "@firebase/auth-interop-types": "0.2.4",
        "@firebase/component": "0.7.2",
        "@firebase/messaging-interop-types": "0.2.3",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/functions-compat": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@firebase/functions-compat/-/functions-compat-0.4.3.tgz",
      "integrity": "sha512-BxkEwWgx1of0tKaao/r2VR6WBLk/RAiyztatiONPrPE8gkitFkOnOCxf8i9cUyA5hX5RGt5H30uNn25Q6QNEmQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/functions": "0.13.3",
        "@firebase/functions-types": "0.6.3",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/functions-types": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/@firebase/functions-types/-/functions-types-0.6.3.tgz",
      "integrity": "sha512-EZoDKQLUHFKNx6VLipQwrSMh01A1SaL3Wg6Hpi//x6/fJ6Ee4hrAeswK99I5Ht8roiniKHw4iO0B1Oxj5I4plg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/installations": {
      "version": "0.6.21",
      "resolved": "https://registry.npmjs.org/@firebase/installations/-/installations-0.6.21.tgz",
      "integrity": "sha512-xGFGTeICJZ5vhrmmDukeczIcFULFXybojML2+QSDFoKj5A7zbGN7KzFGSKNhDkIxpjzsYG9IleJyUebuAcmqWA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/util": "1.15.0",
        "idb": "7.1.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/installations-compat": {
      "version": "0.2.21",
      "resolved": "https://registry.npmjs.org/@firebase/installations-compat/-/installations-compat-0.2.21.tgz",
      "integrity": "sha512-zahIUkaVKbR8zmTeBHkdfaVl6JGWlhVoSjF7CVH33nFqD3SlPEpEEegn2GNT5iAfsVdtlCyJJ9GW4YKjq+RJKQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/installations": "0.6.21",
        "@firebase/installations-types": "0.5.3",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/installations-types": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/@firebase/installations-types/-/installations-types-0.5.3.tgz",
      "integrity": "sha512-2FJI7gkLqIE0iYsNQ1P751lO3hER+Umykel+TkLwHj6plzWVxqvfclPUZhcKFVQObqloEBTmpi2Ozn7EkCABAA==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x"
      }
    },
    "node_modules/@firebase/logger": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/@firebase/logger/-/logger-0.5.0.tgz",
      "integrity": "sha512-cGskaAvkrnh42b3BA3doDWeBmuHFO/Mx5A83rbRDYakPjO9bJtRL3dX7javzc2Rr/JHZf4HlterTW2lUkfeN4g==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/messaging": {
      "version": "0.12.25",
      "resolved": "https://registry.npmjs.org/@firebase/messaging/-/messaging-0.12.25.tgz",
      "integrity": "sha512-7RhDwoDHlOK1/ou0/LeubxmjcngsTjDdrY/ssg2vwAVpUuVAhQzQvuCAOYxcX5wNC1zCgQ54AP1vdngBwbCmOQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/installations": "0.6.21",
        "@firebase/messaging-interop-types": "0.2.3",
        "@firebase/util": "1.15.0",
        "idb": "7.1.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/messaging-compat": {
      "version": "0.2.25",
      "resolved": "https://registry.npmjs.org/@firebase/messaging-compat/-/messaging-compat-0.2.25.tgz",
      "integrity": "sha512-eoOQqGLtRlseTdiemTN44LlHZpltK5gnhq8XVUuLgtIOG+odtDzrz2UoTpcJWSzaJQVxNLb/x9f39tHdDM4N4w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/messaging": "0.12.25",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/messaging-interop-types": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/@firebase/messaging-interop-types/-/messaging-interop-types-0.2.3.tgz",
      "integrity": "sha512-xfzFaJpzcmtDjycpDeCUj0Ge10ATFi/VHVIvEEjDNc3hodVBQADZ7BWQU7CuFpjSHE+eLuBI13z5F/9xOoGX8Q==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/performance": {
      "version": "0.7.11",
      "resolved": "https://registry.npmjs.org/@firebase/performance/-/performance-0.7.11.tgz",
      "integrity": "sha512-V3uAhrz7IYJuji+OgT3qYTGKxpek/TViXti9OSsUJ4AexZ3jQjYH5Yrn7JvBxk8MGiSLsC872hh+BxQiPZsm7g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/installations": "0.6.21",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0",
        "web-vitals": "^4.2.4"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/performance-compat": {
      "version": "0.2.24",
      "resolved": "https://registry.npmjs.org/@firebase/performance-compat/-/performance-compat-0.2.24.tgz",
      "integrity": "sha512-YRlejH8wLt7ThWao+HXoKUHUrZKGYq+otxkPS+8nuE5PeN1cBXX7NAJl9ueuUkBwMIrnKdnDqL/voHXxDAAt3g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/performance": "0.7.11",
        "@firebase/performance-types": "0.2.3",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/performance-types": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/@firebase/performance-types/-/performance-types-0.2.3.tgz",
      "integrity": "sha512-IgkyTz6QZVPAq8GSkLYJvwSLr3LS9+V6vNPQr0x4YozZJiLF5jYixj0amDtATf1X0EtYHqoPO48a9ija8GocxQ==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/remote-config": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/@firebase/remote-config/-/remote-config-0.8.2.tgz",
      "integrity": "sha512-5EXqOThV4upjK9D38d/qOSVwOqRhemlaOFk9vCkMNNALeIlwr+4pLjtLNo4qoY8etQmU/1q4aIATE9N8PFqg0g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/installations": "0.6.21",
        "@firebase/logger": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/remote-config-compat": {
      "version": "0.2.23",
      "resolved": "https://registry.npmjs.org/@firebase/remote-config-compat/-/remote-config-compat-0.2.23.tgz",
      "integrity": "sha512-4+KqRRHEUUmKT6tFmnpWATOsaFfmSuBs1jXH8JzVtMLEYqq/WS9IDM92OdefFDSrAA2xGd0WN004z8mKeIIscw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/logger": "0.5.0",
        "@firebase/remote-config": "0.8.2",
        "@firebase/remote-config-types": "0.5.0",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/remote-config-types": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/@firebase/remote-config-types/-/remote-config-types-0.5.0.tgz",
      "integrity": "sha512-vI3bqLoF14L/GchtgayMiFpZJF+Ao3uR8WCde0XpYNkSokDpAKca2DxvcfeZv7lZUqkUwQPL2wD83d3vQ4vvrg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/storage": {
      "version": "0.14.2",
      "resolved": "https://registry.npmjs.org/@firebase/storage/-/storage-0.14.2.tgz",
      "integrity": "sha512-o/culaTeJ8GRpKXRJov21rux/n9dRaSOWLebyatFP2sqEdCxQPjVA1H9Z2fzYwQxMIU0JVmC7SPPmU11v7L6vQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/storage-compat": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@firebase/storage-compat/-/storage-compat-0.4.2.tgz",
      "integrity": "sha512-R+aB38wxCH5zjIO/xu9KznI7fgiPuZAG98uVm1NcidHyyupGgIDLKigGmRGBZMnxibe/m2oxNKoZpfEbUX2aQQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.2",
        "@firebase/storage": "0.14.2",
        "@firebase/storage-types": "0.8.3",
        "@firebase/util": "1.15.0",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/storage-types": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/@firebase/storage-types/-/storage-types-0.8.3.tgz",
      "integrity": "sha512-+Muk7g9uwngTpd8xn9OdF/D48uiQ7I1Fae7ULsWPuKoCH3HU7bfFPhxtJYzyhjdniowhuDpQcfPmuNRAqZEfvg==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x",
        "@firebase/util": "1.x"
      }
    },
    "node_modules/@firebase/util": {
      "version": "1.15.0",
      "resolved": "https://registry.npmjs.org/@firebase/util/-/util-1.15.0.tgz",
      "integrity": "sha512-AmWf3cHAOMbrCPG4xdPKQaj5iHnyYfyLKZxwz+Xf55bqKbpAmcYifB4jQinT2W9XhDRHISOoPyBOariJpCG6FA==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/webchannel-wrapper": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/@firebase/webchannel-wrapper/-/webchannel-wrapper-1.0.5.tgz",
      "integrity": "sha512-+uGNN7rkfn41HLO0vekTFhTxk61eKa8mTpRGLO0QSqlQdKvIoGAvLp3ppdVIWbTGYJWM6Kp0iN+PjMIOcnVqTw==",
      "license": "Apache-2.0"
    },
    "node_modules/@floating-ui/core": {
      "version": "1.7.5",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.7.5.tgz",
      "integrity": "sha512-1Ih4WTWyw0+lKyFMcBHGbb5U5FtuHJuujoyyr5zTaWS5EYMeT6Jb2AuDeftsCsEuchO+mM2ij5+q9crhydzLhQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.11"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.7.6",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.7.6.tgz",
      "integrity": "sha512-9gZSAI5XM36880PPMm//9dfiEngYoC6Am2izES1FF406YFsjvyBMmeJ2g4SAju3xWwtuynNRFL2s9hgxpLI5SQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.7.5",
        "@floating-ui/utils": "^0.2.11"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.8",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.8.tgz",
      "integrity": "sha512-cC52bHwM/n/CxS87FH0yWdngEZrjdtLW/qVruo68qg+prK7ZQ4YGdut2GyDVpoGeAYe/h899rVeOVm6Oi40k2A==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.7.6"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.11",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.11.tgz",
      "integrity": "sha512-RiB/yIh78pcIxl6lLMG0CgBXAZ2Y0eVHqMPYugu+9U0AeT6YBeiJpf7lbdJNIugFP5SIjwNRgo4DhR1Qxi26Gg==",
      "license": "MIT"
    },
    "node_modules/@grpc/grpc-js": {
      "version": "1.9.15",
      "resolved": "https://registry.npmjs.org/@grpc/grpc-js/-/grpc-js-1.9.15.tgz",
      "integrity": "sha512-nqE7Hc0AzI+euzUwDAy0aY5hCp10r734gMGRdU+qOPX0XSceI2ULrcXB5U2xSc5VkWwalCj4M7GzCAygZl2KoQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@grpc/proto-loader": "^0.7.8",
        "@types/node": ">=12.12.47"
      },
      "engines": {
        "node": "^8.13.0 || >=10.10.0"
      }
    },
    "node_modules/@grpc/proto-loader": {
      "version": "0.7.15",
      "resolved": "https://registry.npmjs.org/@grpc/proto-loader/-/proto-loader-0.7.15.tgz",
      "integrity": "sha512-tMXdRCfYVixjuFK+Hk0Q1s38gV9zDiDJfWL3h1rv4Qc39oILCu1TRTDt7+fGUI8K4G1Fj125Hx/ru3azECWTyQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "lodash.camelcase": "^4.3.0",
        "long": "^5.0.0",
        "protobufjs": "^7.2.5",
        "yargs": "^17.7.2"
      },
      "bin": {
        "proto-loader-gen-types": "build/bin/proto-loader-gen-types.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@hookform/resolvers": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-5.2.2.tgz",
      "integrity": "sha512-A/IxlMLShx3KjV/HeTcTfaMxdwy690+L/ZADoeaTltLx+CVuzkeVIPuybK3jrRfw7YZnmdKsVVHAlEPIAEUNlA==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/utils": "^0.3.0"
      },
      "peerDependencies": {
        "react-hook-form": "^7.55.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.4.tgz",
      "integrity": "sha512-3NQNNgA1YSlJb/kMH1ildASP9HW7/7kYnRI2szWJaofaS1hWmbGI4H+d3+22aGzXXN9IJ+n+GiFVcGipJP18ow==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"
      }
    },
    "node_modules/@pkgr/core": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/@pkgr/core/-/core-0.2.9.tgz",
      "integrity": "sha512-QNqXyfVS2wm9hweSYD2O7F0G06uurj9kZ96TRQE5Y9hU7+tgdZwIkbAKc5Ocy1HxEY2kuDQa6cQ1WRs/O5LFKA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/pkgr"
      }
    },
    "node_modules/@protobufjs/aspromise": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/aspromise/-/aspromise-1.1.2.tgz",
      "integrity": "sha512-j+gKExEuLmKwvz3OgROXtrJ2UG2x8Ch2YZUxahh+s1F2HZ+wAceUNLkvy6zKCPVRkU++ZWQrdxsUeQXmcg4uoQ==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/base64": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/base64/-/base64-1.1.2.tgz",
      "integrity": "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/codegen": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@protobufjs/codegen/-/codegen-2.0.5.tgz",
      "integrity": "sha512-zgXFLzW3Ap33e6d0Wlj4MGIm6Ce8O89n/apUaGNB/jx+hw+ruWEp7EwGUshdLKVRCxZW12fp9r40E1mQrf/34g==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/eventemitter": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/eventemitter/-/eventemitter-1.1.0.tgz",
      "integrity": "sha512-j9ednRT81vYJ9OfVuXG6ERSTdEL1xVsNgqpkxMsbIabzSo3goCjDIveeGv5d03om39ML71RdmrGNjG5SReBP/Q==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/fetch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/fetch/-/fetch-1.1.0.tgz",
      "integrity": "sha512-lljVXpqXebpsijW71PZaCYeIcE5on1w5DlQy5WH6GLbFryLUrBD4932W/E2BSpfRJWseIL4v/KPgBFxDOIdKpQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.1",
        "@protobufjs/inquire": "^1.1.0"
      }
    },
    "node_modules/@protobufjs/float": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/float/-/float-1.0.2.tgz",
      "integrity": "sha512-Ddb+kVXlXst9d+R9PfTIxh1EdNkgoRe5tOX6t01f1lYWOvJnSPDBlG241QLzcyPdoNTsblLUdujGSE4RzrTZGQ==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/inquire": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@protobufjs/inquire/-/inquire-1.1.1.tgz",
      "integrity": "sha512-mnzgDV26ueAvk7rsbt9L7bE0SuAoqyuys/sMMrmVcN5x9VsxpcG3rqAUSgDyLp0UZlmNfIbQ4fHfCtreVBk8Ew==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/path": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/path/-/path-1.1.2.tgz",
      "integrity": "sha512-6JOcJ5Tm08dOHAbdR3GrvP+yUUfkjG5ePsHYczMFLq3ZmMkAD98cDgcT2iA1lJ9NVwFd4tH/iSSoe44YWkltEA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/pool": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/pool/-/pool-1.1.0.tgz",
      "integrity": "sha512-0kELaGSIDBKvcgS4zkjz1PeddatrjYcmMWOlAuAPwAeccUrPHdUqo/J6LiymHHEiJT5NrF1UVwxY14f+fy4WQw==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/utf8": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@protobufjs/utf8/-/utf8-1.1.1.tgz",
      "integrity": "sha512-oOAWABowe8EAbMyWKM0tYDKi8Yaox52D+HWZhAIJqQXbqe0xI/GV7FhLWqlEKreMkfDjshR5FKgi3mnle0h6Eg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@radix-ui/number": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/number/-/number-1.1.1.tgz",
      "integrity": "sha512-MkKCwxlXTgz6CFoJx3pCwn07GKp36+aZyu/u2Ln2VrA5DcdyCZkASEDBTd8x5whTQQL5CiYf4prXKLcgQdv29g==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/primitive": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.3.tgz",
      "integrity": "sha512-JTF99U/6XIjCBo0wqkU5sK10glYe27MRRsfwoiq5zzOEZLHU3A3KCMa5X/azekYRCJ0HlwI0crAXS/5dEHTzDg==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/react-accordion": {
      "version": "1.2.12",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-accordion/-/react-accordion-1.2.12.tgz",
      "integrity": "sha512-T4nygeh9YE9dLRPhAHSeOZi7HBXo+0kYIPJXayZfvWOWA0+n3dESrZbjfDPUABkUNym6Hd+f2IR113To8D2GPA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collapsible": "1.1.12",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-alert-dialog": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-alert-dialog/-/react-alert-dialog-1.1.15.tgz",
      "integrity": "sha512-oTVLkEw5GpdRe29BqJ0LSDFWI3qu0vR1M0mUkOQWDIUnY/QIkLpgDMWuKxP94c2NAC2LGcgVhG1ImF3jkZ5wXw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-dialog": "1.1.15",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-alert-dialog/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-arrow": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.1.7.tgz",
      "integrity": "sha512-F+M1tLhO+mlQaOWspE8Wstg+z6PwxwRd8oQ8IXceWz92kfAmalTRf0EjrouQeo7QssEPfCn05B4Ihs1K9WQ/7w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-aspect-ratio": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-aspect-ratio/-/react-aspect-ratio-1.1.8.tgz",
      "integrity": "sha512-5nZrJTF7gH+e0nZS7/QxFz6tJV4VimhQb1avEgtsJxvvIp5JilL+c58HICsKzPxghdwaDt48hEfPM1au4zGy+w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-aspect-ratio/node_modules/@radix-ui/react-primitive": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.4.tgz",
      "integrity": "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-avatar": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-avatar/-/react-avatar-1.1.11.tgz",
      "integrity": "sha512-0Qk603AHGV28BOBO34p7IgD5m+V5Sg/YovfayABkoDDBM5d3NCx0Mp4gGrjzLGes1jV5eNOE1r3itqOR33VC6Q==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-context": "1.1.3",
        "@radix-ui/react-primitive": "2.1.4",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-is-hydrated": "0.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-avatar/node_modules/@radix-ui/react-context": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.3.tgz",
      "integrity": "sha512-ieIFACdMpYfMEjF0rEf5KLvfVyIkOz6PDGyNnP+u+4xQ6jny3VCgA4OgXOwNx2aUkxn8zx9fiVcM8CfFYv9Lxw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-avatar/node_modules/@radix-ui/react-primitive": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.4.tgz",
      "integrity": "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-checkbox": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-checkbox/-/react-checkbox-1.3.3.tgz",
      "integrity": "sha512-wBbpv+NQftHDdG86Qc0pIyXk5IR3tM8Vd0nWLKDcX8nNn4nXFOFwsKuqw2okA/1D/mpaAkmuyndrPJTYDNZtFw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-previous": "1.1.1",
        "@radix-ui/react-use-size": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collapsible": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collapsible/-/react-collapsible-1.1.12.tgz",
      "integrity": "sha512-Uu+mSh4agx2ib1uIGPP4/CKNULyajb3p92LsVXmH2EHVMTfZWpll88XJ0j4W0z3f8NK1eYl1+Mf/szHPmcHzyA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collection": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.7.tgz",
      "integrity": "sha512-Fh9rGN0MoI4ZFUNyfFVNU4y9LUz93u9/0K+yLgA2bwRojxM8JU1DyvvMBabnZPBgMWREAJvU2jjVzq+LrFUglw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.2.tgz",
      "integrity": "sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.2.tgz",
      "integrity": "sha512-jCi/QKUM2r1Ju5a3J64TH2A5SpKAgh0LpknyqdQ4m6DCV0xJ2HG1xARRwNGPQfi1SLdLWZ1OJz6F4OMBBNiGJA==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context-menu": {
      "version": "2.2.16",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context-menu/-/react-context-menu-2.2.16.tgz",
      "integrity": "sha512-O8morBEW+HsVG28gYDZPTrT9UUovQUlJue5YO836tiTJhuIWBm/zQHc7j388sHWtdH/xUZurK9olD2+pcqx5ww==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-menu": "2.1.16",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.1.15.tgz",
      "integrity": "sha512-TCglVRtzlffRNxRMEyR36DGBLJpeusFcgMVD9PZEzAKnUs1lKCgX5u9BmC2Yg+LL9MgZDugFFs1Vl+Jp4t/PGw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-focus-guards": "1.1.3",
        "@radix-ui/react-focus-scope": "1.1.7",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-direction": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.1.1.tgz",
      "integrity": "sha512-1UEWRX6jnOA2y4H5WczZ44gOOjTEmlqv1uNW4GAJEO5+bauCBhv8snY65Iw5/VOS/ghKN9gr2KjnLKxrsvoMVw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.11.tgz",
      "integrity": "sha512-Nqcp+t5cTB8BinFkZgXiMJniQH0PsUt2k51FUhbdfeKvc4ACcG2uQniY/8+h1Yv6Kza4Q7lD7PQV0z0oicE0Mg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-escape-keydown": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dropdown-menu": {
      "version": "2.1.16",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dropdown-menu/-/react-dropdown-menu-2.1.16.tgz",
      "integrity": "sha512-1PLGQEynI/3OX/ftV54COn+3Sud/Mn8vALg2rWnBLnRaGtJDduNW/22XjlGgPdpcIbiQxjKtb7BkcjP00nqfJw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-menu": "2.1.16",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-guards": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.3.tgz",
      "integrity": "sha512-0rFg/Rj2Q62NCm62jZw0QX7a3sz6QCQU0LpZdNrJX8byRGaGVTqbrW9jAoIAHyMQqsNpeZ81YgSizOt5WXq0Pw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-scope": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.7.tgz",
      "integrity": "sha512-t2ODlkXBQyn7jkl6TNaw/MtVEVvIGelJDCG41Okq/KwUsJBwQ4XVZsHAVUkK4mBv3ewiAS3PGuUWuY2BoK4ZUw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-hover-card": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-hover-card/-/react-hover-card-1.1.15.tgz",
      "integrity": "sha512-qgTkjNT1CfKMoP0rcasmlH2r1DAiYicWsDsufxl940sT2wHNEWWv6FMWIQXWhVdmC1d/HYfbhQx60KYyAtKxjg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-popper": "1.2.8",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-id": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.1.tgz",
      "integrity": "sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label": {
      "version": "2.1.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.1.8.tgz",
      "integrity": "sha512-FmXs37I6hSBVDlO4y764TNz1rLgKwjJMQ0EGte6F3Cb3f4bIuHB/iLa/8I9VKkmOy+gNHq8rql3j686ACVV21A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-primitive": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.4.tgz",
      "integrity": "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menu": {
      "version": "2.1.16",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menu/-/react-menu-2.1.16.tgz",
      "integrity": "sha512-72F2T+PLlphrqLcAotYPp0uJMr5SjP5SL01wfEspJbru5Zs5vQaSHb4VB3ZMJPimgHHCHG7gMOeOB9H3Hdmtxg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-focus-guards": "1.1.3",
        "@radix-ui/react-focus-scope": "1.1.7",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-popper": "1.2.8",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-roving-focus": "1.1.11",
        "@radix-ui/react-slot": "1.2.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menubar": {
      "version": "1.1.16",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menubar/-/react-menubar-1.1.16.tgz",
      "integrity": "sha512-EB1FktTz5xRRi2Er974AUQZWg2yVBb1yjip38/lgwtCVRd3a+maUoGHN/xs9Yv8SY8QwbSEb+YrxGadVWbEutA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-menu": "2.1.16",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-roving-focus": "1.1.11",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-navigation-menu": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-navigation-menu/-/react-navigation-menu-1.2.14.tgz",
      "integrity": "sha512-YB9mTFQvCOAQMHU+C/jVl96WmuWeltyUEpRJJky51huhds5W2FQr1J8D/16sQlf0ozxkPK8uF3niQMdUwZPv5w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-layout-effect": "1.1.1",
        "@radix-ui/react-use-previous": "1.1.1",
        "@radix-ui/react-visually-hidden": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popover": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popover/-/react-popover-1.1.15.tgz",
      "integrity": "sha512-kr0X2+6Yy/vJzLYJUPCZEc8SfQcf+1COFoAqauJm74umQhta9M7lNJHP7QQS3vkvcGLQUbWpMzwrXYwrYztHKA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-focus-guards": "1.1.3",
        "@radix-ui/react-focus-scope": "1.1.7",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-popper": "1.2.8",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popover/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popper": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.2.8.tgz",
      "integrity": "sha512-0NJQ4LFFUuWkE7Oxf0htBKS6zLkkjBH+hM1uk7Ng705ReR8m/uelduy1DBo0PyBXPKVnBA6YBlU94MBGXrSBCw==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react-dom": "^2.0.0",
        "@radix-ui/react-arrow": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-layout-effect": "1.1.1",
        "@radix-ui/react-use-rect": "1.1.1",
        "@radix-ui/react-use-size": "1.1.1",
        "@radix-ui/rect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-portal": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.9.tgz",
      "integrity": "sha512-bpIxvq03if6UNwXZ+HTK71JLh4APvnXntDc6XOX8UVq4XQOVl7lwok0AvIl+b8zgCw3fSaVTZMpAPPagXbKmHQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-presence": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.5.tgz",
      "integrity": "sha512-/jfEwNDdQVBCNvjkGit4h6pMOzq8bHkopq458dPt2lMjx+eBQUohZNG9A7DtO/O5ukSbxuaNGXMjHicgwy6rQQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.3.tgz",
      "integrity": "sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-progress": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-progress/-/react-progress-1.1.8.tgz",
      "integrity": "sha512-+gISHcSPUJ7ktBy9RnTqbdKW78bcGke3t6taawyZ71pio1JewwGSJizycs7rLhGTvMJYCQB1DBK4KQsxs7U8dA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-context": "1.1.3",
        "@radix-ui/react-primitive": "2.1.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-progress/node_modules/@radix-ui/react-context": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.3.tgz",
      "integrity": "sha512-ieIFACdMpYfMEjF0rEf5KLvfVyIkOz6PDGyNnP+u+4xQ6jny3VCgA4OgXOwNx2aUkxn8zx9fiVcM8CfFYv9Lxw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-progress/node_modules/@radix-ui/react-primitive": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.4.tgz",
      "integrity": "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-radio-group": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-radio-group/-/react-radio-group-1.3.8.tgz",
      "integrity": "sha512-VBKYIYImA5zsxACdisNQ3BjCBfmbGH3kQlnFVqlWU4tXwjy7cGX8ta80BcrO+WJXIn5iBylEH3K6ZTlee//lgQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-roving-focus": "1.1.11",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-previous": "1.1.1",
        "@radix-ui/react-use-size": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-roving-focus": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-roving-focus/-/react-roving-focus-1.1.11.tgz",
      "integrity": "sha512-7A6S9jSgm/S+7MdtNDSb+IU859vQqJ/QAtcYQcfFC6W8RS4IxIZDldLR0xqCFZ6DCyrQLjLPsxtTNch5jVA4lA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-scroll-area": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-scroll-area/-/react-scroll-area-1.2.10.tgz",
      "integrity": "sha512-tAXIa1g3sM5CGpVT0uIbUx/U3Gs5N8T52IICuCtObaos1S8fzsrPXG5WObkQN3S6NVl6wKgPhAIiBGbWnvc97A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.1",
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select": {
      "version": "2.2.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-select/-/react-select-2.2.6.tgz",
      "integrity": "sha512-I30RydO+bnn2PQztvo25tswPH+wFBjehVGtmagkU78yMdwTwVf12wnAOF+AeP8S2N8xD+5UPbGhkUfPyvT+mwQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.1",
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-focus-guards": "1.1.3",
        "@radix-ui/react-focus-scope": "1.1.7",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-popper": "1.2.8",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-layout-effect": "1.1.1",
        "@radix-ui/react-use-previous": "1.1.1",
        "@radix-ui/react-visually-hidden": "1.2.3",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-separator": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-separator/-/react-separator-1.1.8.tgz",
      "integrity": "sha512-sDvqVY4itsKwwSMEe0jtKgfTh+72Sy3gPmQpjqcQneqQ4PFmr/1I0YA+2/puilhggCe2gJcx5EBAYFkWkdpa5g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-separator/node_modules/@radix-ui/react-primitive": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.4.tgz",
      "integrity": "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.4"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slider": {
      "version": "1.3.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slider/-/react-slider-1.3.6.tgz",
      "integrity": "sha512-JPYb1GuM1bxfjMRlNLE+BcmBC8onfCi60Blk7OBqi2MLTFdS+8401U4uFjnwkOr49BLmXxLC6JHkvAsx5OJvHw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.1",
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-collection": "1.1.7",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-layout-effect": "1.1.1",
        "@radix-ui/react-use-previous": "1.1.1",
        "@radix-ui/react-use-size": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.4.tgz",
      "integrity": "sha512-Jl+bCv8HxKnlTLVrcDE8zTMJ09R9/ukw4qBs/oZClOfoQk/cOTbDn+NceXfV7j09YPVQUryJPHurafcSg6EVKA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-switch": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-switch/-/react-switch-1.2.6.tgz",
      "integrity": "sha512-bByzr1+ep1zk4VubeEVViV592vu2lHE2BZY5OnzehZqOOgogN80+mNtCqPkhn2gklJqOpxWgPoYTSnhBCqpOXQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-use-previous": "1.1.1",
        "@radix-ui/react-use-size": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tabs": {
      "version": "1.1.13",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tabs/-/react-tabs-1.1.13.tgz",
      "integrity": "sha512-7xdcatg7/U+7+Udyoj2zodtI9H/IIopqo+YOIcZOq1nJwXWBZ9p8xiu5llXlekDbZkca79a/fozEYQXIA4sW6A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-roving-focus": "1.1.11",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toggle": {
      "version": "1.1.10",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toggle/-/react-toggle-1.1.10.tgz",
      "integrity": "sha512-lS1odchhFTeZv3xwHH31YPObmJn8gOg7Lq12inrr0+BH/l3Tsq32VfjqH1oh80ARM3mlkfMic15n0kg4sD1poQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toggle-group": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toggle-group/-/react-toggle-group-1.1.11.tgz",
      "integrity": "sha512-5umnS0T8JQzQT6HbPyO7Hh9dgd82NmS36DQr+X/YJ9ctFNCiiQd6IJAYYZ33LUwm8M+taCz5t2ui29fHZc4Y6Q==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-direction": "1.1.1",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-roving-focus": "1.1.11",
        "@radix-ui/react-toggle": "1.1.10",
        "@radix-ui/react-use-controllable-state": "1.2.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tooltip": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tooltip/-/react-tooltip-1.2.8.tgz",
      "integrity": "sha512-tY7sVt1yL9ozIxvmbtN5qtmH2krXcBCfjEiCgKGLqunJHvgvZG2Pcl2oQ3kbcZARb1BGEHdkLzcYGO8ynVlieg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-popper": "1.2.8",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "@radix-ui/react-visually-hidden": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tooltip/node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-callback-ref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.1.tgz",
      "integrity": "sha512-FkBMwD+qbGQeMu1cOHnuGB6x4yzPjho8ap5WtbEJ26umhgqVXbhekKUQO+hZEL1vU92a3wHwdp0HAcqAUF5iDg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-controllable-state": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.2.2.tgz",
      "integrity": "sha512-BjasUjixPFdS+NKkypcyyN5Pmg83Olst0+c6vGov0diwTEo6mgdqVR6hxcEgFuh4QrAs7Rc+9KuGJ9TVCj0Zzg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-effect-event": "0.0.2",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-effect-event": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-effect-event/-/react-use-effect-event-0.0.2.tgz",
      "integrity": "sha512-Qp8WbZOBe+blgpuUT+lw2xheLP8q0oatc9UpmiemEICxGvFLYmHm9QowVZGHtJlGbS6A6yJ3iViad/2cVjnOiA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-escape-keydown": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.1.1.tgz",
      "integrity": "sha512-Il0+boE7w/XebUHyBjroE+DbByORGR9KKmITzbR7MyQ4akpORYP/ZmbhAr0DG7RmmBqoOnZdy2QlvajJ2QA59g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-is-hydrated": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-is-hydrated/-/react-use-is-hydrated-0.1.0.tgz",
      "integrity": "sha512-U+UORVEq+cTnRIaostJv9AGdV3G6Y+zbVd+12e18jQ5A3c0xL03IhnHuiU4UV69wolOQp5GfR58NW/EgdQhwOA==",
      "license": "MIT",
      "dependencies": {
        "use-sync-external-store": "^1.5.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-layout-effect": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.1.tgz",
      "integrity": "sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-previous": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-previous/-/react-use-previous-1.1.1.tgz",
      "integrity": "sha512-2dHfToCj/pzca2Ck724OZ5L0EVrr3eHRNsG/b3xQJLA2hZpVCS99bLAX+hm1IHXDEnzU6by5z/5MIY794/a8NQ==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-rect": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-rect/-/react-use-rect-1.1.1.tgz",
      "integrity": "sha512-QTYuDesS0VtuHNNvMh+CjlKJ4LJickCMUAqjlE3+j8w+RlRpwyX3apEQKGFzbZGdo7XNG1tXa+bQqIE7HIXT2w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/rect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-size": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-size/-/react-use-size-1.1.1.tgz",
      "integrity": "sha512-ewrXRDTAqAXlkl6t/fkXWNAhFX9I+CkKlw6zjEwk86RSPKwZr3xpBRso655aqYafwtnbpHLj6toFzmd6xdVptQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-visually-hidden/-/react-visually-hidden-1.2.3.tgz",
      "integrity": "sha512-pzJq12tEaaIhqjbzpCuv/OypJY/BPavOofm+dbab+MHLajy277+1lLm6JFcGgF5eskJ6mquGirhXY2GD/8u8Ug==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/rect": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/rect/-/rect-1.1.1.tgz",
      "integrity": "sha512-HPwpGIzkl28mWyZqG52jiqDJ12waP11Pa1lGoiyUkIEuMLBP0oeK/C89esbXrxsky5we7dfd8U58nm0SgAWpVw==",
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.60.1.tgz",
      "integrity": "sha512-d6FinEBLdIiK+1uACUttJKfgZREXrF0Qc2SmLII7W2AD8FfiZ9Wjd+rD/iRuf5s5dWrr1GgwXCvPqOuDquOowA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.60.1.tgz",
      "integrity": "sha512-YjG/EwIDvvYI1YvYbHvDz/BYHtkY4ygUIXHnTdLhG+hKIQFBiosfWiACWortsKPKU/+dUwQQCKQM3qrDe8c9BA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.60.1.tgz",
      "integrity": "sha512-mjCpF7GmkRtSJwon+Rq1N8+pI+8l7w5g9Z3vWj4T7abguC4Czwi3Yu/pFaLvA3TTeMVjnu3ctigusqWUfjZzvw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.60.1.tgz",
      "integrity": "sha512-haZ7hJ1JT4e9hqkoT9R/19XW2QKqjfJVv+i5AGg57S+nLk9lQnJ1F/eZloRO3o9Scy9CM3wQ9l+dkXtcBgN5Ew==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.60.1.tgz",
      "integrity": "sha512-czw90wpQq3ZsAVBlinZjAYTKduOjTywlG7fEeWKUA7oCmpA8xdTkxZZlwNJKWqILlq0wehoZcJYfBvOyhPTQ6w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.60.1.tgz",
      "integrity": "sha512-KVB2rqsxTHuBtfOeySEyzEOB7ltlB/ux38iu2rBQzkjbwRVlkhAGIEDiiYnO2kFOkJp+Z7pUXKyrRRFuFUKt+g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.60.1.tgz",
      "integrity": "sha512-L+34Qqil+v5uC0zEubW7uByo78WOCIrBvci69E7sFASRl0X7b/MB6Cqd1lky/CtcSVTydWa2WZwFuWexjS5o6g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.60.1.tgz",
      "integrity": "sha512-n83O8rt4v34hgFzlkb1ycniJh7IR5RCIqt6mz1VRJD6pmhRi0CXdmfnLu9dIUS6buzh60IvACM842Ffb3xd6Gg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.60.1.tgz",
      "integrity": "sha512-Nql7sTeAzhTAja3QXeAI48+/+GjBJ+QmAH13snn0AJSNL50JsDqotyudHyMbO2RbJkskbMbFJfIJKWA6R1LCJQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.60.1.tgz",
      "integrity": "sha512-+pUymDhd0ys9GcKZPPWlFiZ67sTWV5UU6zOJat02M1+PiuSGDziyRuI/pPue3hoUwm2uGfxdL+trT6Z9rxnlMA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.60.1.tgz",
      "integrity": "sha512-VSvgvQeIcsEvY4bKDHEDWcpW4Yw7BtlKG1GUT4FzBUlEKQK0rWHYBqQt6Fm2taXS+1bXvJT6kICu5ZwqKCnvlQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.60.1.tgz",
      "integrity": "sha512-4LqhUomJqwe641gsPp6xLfhqWMbQV04KtPp7/dIp0nzPxAkNY1AbwL5W0MQpcalLYk07vaW9Kp1PBhdpZYYcEw==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.60.1.tgz",
      "integrity": "sha512-tLQQ9aPvkBxOc/EUT6j3pyeMD6Hb8QF2BTBnCQWP/uu1lhc9AIrIjKnLYMEroIz/JvtGYgI9dF3AxHZNaEH0rw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.60.1.tgz",
      "integrity": "sha512-RMxFhJwc9fSXP6PqmAz4cbv3kAyvD1etJFjTx4ONqFP9DkTkXsAMU4v3Vyc5BgzC+anz7nS/9tp4obsKfqkDHg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.60.1.tgz",
      "integrity": "sha512-QKgFl+Yc1eEk6MmOBfRHYF6lTxiiiV3/z/BRrbSiW2I7AFTXoBFvdMEyglohPj//2mZS4hDOqeB0H1ACh3sBbg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.60.1.tgz",
      "integrity": "sha512-RAjXjP/8c6ZtzatZcA1RaQr6O1TRhzC+adn8YZDnChliZHviqIjmvFwHcxi4JKPSDAt6Uhf/7vqcBzQJy0PDJg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.60.1.tgz",
      "integrity": "sha512-wcuocpaOlaL1COBYiA89O6yfjlp3RwKDeTIA0hM7OpmhR1Bjo9j31G1uQVpDlTvwxGn2nQs65fBFL5UFd76FcQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.60.1.tgz",
      "integrity": "sha512-77PpsFQUCOiZR9+LQEFg9GClyfkNXj1MP6wRnzYs0EeWbPcHs02AXu4xuUbM1zhwn3wqaizle3AEYg5aeoohhg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.60.1.tgz",
      "integrity": "sha512-5cIATbk5vynAjqqmyBjlciMJl1+R/CwX9oLk/EyiFXDWd95KpHdrOJT//rnUl4cUcskrd0jCCw3wpZnhIHdD9w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.60.1.tgz",
      "integrity": "sha512-cl0w09WsCi17mcmWqqglez9Gk8isgeWvoUZ3WiJFYSR3zjBQc2J5/ihSjpl+VLjPqjQ/1hJRcqBfLjssREQILw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.60.1.tgz",
      "integrity": "sha512-4Cv23ZrONRbNtbZa37mLSueXUCtN7MXccChtKpUnQNgF010rjrjfHx3QxkS2PI7LqGT5xXyYs1a7LbzAwT0iCA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.60.1.tgz",
      "integrity": "sha512-i1okWYkA4FJICtr7KpYzFpRTHgy5jdDbZiWfvny21iIKky5YExiDXP+zbXzm3dUcFpkEeYNHgQ5fuG236JPq0g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.60.1.tgz",
      "integrity": "sha512-u09m3CuwLzShA0EYKMNiFgcjjzwqtUMLmuCJLeZWjjOYA3IT2Di09KaxGBTP9xVztWyIWjVdsB2E9goMjZvTQg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.60.1.tgz",
      "integrity": "sha512-k+600V9Zl1CM7eZxJgMyTUzmrmhB/0XZnF4pRypKAlAgxmedUA+1v9R+XOFv56W4SlHEzfeMtzujLJD22Uz5zg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.60.1.tgz",
      "integrity": "sha512-lWMnixq/QzxyhTV6NjQJ4SFo1J6PvOX8vUx5Wb4bBPsEb+8xZ89Bz6kOXpfXj9ak9AHTQVQzlgzBEc1SyM27xQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@tabby_ai/hijri-converter": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/@tabby_ai/hijri-converter/-/hijri-converter-1.0.5.tgz",
      "integrity": "sha512-r5bClKrcIusDoo049dSL8CawnHR6mRdDwhlQuIgZRNty68q0x8k3Lf1BtPAMxRf/GgnHBnIO4ujd3+GQdLWzxQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.2.2.tgz",
      "integrity": "sha512-pXS+wJ2gZpVXqFaUEjojq7jzMpTGf8rU6ipJz5ovJV6PUGmlJ+jvIwGrzdHdQ80Sg+wmQxUFuoW1UAAwHNEdFA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.19.0",
        "jiti": "^2.6.1",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.2.2.tgz",
      "integrity": "sha512-qEUA07+E5kehxYp9BVMpq9E8vnJuBHfJEC0vPC5e7iL/hw7HR61aDKoVoKzrG+QKp56vhNZe4qwkRmMC0zDLvg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-x64": "4.2.2",
        "@tailwindcss/oxide-freebsd-x64": "4.2.2",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-musl": "4.2.2",
        "@tailwindcss/oxide-linux-x64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-x64-musl": "4.2.2",
        "@tailwindcss/oxide-wasm32-wasi": "4.2.2",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.2.2",
        "@tailwindcss/oxide-win32-x64-msvc": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.2.2.tgz",
      "integrity": "sha512-dXGR1n+P3B6748jZO/SvHZq7qBOqqzQ+yFrXpoOWWALWndF9MoSKAT3Q0fYgAzYzGhxNYOoysRvYlpixRBBoDg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.2.2.tgz",
      "integrity": "sha512-iq9Qjr6knfMpZHj55/37ouZeykwbDqF21gPFtfnhCCKGDcPI/21FKC9XdMO/XyBM7qKORx6UIhGgg6jLl7BZlg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.2.2.tgz",
      "integrity": "sha512-BlR+2c3nzc8f2G639LpL89YY4bdcIdUmiOOkv2GQv4/4M0vJlpXEa0JXNHhCHU7VWOKWT/CjqHdTP8aUuDJkuw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.2.2.tgz",
      "integrity": "sha512-YUqUgrGMSu2CDO82hzlQ5qSb5xmx3RUrke/QgnoEx7KvmRJHQuZHZmZTLSuuHwFf0DJPybFMXMYf+WJdxHy/nQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.2.2.tgz",
      "integrity": "sha512-FPdhvsW6g06T9BWT0qTwiVZYE2WIFo2dY5aCSpjG/S/u1tby+wXoslXS0kl3/KXnULlLr1E3NPRRw0g7t2kgaQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.2.2.tgz",
      "integrity": "sha512-4og1V+ftEPXGttOO7eCmW7VICmzzJWgMx+QXAJRAhjrSjumCwWqMfkDrNu1LXEQzNAwz28NCUpucgQPrR4S2yw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.2.2.tgz",
      "integrity": "sha512-oCfG/mS+/+XRlwNjnsNLVwnMWYH7tn/kYPsNPh+JSOMlnt93mYNCKHYzylRhI51X+TbR+ufNhhKKzm6QkqX8ag==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.2.2.tgz",
      "integrity": "sha512-rTAGAkDgqbXHNp/xW0iugLVmX62wOp2PoE39BTCGKjv3Iocf6AFbRP/wZT/kuCxC9QBh9Pu8XPkv/zCZB2mcMg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.2.2.tgz",
      "integrity": "sha512-XW3t3qwbIwiSyRCggeO2zxe3KWaEbM0/kW9e8+0XpBgyKU4ATYzcVSMKteZJ1iukJ3HgHBjbg9P5YPRCVUxlnQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.2.2.tgz",
      "integrity": "sha512-eKSztKsmEsn1O5lJ4ZAfyn41NfG7vzCg496YiGtMDV86jz1q/irhms5O0VrY6ZwTUkFy/EKG3RfWgxSI3VbZ8Q==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.8.1",
        "@emnapi/runtime": "^1.8.1",
        "@emnapi/wasi-threads": "^1.1.0",
        "@napi-rs/wasm-runtime": "^1.1.1",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.2.2.tgz",
      "integrity": "sha512-qPmaQM4iKu5mxpsrWZMOZRgZv1tOZpUm+zdhhQP0VhJfyGGO3aUKdbh3gDZc/dPLQwW4eSqWGrrcWNBZWUWaXQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.2.2.tgz",
      "integrity": "sha512-1T/37VvI7WyH66b+vqHj/cLwnCxt7Qt3WFu5Q8hk65aOvlwAhs7rAp1VkulBJw/N4tMirXjVnylTR72uI0HGcA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.2.2.tgz",
      "integrity": "sha512-mEiF5HO1QqCLXoNEfXVA1Tzo+cYsrqV7w9Juj2wdUFyW07JRenqMG225MvPwr3ZD9N1bFQj46X7r33iHxLUW0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.2.2",
        "@tailwindcss/oxide": "4.2.2",
        "tailwindcss": "4.2.2"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@tanstack/history": {
      "version": "1.161.6",
      "resolved": "https://registry.npmjs.org/@tanstack/history/-/history-1.161.6.tgz",
      "integrity": "sha512-NaOGLRrddszbQj9upGat6HG/4TKvXLvu+osAIgfxPYA+eIvYKv8GKDJOrY2D3/U9MRnKfMWD7bU4jeD4xmqyIg==",
      "license": "MIT",
      "engines": {
        "node": ">=20.19"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tanstack/query-core": {
      "version": "5.99.0",
      "resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-5.99.0.tgz",
      "integrity": "sha512-3Jv3WQG0BCcH7G+7lf/bP8QyBfJOXeY+T08Rin3GZ1bshvwlbPt7NrDHMEzGdKIOmOzvIQmxjk28YEQX60k7pQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tanstack/react-query": {
      "version": "5.99.0",
      "resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-5.99.0.tgz",
      "integrity": "sha512-OY2bCqPemT1LlqJ8Y2CUau4KELnIhhG9Ol3ZndPbdnB095pRbPo1cHuXTndg8iIwtoHTgwZjyaDnQ0xD0mYwAw==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/query-core": "5.99.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": "^18 || ^19"
      }
    },
    "node_modules/@tanstack/react-router": {
      "version": "1.168.21",
      "resolved": "https://registry.npmjs.org/@tanstack/react-router/-/react-router-1.168.21.tgz",
      "integrity": "sha512-slnitYiHHmU52eMWtW8JbV9EMT5q6mRMbTA5yepBmJAnj5WZDrDRsLY/TuUrdD97A4W7/25tEQRoqc1G2X0oCw==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/history": "1.161.6",
        "@tanstack/react-store": "^0.9.3",
        "@tanstack/router-core": "1.168.15",
        "isbot": "^5.1.22"
      },
      "engines": {
        "node": ">=20.19"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": ">=18.0.0 || >=19.0.0",
        "react-dom": ">=18.0.0 || >=19.0.0"
      }
    },
    "node_modules/@tanstack/react-store": {
      "version": "0.9.3",
      "resolved": "https://registry.npmjs.org/@tanstack/react-store/-/react-store-0.9.3.tgz",
      "integrity": "sha512-y2iHd/N9OkoQbFJLUX1T9vbc2O9tjH0pQRgTcx1/Nz4IlwLvkgpuglXUx+mXt0g5ZDFrEeDnONPqkbfxXJKwRg==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/store": "0.9.3",
        "use-sync-external-store": "^1.6.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/@tanstack/router-core": {
      "version": "1.168.15",
      "resolved": "https://registry.npmjs.org/@tanstack/router-core/-/router-core-1.168.15.tgz",
      "integrity": "sha512-Wr0424NDtD8fT/uALobMZ9DdcfsTyXtW5IPR++7zvW8/7RaIOeaqXpVDId8ywaGtqPWLWOfaUg2zUtYtukoXYA==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/history": "1.161.6",
        "cookie-es": "^3.0.0",
        "seroval": "^1.5.0",
        "seroval-plugins": "^1.5.0"
      },
      "bin": {
        "intent": "bin/intent.js"
      },
      "engines": {
        "node": ">=20.19"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tanstack/store": {
      "version": "0.9.3",
      "resolved": "https://registry.npmjs.org/@tanstack/store/-/store-0.9.3.tgz",
      "integrity": "sha512-8reSzl/qGWGGVKhBoxXPMWzATSbZLZFWhwBAFO9NAyp0TxzfBP0mIrGb8CP8KrQTmvzXlR/vFPPUrHTLBGyFyw==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
      "integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.1.8",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.1.8.tgz",
      "integrity": "sha512-lae0iWfcDeR7qt7rA88BNiqdvPS5pFVPpo5OfjElwNaT2yyekbM0C9vK+yqBqEmHr6lDkRnYNoTBYlAgJa7a4w==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "22.19.17",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.19.17.tgz",
      "integrity": "sha512-wGdMcf+vPYM6jikpS/qhg6WiqSV/OhG+jeeHT/KlVqxYfD40iYJf9/AE1uQxVWFvU7MipKRkRv8NSHiCGgPr8Q==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "devOptional": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.58.2.tgz",
      "integrity": "sha512-aC2qc5thQahutKjP+cl8cgN9DWe3ZUqVko30CMSZHnFEHyhOYoZSzkGtAI2mcwZ38xeImDucI4dnqsHiOYuuCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.58.2",
        "@typescript-eslint/type-utils": "8.58.2",
        "@typescript-eslint/utils": "8.58.2",
        "@typescript-eslint/visitor-keys": "8.58.2",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.58.2",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
      "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.58.2.tgz",
      "integrity": "sha512-/Zb/xaIDfxeJnvishjGdcR4jmr7S+bda8PKNhRGdljDM+elXhlvN0FyPSsMnLmJUrVG9aPO6dof80wjMawsASg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.58.2",
        "@typescript-eslint/types": "8.58.2",
        "@typescript-eslint/typescript-estree": "8.58.2",
        "@typescript-eslint/visitor-keys": "8.58.2",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.58.2.tgz",
      "integrity": "sha512-Cq6UfpZZk15+r87BkIh5rDpi38W4b+Sjnb8wQCPPDDweS/LRCFjCyViEbzHk5Ck3f2QDfgmlxqSa7S7clDtlfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.58.2",
        "@typescript-eslint/types": "^8.58.2",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.58.2.tgz",
      "integrity": "sha512-SgmyvDPexWETQek+qzZnrG6844IaO02UVyOLhI4wpo82dpZJY9+6YZCKAMFzXb7qhx37mFK1QcPQ18tud+vo6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.58.2",
        "@typescript-eslint/visitor-keys": "8.58.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.58.2.tgz",
      "integrity": "sha512-3SR+RukipDvkkKp/d0jP0dyzuls3DbGmwDpVEc5wqk5f38KFThakqAAO0XMirWAE+kT00oTauTbzMFGPoAzB0A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.58.2.tgz",
      "integrity": "sha512-Z7EloNR/B389FvabdGeTo2XMs4W9TjtPiO9DAsmT0yom0bwlPyRjkJ1uCdW1DvrrrYP50AJZ9Xc3sByZA9+dcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.58.2",
        "@typescript-eslint/typescript-estree": "8.58.2",
        "@typescript-eslint/utils": "8.58.2",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.58.2.tgz",
      "integrity": "sha512-9TukXyATBQf/Jq9AMQXfvurk+G5R2MwfqQGDR2GzGz28HvY/lXNKGhkY+6IOubwcquikWk5cjlgPvD2uAA7htQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.58.2.tgz",
      "integrity": "sha512-ELGuoofuhhoCvNbQjFFiobFcGgcDCEm0ThWdmO4Z0UzLqPXS3KFvnEZ+SHewwOYHjM09tkzOWXNTv9u6Gqtyuw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.58.2",
        "@typescript-eslint/tsconfig-utils": "8.58.2",
        "@typescript-eslint/types": "8.58.2",
        "@typescript-eslint/visitor-keys": "8.58.2",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "5.0.5",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.5.tgz",
      "integrity": "sha512-VZznLgtwhn+Mact9tfiwx64fA9erHH/MCXEUfB/0bX/6Fz6ny5EGTXYltMocqg4xFAQZtnO3DHWWXi8RiuN7cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "10.2.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.5.tgz",
      "integrity": "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.5"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.58.2.tgz",
      "integrity": "sha512-QZfjHNEzPY8+l0+fIXMvuQ2sJlplB4zgDZvA+NmvZsZv3EQwOcc1DuIU1VJUTWZ/RKouBMhDyNaBMx4sWvrzRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.58.2",
        "@typescript-eslint/types": "8.58.2",
        "@typescript-eslint/typescript-estree": "8.58.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.58.2.tgz",
      "integrity": "sha512-f1WO2Lx8a9t8DARmcWAUPJbu0G20bJlj8L4z72K00TMeJAoyLr/tHhI/pzYBLrR4dXWkcxO1cWYZEOX8DKHTqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.58.2",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-5.2.0.tgz",
      "integrity": "sha512-YmKkfhOAi3wsB1PhJq5Scj3GXMn3WvtQ/JC0xoopuHoXSdmtdStOpFrYaT1kie2YgFBcIe64ROzMYRjCrYOdYw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.29.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-rc.3",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.18.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/@vitejs/plugin-react/node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.3",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.3.tgz",
      "integrity": "sha512-eybk3TjzzzV97Dlj5c+XrBFW57eTNhzod66y9HrBlzJ6NsCrWCp/2kaPS3K9wJmurBC0Tdw4yPjXKZqlznim3Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
      "integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/aria-hidden": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.6.tgz",
      "integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.18",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.18.tgz",
      "integrity": "sha512-VSnGQAOLtP5mib/DPyg2/t+Tlv65NTBz83BJBJvmLVHHuKJVaDOBvJJykiT5TR++em5nfAySPccDZDa4oSrn8A==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.14",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.14.tgz",
      "integrity": "sha512-MWPGfDxnyzKU7rNOW9SP/c50vi3xrmrua/+6hfPbCS2ABNWfx24vPidzvC7krjU/RTo235sV776ymlsMtGKj8g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001788",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001788.tgz",
      "integrity": "sha512-6q8HFp+lOQtcf7wBK+uEenxymVWkGKkjFpCvw5W25cmMwEDU45p1xQFBQv8JDlMMry7eNxyBaR+qxgmTUZkIRQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "^2.1.1"
      },
      "funding": {
        "url": "https://polar.sh/cva"
      }
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/cmdk": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cmdk/-/cmdk-1.1.1.tgz",
      "integrity": "sha512-Vsv7kFaXm+ptHDMZ7izaRsP70GgrW9NBNGswt9OZaVBLlE0SNpDq8eu/VGXyF9r7M0azK3Wy7OlYXsuyYLFzHg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "^1.1.1",
        "@radix-ui/react-dialog": "^1.1.6",
        "@radix-ui/react-id": "^1.1.0",
        "@radix-ui/react-primitive": "^2.0.2"
      },
      "peerDependencies": {
        "react": "^18 || ^19 || ^19.0.0-rc",
        "react-dom": "^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie-es": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/cookie-es/-/cookie-es-3.1.1.tgz",
      "integrity": "sha512-UaXxwISYJPTr9hwQxMFYZ7kNhSXboMXP+Z3TRX6f1/NyaGPfuNUZOWP1pUEb75B2HjfklIYLVRfWiFZJyC6Npg==",
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/date-fns": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-4.1.0.tgz",
      "integrity": "sha512-Ukq0owbQXxa/U3EGtsdVBkR1w7KOQ5gIBqdH2hkvknzZPYvBxb/aa6E8L7tmjFtkwZBu3UXBbjIgPo/Ez4xaNg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/date-fns-jalali": {
      "version": "4.1.0-0",
      "resolved": "https://registry.npmjs.org/date-fns-jalali/-/date-fns-jalali-4.1.0-0.tgz",
      "integrity": "sha512-hTIP/z+t+qKwBDcmmsnmjWTduxCg+5KfdqWQvb2X/8C9+knYY6epN/pfxdDuyVlSVeFz0sM5eEfwIUQ70U4ckg==",
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/detect-node-es": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
      "license": "MIT"
    },
    "node_modules/dom-helpers": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz",
      "integrity": "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.8.7",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.336",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.336.tgz",
      "integrity": "sha512-AbH9q9J455r/nLmdNZes0G0ZKcRX73FicwowalLs6ijwOmCJSRRrLX63lcAlzy9ux3dWK1w1+1nsBJEWN11hcQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/embla-carousel": {
      "version": "8.6.0",
      "resolved": "https://registry.npmjs.org/embla-carousel/-/embla-carousel-8.6.0.tgz",
      "integrity": "sha512-SjWyZBHJPbqxHOzckOfo8lHisEaJWmwd23XppYFYVh10bU66/Pn5tkVkbkCMZVdbUE5eTCI2nD8OyIP4Z+uwkA==",
      "license": "MIT"
    },
    "node_modules/embla-carousel-react": {
      "version": "8.6.0",
      "resolved": "https://registry.npmjs.org/embla-carousel-react/-/embla-carousel-react-8.6.0.tgz",
      "integrity": "sha512-0/PjqU7geVmo6F734pmPqpyHqiM99olvyecY7zdweCw+6tKEXnrE90pBiBbMMU8s5tICemzpQ3hi5EpxzGW+JA==",
      "license": "MIT",
      "dependencies": {
        "embla-carousel": "8.6.0",
        "embla-carousel-reactive-utils": "8.6.0"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/embla-carousel-reactive-utils": {
      "version": "8.6.0",
      "resolved": "https://registry.npmjs.org/embla-carousel-reactive-utils/-/embla-carousel-reactive-utils-8.6.0.tgz",
      "integrity": "sha512-fMVUDUEx0/uIEDM0Mz3dHznDhfX+znCCDCeIophYb1QGVM7YThSWX+wz11zlYwWFOr74b4QLGg0hrGPJeG2s4A==",
      "license": "MIT",
      "peerDependencies": {
        "embla-carousel": "8.6.0"
      }
    },
    "node_modules/emoji-picker-react": {
      "version": "4.19.1",
      "resolved": "https://registry.npmjs.org/emoji-picker-react/-/emoji-picker-react-4.19.1.tgz",
      "integrity": "sha512-BmDdqInKFVYJpv7qS9WI6L9656cDAC+FkDvUjJds56nKHbaVTBNeDmLwKBytRnzu37zWHs9Isg7gt5PT43y6xA==",
      "license": "MIT",
      "dependencies": {
        "flairup": "1.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "react": ">=16"
      }
    },
    "node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/enhanced-resolve": {
      "version": "5.20.1",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.20.1.tgz",
      "integrity": "sha512-Qohcme7V1inbAfvjItgw0EaxVX5q2rdVEZHRBrEQdRZTssLDGsL8Lwrznl8oQ/6kuTJONLaDcGjkNP247XEhcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.0"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/esbuild": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.12.tgz",
      "integrity": "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.12",
        "@esbuild/android-arm": "0.25.12",
        "@esbuild/android-arm64": "0.25.12",
        "@esbuild/android-x64": "0.25.12",
        "@esbuild/darwin-arm64": "0.25.12",
        "@esbuild/darwin-x64": "0.25.12",
        "@esbuild/freebsd-arm64": "0.25.12",
        "@esbuild/freebsd-x64": "0.25.12",
        "@esbuild/linux-arm": "0.25.12",
        "@esbuild/linux-arm64": "0.25.12",
        "@esbuild/linux-ia32": "0.25.12",
        "@esbuild/linux-loong64": "0.25.12",
        "@esbuild/linux-mips64el": "0.25.12",
        "@esbuild/linux-ppc64": "0.25.12",
        "@esbuild/linux-riscv64": "0.25.12",
        "@esbuild/linux-s390x": "0.25.12",
        "@esbuild/linux-x64": "0.25.12",
        "@esbuild/netbsd-arm64": "0.25.12",
        "@esbuild/netbsd-x64": "0.25.12",
        "@esbuild/openbsd-arm64": "0.25.12",
        "@esbuild/openbsd-x64": "0.25.12",
        "@esbuild/openharmony-arm64": "0.25.12",
        "@esbuild/sunos-x64": "0.25.12",
        "@esbuild/win32-arm64": "0.25.12",
        "@esbuild/win32-ia32": "0.25.12",
        "@esbuild/win32-x64": "0.25.12"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.4.tgz",
      "integrity": "sha512-XoMjdBOwe/esVgEvLmNsD3IRHkm7fbKIUGvrleloJXUZgDHig2IPWNniv+GwjyJXzuNqVjlr5+4yVUZjycJwfQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.5",
        "@eslint/js": "9.39.4",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-prettier": {
      "version": "10.1.8",
      "resolved": "https://registry.npmjs.org/eslint-config-prettier/-/eslint-config-prettier-10.1.8.tgz",
      "integrity": "sha512-82GZUjRS0p/jganf6q1rEO25VSoHH0hKPCTrgillPjdI/3bgBhAE1QzHrHTizjpRvy6pGAvKjDJtk2pF9NDq8w==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "eslint-config-prettier": "bin/cli.js"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-config-prettier"
      },
      "peerDependencies": {
        "eslint": ">=7.0.0"
      }
    },
    "node_modules/eslint-plugin-prettier": {
      "version": "5.5.5",
      "resolved": "https://registry.npmjs.org/eslint-plugin-prettier/-/eslint-plugin-prettier-5.5.5.tgz",
      "integrity": "sha512-hscXkbqUZ2sPithAuLm5MXL+Wph+U7wHngPBv9OMWwlP8iaflyxpjTYZkmdgB4/vPIhemRlBEoLrH7UC1n7aUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prettier-linter-helpers": "^1.0.1",
        "synckit": "^0.11.12"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-plugin-prettier"
      },
      "peerDependencies": {
        "@types/eslint": ">=8.0.0",
        "eslint": ">=8.0.0",
        "eslint-config-prettier": ">= 7.0.0 <10.0.0 || >=10.1.0",
        "prettier": ">=3.0.0"
      },
      "peerDependenciesMeta": {
        "@types/eslint": {
          "optional": true
        },
        "eslint-config-prettier": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.2.0.tgz",
      "integrity": "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.4.26",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.4.26.tgz",
      "integrity": "sha512-1RETEylht2O6FM/MvgnyvT+8K21wLqDNg4qD51Zj3guhjt433XbnnkVttHMyaVyAFD03QSV4LPS5iE3VQmO7XQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": ">=8.40"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint/node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/eventemitter3": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
      "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==",
      "license": "MIT"
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-diff": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/fast-diff/-/fast-diff-1.3.0.tgz",
      "integrity": "sha512-VxPP4NqbUjj6MaAOafWeUn2cXWLcCtljklUtZf0Ind4XQ+QPtmA0b18zZy0jIQx+ExRVCR/ZQpBmik5lXshNsw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/fast-equals": {
      "version": "5.4.0",
      "resolved": "https://registry.npmjs.org/fast-equals/-/fast-equals-5.4.0.tgz",
      "integrity": "sha512-jt2DW/aNFNwke7AUd+Z+e6pz39KO5rzdbbFCg2sGafS4mk13MI7Z8O5z9cADNn5lhGODIgLwug6TZO2ctf7kcw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/faye-websocket": {
      "version": "0.11.4",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.4.tgz",
      "integrity": "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==",
      "license": "Apache-2.0",
      "dependencies": {
        "websocket-driver": ">=0.5.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/firebase": {
      "version": "12.12.1",
      "resolved": "https://registry.npmjs.org/firebase/-/firebase-12.12.1.tgz",
      "integrity": "sha512-ee7xA+bTJLfjB9BP/8FQr3EkxmpAAGc1lNc5QkWgTDpUw24HYXFPm7FEWRdLtGnygxIdYpFmepSc5VjkI6NHhw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/ai": "2.11.1",
        "@firebase/analytics": "0.10.21",
        "@firebase/analytics-compat": "0.2.27",
        "@firebase/app": "0.14.11",
        "@firebase/app-check": "0.11.2",
        "@firebase/app-check-compat": "0.4.2",
        "@firebase/app-compat": "0.5.11",
        "@firebase/app-types": "0.9.4",
        "@firebase/auth": "1.13.0",
        "@firebase/auth-compat": "0.6.5",
        "@firebase/data-connect": "0.6.0",
        "@firebase/database": "1.1.2",
        "@firebase/database-compat": "2.1.3",
        "@firebase/firestore": "4.14.0",
        "@firebase/firestore-compat": "0.4.8",
        "@firebase/functions": "0.13.3",
        "@firebase/functions-compat": "0.4.3",
        "@firebase/installations": "0.6.21",
        "@firebase/installations-compat": "0.2.21",
        "@firebase/messaging": "0.12.25",
        "@firebase/messaging-compat": "0.2.25",
        "@firebase/performance": "0.7.11",
        "@firebase/performance-compat": "0.2.24",
        "@firebase/remote-config": "0.8.2",
        "@firebase/remote-config-compat": "0.2.23",
        "@firebase/storage": "0.14.2",
        "@firebase/storage-compat": "0.4.2",
        "@firebase/util": "1.15.0"
      }
    },
    "node_modules/flairup": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/flairup/-/flairup-1.0.0.tgz",
      "integrity": "sha512-IKlE+pNvL2R+kVL1kEhUYqRxVqeFnjiIvHWDMLFXNaqyUdFXQM2wte44EfMYJNHkW16X991t2Zg8apKkhv7OBA==",
      "license": "MIT"
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/framer-motion": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.38.0.tgz",
      "integrity": "sha512-rFYkY/pigbcswl1XQSb7q424kSTQ8q6eAC+YUsSKooHQYuLdzdHjrt6uxUC+PRAO++q5IS7+TamgIw1AphxR+g==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^12.38.0",
        "motion-utils": "^12.36.0",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-nonce": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/globals": {
      "version": "15.15.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-15.15.0.tgz",
      "integrity": "sha512-7ACyT3wmyp3I61S4fG682L0VA2RGD9otkqGJIwNUMF1SWUombIIk+af1unuDYgMm082aHYwD+mzJvv9Iu8dsgg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/globrex": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/globrex/-/globrex-0.1.2.tgz",
      "integrity": "sha512-uHJgbwAMwNFf5mLst7IWLNg14x1CkeqglJb/K3doi4dw6q2IvAAmM/Y81kevy83wP+Sst+nutFTYOGg3d1lsxg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/http-parser-js": {
      "version": "0.5.10",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.5.10.tgz",
      "integrity": "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA==",
      "license": "MIT"
    },
    "node_modules/idb": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/idb/-/idb-7.1.1.tgz",
      "integrity": "sha512-gchesWBzyvGHRO9W8tzUWFDycow5gwjvFKfyV9FF32Y7F50yZMp7mP+T2mJIWFx49zicqyC4uefHM17o6xKIVQ==",
      "license": "ISC"
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/input-otp": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/input-otp/-/input-otp-1.4.2.tgz",
      "integrity": "sha512-l3jWwYNvrEa6NTCt7BECfCm48GvwuZzkoeG3gBL2w4CHeOXW3eKFmf9UNYkNfYc3mxMrthMnxjIE07MT0zLBQA==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/isbot": {
      "version": "5.1.38",
      "resolved": "https://registry.npmjs.org/isbot/-/isbot-5.1.38.tgz",
      "integrity": "sha512-Cus2702JamTNMEY4zTP+TShgq/3qzjvGcBC4XMOV45BLaxD4iUFENkqu7ZhFeSzwNsCSZLjnGlihDQznnpnEEA==",
      "license": "Unlicense",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jiti": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.6.1.tgz",
      "integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash": {
      "version": "4.18.1",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",
      "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==",
      "license": "MIT"
    },
    "node_modules/lodash.camelcase": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
      "integrity": "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA==",
      "license": "MIT"
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/long": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/long/-/long-5.3.2.tgz",
      "integrity": "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA==",
      "license": "Apache-2.0"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.575.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.575.0.tgz",
      "integrity": "sha512-VuXgKZrk0uiDlWjGGXmKV6MSk9Yy4l10qgVvzGn2AWBx1Ylt0iBexKOAoA6I7JO3m+M9oeovJd3yYENfkUbOeg==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/motion-dom": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.38.0.tgz",
      "integrity": "sha512-pdkHLD8QYRp8VfiNLb8xIBJis1byQ9gPT3Jnh2jqfFtAsWUA3dEepDlsWe/xMpO8McV+VdpKVcp+E+TGJEtOoA==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^12.36.0"
      }
    },
    "node_modules/motion-utils": {
      "version": "12.36.0",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.36.0.tgz",
      "integrity": "sha512-eHWisygbiwVvf6PZ1vhaHCLamvkSbPIeAYxWUuL3a2PD/TROgE7FvfHWTIH4vMl798QLfMw15nRqIaRDXTlYRg==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.37",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.37.tgz",
      "integrity": "sha512-1h5gKZCF+pO/o3Iqt5Jp7wc9rH3eJJ0+nh/CIoiRwjRxde/hAHyLPXYN4V3CqKAbiZPSeJFSWHmJsbkicta0Eg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.13",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.13.tgz",
      "integrity": "sha512-qif0+jGGZoLWdHey3UFHHWP0H7Gbmsk8T5VEqyYFbWqPr1XqvLGBbk/sl8V5exGmcYJklJOhOQq1pV9IcsiFag==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/prettier": {
      "version": "3.8.2",
      "resolved": "https://registry.npmjs.org/prettier/-/prettier-3.8.2.tgz",
      "integrity": "sha512-8c3mgTe0ASwWAJK+78dpviD+A8EqhndQPUBpNUIPt6+xWlIigCwfN01lWr9MAede4uqXGTEKeQWTvzb3vjia0Q==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "prettier": "bin/prettier.cjs"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/prettier/prettier?sponsor=1"
      }
    },
    "node_modules/prettier-linter-helpers": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/prettier-linter-helpers/-/prettier-linter-helpers-1.0.1.tgz",
      "integrity": "sha512-SxToR7P8Y2lWmv/kTzVLC1t/GDI2WGjMwNhLLE9qtH8Q13C+aEmuRlzDst4Up4s0Wc8sF2M+J57iB3cMLqftfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-diff": "^1.1.2"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/prop-types/node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/protobufjs": {
      "version": "7.5.6",
      "resolved": "https://registry.npmjs.org/protobufjs/-/protobufjs-7.5.6.tgz",
      "integrity": "sha512-M71sTMB146U3u0di3yup8iM+zv8yPRNQVr1KK4tyBitl3qFvEGucq/rGDRShD2rsJhtN02RJaJ7j5X5hmy8SJg==",
      "hasInstallScript": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.2",
        "@protobufjs/base64": "^1.1.2",
        "@protobufjs/codegen": "^2.0.5",
        "@protobufjs/eventemitter": "^1.1.0",
        "@protobufjs/fetch": "^1.1.0",
        "@protobufjs/float": "^1.0.2",
        "@protobufjs/inquire": "^1.1.1",
        "@protobufjs/path": "^1.1.2",
        "@protobufjs/pool": "^1.1.0",
        "@protobufjs/utf8": "^1.1.1",
        "@types/node": ">=13.7.0",
        "long": "^5.0.0"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/react": {
      "version": "19.2.5",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.5.tgz",
      "integrity": "sha512-llUJLzz1zTUBrskt2pwZgLq59AemifIftw4aB7JxOqf1HY2FDaGDxgwpAPVzHU1kdWabH7FauP4i1oEeer2WCA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-day-picker": {
      "version": "9.14.0",
      "resolved": "https://registry.npmjs.org/react-day-picker/-/react-day-picker-9.14.0.tgz",
      "integrity": "sha512-tBaoDWjPwe0M5pGrum4H0SR6Lyk+BO9oHnp9JbKpGKW2mlraNPgP9BMfsg5pWpwrssARmeqk7YBl2oXutZTaHA==",
      "license": "MIT",
      "dependencies": {
        "@date-fns/tz": "^1.4.1",
        "@tabby_ai/hijri-converter": "1.0.5",
        "date-fns": "^4.1.0",
        "date-fns-jalali": "4.1.0-0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "individual",
        "url": "https://github.com/sponsors/gpbl"
      },
      "peerDependencies": {
        "react": ">=16.8.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.5",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.5.tgz",
      "integrity": "sha512-J5bAZz+DXMMwW/wV3xzKke59Af6CHY7G4uYLN1OvBcKEsWOs4pQExj86BBKamxl/Ik5bx9whOrvBlSDfWzgSag==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.5"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.72.1",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.72.1.tgz",
      "integrity": "sha512-RhwBoy2ygeVZje+C+bwJ8g0NjTdBmDlJvAUHTxRjTmSUKPYsKfMphkS2sgEMotsY03bP358yEYlnUeZy//D9Ig==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-is": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz",
      "integrity": "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==",
      "license": "MIT"
    },
    "node_modules/react-refresh": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.18.0.tgz",
      "integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-remove-scroll": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.7.2.tgz",
      "integrity": "sha512-Iqb9NjCCTt6Hf+vOdNIZGdTiH1QSqr27H/Ek9sv/a97gfueI/5h1s3yRi1nngzMUaOOToin5dI1dXKdXiF+u0Q==",
      "license": "MIT",
      "dependencies": {
        "react-remove-scroll-bar": "^2.3.7",
        "react-style-singleton": "^2.2.3",
        "tslib": "^2.1.0",
        "use-callback-ref": "^1.3.3",
        "use-sidecar": "^1.1.3"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll-bar": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",
      "integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",
      "license": "MIT",
      "dependencies": {
        "react-style-singleton": "^2.2.2",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-resizable-panels": {
      "version": "4.10.0",
      "resolved": "https://registry.npmjs.org/react-resizable-panels/-/react-resizable-panels-4.10.0.tgz",
      "integrity": "sha512-frjewRQt7TCv/vCH1pJfjZ7RxAhr5pKuqVQtVgzFq/vherxBFOWyC3xMbryx5Ti2wylViGUFc93Etg4rB3E0UA==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/react-smooth": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/react-smooth/-/react-smooth-4.0.4.tgz",
      "integrity": "sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==",
      "license": "MIT",
      "dependencies": {
        "fast-equals": "^5.0.1",
        "prop-types": "^15.8.1",
        "react-transition-group": "^4.4.5"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/react-style-singleton": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.3.tgz",
      "integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",
      "license": "MIT",
      "dependencies": {
        "get-nonce": "^1.0.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-transition-group": {
      "version": "4.4.5",
      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz",
      "integrity": "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/runtime": "^7.5.5",
        "dom-helpers": "^5.0.1",
        "loose-envify": "^1.4.0",
        "prop-types": "^15.6.2"
      },
      "peerDependencies": {
        "react": ">=16.6.0",
        "react-dom": ">=16.6.0"
      }
    },
    "node_modules/recharts": {
      "version": "2.15.4",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-2.15.4.tgz",
      "integrity": "sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw==",
      "license": "MIT",
      "dependencies": {
        "clsx": "^2.0.0",
        "eventemitter3": "^4.0.1",
        "lodash": "^4.17.21",
        "react-is": "^18.3.1",
        "react-smooth": "^4.0.4",
        "recharts-scale": "^0.4.4",
        "tiny-invariant": "^1.3.1",
        "victory-vendor": "^36.6.8"
      },
      "engines": {
        "node": ">=14"
      },
      "peerDependencies": {
        "react": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/recharts-scale": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/recharts-scale/-/recharts-scale-0.4.5.tgz",
      "integrity": "sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==",
      "license": "MIT",
      "dependencies": {
        "decimal.js-light": "^2.4.1"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/rollup": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.60.1.tgz",
      "integrity": "sha512-VmtB2rFU/GroZ4oL8+ZqXgSA38O6GR8KSIvWmEFv63pQ0G6KaBH9s07PO8XTXP4vI+3UJUEypOfjkGfmSBBR0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.60.1",
        "@rollup/rollup-android-arm64": "4.60.1",
        "@rollup/rollup-darwin-arm64": "4.60.1",
        "@rollup/rollup-darwin-x64": "4.60.1",
        "@rollup/rollup-freebsd-arm64": "4.60.1",
        "@rollup/rollup-freebsd-x64": "4.60.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.60.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.60.1",
        "@rollup/rollup-linux-arm64-gnu": "4.60.1",
        "@rollup/rollup-linux-arm64-musl": "4.60.1",
        "@rollup/rollup-linux-loong64-gnu": "4.60.1",
        "@rollup/rollup-linux-loong64-musl": "4.60.1",
        "@rollup/rollup-linux-ppc64-gnu": "4.60.1",
        "@rollup/rollup-linux-ppc64-musl": "4.60.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.60.1",
        "@rollup/rollup-linux-riscv64-musl": "4.60.1",
        "@rollup/rollup-linux-s390x-gnu": "4.60.1",
        "@rollup/rollup-linux-x64-gnu": "4.60.1",
        "@rollup/rollup-linux-x64-musl": "4.60.1",
        "@rollup/rollup-openbsd-x64": "4.60.1",
        "@rollup/rollup-openharmony-arm64": "4.60.1",
        "@rollup/rollup-win32-arm64-msvc": "4.60.1",
        "@rollup/rollup-win32-ia32-msvc": "4.60.1",
        "@rollup/rollup-win32-x64-gnu": "4.60.1",
        "@rollup/rollup-win32-x64-msvc": "4.60.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/seroval": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/seroval/-/seroval-1.5.2.tgz",
      "integrity": "sha512-xcRN39BdsnO9Tf+VzsE7b3JyTJASItIV1FVFewJKCFcW4s4haIKS3e6vj8PGB9qBwC7tnuOywQMdv5N4qkzi7Q==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/seroval-plugins": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/seroval-plugins/-/seroval-plugins-1.5.2.tgz",
      "integrity": "sha512-qpY0Cl+fKYFn4GOf3cMiq6l72CpuVaawb6ILjubOQ+diJ54LfOWaSSPsaswN8DRPIPW4Yq+tE1k5aKd7ILyaFg==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "seroval": "^1.0"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/sonner": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/sonner/-/sonner-2.0.7.tgz",
      "integrity": "sha512-W6ZN4p58k8aDKA4XPcx2hpIQXBRAgyiWVkYhT7CvK6D3iAu7xjvVyhQHg2/iaKJZ1XVJ4r7XuwGL+WGEK37i9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/synckit": {
      "version": "0.11.12",
      "resolved": "https://registry.npmjs.org/synckit/-/synckit-0.11.12.tgz",
      "integrity": "sha512-Bh7QjT8/SuKUIfObSXNHNSK6WHo6J1tHCqJsuaFDP7gP0fkzSfTxI8y85JrppZ0h8l0maIgc2tfuZQ6/t3GtnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@pkgr/core": "^0.2.9"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/synckit"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.5.0.tgz",
      "integrity": "sha512-I8K9wewnVDkL1NTGoqWmVEIlUcB9gFriAEkXkfCjX5ib8ezGxtR3xD7iZIxrfArjEsH7F1CHD4RFUtxefdqV/A==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.2.2.tgz",
      "integrity": "sha512-KWBIxs1Xb6NoLdMVqhbhgwZf2PGBpPEiwOqgI4pFIYbNTfBXiKYyWoTsXgBQ9WFg/OlhnvHaY+AEpW7wSmFo2Q==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.2.tgz",
      "integrity": "sha512-1MOpMXuhGzGL5TTCZFItxCc0AARf1EZFQkGqMm7ERKj8+Hgr5oLvJOVFcC+lRmR8hCe2S3jC4T5D7Vg/d7/fhA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.16",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.16.tgz",
      "integrity": "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/tsconfck": {
      "version": "3.1.6",
      "resolved": "https://registry.npmjs.org/tsconfck/-/tsconfck-3.1.6.tgz",
      "integrity": "sha512-ks6Vjr/jEw0P1gmOVwutM3B7fWxoWBL2KRDb1JfqGVawBmO5UsvmWOQFGHBPl5yxYz4eERr19E6L7NMv+Fej4w==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "tsconfck": "bin/tsconfck.js"
      },
      "engines": {
        "node": "^18 || >=20"
      },
      "peerDependencies": {
        "typescript": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tw-animate-css": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.4.0.tgz",
      "integrity": "sha512-7bziOlRqH0hJx80h/3mbicLW7o8qLsH5+RaLR2t+OHM3D0JlWGODQKQ4cxbK7WlvmUxpcj6Kgu6EKqjrGFe3QQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Wombosvideo"
      }
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.58.2",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.58.2.tgz",
      "integrity": "sha512-V8iSng9mRbdZjl54VJ9NKr6ZB+dW0J3TzRXRGcSbLIej9jV86ZRtlYeTKDR/QLxXykocJ5icNzbsl2+5TzIvcQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.58.2",
        "@typescript-eslint/parser": "8.58.2",
        "@typescript-eslint/typescript-estree": "8.58.2",
        "@typescript-eslint/utils": "8.58.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-callback-ref": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.3.tgz",
      "integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sidecar": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.3.tgz",
      "integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",
      "license": "MIT",
      "dependencies": {
        "detect-node-es": "^1.1.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/vaul": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vaul/-/vaul-1.1.2.tgz",
      "integrity": "sha512-ZFkClGpWyI2WUQjdLJ/BaGuV6AVQiJ3uELGk3OYtP+B6yCO7Cmn9vPFXVJkRaGkOJu3m8bQMgtyzNHixULceQA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-dialog": "^1.1.1"
      },
      "peerDependencies": {
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/victory-vendor": {
      "version": "36.9.2",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-36.9.2.tgz",
      "integrity": "sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "6.4.2",
      "resolved": "https://registry.npmjs.org/vite/-/vite-6.4.2.tgz",
      "integrity": "sha512-2N/55r4JDJ4gdrCvGgINMy+HH3iRpNIz8K6SFwVsA+JbQScLiC+clmAxBgwiSPgcG9U15QmvqCGWzMbqda5zGQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.4.4",
        "picomatch": "^4.0.2",
        "postcss": "^8.5.3",
        "rollup": "^4.34.9",
        "tinyglobby": "^0.2.13"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "jiti": ">=1.21.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite-tsconfig-paths": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/vite-tsconfig-paths/-/vite-tsconfig-paths-6.1.1.tgz",
      "integrity": "sha512-2cihq7zliibCCZ8P9cKJrQBkfgdvcFkOOc3Y02o3GWUDLgqjWsZudaoiuOwO/gzTzy17cS5F7ZPo4bsnS4DGkg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.1.1",
        "globrex": "^0.1.2",
        "tsconfck": "^3.0.3"
      },
      "peerDependencies": {
        "vite": "*"
      }
    },
    "node_modules/wavesurfer.js": {
      "version": "7.12.6",
      "resolved": "https://registry.npmjs.org/wavesurfer.js/-/wavesurfer.js-7.12.6.tgz",
      "integrity": "sha512-zSxPgOFprtyJ31ppHQF0+E9jAmjAhi1rR36yIW6h1GOYdpRxDe6mbkYtlChqLK0Iz8ROBweiEFw2zus7tDFibA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/web-vitals": {
      "version": "4.2.4",
      "resolved": "https://registry.npmjs.org/web-vitals/-/web-vitals-4.2.4.tgz",
      "integrity": "sha512-r4DIlprAGwJ7YM11VZp4R884m0Vmgr6EAKe3P+kO0PPj3Unqyvv59rczf6UiGcb9Z8QxZVcqKNwv/g0WNdWwsw==",
      "license": "Apache-2.0"
    },
    "node_modules/websocket-driver": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.4.tgz",
      "integrity": "sha512-b17KeDIQVjvb0ssuSDF2cYXSg2iztliJ4B9WdsuB6J952qCPKmnVq4DyW5motImXHDC1cBT/1UezrJVsKw5zjg==",
      "license": "Apache-2.0",
      "dependencies": {
        "http-parser-js": ">=0.5.1",
        "safe-buffer": ">=5.1.0",
        "websocket-extensions": ">=0.1.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/websocket-extensions": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.4.tgz",
      "integrity": "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}

```

---

## File: package.json

```json
{
  "name": "novario-news-ovii-chat",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tanstack/react-query": "^5.83.0",
    "@tanstack/react-router": "^1.168.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "emoji-picker-react": "^4.19.1",
    "firebase": "^12.12.1",
    "framer-motion": "^12.38.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.575.0",
    "react": "^19.2.0",
    "react-day-picker": "^9.14.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.71.2",
    "react-resizable-panels": "^4.6.5",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "tailwindcss": "^4.2.1",
    "tw-animate-css": "^1.3.4",
    "vaul": "^1.1.2",
    "wavesurfer.js": "^7.12.6",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/vite": "^4.2.1",
    "@types/node": "^22.16.5",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.32.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.6",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "prettier": "^3.7.3",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.56.1",
    "vite": "^6.3.5",
    "vite-tsconfig-paths": "^6.0.2"
  }
}

```

---

## File: public\manifest.json

```json
{
  "name": "Novario — Premium News",
  "short_name": "Novario",
  "description": "Premium, fast, independent news from India and the world.",
  "start_url": "/news",
  "display": "standalone",
  "background_color": "#0f1118",
  "theme_color": "#1a1d2e",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/novario-brand.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ],
  "categories": ["news", "magazines"],
  "lang": "en",
  "dir": "ltr"
}

```

---

## File: public\sw.js

```js
// Novario Service Worker — minimal, required for PWA install prompt
const CACHE_NAME = 'novario-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy — always serve fresh content
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

```

---

## File: scratch\OViiChat_stable_base.tsx

```tsx
��i m p o r t   {   u s e E f f e c t ,   u s e R e f ,   u s e S t a t e   }   f r o m   " r e a c t " ;  
 i m p o r t   {   m o t i o n ,   A n i m a t e P r e s e n c e   }   f r o m   " f r a m e r - m o t i o n " ;  
 i m p o r t   {  
     c o l l e c t i o n ,   a d d D o c ,   o n S n a p s h o t ,   o r d e r B y ,   q u e r y ,   s e r v e r T i m e s t a m p ,  
     d e l e t e D o c ,   d o c ,   T i m e s t a m p ,   s e t D o c ,   g e t D o c s ,   w r i t e B a t c h  
 }   f r o m   " f i r e b a s e / f i r e s t o r e " ;  
 i m p o r t   {   a u t h ,   d b ,   e n s u r e A n o n A u t h   }   f r o m   " @ / l i b / f i r e b a s e " ;  
 i m p o r t   {   A V A T A R S   }   f r o m   " @ / l i b / a v a t a r s " ;  
 i m p o r t   {   M i c ,   I m a g e   a s   I m a g e I c o n ,   S e n d ,   T r a s h 2 ,   F o l d e r ,   R e p l y ,   D o w n l o a d ,   X ,   P l a y ,   P a u s e ,   X C i r c l e ,   A r r o w L e f t R i g h t ,   C h e v r o n D o w n ,   C h e v r o n L e f t ,   S u n ,   M o o n ,   M o r e V e r t i c a l ,   S h i e l d O f f ,   C l o c k   }   f r o m   " l u c i d e - r e a c t " ;  
 i m p o r t   {   T o a s t e r ,   t o a s t   }   f r o m   " s o n n e r " ;  
 i m p o r t   W a v e S u r f e r   f r o m   " w a v e s u r f e r . j s " ;  
  
 t y p e   M s g   =   {  
     i d :   s t r i n g ;  
     u i d :   s t r i n g ;  
     a v a t a r :   s t r i n g ;  
     n a m e ? :   s t r i n g ;  
     t y p e :   " t e x t "   |   " i m a g e "   |   " v o i c e " ;  
     c o n t e n t :   s t r i n g ;  
     c a p t i o n ? :   s t r i n g ;  
     c r e a t e d A t ? :   T i m e s t a m p ;  
     s t a t u s ? :   " s e n d i n g "   |   " s e n t "   |   " d e l i v e r e d "   |   " r e a d " ;  
     r e p l y T o ? :   {   i d :   s t r i n g ,   c o n t e n t :   s t r i n g ,   a v a t a r :   s t r i n g ,   n a m e ? :   s t r i n g   } ;  
 } ;  
  
 c o n s t   R O O M   =   " o v i i - r o o m " ;  
 c o n s t   S T O P _ A U D I O _ E V E N T   =   " o v i i _ s t o p _ a u d i o " ;  
  
 / /   �� � �� � �� �   D e t e c t   i f   w e ' r e   o n   a   t o u c h / m o b i l e   d e v i c e   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
 c o n s t   i s M o b i l e D e v i c e   =   ( )   = >  
     t y p e o f   w i n d o w   ! = =   " u n d e f i n e d "   & &   w i n d o w . i n n e r W i d t h   <   7 6 8 ;  
  
 / /   �� � �� � �� �   A u d i o P l a y e r   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
 c o n s t   A u d i o P l a y e r   =   ( {   s r c ,   i d ,   m i n e ,   s t a t u s ,   c r e a t e d A t ,   i s D a r k M o d e   } :   {   s r c :   s t r i n g ,   i d :   s t r i n g ,   m i n e :   b o o l e a n ,   s t a t u s ? :   s t r i n g ,   c r e a t e d A t ? :   a n y ,   i s D a r k M o d e :   b o o l e a n   } )   = >   {  
     c o n s t   c o n t a i n e r R e f   =   u s e R e f < H T M L D i v E l e m e n t > ( n u l l ) ;  
     c o n s t   w a v e R e f   =   u s e R e f < W a v e S u r f e r   |   n u l l > ( n u l l ) ;  
     c o n s t   [ p l a y i n g ,   s e t P l a y i n g ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ d u r a t i o n ,   s e t D u r a t i o n ]   =   u s e S t a t e ( 0 ) ;  
     c o n s t   [ c u r r e n t T i m e ,   s e t C u r r e n t T i m e ]   =   u s e S t a t e ( 0 ) ;  
     c o n s t   [ s p e e d ,   s e t S p e e d ]   =   u s e S t a t e < 1   |   1 . 5   |   2 > ( 1 ) ;  
  
     u s e E f f e c t ( ( )   = >   {  
         i f   ( ! c o n t a i n e r R e f . c u r r e n t )   r e t u r n ;  
         c o n s t   w s   =   W a v e S u r f e r . c r e a t e ( {  
             c o n t a i n e r :   c o n t a i n e r R e f . c u r r e n t ,  
             w a v e C o l o r :   i s D a r k M o d e   ?   ( m i n e   ?   " # 8 6 9 6 a 0 "   :   " # 6 6 7 7 8 1 " )   :   " # 8 6 9 6 a 0 " ,  
             p r o g r e s s C o l o r :   i s D a r k M o d e   ?   " # 3 4 b 7 f 1 "   :   " # 3 4 b 7 f 1 " ,  
             c u r s o r W i d t h :   0 ,  
             b a r W i d t h :   2 ,  
             b a r G a p :   3 ,  
             b a r R a d i u s :   2 ,  
             h e i g h t :   3 2 ,  
             n o r m a l i z e :   t r u e ,  
         } ) ;  
         w s . l o a d ( s r c ) ;  
         w a v e R e f . c u r r e n t   =   w s ;  
         w s . o n ( " r e a d y " ,   ( )   = >   s e t D u r a t i o n ( w s . g e t D u r a t i o n ( ) ) ) ;  
         w s . o n ( " a u d i o p r o c e s s " ,   ( )   = >   s e t C u r r e n t T i m e ( w s . g e t C u r r e n t T i m e ( ) ) ) ;  
         w s . o n ( " f i n i s h " ,   ( )   = >   {   s e t P l a y i n g ( f a l s e ) ;   s e t C u r r e n t T i m e ( w s . g e t D u r a t i o n ( ) ) ;   } ) ;  
         c o n s t   s t o p O t h e r s   =   ( e :   a n y )   = >   {   i f   ( e . d e t a i l   ! = =   i d   & &   w s . i s P l a y i n g ( ) )   {   w s . p a u s e ( ) ;   s e t P l a y i n g ( f a l s e ) ;   }   } ;  
         w i n d o w . a d d E v e n t L i s t e n e r ( S T O P _ A U D I O _ E V E N T ,   s t o p O t h e r s ) ;  
         r e t u r n   ( )   = >   {   w i n d o w . r e m o v e E v e n t L i s t e n e r ( S T O P _ A U D I O _ E V E N T ,   s t o p O t h e r s ) ;   w s . d e s t r o y ( ) ;   } ;  
     } ,   [ s r c ,   i d ,   i s D a r k M o d e ,   m i n e ] ) ;  
  
     c o n s t   t o g g l e   =   ( )   = >   {  
         i f   ( ! w a v e R e f . c u r r e n t )   r e t u r n ;  
         i f   ( p l a y i n g )   w a v e R e f . c u r r e n t . p a u s e ( ) ;  
         e l s e   {   w i n d o w . d i s p a t c h E v e n t ( n e w   C u s t o m E v e n t ( S T O P _ A U D I O _ E V E N T ,   {   d e t a i l :   i d   } ) ) ;   w a v e R e f . c u r r e n t . p l a y ( ) ;   }  
         s e t P l a y i n g ( ! p l a y i n g ) ;  
     } ;  
  
     c o n s t   t o g g l e S p e e d   =   ( )   = >   {  
         i f   ( ! w a v e R e f . c u r r e n t )   r e t u r n ;  
         c o n s t   n e x t   =   s p e e d   = = =   1   ?   1 . 5   :   s p e e d   = = =   1 . 5   ?   2   :   1 ;  
         w a v e R e f . c u r r e n t . s e t P l a y b a c k R a t e ( n e x t ) ;  
         s e t S p e e d ( n e x t ) ;  
     } ;  
  
     c o n s t   f m t   =   ( s :   n u m b e r )   = >   {  
         i f   ( ! s   | |   i s N a N ( s ) )   r e t u r n   " 0 : 0 0 " ;  
         c o n s t   m   =   M a t h . f l o o r ( s   /   6 0 ) ;  
         c o n s t   s s   =   M a t h . f l o o r ( s   %   6 0 ) ;  
         r e t u r n   ` $ { m } : $ { s s   <   1 0   ?   " 0 "   :   " " } $ { s s } ` ;  
     } ;  
  
     c o n s t   t i m e S t r   =   c r e a t e d A t ? . t o D a t e ? . ( ) ? . t o L o c a l e T i m e S t r i n g ( [ ] ,   {   h o u r :   " 2 - d i g i t " ,   m i n u t e :   " 2 - d i g i t "   } )   | |   " " ;  
  
     r e t u r n   (  
         < d i v   c l a s s N a m e = { ` f l e x   i t e m s - c e n t e r   g a p - 3   w - f u l l   m a x - w - [ 3 0 0 p x ]   p - [ 1 0 p x ]   r o u n d e d - [ 1 8 p x ]   t r a n s i t i o n - a l l   $ { m i n e    
                 ?   ( i s D a r k M o d e   ?   " b g - [ # 0 0 5 c 4 b ]   t e x t - w h i t e "   :   " b g - [ # d c f 8 c 6 ]   t e x t - b l a c k " )    
                 :   ( i s D a r k M o d e   ?   " b g - [ # 2 0 2 c 3 3 ]   t e x t - w h i t e "   :   " b g - w h i t e   t e x t - b l a c k " )  
             }   $ { m i n e   ?   " r o u n d e d - b r - [ 4 p x ] "   :   " r o u n d e d - b l - [ 4 p x ] " } ` } >  
             < b u t t o n   o n C l i c k = { t o g g l e }   c l a s s N a m e = " s h r i n k - 0   t e x t - c u r r e n t   o p a c i t y - 8 0   h o v e r : o p a c i t y - 1 0 0 " >  
                 { p l a y i n g   ?   < P a u s e   c l a s s N a m e = " w - 6   h - 6   f i l l - c u r r e n t "   / >   :   < P l a y   c l a s s N a m e = " w - 6   h - 6   f i l l - c u r r e n t "   / > }  
             < / b u t t o n >  
             < d i v   c l a s s N a m e = " f l e x - 1   m i n - w - 0   f l e x   f l e x - c o l   g a p - 1 " >  
                 < d i v   r e f = { c o n t a i n e r R e f }   c l a s s N a m e = " w - f u l l   h - [ 3 2 p x ] "   / >  
                 < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   j u s t i f y - b e t w e e n   o p a c i t y - 6 0   t e x t - [ 1 0 p x ]   f o n t - m e d i u m   u p p e r c a s e   t r a c k i n g - w i d e r   m t - 1 " >  
                     < s p a n > { f m t ( p l a y i n g   ?   c u r r e n t T i m e   :   d u r a t i o n ) } < / s p a n >  
                     < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   g a p - 2 " >  
                         { ! i s M o b i l e D e v i c e ( )   & &   (  
                             < b u t t o n   o n C l i c k = { t o g g l e S p e e d }   c l a s s N a m e = " b g - b l a c k / 1 0   p x - 1 . 5   p y - 0 . 5   r o u n d e d - m d   f o n t - b o l d   h o v e r : b g - b l a c k / 2 0 " > { s p e e d } x < / b u t t o n >  
                         ) }  
                         < s p a n   c l a s s N a m e = { ` f o n t - m e d i u m   $ { i s M o b i l e D e v i c e ( )   ?   " t e x t - [ 9 p x ] "   :   " t e x t - [ 1 0 p x ] " } ` } > { t i m e S t r } < / s p a n >  
                         { m i n e   & &   < M s g T i c k   s t a t u s = { s t a t u s }   / > }  
                     < / d i v >  
                 < / d i v >  
             < / d i v >  
         < / d i v >  
     ) ;  
 } ;  
  
 / /   �� � �� � �� �   M s g T i c k   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
 c o n s t   M s g T i c k   =   ( {   s t a t u s   } :   {   s t a t u s ? :   s t r i n g   } )   = >   {  
     i f   ( s t a t u s   = = =   " s e n d i n g " )   r e t u r n   < s v g   c l a s s N a m e = " w - 3   h - 3   o p a c i t y - 4 0 "   v i e w B o x = " 0   0   1 6   1 6 "   f i l l = " n o n e " > < c i r c l e   c x = " 8 "   c y = " 8 "   r = " 6 "   s t r o k e = " c u r r e n t C o l o r "   s t r o k e W i d t h = " 1 . 5 "   s t r o k e D a s h a r r a y = " 3   2 "   / > < / s v g > ;  
     i f   ( s t a t u s   = = =   " s e n t " )   r e t u r n   (  
         < s v g   c l a s s N a m e = " w - [ 1 3 p x ]   h - [ 9 p x ]   o p a c i t y - 4 0 "   v i e w B o x = " 0   0   1 2   9 "   f i l l = " n o n e " >  
             < p a t h   d = " M 1   4 . 5 L 4 . 5   8 L 1 1   1 "   s t r o k e = " c u r r e n t C o l o r "   s t r o k e W i d t h = " 1 . 5 "   s t r o k e L i n e c a p = " r o u n d "   s t r o k e L i n e j o i n = " r o u n d "   / >  
         < / s v g >  
     ) ;  
     i f   ( s t a t u s   = = =   " d e l i v e r e d " )   r e t u r n   (  
         < s v g   c l a s s N a m e = " w - [ 1 7 p x ]   h - [ 9 p x ]   o p a c i t y - 4 0 "   v i e w B o x = " 0   0   1 6   9 "   f i l l = " n o n e " >  
             < p a t h   d = " M 1   4 . 5 L 4 . 5   8 L 1 1   1 "   s t r o k e = " c u r r e n t C o l o r "   s t r o k e W i d t h = " 1 . 5 "   s t r o k e L i n e c a p = " r o u n d "   s t r o k e L i n e j o i n = " r o u n d "   / >  
             < p a t h   d = " M 5   4 . 5 L 8 . 5   8 L 1 5   1 "   s t r o k e = " c u r r e n t C o l o r "   s t r o k e W i d t h = " 1 . 5 "   s t r o k e L i n e c a p = " r o u n d "   s t r o k e L i n e j o i n = " r o u n d "   / >  
         < / s v g >  
     ) ;  
     i f   ( s t a t u s   = = =   " r e a d " )   r e t u r n   (  
         < s v g   c l a s s N a m e = " w - [ 1 7 p x ]   h - [ 9 p x ]   t e x t - [ # 5 3 b d e b ] "   v i e w B o x = " 0   0   1 6   9 "   f i l l = " n o n e " >  
             < p a t h   d = " M 1   4 . 5 L 4 . 5   8 L 1 1   1 "   s t r o k e = " c u r r e n t C o l o r "   s t r o k e W i d t h = " 1 . 5 "   s t r o k e L i n e c a p = " r o u n d "   s t r o k e L i n e j o i n = " r o u n d "   / >  
             < p a t h   d = " M 5   4 . 5 L 8 . 5   8 L 1 5   1 "   s t r o k e = " c u r r e n t C o l o r "   s t r o k e W i d t h = " 1 . 5 "   s t r o k e L i n e c a p = " r o u n d "   s t r o k e L i n e j o i n = " r o u n d "   / >  
         < / s v g >  
     ) ;  
     r e t u r n   n u l l ;  
 } ;  
  
 / /   �� � �� � �� �   R e c o r d i n g V i s u a l i z e r   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
 c o n s t   R e c o r d i n g V i s u a l i z e r   =   ( )   = >   (  
     < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   g a p - 0 . 5   h - 4 " >  
         { [ . . . A r r a y ( 8 ) ] . m a p ( ( _ ,   i )   = >   (  
             < m o t i o n . d i v  
                 k e y = { i }  
                 a n i m a t e = { {   h e i g h t :   [ 4 ,   1 2 ,   4 ]   } }  
                 t r a n s i t i o n = { {   d u r a t i o n :   0 . 5 ,   r e p e a t :   I n f i n i t y ,   d e l a y :   i   *   0 . 0 5 ,   e a s e :   " e a s e I n O u t "   } }  
                 c l a s s N a m e = " w - 1   b g - p r i m a r y   r o u n d e d - f u l l "  
             / >  
         ) ) }  
     < / d i v >  
 ) ;  
  
 / /   �� � �� � �� �   M e d i a L i s t   ( f o r m e r l y   F i l e s L i s t )   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
 f u n c t i o n   M e d i a L i s t ( {   m s g s ,   u i d ,   d o w n l o a d F i l e ,   i s D a r k M o d e ,   s e t S e l e c t e d I m a g e   } :   {   m s g s :   M s g [ ] ,   u i d :   s t r i n g   |   n u l l ,   d o w n l o a d F i l e :   ( u :   s t r i n g ,   i :   s t r i n g ,   t :   s t r i n g )   = >   v o i d ,   i s D a r k M o d e :   b o o l e a n ,   s e t S e l e c t e d I m a g e :   ( u r l :   s t r i n g )   = >   v o i d   } )   {  
     c o n s t   m e d i a M s g s   =   m s g s . f i l t e r ( m   = >   m . t y p e   = = =   " v o i c e "   | |   m . t y p e   = = =   " i m a g e " ) ;  
     i f   ( m e d i a M s g s . l e n g t h   = = =   0 )   r e t u r n   < p   c l a s s N a m e = " t e x t - m u t e d - f o r e g r o u n d   t e x t - c e n t e r   m t - 1 0   t e x t - x s " > N o   s a v e d   m e d i a . < / p > ;  
  
     c o n s t   g r o u p s   =   m e d i a M s g s . r e d u c e ( ( a c c ,   m )   = >   {  
         c o n s t   d a t e   =   m . c r e a t e d A t ? . t o D a t e ( ) . t o L o c a l e D a t e S t r i n g ( u n d e f i n e d ,   {   w e e k d a y :   " s h o r t " ,   m o n t h :   " s h o r t " ,   d a y :   " n u m e r i c "   } )   | |   " T o d a y " ;  
         i f   ( ! a c c [ d a t e ] )   a c c [ d a t e ]   =   [ ] ;  
         a c c [ d a t e ] . p u s h ( m ) ;  
         r e t u r n   a c c ;  
     } ,   { }   a s   R e c o r d < s t r i n g ,   M s g [ ] > ) ;  
  
     r e t u r n   (  
         < >  
             { O b j e c t . e n t r i e s ( g r o u p s ) . m a p ( ( [ d a t e ,   i t e m s ] )   = >   (  
                 < d i v   k e y = { d a t e }   c l a s s N a m e = " s p a c e - y - 3 " >  
                     < h 3   c l a s s N a m e = " t e x t - [ 1 0 p x ]   f o n t - b o l d   t e x t - m u t e d - f o r e g r o u n d / 6 0   u p p e r c a s e   t r a c k i n g - w i d e s t   p l - 1 " > { d a t e } < / h 3 >  
                     { i t e m s . m a p ( m   = >   (  
                         < d i v   k e y = { m . i d }   c l a s s N a m e = " b g - c a r d / 3 0   b o r d e r   b o r d e r - b o r d e r / 1 0   p - 2 . 5   r o u n d e d - 2 x l   f l e x   i t e m s - c e n t e r   g a p - 4   l g : g a p - 6   s h a d o w - s m   h o v e r : b g - c a r d / 5 0   t r a n s i t i o n - a l l   g r o u p " >  
                             < d i v   c l a s s N a m e = " f l e x - 1   m i n - w - 0 " >  
                                 { m . t y p e   = = =   " v o i c e "   ?   (  
                                     < A u d i o P l a y e r   s r c = { m . c o n t e n t }   i d = { m . i d }   m i n e = { m . u i d   = = =   u i d }   c r e a t e d A t = { m . c r e a t e d A t }   i s D a r k M o d e = { i s D a r k M o d e }   / >  
                                 )   :   (  
                                     < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   g a p - 3   p - 1 " >  
                                         < i m g   s r c = { m . c o n t e n t }   c l a s s N a m e = " w - 1 2   h - 1 2   r o u n d e d - l g   o b j e c t - c o v e r   s h a d o w - s m   c u r s o r - p o i n t e r   a c t i v e : s c a l e - 9 5   t r a n s i t i o n - t r a n s f o r m "   o n C l i c k = { ( )   = >   s e t S e l e c t e d I m a g e ( m . c o n t e n t ) }   a l t = " "   / >  
                                         < d i v   c l a s s N a m e = " f l e x - 1   m i n - w - 0 " >  
                                             < d i v   c l a s s N a m e = { ` t e x t - [ 1 2 p x ]   f o n t - b o l d   t r u n c a t e   $ { i s D a r k M o d e   ?   " t e x t - w h i t e / 8 0 "   :   " t e x t - b l a c k / 8 0 " } ` } > P h o t o < / d i v >  
                                             < d i v   c l a s s N a m e = " t e x t - [ 1 0 p x ]   o p a c i t y - 4 0   u p p e r c a s e " > { m . c r e a t e d A t ? . t o D a t e ( ) ? . t o L o c a l e T i m e S t r i n g ( [ ] ,   {   h o u r :   " 2 - d i g i t " ,   m i n u t e :   " 2 - d i g i t "   } ) } < / d i v >  
                                         < / d i v >  
                                     < / d i v >  
                                 ) }  
                             < / d i v >  
                             < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   g a p - 2 " >  
                                 { m . t y p e   = = =   " i m a g e "   & &   (  
                                     < b u t t o n  
                                         o n C l i c k = { ( )   = >   s e t S e l e c t e d I m a g e ( m . c o n t e n t ) }  
                                         c l a s s N a m e = " p - 2 . 5   b g - p r i m a r y / 5   h o v e r : b g - p r i m a r y / 1 0   r o u n d e d - f u l l   t e x t - p r i m a r y   t r a n s i t i o n - a l l   s h r i n k - 0 "  
                                         a r i a - l a b e l = " V i e w   p h o t o "  
                                     >  
                                         < I m a g e I c o n   c l a s s N a m e = " w - 4   h - 4 "   / >  
                                     < / b u t t o n >  
                                 ) }  
                                 < b u t t o n  
                                     o n C l i c k = { ( )   = >   d o w n l o a d F i l e ( m . c o n t e n t ,   m . i d ,   m . t y p e ) }  
                                     c l a s s N a m e = " p - 2 . 5   b g - p r i m a r y / 1 0   h o v e r : b g - p r i m a r y / 2 0   r o u n d e d - f u l l   t e x t - p r i m a r y   t r a n s i t i o n - a l l   s h r i n k - 0   s h a d o w - s m "  
                                     a r i a - l a b e l = { ` D o w n l o a d   $ { m . t y p e } ` }  
                                 >  
                                     < D o w n l o a d   c l a s s N a m e = " w - 4   h - 4 "   / >  
                                 < / b u t t o n >  
                             < / d i v >  
                         < / d i v >  
                     ) ) }  
                 < / d i v >  
             ) ) }  
         < / >  
     ) ;  
 }  
  
 / /   �� � �� � �� �   O V i i C h a t   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
 e x p o r t   f u n c t i o n   O V i i C h a t ( {   o n L o c k   } :   {   o n L o c k :   ( )   = >   v o i d   } )   {  
     c o n s t   [ u i d ,   s e t U i d ]   =   u s e S t a t e < s t r i n g   |   n u l l > ( n u l l ) ;  
     c o n s t   [ i s U p l o a d i n g ,   s e t I s U p l o a d i n g ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ i n p u t H e i g h t ,   s e t I n p u t H e i g h t ]   =   u s e S t a t e ( 4 4 ) ;  
     c o n s t   [ i s D a r k M o d e ,   s e t I s D a r k M o d e ]   =   u s e S t a t e ( ( )   = >   {  
         c o n s t   s a v e d   =   l o c a l S t o r a g e . g e t I t e m ( " o v i i _ d a r k _ m o d e " ) ;  
         r e t u r n   s a v e d   = = =   n u l l   ?   t r u e   :   s a v e d   = = =   " t r u e " ;  
     } ) ;  
  
     u s e E f f e c t ( ( )   = >   {  
         l o c a l S t o r a g e . s e t I t e m ( " o v i i _ d a r k _ m o d e " ,   S t r i n g ( i s D a r k M o d e ) ) ;  
     } ,   [ i s D a r k M o d e ] ) ;  
  
     / /   - -   S c r o l l   t o   b o t t o m   o n   m o u n t   - -  
     u s e E f f e c t ( ( )   = >   {  
         / /   S m a l l   d e l a y   t o   e n s u r e   l a y o u t   i s   r e a d y  
         c o n s t   t i m e r   =   s e t T i m e o u t ( ( )   = >   s c r o l l T o B o t t o m ( t r u e ) ,   1 0 0 ) ;  
         r e t u r n   ( )   = >   c l e a r T i m e o u t ( t i m e r ) ;  
     } ,   [ ] ) ;  
  
     / /   �� � �� �   V i e w p o r t   h e i g h t :   O N L Y   u s e d   o n   m o b i l e   t o   c o m p e n s a t e   f o r   s o f t w a r e   k e y b o a r d   �� � �� �  
     / /   O n   d e s k t o p   w e   l e t   p o s i t i o n : f i x e d   +   i n s e t : 0   d o   t h e   w o r k   ( n o   z o o m   w h i t e s p a c e ) .  
     c o n s t   [ m o b i l e K e y b o a r d O f f s e t ,   s e t M o b i l e K e y b o a r d O f f s e t ]   =   u s e S t a t e ( 0 ) ;  
  
     c o n s t   [ d e v i c e I d ]   =   u s e S t a t e ( ( )   = >   {  
         l e t   i d   =   l o c a l S t o r a g e . g e t I t e m ( " o v i i _ d e v i c e _ i d " ) ;  
         i f   ( ! i d )   {  
             i d   =   M a t h . r a n d o m ( ) . t o S t r i n g ( 3 6 ) . s u b s t r i n g ( 2 ,   1 5 ) ;  
             l o c a l S t o r a g e . s e t I t e m ( " o v i i _ d e v i c e _ i d " ,   i d ) ;  
             l o c a l S t o r a g e . r e m o v e I t e m ( " o v i i - a v a t a r - c h o i c e " ) ;  
         }  
         r e t u r n   i d ;  
     } ) ;  
  
     c o n s t   i s R e t u r n i n g   =   ! ! l o c a l S t o r a g e . g e t I t e m ( " o v i i - a v a t a r - c h o i c e " )   & &   ! ! l o c a l S t o r a g e . g e t I t e m ( " o v i i - n a m e " ) ;  
     c o n s t   [ a v a t a r ,   s e t A v a t a r ]   =   u s e S t a t e < s t r i n g > ( ( )   = >   l o c a l S t o r a g e . g e t I t e m ( " o v i i - a v a t a r - c h o i c e " )   | |   " " ) ;  
     c o n s t   [ n a m e ,   s e t N a m e ]   =   u s e S t a t e < s t r i n g > ( ( )   = >   l o c a l S t o r a g e . g e t I t e m ( " o v i i - n a m e " )   | |   " " ) ;  
     c o n s t   [ s h o w A v a t a r P i c k e r ,   s e t S h o w A v a t a r P i c k e r ]   =   u s e S t a t e ( ! i s R e t u r n i n g ) ;  
     c o n s t   [ i n p u t N a m e ,   s e t I n p u t N a m e ]   =   u s e S t a t e ( n a m e ) ;  
  
     c o n s t   [ m s g s ,   s e t M s g s ]   =   u s e S t a t e < M s g [ ] > ( [ ] ) ;  
     c o n s t   [ t e x t ,   s e t T e x t ]   =   u s e S t a t e ( " " ) ;  
     c o n s t   [ r e c o r d i n g ,   s e t R e c o r d i n g ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ e r r o r ,   s e t E r r o r ]   =   u s e S t a t e ( " " ) ;  
     c o n s t   [ c o u n t ,   s e t C o u n t ]   =   u s e S t a t e ( 0 ) ;  
     c o n s t   [ t y p i n g U s e r s ,   s e t T y p i n g U s e r s ]   =   u s e S t a t e < s t r i n g [ ] > ( [ ] ) ;  
     c o n s t   [ r e c o r d i n g U s e r s ,   s e t R e c o r d i n g U s e r s ]   =   u s e S t a t e < s t r i n g [ ] > ( [ ] ) ;  
     c o n s t   [ i s T y p i n g ,   s e t I s T y p i n g ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ r e p l y i n g T o ,   s e t R e p l y i n g T o ]   =   u s e S t a t e < M s g   |   n u l l > ( n u l l ) ;  
     c o n s t   [ s h o w F o l d e r ,   s e t S h o w F o l d e r ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ o n l i n e U s e r s ,   s e t O n l i n e U s e r s ]   =   u s e S t a t e < {   u i d :   s t r i n g ,   n a m e :   s t r i n g ,   a v a t a r ? :   s t r i n g   } [ ] > ( [ ] ) ;  
     c o n s t   [ s h o w S c r o l l D o w n ,   s e t S h o w S c r o l l D o w n ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ s y s t e m M s g s ,   s e t S y s t e m M s g s ]   =   u s e S t a t e < {   i d :   s t r i n g ,   t e x t :   s t r i n g ,   t s :   n u m b e r ,   t y p e :   " j o i n "   |   " l e a v e "   } [ ] > ( [ ] ) ;  
     c o n s t   [ o t h e r L a s t S e e n ,   s e t O t h e r L a s t S e e n ]   =   u s e S t a t e < n u m b e r   |   n u l l > ( n u l l ) ;  
     c o n s t   [ o t h e r N a m e ,   s e t O t h e r N a m e ]   =   u s e S t a t e < s t r i n g   |   n u l l > ( n u l l ) ;  
     c o n s t   [ o t h e r O n l i n e ,   s e t O t h e r O n l i n e ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   [ o t h e r A v a t a r ,   s e t O t h e r A v a t a r ]   =   u s e S t a t e < s t r i n g   |   n u l l > ( n u l l ) ;  
     c o n s t   [ s e l e c t e d I m a g e ,   s e t S e l e c t e d I m a g e ]   =   u s e S t a t e < s t r i n g   |   n u l l > ( n u l l ) ;  
     c o n s t   [ s h o w M e n u ,   s e t S h o w M e n u ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   m e n u R e f   =   u s e R e f < H T M L D i v E l e m e n t > ( n u l l ) ;  
  
     / /   C l o s e   m e n u   o n   c l i c k   o u t s i d e  
     u s e E f f e c t ( ( )   = >   {  
         f u n c t i o n   h a n d l e C l i c k O u t s i d e ( e v e n t :   M o u s e E v e n t )   {  
             i f   ( m e n u R e f . c u r r e n t   & &   ! m e n u R e f . c u r r e n t . c o n t a i n s ( e v e n t . t a r g e t   a s   N o d e ) )   {  
                 s e t S h o w M e n u ( f a l s e ) ;  
                 s e t S h o w N o L o c k S u b m e n u ( f a l s e ) ;  
             }  
         }  
         d o c u m e n t . a d d E v e n t L i s t e n e r ( " m o u s e d o w n " ,   h a n d l e C l i c k O u t s i d e ) ;  
         r e t u r n   ( )   = >   d o c u m e n t . r e m o v e E v e n t L i s t e n e r ( " m o u s e d o w n " ,   h a n d l e C l i c k O u t s i d e ) ;  
     } ,   [ ] ) ;  
     c o n s t   [ n o L o c k U n t i l ,   s e t N o L o c k U n t i l ]   =   u s e S t a t e < n u m b e r   |   n u l l > ( ( )   = >   {  
         c o n s t   s a v e d   =   l o c a l S t o r a g e . g e t I t e m ( " o v i i _ n o _ l o c k _ u n t i l " ) ;  
         r e t u r n   s a v e d   ?   p a r s e I n t ( s a v e d )   :   n u l l ;  
     } ) ;  
     c o n s t   [ s h o w N o L o c k S u b m e n u ,   s e t S h o w N o L o c k S u b m e n u ]   =   u s e S t a t e ( f a l s e ) ;  
     c o n s t   p r e v O n l i n e R e f   =   u s e R e f < M a p < s t r i n g ,   s t r i n g > > ( n e w   M a p ( ) ) ;  
  
     c o n s t   t y p i n g T i m e r   =   u s e R e f < N o d e J S . T i m e o u t   |   n u l l > ( n u l l ) ;  
     c o n s t   c a n c e l R e c R e f   =   u s e R e f ( f a l s e ) ;  
     c o n s t   r e c R e f   =   u s e R e f < M e d i a R e c o r d e r   |   n u l l > ( n u l l ) ;  
     c o n s t   f i l e R e f   =   u s e R e f < H T M L I n p u t E l e m e n t > ( n u l l ) ;  
     c o n s t   s c r o l l R e f   =   u s e R e f < H T M L D i v E l e m e n t > ( n u l l ) ;  
     c o n s t   m e s s a g e s E n d R e f   =   u s e R e f < H T M L D i v E l e m e n t > ( n u l l ) ;  
     c o n s t   l a s t A c t i v i t y   =   u s e R e f < n u m b e r > ( D a t e . n o w ( ) ) ;  
     c o n s t   c h u n k s R e f   =   u s e R e f < B l o b [ ] > ( [ ] ) ;  
     c o n s t   i n p u t R e f   =   u s e R e f < H T M L T e x t A r e a E l e m e n t > ( n u l l ) ;  
  
     c o n s t   s c r o l l T o B o t t o m   =   ( i n s t a n t   =   f a l s e )   = >   {  
         i f   ( ! s c r o l l R e f . c u r r e n t )   r e t u r n ;  
         c o n s t   s c r o l l   =   ( )   = >   {  
             i f   ( s c r o l l R e f . c u r r e n t )   {  
                 s c r o l l R e f . c u r r e n t . s c r o l l T o ( {  
                     t o p :   s c r o l l R e f . c u r r e n t . s c r o l l H e i g h t ,  
                     b e h a v i o r :   i n s t a n t   ?   " i n s t a n t "   :   " s m o o t h " ,  
                 } ) ;  
             }  
         } ;  
         s c r o l l ( ) ;  
         / /   S e c o n d   p a s s   f o r   r e l i a b i l i t y  
         s e t T i m e o u t ( s c r o l l ,   5 0 ) ;  
     } ;  
  
     / /   �� � �� �   A u t h   +   p r e s e n c e   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
     u s e E f f e c t ( ( )   = >   {  
         i f   ( ! a v a t a r )   r e t u r n ;  
         l e t   u n s u b M s g s   =   ( )   = >   {   } ;  
         l e t   u n s u b P r e s e n c e   =   ( )   = >   {   } ;  
         l e t   a l i v e   =   t r u e ;  
         l e t   h e a r t b e a t I d :   N o d e J S . T i m e o u t   |   n u l l   =   n u l l ;  
         l e t   c u r r e n t U i d :   s t r i n g   |   n u l l   =   n u l l ;  
  
         c o n s t   c l e a n u p P r e s e n c e   =   ( )   = >   {  
             i f   ( ! c u r r e n t U i d )   r e t u r n ;  
             d e l e t e D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " p r e s e n c e " ,   c u r r e n t U i d ) ) . c a t c h ( ( )   = >   {   } ) ;  
         } ;  
         c o n s t   h a n d l e B e f o r e U n l o a d   =   ( )   = >   c l e a n u p P r e s e n c e ( ) ;  
         c o n s t   h a n d l e P a g e H i d e   =   ( )   = >   c l e a n u p P r e s e n c e ( ) ;  
  
         ( a s y n c   ( )   = >   {  
             t r y   {  
                 c o n s t   u   =   a w a i t   e n s u r e A n o n A u t h ( ) ;  
                 i f   ( ! a l i v e )   r e t u r n ;  
                 c u r r e n t U i d   =   u . u i d ;  
  
                 c o n s t   p r e s C o l   =   c o l l e c t i o n ( d b ,   " o v i i " ,   R O O M ,   " p r e s e n c e " ) ;  
                 c o n s t   s n a p   =   a w a i t   g e t D o c s ( p r e s C o l ) ;  
                 c o n s t   n o w   =   D a t e . n o w ( ) ;  
                 f o r   ( c o n s t   d   o f   s n a p . d o c s )   {  
                     c o n s t   t s   =   ( d . d a t a ( ) . l a s t S e e n   a s   T i m e s t a m p   |   u n d e f i n e d ) ? . t o M i l l i s ( )   ? ?   0 ;  
                     i f   ( n o w   -   t s   >   3 0 _ 0 0 0   & &   d . i d   ! = =   u . u i d )   a w a i t   d e l e t e D o c ( d . r e f ) . c a t c h ( ( )   = >   {   } ) ;  
                 }  
                 c o n s t   f r e s h   =   a w a i t   g e t D o c s ( p r e s C o l ) ;  
                 c o n s t   o t h e r s   =   f r e s h . d o c s . f i l t e r ( ( d )   = >   d . i d   ! = =   u . u i d ) . l e n g t h ;  
                 i f   ( o t h e r s   > =   2   -   0   & &   f r e s h . d o c s . l e n g t h   > =   2   & &   ! f r e s h . d o c s . f i n d ( ( d )   = >   d . i d   = = =   u . u i d ) )   {  
                     s e t E r r o r ( " R o o m   i s   f u l l   ( 2 / 2 ) .   T r y   a g a i n   l a t e r . " ) ;  
                     r e t u r n ;  
                 }  
  
                 a w a i t   s e t D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " p r e s e n c e " ,   u . u i d ) ,   {  
                     u i d :   u . u i d ,   a v a t a r ,   n a m e ,   l a s t S e e n :   s e r v e r T i m e s t a m p ( ) ,   t y p i n g :   f a l s e ,   r e c o r d i n g :   f a l s e  
                 } ) ;  
                 s e t U i d ( u . u i d ) ;  
                 s e t C o u n t ( M a t h . m i n ( 2 ,   f r e s h . d o c s . l e n g t h   +   ( f r e s h . d o c s . f i n d ( ( d )   = >   d . i d   = = =   u . u i d )   ?   0   :   1 ) ) ) ;  
  
                 w i n d o w . a d d E v e n t L i s t e n e r ( " b e f o r e u n l o a d " ,   h a n d l e B e f o r e U n l o a d ) ;  
                 w i n d o w . a d d E v e n t L i s t e n e r ( " p a g e h i d e " ,   h a n d l e P a g e H i d e ) ;  
  
                 h e a r t b e a t I d   =   s e t I n t e r v a l ( ( )   = >   {  
                     s e t D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " p r e s e n c e " ,   u . u i d ) ,   {  
                         u i d :   u . u i d ,   a v a t a r ,   n a m e ,   l a s t S e e n :   s e r v e r T i m e s t a m p ( ) ,  
                     } ,   {   m e r g e :   t r u e   } ) . c a t c h ( ( )   = >   {   } ) ;  
                 } ,   1 5 _ 0 0 0 ) ;  
  
                 u n s u b P r e s e n c e   =   o n S n a p s h o t ( p r e s C o l ,   ( s )   = >   {  
                     c o n s t   t :   s t r i n g [ ]   =   [ ] ;  
                     c o n s t   r :   s t r i n g [ ]   =   [ ] ;  
                     c o n s t   c u r r e n t O n l i n e :   {   u i d :   s t r i n g ,   n a m e :   s t r i n g ,   a v a t a r ? :   s t r i n g   } [ ]   =   [ ] ;  
                     c o n s t   c u r r e n t O n l i n e I d s   =   n e w   S e t < s t r i n g > ( ) ;  
                     c o n s t   n o w   =   D a t e . n o w ( ) ;  
  
                     s . f o r E a c h ( ( d )   = >   {  
                         c o n s t   d a t a   =   d . d a t a ( ) ;  
                         c o n s t   l a s t S e e n   =   ( d a t a . l a s t S e e n   a s   T i m e s t a m p   |   u n d e f i n e d ) ? . t o M i l l i s ( )   ? ?   0 ;  
                         i f   ( l a s t S e e n   >   0   & &   n o w   -   l a s t S e e n   >   3 0 _ 0 0 0   & &   d . i d   ! = =   u . u i d )   {  
                             d e l e t e D o c ( d . r e f ) . c a t c h ( ( )   = >   {   } ) ;  
                             r e t u r n ;  
                         }  
                         c u r r e n t O n l i n e . p u s h ( {   u i d :   d . i d ,   n a m e :   d a t a . n a m e   | |   " U n k n o w n " ,   a v a t a r :   d a t a . a v a t a r   } ) ;  
                         c u r r e n t O n l i n e I d s . a d d ( d . i d ) ;  
                         i f   ( d . i d   ! = =   u . u i d )   {  
                             i f   ( d a t a . t y p i n g )   t . p u s h ( d a t a . a v a t a r ) ;  
                             i f   ( d a t a . r e c o r d i n g )   r . p u s h ( d a t a . a v a t a r ) ;  
                             s e t O t h e r N a m e ( d a t a . n a m e   | |   " U s e r " ) ;  
                             s e t O t h e r A v a t a r ( d a t a . a v a t a r   | |   n u l l ) ;  
                             s e t O t h e r L a s t S e e n ( l a s t S e e n ) ;  
                             s e t O t h e r O n l i n e ( t r u e ) ;  
                         }  
                     } ) ;  
  
                     i f   ( ! [ . . . c u r r e n t O n l i n e I d s ] . s o m e ( i d   = >   i d   ! = =   u . u i d ) )   s e t O t h e r O n l i n e ( f a l s e ) ;  
  
                     c u r r e n t O n l i n e . f o r E a c h ( u s e r   = >   {  
                         i f   ( u s e r . u i d   ! = =   u . u i d   & &   ! p r e v O n l i n e R e f . c u r r e n t . h a s ( u s e r . u i d ) )   {  
                             c o n s t   i d   =   c r y p t o . r a n d o m U U I D ( ) ;  
                             s e t S y s t e m M s g s ( p r e v   = >   [ . . . p r e v ,   {   i d ,   t e x t :   ` $ { u s e r . n a m e }   i s   o n l i n e ` ,   t s :   D a t e . n o w ( ) ,   t y p e :   " j o i n "   } ] ) ;  
                             s e t T i m e o u t ( ( )   = >   s e t S y s t e m M s g s ( p r e v   = >   p r e v . f i l t e r ( m   = >   m . i d   ! = =   i d ) ) ,   6 0 0 0 ) ;  
                         }  
                     } ) ;  
                     i f   ( p r e v O n l i n e R e f . c u r r e n t . s i z e   >   0 )   {  
                         p r e v O n l i n e R e f . c u r r e n t . f o r E a c h ( ( p r e v N a m e ,   p r e v U i d )   = >   {  
                             i f   ( p r e v U i d   ! = =   u . u i d   & &   ! c u r r e n t O n l i n e I d s . h a s ( p r e v U i d ) )   {  
                                 c o n s t   i d   =   c r y p t o . r a n d o m U U I D ( ) ;  
                                 s e t O t h e r L a s t S e e n ( D a t e . n o w ( ) ) ;  
                                 s e t S y s t e m M s g s ( p r e v   = >   [ . . . p r e v ,   {   i d ,   t e x t :   ` $ { p r e v N a m e }   w e n t   o f f l i n e ` ,   t s :   D a t e . n o w ( ) ,   t y p e :   " l e a v e "   } ] ) ;  
                                 s e t T i m e o u t ( ( )   = >   s e t S y s t e m M s g s ( p r e v   = >   p r e v . f i l t e r ( m   = >   m . i d   ! = =   i d ) ) ,   6 0 0 0 ) ;  
                             }  
                         } ) ;  
                     }  
                     c o n s t   n e x t M a p   =   n e w   M a p < s t r i n g ,   s t r i n g > ( ) ;  
                     c u r r e n t O n l i n e . f o r E a c h ( u s e r   = >   n e x t M a p . s e t ( u s e r . u i d ,   u s e r . n a m e ) ) ;  
                     p r e v O n l i n e R e f . c u r r e n t   =   n e x t M a p ;  
  
                     s e t O n l i n e U s e r s ( c u r r e n t O n l i n e ) ;  
                     s e t T y p i n g U s e r s ( t ) ;  
                     s e t R e c o r d i n g U s e r s ( r ) ;  
                     s e t C o u n t ( c u r r e n t O n l i n e . l e n g t h ) ;  
                 } ) ;  
  
                 c o n s t   q   =   q u e r y ( c o l l e c t i o n ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ) ,   o r d e r B y ( " c r e a t e d A t " ,   " a s c " ) ) ;  
                 u n s u b M s g s   =   o n S n a p s h o t ( q ,   {   i n c l u d e M e t a d a t a C h a n g e s :   t r u e   } ,   ( s )   = >   {  
                     c o n s t   l i s t :   M s g [ ]   =   s . d o c s . m a p ( ( d )   = >   {  
                         c o n s t   d a t a   =   d . d a t a ( )   a s   a n y ;  
                         c o n s t   m s g :   M s g   =   {   i d :   d . i d ,   . . . d a t a   } ;  
                         i f   ( d . m e t a d a t a . h a s P e n d i n g W r i t e s   & &   m s g . u i d   = = =   u . u i d )   m s g . s t a t u s   =   " s e n d i n g " ;  
                         r e t u r n   m s g ;  
                     } ) ;  
                     s e t M s g s ( l i s t ) ;  
                     c o n s t   t n o w   =   D a t e . n o w ( ) ;  
                     f o r   ( c o n s t   m   o f   l i s t )   {  
                         i f   ( m . u i d   ! = =   u . u i d   & &   m . s t a t u s   ! = =   " r e a d "   & &   ! s . m e t a d a t a . h a s P e n d i n g W r i t e s )   {  
                             s e t D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ,   m . i d ) ,   {   s t a t u s :   " r e a d "   } ,   {   m e r g e :   t r u e   } ) . c a t c h ( ( )   = >   {   } ) ;  
                         }  
                         c o n s t   t s   =   m . c r e a t e d A t ? . t o M i l l i s ? . ( )   ? ?   0 ;  
                         i f   ( ! t s )   c o n t i n u e ;  
  
                         / /   R e t e n t i o n   l o g i c :  
                         / /   T e x t :   5   d a y s  
                         / /   V o i c e / P h o t o :   1 4   d a y s  
                         c o n s t   l i m i t   =   m . t y p e   = = =   " t e x t "    
                             ?   5   *   2 4   *   6 0   *   6 0   *   1 0 0 0    
                             :   1 4   *   2 4   *   6 0   *   6 0   *   1 0 0 0 ;  
  
                         i f   ( t n o w   -   t s   >   l i m i t )   {  
                             d e l e t e D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ,   m . i d ) ) . c a t c h ( ( )   = >   {   } ) ;  
                         }  
                     }  
                 } ) ;  
  
                 r e t u r n   ( )   = >   {  
                     i f   ( h e a r t b e a t I d )   c l e a r I n t e r v a l ( h e a r t b e a t I d ) ;  
                     u n s u b P r e s e n c e ( ) ;  
                     d e l e t e D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " p r e s e n c e " ,   u . u i d ) ) . c a t c h ( ( )   = >   {   } ) ;  
                 } ;  
             }   c a t c h   ( e :   u n k n o w n )   {  
                 s e t E r r o r ( e   i n s t a n c e o f   E r r o r   ?   e . m e s s a g e   :   " C o n n e c t i o n   f a i l e d " ) ;  
             }  
         } ) ( ) ;  
  
         r e t u r n   ( )   = >   {  
             a l i v e   =   f a l s e ;  
             u n s u b M s g s ( ) ;  
             u n s u b P r e s e n c e ( ) ;  
             i f   ( h e a r t b e a t I d )   c l e a r I n t e r v a l ( h e a r t b e a t I d ) ;  
             w i n d o w . r e m o v e E v e n t L i s t e n e r ( " b e f o r e u n l o a d " ,   h a n d l e B e f o r e U n l o a d ) ;  
             w i n d o w . r e m o v e E v e n t L i s t e n e r ( " p a g e h i d e " ,   h a n d l e P a g e H i d e ) ;  
             c l e a n u p P r e s e n c e ( ) ;  
         } ;  
     } ,   [ a v a t a r ] ) ;  
  
     / /   �� � �� �   I n a c t i v i t y   l o c k   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
     u s e E f f e c t ( ( )   = >   {  
         c o n s t   b u m p   =   ( )   = >   {   l a s t A c t i v i t y . c u r r e n t   =   D a t e . n o w ( ) ;   } ;  
         w i n d o w . a d d E v e n t L i s t e n e r ( " p o i n t e r d o w n " ,   b u m p ) ;  
         w i n d o w . a d d E v e n t L i s t e n e r ( " k e y d o w n " ,   b u m p ) ;  
         c o n s t   t   =   s e t I n t e r v a l ( ( )   = >   {  
             c o n s t   n o w   =   D a t e . n o w ( ) ;  
             i f   ( n o L o c k U n t i l   & &   n o w   <   n o L o c k U n t i l )   r e t u r n ;   / /   B y p a s s   l o c k  
             i f   ( n o w   -   l a s t A c t i v i t y . c u r r e n t   >   1 8 0 _ 0 0 0 )   o n L o c k ( ) ;  
         } ,   5 _ 0 0 0 ) ;  
         r e t u r n   ( )   = >   {  
             w i n d o w . r e m o v e E v e n t L i s t e n e r ( " p o i n t e r d o w n " ,   b u m p ) ;  
             w i n d o w . r e m o v e E v e n t L i s t e n e r ( " k e y d o w n " ,   b u m p ) ;  
             c l e a r I n t e r v a l ( t ) ;  
         } ;  
     } ,   [ o n L o c k ] ) ;  
  
     / /   �� � �� �   M o b i l e   k e y b o a r d   c o m p e n s a t i o n   ( O N L Y   o n   m o b i l e )   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
     / /   D e s k t o p :   p o s i t i o n : f i x e d   +   i n s e t : 0   h a n d l e s   e v e r y t h i n g   �� �   n o   J S   h e i g h t   n e e d e d .  
     / /   M o b i l e :   t r a c k   v i s u a l V i e w p o r t   t o   s h r i n k   t h e   s c r o l l   a r e a   w h e n   k e y b o a r d   o p e n s .  
     u s e E f f e c t ( ( )   = >   {  
         i f   ( ! i s M o b i l e D e v i c e ( ) )   r e t u r n ;   / /   �� �   d e s k t o p :   s k i p   e n t i r e l y  
  
         c o n s t   v v   =   w i n d o w . v i s u a l V i e w p o r t ;  
         c o n s t   s y n c K e y b o a r d   =   ( )   = >   {  
             i f   ( ! v v )   r e t u r n ;  
             c o n s t   k e y b o a r d H e i g h t   =   w i n d o w . i n n e r H e i g h t   -   v v . h e i g h t ;  
             s e t M o b i l e K e y b o a r d O f f s e t ( M a t h . m a x ( 0 ,   k e y b o a r d H e i g h t ) ) ;  
             r e q u e s t A n i m a t i o n F r a m e ( ( )   = >   s c r o l l T o B o t t o m ( t r u e ) ) ;  
             i f   ( w i n d o w . s c r o l l Y   ! = =   0 )   w i n d o w . s c r o l l T o ( 0 ,   0 ) ;  
         } ;  
  
         v v ? . a d d E v e n t L i s t e n e r ( " r e s i z e " ,   s y n c K e y b o a r d ) ;  
         v v ? . a d d E v e n t L i s t e n e r ( " s c r o l l " ,   s y n c K e y b o a r d ) ;  
         s y n c K e y b o a r d ( ) ;  
  
         r e t u r n   ( )   = >   {  
             v v ? . r e m o v e E v e n t L i s t e n e r ( " r e s i z e " ,   s y n c K e y b o a r d ) ;  
             v v ? . r e m o v e E v e n t L i s t e n e r ( " s c r o l l " ,   s y n c K e y b o a r d ) ;  
         } ;  
     } ,   [ ] ) ;  
  
     / /   �� � �� �   S c r o l l   t o   b o t t o m   o n   l o a d   a n d   n e w   m e s s a g e s   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
     u s e E f f e c t ( ( )   = >   {    
         c o n s t   t i m e r   =   s e t T i m e o u t ( ( )   = >   s c r o l l T o B o t t o m ( t r u e ) ,   2 5 0 ) ;    
         r e t u r n   ( )   = >   c l e a r T i m e o u t ( t i m e r ) ;  
     } ,   [ ] ) ;  
  
     u s e E f f e c t ( ( )   = >   {    
         c o n s t   t i m e r   =   s e t T i m e o u t ( ( )   = >   s c r o l l T o B o t t o m ( f a l s e ) ,   1 0 0 ) ;    
         r e t u r n   ( )   = >   c l e a r T i m e o u t ( t i m e r ) ;  
     } ,   [ m s g s . l e n g t h ] ) ;  
  
     c o n s t   s e t P r e s   =   ( d a t a :   a n y )   = >   {  
         i f   ( u i d )   s e t D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " p r e s e n c e " ,   u i d ) ,   d a t a ,   {   m e r g e :   t r u e   } ) . c a t c h ( ( )   = >   {   } ) ;  
     } ;  
  
     c o n s t   s e n d   =   a s y n c   ( t y p e :   M s g [ " t y p e " ] ,   c o n t e n t :   s t r i n g )   = >   {  
         i f   ( ! u i d   | |   ! c o n t e n t )   r e t u r n ;  
         l a s t A c t i v i t y . c u r r e n t   =   D a t e . n o w ( ) ;  
         c o n s t   m s g D a t a :   a n y   =   {   u i d ,   a v a t a r ,   n a m e ,   t y p e ,   c o n t e n t ,   s t a t u s :   " s e n t " ,   c r e a t e d A t :   T i m e s t a m p . n o w ( )   } ;  
         i f   ( r e p l y i n g T o )   {  
             m s g D a t a . r e p l y T o   =   {  
                 i d :   r e p l y i n g T o . i d ,  
                 c o n t e n t :   r e p l y i n g T o . t y p e   = = =   " t e x t "   ?   r e p l y i n g T o . c o n t e n t   :   ( r e p l y i n g T o . t y p e   = = =   " i m a g e "   ?   " P h o t o "   :   " V o i c e   N o t e " ) ,  
                 a v a t a r :   r e p l y i n g T o . a v a t a r ,  
                 n a m e :   r e p l y i n g T o . n a m e ,  
             } ;  
             s e t R e p l y i n g T o ( n u l l ) ;  
         }  
         a w a i t   a d d D o c ( c o l l e c t i o n ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ) ,   m s g D a t a ) ;  
     } ;  
  
     c o n s t   s e n d I m a g e   =   a s y n c   ( u r l :   s t r i n g ,   c a p t i o n ? :   s t r i n g )   = >   {  
         i f   ( ! u i d   | |   ! u r l )   r e t u r n ;  
         l a s t A c t i v i t y . c u r r e n t   =   D a t e . n o w ( ) ;  
         c o n s t   m s g D a t a :   a n y   =   {   u i d ,   a v a t a r ,   n a m e ,   t y p e :   " i m a g e " ,   c o n t e n t :   u r l ,   c a p t i o n ,   s t a t u s :   " s e n t " ,   c r e a t e d A t :   T i m e s t a m p . n o w ( )   } ;  
         a w a i t   a d d D o c ( c o l l e c t i o n ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ) ,   m s g D a t a ) ;  
     } ;  
  
     c o n s t   o n T e x t   =   a s y n c   ( e ? :   R e a c t . F o r m E v e n t   |   R e a c t . K e y b o a r d E v e n t )   = >   {  
         i f   ( e )   e . p r e v e n t D e f a u l t ( ) ;  
         c o n s t   v   =   t e x t . t r i m ( ) ;  
         i f   ( ! v )   r e t u r n ;  
         s e t T e x t ( " " ) ;  
  
         / /   R e s e t   t e x t a r e a   h e i g h t  
         i f   ( i n p u t R e f . c u r r e n t )   {  
             i n p u t R e f . c u r r e n t . s t y l e . h e i g h t   =   " a u t o " ;  
         }  
  
         s e t I s T y p i n g ( f a l s e ) ;  
         i f   ( t y p i n g T i m e r . c u r r e n t )   c l e a r T i m e o u t ( t y p i n g T i m e r . c u r r e n t ) ;  
         s e t P r e s ( {   t y p i n g :   f a l s e   } ) ;  
         r e q u e s t A n i m a t i o n F r a m e ( ( )   = >   i n p u t R e f . c u r r e n t ? . f o c u s ( ) ) ;  
         c o n s t   i s I m a g e U r l   =   / ^ h t t p s ? : \ / \ / . + \ . ( g i f | p n g | j p g | j p e g | w e b p ) ( \ ? . * ) ? $ / i . t e s t ( v ) ;  
         i f   ( i s I m a g e U r l )   a w a i t   s e n d ( " i m a g e " ,   v ) ;  
         e l s e   a w a i t   s e n d ( " t e x t " ,   v . s l i c e ( 0 ,   5 0 0 0 ) ) ;  
         s e t I n p u t H e i g h t ( 4 4 ) ;   / /   R e s e t   h e i g h t   a f t e r   s e n d  
     } ;  
  
     c o n s t   u p l o a d T o C l o u d i n a r y   =   a s y n c   ( f i l e :   F i l e   |   B l o b )   = >   {  
         c o n s t   f o r m D a t a   =   n e w   F o r m D a t a ( ) ;  
         f o r m D a t a . a p p e n d ( " f i l e " ,   f i l e ) ;  
         f o r m D a t a . a p p e n d ( " u p l o a d _ p r e s e t " ,   " d t e 6 c 2 2 1 f " ) ;  
         c o n s t   r e s   =   a w a i t   f e t c h ( ` h t t p s : / / a p i . c l o u d i n a r y . c o m / v 1 _ 1 / d t e 6 c 2 2 1 f / a u t o / u p l o a d ` ,   {   m e t h o d :   " P O S T " ,   b o d y :   f o r m D a t a   } ) ;  
         i f   ( ! r e s . o k )   {   c o n s t   e r r   =   a w a i t   r e s . j s o n ( ) ;   t h r o w   n e w   E r r o r ( e r r . e r r o r ? . m e s s a g e   | |   " U p l o a d   f a i l e d " ) ;   }  
         c o n s t   d a t a   =   a w a i t   r e s . j s o n ( ) ;  
         r e t u r n   d a t a . s e c u r e _ u r l ;  
     } ;  
  
     c o n s t   o n I m a g e   =   a s y n c   ( f i l e :   F i l e )   = >   {  
         i f   ( ! u i d )   r e t u r n ;  
         i f   ( f i l e . s i z e   >   8   *   1 0 2 4   *   1 0 2 4 )   {   s e t E r r o r ( " I m a g e   t o o   l a r g e   ( m a x   8 M B ) " ) ;   r e t u r n ;   }  
          
         s e t I s U p l o a d i n g ( t r u e ) ;   / /   S h o w   l o a d e r   i m m e d i a t e l y  
         t r y   {  
             c o n s t   u r l   =   a w a i t   u p l o a d T o C l o u d i n a r y ( f i l e ) ;  
             a w a i t   s e n d I m a g e ( u r l ,   " " ) ;   / /   S e n d   i m m e d i a t e l y   w i t h   e m p t y   c a p t i o n  
         }   c a t c h   ( e :   a n y )   {    
             s e t E r r o r ( " I m a g e   u p l o a d   f a i l e d :   "   +   ( e . m e s s a g e   | |   " U n k n o w n   e r r o r " ) ) ;    
         }   f i n a l l y   {  
             s e t I s U p l o a d i n g ( f a l s e ) ;  
         }  
     } ;  
  
     c o n s t   c l e a r C h a t   =   a s y n c   ( )   = >   {  
         i f   ( ! c o n f i r m ( " A r e   y o u   s u r e   y o u   w a n t   t o   c l e a r   a l l   m e s s a g e s ?   T h i s   c a n n o t   b e   u n d o n e . " ) )   r e t u r n ;  
         t r y   {  
             c o n s t   q   =   q u e r y ( c o l l e c t i o n ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ) ) ;  
             c o n s t   s n a p s h o t   =   a w a i t   g e t D o c s ( q ) ;  
             c o n s t   b a t c h   =   s n a p s h o t . d o c s . m a p ( d   = >   d e l e t e D o c ( d o c ( d b ,   " o v i i " ,   R O O M ,   " m e s s a g e s " ,   d . i d ) ) ) ;  
             a w a i t   P r o m i s e . a l l ( b a t c h ) ;  
             t o a s t . s u c c e s s ( " C h a t   c l e a r e d " ) ;  
             s e t S h o w M e n u ( f a l s e ) ;  
         }   c a t c h   ( e )   {  
             t o a s t . e r r o r ( " F a i l e d   t o   c l e a r   c h a t " ) ;  
         }  
     } ;  
  
     c o n s t   h a n d l e P a s t e   =   ( e :   R e a c t . C l i p b o a r d E v e n t < H T M L T e x t A r e a E l e m e n t > )   = >   {  
         f o r   ( l e t   i   =   0 ;   i   <   e . c l i p b o a r d D a t a . i t e m s . l e n g t h ;   i + + )   {  
             i f   ( e . c l i p b o a r d D a t a . i t e m s [ i ] . t y p e . s t a r t s W i t h ( " i m a g e / " ) )   {  
                 e . p r e v e n t D e f a u l t ( ) ;  
                 c o n s t   f i l e   =   e . c l i p b o a r d D a t a . i t e m s [ i ] . g e t A s F i l e ( ) ;  
                 i f   ( f i l e )   o n I m a g e ( f i l e ) ;  
                 r e t u r n ;  
             }  
         }  
         c o n s t   p a s t e d T e x t   =   e . c l i p b o a r d D a t a . g e t D a t a ( " t e x t / p l a i n " ) ? . t r i m ( ) ;  
         i f   ( p a s t e d T e x t   & &   / ^ h t t p s ? : \ / \ / . + \ . ( g i f | p n g | j p g | j p e g | w e b p ) ( \ ? . * ) ? $ / i . t e s t ( p a s t e d T e x t ) )   {  
             e . p r e v e n t D e f a u l t ( ) ;  
             s e n d ( " i m a g e " ,   p a s t e d T e x t ) ;  
         }  
     } ;  
  
     c o n s t   h a n d l e D r o p   =   a s y n c   ( e :   R e a c t . D r a g E v e n t < H T M L D i v E l e m e n t > )   = >   {  
         e . p r e v e n t D e f a u l t ( ) ;  
         c o n s t   u r l   =   e . d a t a T r a n s f e r . g e t D a t a ( " t e x t / u r i - l i s t " )   | |   e . d a t a T r a n s f e r . g e t D a t a ( " t e x t / p l a i n " ) ;  
         i f   ( u r l   & &   ( u r l . i n c l u d e s ( " . g i f " )   | |   u r l . i n c l u d e s ( " i m a g e s " )   | |   u r l . i n c l u d e s ( " m e d i a " ) ) )   {   a w a i t   s e n d ( " i m a g e " ,   u r l ) ;   r e t u r n ;   }  
         c o n s t   f i l e   =   e . d a t a T r a n s f e r . f i l e s ? . [ 0 ] ;  
         i f   ( f i l e   & &   f i l e . t y p e . s t a r t s W i t h ( " i m a g e / " ) )   o n I m a g e ( f i l e ) ;  
     } ;  
  
     c o n s t   s t a r t R e c   =   a s y n c   ( )   = >   {  
         t r y   {  
             c o n s t   s t r e a m   =   a w a i t   n a v i g a t o r . m e d i a D e v i c e s . g e t U s e r M e d i a ( {   a u d i o :   t r u e   } ) ;  
             c o n s t   r e c   =   n e w   M e d i a R e c o r d e r ( s t r e a m ) ;  
             c h u n k s R e f . c u r r e n t   =   [ ] ;  
             r e c . o n d a t a a v a i l a b l e   =   ( e )   = >   c h u n k s R e f . c u r r e n t . p u s h ( e . d a t a ) ;  
             r e c . o n s t o p   =   a s y n c   ( )   = >   {  
                 s t r e a m . g e t T r a c k s ( ) . f o r E a c h ( ( t )   = >   t . s t o p ( ) ) ;  
                 i f   ( c a n c e l R e c R e f . c u r r e n t )   r e t u r n ;  
                 t r y   {  
                     c o n s t   b l o b   =   n e w   B l o b ( c h u n k s R e f . c u r r e n t ,   {   t y p e :   " v i d e o / w e b m "   } ) ;  
                     c o n s t   u r l   =   a w a i t   u p l o a d T o C l o u d i n a r y ( b l o b ) ;  
                     a w a i t   s e n d ( " v o i c e " ,   u r l ) ;  
                 }   c a t c h   ( e :   a n y )   {   s e t E r r o r ( " V o i c e   u p l o a d   f a i l e d :   "   +   ( e . m e s s a g e   | |   " U n k n o w n   e r r o r " ) ) ;   }  
             } ;  
             r e c R e f . c u r r e n t   =   r e c ;  
             r e c . s t a r t ( ) ;  
             s e t R e c o r d i n g ( t r u e ) ;  
             s e t P r e s ( {   r e c o r d i n g :   t r u e   } ) ;  
             c a n c e l R e c R e f . c u r r e n t   =   f a l s e ;  
             s e t T i m e o u t ( ( )   = >   {  
                 i f   ( r e c . s t a t e   = = =   " r e c o r d i n g " )   {   r e c . s t o p ( ) ;   s e t R e c o r d i n g ( f a l s e ) ;   s e t P r e s ( {   r e c o r d i n g :   f a l s e   } ) ;   }  
             } ,   1 0   *   6 0   *   1 0 0 0 ) ;  
         }   c a t c h   ( e :   a n y )   {   s e t E r r o r ( " M i c r o p h o n e   p e r m i s s i o n   d e n i e d " ) ;   }  
     } ;  
  
     c o n s t   s t o p A n d S e n d R e c   =   ( )   = >   {  
         i f   ( r e c R e f . c u r r e n t ? . s t a t e   = = =   " r e c o r d i n g " )   r e c R e f . c u r r e n t . s t o p ( ) ;  
         s e t R e c o r d i n g ( f a l s e ) ;  
         s e t P r e s ( {   r e c o r d i n g :   f a l s e   } ) ;  
     } ;  
  
     c o n s t   c a n c e l R e c   =   ( )   = >   {  
         c a n c e l R e c R e f . c u r r e n t   =   t r u e ;  
         i f   ( r e c R e f . c u r r e n t ? . s t a t e   = = =   " r e c o r d i n g " )   r e c R e f . c u r r e n t . s t o p ( ) ;  
         s e t R e c o r d i n g ( f a l s e ) ;  
         s e t P r e s ( {   r e c o r d i n g :   f a l s e   } ) ;  
     } ;  
  
     c o n s t   d o w n l o a d F i l e   =   a s y n c   ( u r l :   s t r i n g ,   i d :   s t r i n g ,   t y p e :   s t r i n g )   = >   {  
         t r y   {  
             c o n s t   r e s p o n s e   =   a w a i t   f e t c h ( u r l ) ;  
             c o n s t   b l o b   =   a w a i t   r e s p o n s e . b l o b ( ) ;  
             c o n s t   b l o b U r l   =   U R L . c r e a t e O b j e c t U R L ( b l o b ) ;  
             c o n s t   a   =   d o c u m e n t . c r e a t e E l e m e n t ( " a " ) ;  
             a . h r e f   =   b l o b U r l ;  
             c o n s t   e x t   =   t y p e   = = =   " v o i c e "   ?   " w e b m "   :   " j p g " ;  
             a . d o w n l o a d   =   ` $ { t y p e } - $ { i d . s l i c e ( 0 ,   8 ) } . $ { e x t } ` ;  
             d o c u m e n t . b o d y . a p p e n d C h i l d ( a ) ;   a . c l i c k ( ) ;   d o c u m e n t . b o d y . r e m o v e C h i l d ( a ) ;  
             U R L . r e v o k e O b j e c t U R L ( b l o b U r l ) ;  
             t o a s t . s u c c e s s ( " D o w n l o a d   s t a r t e d " ) ;  
         }   c a t c h   {   w i n d o w . o p e n ( u r l ,   " _ b l a n k " ) ;   }  
     } ;  
  
     c o n s t   n o w   =   D a t e . n o w ( ) ;  
     c o n s t   S E V E N _ D A Y S   =   7   *   2 4   *   6 0   *   6 0   *   1 0 0 0 ;  
     c o n s t   F I V E _ D A Y S   =   5   *   2 4   *   6 0   *   6 0   *   1 0 0 0 ;  
  
     / /   c h a t M s g s :   T e x t   f o r   5   d a y s ,   M e d i a   f o r   7   d a y s  
     c o n s t   c h a t M s g s   =   m s g s . f i l t e r ( m   = >   {  
         c o n s t   t s   =   m . c r e a t e d A t ? . t o M i l l i s ? . ( )   ? ?   0 ;  
         i f   ( ! t s )   r e t u r n   t r u e ;   / /   K e e p   p e n d i n g   m e s s a g e s  
         c o n s t   a g e   =   n o w   -   t s ;  
         i f   ( m . t y p e   = = =   " t e x t " )   r e t u r n   a g e   <   F I V E _ D A Y S ;  
         r e t u r n   a g e   <   S E V E N _ D A Y S ;  
     } ) . s o r t ( ( a ,   b )   = >   ( a . c r e a t e d A t ? . t o M i l l i s ? . ( )   ? ?   0 )   -   ( b . c r e a t e d A t ? . t o M i l l i s ? . ( )   ? ?   0 ) ) ;  
  
     c o n s t   m e d i a M s g s   =   m s g s . f i l t e r ( m   = >   m . t y p e   = = =   " v o i c e "   | |   m . t y p e   = = =   " i m a g e " ) ;  
     c o n s t   u n r e a d M e d i a   =   m e d i a M s g s . l e n g t h ;  
  
     / /   �� � �� �   R o o t   s t y l e :   f i x e d   +   i n s e t : 0   o n   d e s k t o p ,   k e y b o a r d - a d j u s t e d   o n   m o b i l e   �� � �� �  
     c o n s t   r o o t S t y l e :   R e a c t . C S S P r o p e r t i e s   =   i s M o b i l e D e v i c e ( )   & &   m o b i l e K e y b o a r d O f f s e t   >   0  
         ?   {   p a d d i n g B o t t o m :   m o b i l e K e y b o a r d O f f s e t   }  
         :   { } ;  
  
     r e t u r n   (  
         < >  
             { / *  
                 A R C H I T E C T U R E :  
                 . o v i i - c h a t - r o o t           �� �   p o s i t i o n : f i x e d ;   i n s e t : 0 ;   o v e r f l o w : h i d d e n   ( C S S   i n   s t y l e s . c s s )  
                     . o v i i - c h a t - f r a m e     �� �   d e s k t o p :   c e n t e r e d   c a r d   w i t h   m a x - w i d t h ;   m o b i l e :   f u l l - b l e e d  
                         h e a d e r                     �� �   s h r i n k - 0  
                         . o v i i - b o d y             �� �   f l e x - 1 ;   o v e r f l o w : h i d d e n ;   d i s p l a y : f l e x  
                             . o v i i - m s g s - c o l   �� �   f l e x - 1 ;   o v e r f l o w : h i d d e n ;   f l e x - c o l  
                                 s c r o l l   a r e a   �� �   f l e x - 1 ;   o v e r f l o w - y : a u t o ;   o v e r f l o w - x : h i d d e n  
                             . o v i i - s i d e b a r     �� �   d e s k t o p   o n l y ,   3 8 0 p x  
                         i n p u t   b a r               �� �   s h r i n k - 0  
             * / }  
             < d i v   c l a s s N a m e = { ` o v i i - c h a t - r o o t   t r a n s i t i o n - c o l o r s   d u r a t i o n - 3 0 0   $ { i s D a r k M o d e   ?   " b g - [ # 0 b 1 4 1 a ] "   :   " b g - [ # e f e a e 2 ] " } ` }   s t y l e = { r o o t S t y l e } >  
                 < T o a s t e r   p o s i t i o n = " t o p - c e n t e r "   / >  
  
                 { / *   �� � �� �   A v a t a r   P i c k e r   O v e r l a y   �� � �� �   * / }  
                 { s h o w A v a t a r P i c k e r   & &   (  
                     < d i v   c l a s s N a m e = " a b s o l u t e   i n s e t - 0   z - 5 0   b g - b a c k g r o u n d / 9 5   b a c k d r o p - b l u r - x l   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r   p - 4 " >  
                         < d i v   c l a s s N a m e = " w - f u l l   m a x - w - s m   r o u n d e d - 2 x l   b o r d e r   b o r d e r - b o r d e r   b g - c a r d   p - 6   s h a d o w - e l e g a n t   t e x t - c e n t e r " >  
                             < h 2   c l a s s N a m e = " t e x t - x l   f o n t - b o l d   m b - 2 " > S e l e c t   Y o u r   I d e n t i t y < / h 2 >  
                             < p   c l a s s N a m e = " t e x t - x s   t e x t - m u t e d - f o r e g r o u n d   m b - 4 " > E n t e r   y o u r   n a m e   a n d   p i c k   a n   a v a t a r . < / p >  
                             < i n p u t  
                                 t y p e = " t e x t "  
                                 p l a c e h o l d e r = " Y o u r   N a m e "  
                                 m a x L e n g t h = { 2 0 }  
                                 v a l u e = { i n p u t N a m e }  
                                 o n C h a n g e = { e   = >   s e t I n p u t N a m e ( e . t a r g e t . v a l u e ) }  
                                 c l a s s N a m e = " w - f u l l   b g - b a c k g r o u n d   b o r d e r   b o r d e r - b o r d e r   r o u n d e d - m d   p x - 3   p y - 2   t e x t - s m   m b - 6   f o c u s : o u t l i n e - n o n e   f o c u s : r i n g - 2   f o c u s : r i n g - p r i m a r y / 4 0   t e x t - c e n t e r "  
                             / >  
                             < d i v   c l a s s N a m e = " g r i d   g r i d - c o l s - 4   g a p - 4   m b - 6 " >  
                                 { A V A T A R S . m a p ( ( a v )   = >   (  
                                     < b u t t o n  
                                         k e y = { a v . i d }  
                                         d i s a b l e d = { ! i n p u t N a m e . t r i m ( ) }  
                                         o n C l i c k = { ( )   = >   {  
                                             s e t A v a t a r ( a v . u r l ) ;  
                                             s e t N a m e ( i n p u t N a m e . t r i m ( ) ) ;  
                                             l o c a l S t o r a g e . s e t I t e m ( " o v i i - a v a t a r - c h o i c e " ,   a v . u r l ) ;  
                                             l o c a l S t o r a g e . s e t I t e m ( " o v i i - n a m e " ,   i n p u t N a m e . t r i m ( ) ) ;  
                                             s e t S h o w A v a t a r P i c k e r ( f a l s e ) ;  
                                         } }  
                                         c l a s s N a m e = " r o u n d e d - f u l l   o v e r f l o w - h i d d e n   b o r d e r - 2   b o r d e r - t r a n s p a r e n t   h o v e r : b o r d e r - p r i m a r y   t r a n s i t i o n - a l l   h o v e r : s c a l e - 1 1 0   d i s a b l e d : o p a c i t y - 3 0   d i s a b l e d : h o v e r : s c a l e - 1 0 0   d i s a b l e d : h o v e r : b o r d e r - t r a n s p a r e n t "  
                                     >  
                                         < i m g   s r c = { a v . u r l }   a l t = { a v . n a m e }   c l a s s N a m e = " w - f u l l   h - a u t o "   / >  
                                     < / b u t t o n >  
                                 ) ) }  
                             < / d i v >  
                         < / d i v >  
                     < / d i v >  
                 ) }  
  
                 { / *   �� � �� �   M o b i l e   F o l d e r   O v e r l a y   �� � �� �   * / }  
                 < A n i m a t e P r e s e n c e >  
                     { s h o w F o l d e r   & &   (  
                         < m o t i o n . d i v  
                             i n i t i a l = { {   x :   " 1 0 0 % "   } }  
                             a n i m a t e = { {   x :   0   } }  
                             e x i t = { {   x :   " 1 0 0 % "   } }  
                             t r a n s i t i o n = { {   t y p e :   " s p r i n g " ,   d a m p i n g :   2 5 ,   s t i f f n e s s :   2 0 0   } }  
                             c l a s s N a m e = " f i x e d   i n s e t - 0   z - [ 1 5 0 ]   b g - b a c k g r o u n d   f l e x   f l e x - c o l "  
                         >  
                             < d i v   c l a s s N a m e = " p - 4   b o r d e r - b   b o r d e r - b o r d e r / 6 0   f l e x   i t e m s - c e n t e r   j u s t i f y - b e t w e e n   b g - b a c k g r o u n d / 8 0   b a c k d r o p - b l u r - m d   s t i c k y   t o p - 0   z - 1 0 " >  
                                 < h 2   c l a s s N a m e = " t e x t - b a s e   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e r   f l e x   i t e m s - c e n t e r   g a p - 2 . 5 " >  
                                     < F o l d e r   c l a s s N a m e = " w - 5   h - 5   t e x t - d e s t r u c t i v e "   / >   F I L E S  
                                 < / h 2 >  
                                 < b u t t o n   o n C l i c k = { ( )   = >   s e t S h o w F o l d e r ( f a l s e ) }   c l a s s N a m e = " p - 2   r o u n d e d - f u l l   b g - m u t e d / 6 0   h o v e r : b g - m u t e d   t e x t - f o r e g r o u n d   t r a n s i t i o n - a l l   a c t i v e : s c a l e - 9 0   b o r d e r   b o r d e r - b o r d e r / 2 0   s h a d o w - s m " >  
                                     < X   c l a s s N a m e = " w - 5   h - 5 "   / >  
                                 < / b u t t o n >  
                             < / d i v >  
                             < d i v   c l a s s N a m e = " f l e x - 1   o v e r f l o w - y - a u t o   p - 4   s p a c e - y - 6 " >  
                                 < M e d i a L i s t   m s g s = { m s g s }   u i d = { u i d }   d o w n l o a d F i l e = { d o w n l o a d F i l e }   i s D a r k M o d e = { i s D a r k M o d e }   s e t S e l e c t e d I m a g e = { s e t S e l e c t e d I m a g e }   / >  
                             < / d i v >  
                         < / m o t i o n . d i v >  
                     ) }  
                 < / A n i m a t e P r e s e n c e >  
  
                 { / *  
                     �� � �� �   C h a t   F r a m e   �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� � �� �  
                     M o b i l e :     f u l l - b l e e d ,   h e i g h t   1 0 0 %  
                     D e s k t o p :   c e n t e r e d   c a r d ,   m a x - w i d t h   1 4 4 0 p x ,   2 0 p x   m a r g i n ,   r o u n d e d ,   b o r d e r e d  
                     T h e   C S S   f o r   . o v i i - c h a t - f r a m e   l i v e s   i n   s t y l e s . c s s   ( s e e   b e l o w   c o m m e n t ) .  
                     W e   u s e   a   s i n g l e   w r a p p e r   �� �   N O   d u p l i c a t e   o v i i - c h a t - i n n e r .  
                 * / }  
                 < d i v  
                     c l a s s N a m e = " o v i i - c h a t - f r a m e   f l e x   f l e x - c o l   h - f u l l   w - f u l l "  
                     o n D r a g O v e r = { ( e )   = >   e . p r e v e n t D e f a u l t ( ) }  
                     o n D r o p = { h a n d l e D r o p }  
                 >  
                     { / *   �� � �� �   H e a d e r   �� � �� �   * / }  
                     < h e a d e r   c l a s s N a m e = { ` h - [ 6 4 p x ]   p x - 3   f l e x   i t e m s - c e n t e r   j u s t i f y - b e t w e e n   z - [ 6 0 ]   s h r i n k - 0   s h a d o w - s m   $ { i s D a r k M o d e   ?   " b g - [ # 2 0 2 c 3 3 ]   b o r d e r - b   b o r d e r - w h i t e / 5   t e x t - w h i t e "   :   " b g - w h i t e   b o r d e r - b   b o r d e r - b l a c k / 5   t e x t - b l a c k " } ` } >  
                         < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   g a p - 3 " >  
                             < d i v   c l a s s N a m e = " h - 9   w - 9   r o u n d e d - f u l l   o v e r f l o w - h i d d e n   b o r d e r   b o r d e r - b l a c k / 5   b g - m u t e d   s h a d o w - s m " >  
                                 { o t h e r A v a t a r   ?   (  
                                     < i m g   s r c = { o t h e r A v a t a r }   a l t = " "   c l a s s N a m e = " w - f u l l   h - f u l l   o b j e c t - c o v e r "   / >  
                                 )   :   a v a t a r   ?   (  
                                     < i m g   s r c = { a v a t a r }   a l t = " "   c l a s s N a m e = " w - f u l l   h - f u l l   o b j e c t - c o v e r   o p a c i t y - 4 0   g r a y s c a l e "   / >  
                                 )   :   n u l l }  
                             < / d i v >  
                             < d i v >  
                                 < d i v   c l a s s N a m e = " f o n t - b o l d   t e x t - [ 1 4 p x ]   l e a d i n g - t i g h t " >  
                                     { o t h e r N a m e   | |   ( c o u n t   >   1   ?   " O v i i   U s e r "   :   " W a i t i n g . . . " )   | |   " W a i t i n g . . . " }  
                                 < / d i v >  
                                 < d i v   c l a s s N a m e = " t e x t - [ 1 0 p x ]   o p a c i t y - 6 0   f l e x   i t e m s - c e n t e r   g a p - 1 . 5   f o n t - m e d i u m " >  
                                     { r e c o r d i n g U s e r s . l e n g t h   >   0   ?   (  
                                         < s p a n   c l a s s N a m e = " t e x t - e m e r a l d - 5 0 0   a n i m a t e - p u l s e " > R e c o r d i n g . . . < / s p a n >  
                                     )   :   t y p i n g U s e r s . l e n g t h   >   0   ?   (  
                                         < s p a n   c l a s s N a m e = " t e x t - e m e r a l d - 5 0 0   a n i m a t e - p u l s e " > T y p i n g . . . < / s p a n >  
                                     )   :   o t h e r O n l i n e   ?   (  
                                         < s p a n   c l a s s N a m e = " t e x t - e m e r a l d - 5 0 0 " > o n l i n e < / s p a n >  
                                     )   :   o t h e r N a m e   ?   (  
                                         " o f f l i n e "  
                                     )   :   (  
                                         " n o   o n e   e l s e   h e r e "  
                                     ) }  
                                 < / d i v >  
                             < / d i v >  
                         < / d i v >  
                         < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   g a p - 1 . 5 " >  
                             { n o L o c k U n t i l   & &   D a t e . n o w ( )   <   n o L o c k U n t i l   & &   (  
                                 < d i v   c l a s s N a m e = " h i d d e n   s m : f l e x   i t e m s - c e n t e r   g a p - 1 . 5   p x - 2 . 5   p y - 1   r o u n d e d - f u l l   b g - p r i m a r y / 1 0   b o r d e r   b o r d e r - p r i m a r y / 2 0   t e x t - p r i m a r y   t e x t - [ 1 0 p x ]   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e r   a n i m a t e - p u l s e " >  
                                     < S h i e l d O f f   c l a s s N a m e = " w - 3   h - 3 "   / >  
                                     < s p a n > N o   L o c k :   { M a t h . c e i l ( ( n o L o c k U n t i l   -   D a t e . n o w ( ) )   /   6 0 0 0 0 ) } m   l e f t < / s p a n >  
                                 < / d i v >  
                             ) }  
                             < b u t t o n  
                                 o n C l i c k = { ( )   = >   s e t I s D a r k M o d e ( ! i s D a r k M o d e ) }  
                                 c l a s s N a m e = { ` p - 2   r o u n d e d - f u l l   t r a n s i t i o n - c o l o r s   $ { i s D a r k M o d e   ?   " h o v e r : b g - w h i t e / 1 0 "   :   " h o v e r : b g - b l a c k / 1 0 "  
                                     } ` }  
                                 t i t l e = { i s D a r k M o d e   ?   " L i g h t   M o d e "   :   " D a r k   M o d e " }  
                             >  
                                 { i s D a r k M o d e   ?   < S u n   c l a s s N a m e = " w - 5   h - 5 "   / >   :   < M o o n   c l a s s N a m e = " w - 5   h - 5 "   / > }  
                             < / b u t t o n >  
                             < b u t t o n  
                                 o n C l i c k = { ( )   = >   {   w i n d o w . l o c a t i o n . h r e f   =   " / n e w s " ;   } }  
                                 c l a s s N a m e = { ` p - 2   r o u n d e d - f u l l   t r a n s i t i o n - c o l o r s   $ { i s D a r k M o d e   ?   " h o v e r : b g - w h i t e / 1 0 "   :   " h o v e r : b g - b l a c k / 1 0 "  
                                     } ` }  
                                 t i t l e = " S w i t c h   t o   N e w s "  
                             >  
                                 < A r r o w L e f t R i g h t   c l a s s N a m e = " w - 5   h - 5 "   / >  
                             < / b u t t o n >  
                             < b u t t o n  
                                 o n C l i c k = { o n L o c k }  
                                 c l a s s N a m e = { ` m l - 1   t e x t - [ 1 1 p x ]   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e r   p x - 3 . 5   p y - 1 . 5   r o u n d e d - f u l l   t r a n s i t i o n - a l l   b o r d e r   $ { i s D a r k M o d e  
                                         ?   " b g - w h i t e / 5   h o v e r : b g - w h i t e / 1 0   b o r d e r - w h i t e / 1 0   t e x t - w h i t e / 8 0 "  
                                         :   " b g - b l a c k / 5   h o v e r : b g - b l a c k / 1 0   b o r d e r - b l a c k / 1 0   t e x t - b l a c k / 8 0 "  
                                     } ` }  
                             >  
                                 L o c k  
                             < / b u t t o n >  
                             < d i v   c l a s s N a m e = " r e l a t i v e "   r e f = { m e n u R e f } >  
                                 < b u t t o n  
                                     o n C l i c k = { ( )   = >   s e t S h o w M e n u ( ! s h o w M e n u ) }  
                                     c l a s s N a m e = { ` p - 2   r o u n d e d - f u l l   t r a n s i t i o n - c o l o r s   r e l a t i v e   $ { i s D a r k M o d e   ?   " h o v e r : b g - w h i t e / 1 0 "   :   " h o v e r : b g - b l a c k / 1 0 "  
                                         }   $ { s h o w M e n u   ?   ( i s D a r k M o d e   ?   " b g - w h i t e / 1 0 "   :   " b g - b l a c k / 1 0 " )   :   " " } ` }  
                                     t i t l e = " M e n u "  
                                 >  
                                     < M o r e V e r t i c a l   c l a s s N a m e = " w - 5   h - 5 "   / >  
                                     { u n r e a d M e d i a   >   0   & &   < s p a n   c l a s s N a m e = " a b s o l u t e   t o p - 1   r i g h t - 1   b g - [ # 2 5 d 3 6 6 ]   t e x t - w h i t e   t e x t - [ 8 p x ]   f o n t - b o l d   w - 4   h - 4   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r   r o u n d e d - f u l l   s h a d o w - s m " > { u n r e a d M e d i a } < / s p a n > }  
                                 < / b u t t o n >  
  
                                 < A n i m a t e P r e s e n c e >  
                                     { s h o w M e n u   & &   (  
                                         < m o t i o n . d i v  
                                             i n i t i a l = { {   o p a c i t y :   0 ,   s c a l e :   0 . 9 5 ,   y :   - 1 0   } }  
                                             a n i m a t e = { {   o p a c i t y :   1 ,   s c a l e :   1 ,   y :   0   } }  
                                             e x i t = { {   o p a c i t y :   0 ,   s c a l e :   0 . 9 5 ,   y :   - 1 0   } }  
                                             c l a s s N a m e = { ` a b s o l u t e   r i g h t - 0   m t - 2   w - 5 6   r o u n d e d - 2 x l   s h a d o w - e l e g a n t   z - 5 0   o v e r f l o w - h i d d e n   b o r d e r   $ { i s D a r k M o d e   ?   " b g - [ # 2 3 3 1 3 8 ]   b o r d e r - w h i t e / 1 0 "   :   " b g - w h i t e   b o r d e r - b l a c k / 5 "  
                                                 } ` }  
                                         >  
                                             < d i v   c l a s s N a m e = " p y - 1 " >  
                                                 < b u t t o n  
                                                     o n C l i c k = { ( )   = >   {   s e t S h o w F o l d e r ( t r u e ) ;   s e t S h o w M e n u ( f a l s e ) ;   } }  
                                                     c l a s s N a m e = { ` w - f u l l   f l e x   i t e m s - c e n t e r   g a p - 3   p x - 4   p y - 3   t e x t - s m   t r a n s i t i o n - c o l o r s   $ { i s D a r k M o d e   ?   " h o v e r : b g - w h i t e / 5   t e x t - w h i t e / 9 0 "   :   " h o v e r : b g - b l a c k / 5   t e x t - b l a c k / 8 0 "  
                                                         } ` }  
                                                 >  
                                                     < F o l d e r   c l a s s N a m e = " w - 4   h - 4   t e x t - d e s t r u c t i v e "   / >  
                                                     < d i v   c l a s s N a m e = " f l e x - 1   t e x t - l e f t   f o n t - m e d i u m " > F i l e s < / d i v >  
                                                     { u n r e a d M e d i a   >   0   & &   < s p a n   c l a s s N a m e = " b g - [ # 2 5 d 3 6 6 ]   t e x t - w h i t e   t e x t - [ 1 0 p x ]   f o n t - b o l d   p x - 1 . 5   p y - 0 . 5   r o u n d e d - f u l l " > { u n r e a d M e d i a } < / s p a n > }  
                                                 < / b u t t o n >  
  
                                                 < d i v   c l a s s N a m e = { ` h - p x   m x - 2   $ { i s D a r k M o d e   ?   " b g - w h i t e / 5 "   :   " b g - b l a c k / 5 " } ` }   / >  
  
                                                 { ! s h o w N o L o c k S u b m e n u   ?   (  
                                                     < b u t t o n  
                                                         o n C l i c k = { ( )   = >   s e t S h o w N o L o c k S u b m e n u ( t r u e ) }  
                                                         c l a s s N a m e = { ` w - f u l l   f l e x   i t e m s - c e n t e r   g a p - 3   p x - 4   p y - 3   t e x t - s m   t r a n s i t i o n - c o l o r s   $ { i s D a r k M o d e   ?   " h o v e r : b g - w h i t e / 5   t e x t - w h i t e / 9 0 "   :   " h o v e r : b g - b l a c k / 5   t e x t - b l a c k / 8 0 "  
                                                             } ` }  
                                                     >  
                                                         < S h i e l d O f f   c l a s s N a m e = " w - 4   h - 4   t e x t - p r i m a r y "   / >  
                                                         < d i v   c l a s s N a m e = " f l e x - 1   t e x t - l e f t   f o n t - m e d i u m " > N o   L o c k < / d i v >  
                                                         { n o L o c k U n t i l   & &   D a t e . n o w ( )   <   n o L o c k U n t i l   ?   (  
                                                             < s p a n   c l a s s N a m e = " t e x t - [ 1 0 p x ]   f o n t - b o l d   t e x t - p r i m a r y   a n i m a t e - p u l s e   u p p e r c a s e   t r a c k i n g - w i d e s t " > A c t i v e < / s p a n >  
                                                         )   :   (  
                                                             < C h e v r o n D o w n   c l a s s N a m e = " w - 3 . 5   h - 3 . 5   o p a c i t y - 4 0 "   / >  
                                                         ) }  
                                                     < / b u t t o n >  
                                                 )   :   (  
                                                     < d i v   c l a s s N a m e = " p y - 1 " >  
                                                         < d i v   c l a s s N a m e = { ` p x - 4   p y - 2   t e x t - [ 1 0 p x ]   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e s t   o p a c i t y - 4 0   $ { i s D a r k M o d e   ?   " t e x t - w h i t e "   :   " t e x t - b l a c k " } ` } > S e l e c t   D u r a t i o n < / d i v >  
                                                         { [  
                                                             {   l a b e l :   " 1 5   M i n u t e s " ,   v a l :   1 5   *   6 0   *   1 0 0 0   } ,  
                                                             {   l a b e l :   " 1   H o u r " ,   v a l :   6 0   *   6 0   *   1 0 0 0   } ,  
                                                             {   l a b e l :   " 5   H o u r s " ,   v a l :   5   *   6 0   *   6 0   *   1 0 0 0   } ,  
                                                             {   l a b e l :   " 2 4   H o u r s " ,   v a l :   2 4   *   6 0   *   6 0   *   1 0 0 0   } ,  
                                                         ] . m a p ( ( d )   = >   (  
                                                             < b u t t o n  
                                                                 k e y = { d . l a b e l }  
                                                                 o n C l i c k = { ( )   = >   {  
                                                                     c o n s t   u n t i l   =   D a t e . n o w ( )   +   d . v a l ;  
                                                                     s e t N o L o c k U n t i l ( u n t i l ) ;  
                                                                     l o c a l S t o r a g e . s e t I t e m ( " o v i i _ n o _ l o c k _ u n t i l " ,   u n t i l . t o S t r i n g ( ) ) ;  
                                                                     s e t S h o w M e n u ( f a l s e ) ;  
                                                                     s e t S h o w N o L o c k S u b m e n u ( f a l s e ) ;  
                                                                     t o a s t . s u c c e s s ( ` N o   L o c k   e n a b l e d   f o r   $ { d . l a b e l } ` ) ;  
                                                                 } }  
                                                                 c l a s s N a m e = { ` w - f u l l   f l e x   i t e m s - c e n t e r   g a p - 3   p x - 4   p y - 2 . 5   t e x t - x s   t r a n s i t i o n - c o l o r s   $ { i s D a r k M o d e   ?   " h o v e r : b g - w h i t e / 5   t e x t - w h i t e / 8 0 "   :   " h o v e r : b g - b l a c k / 5   t e x t - b l a c k / 7 0 "  
                                                                     } ` }  
                                                             >  
                                                                 < C l o c k   c l a s s N a m e = " w - 3 . 5   h - 3 . 5   o p a c i t y - 6 0 "   / >  
                                                                 < s p a n   c l a s s N a m e = " f o n t - m e d i u m " > { d . l a b e l } < / s p a n >  
                                                             < / b u t t o n >  
                                                         ) ) }  
                                                         { n o L o c k U n t i l   & &   (  
                                                             < b u t t o n  
                                                                 o n C l i c k = { ( )   = >   {  
                                                                     s e t N o L o c k U n t i l ( n u l l ) ;  
                                                                     l o c a l S t o r a g e . r e m o v e I t e m ( " o v i i _ n o _ l o c k _ u n t i l " ) ;  
                                                                     s e t S h o w M e n u ( f a l s e ) ;  
                                                                     s e t S h o w N o L o c k S u b m e n u ( f a l s e ) ;  
                                                                     t o a s t . i n f o ( " N o   L o c k   d i s a b l e d " ) ;  
                                                                 } }  
                                                                 c l a s s N a m e = " w - f u l l   f l e x   i t e m s - c e n t e r   g a p - 3   p x - 4   p y - 2 . 5   t e x t - x s   t e x t - d e s t r u c t i v e   h o v e r : b g - d e s t r u c t i v e / 5   t r a n s i t i o n - c o l o r s "  
                                                             >  
                                                                 < X C i r c l e   c l a s s N a m e = " w - 3 . 5   h - 3 . 5 "   / >  
                                                                 < s p a n   c l a s s N a m e = " f o n t - b o l d " > T u r n   o f f   N o   L o c k < / s p a n >  
                                                             < / b u t t o n >  
                                                         ) }  
                                                         < b u t t o n  
                                                             o n C l i c k = { ( )   = >   s e t S h o w N o L o c k S u b m e n u ( f a l s e ) }  
                                                             c l a s s N a m e = { ` w - f u l l   f l e x   i t e m s - c e n t e r   g a p - 3   p x - 4   p y - 2   t e x t - [ 1 0 p x ]   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e s t   o p a c i t y - 4 0   h o v e r : o p a c i t y - 1 0 0   t r a n s i t i o n - o p a c i t y   $ { i s D a r k M o d e   ?   " t e x t - w h i t e "   :   " t e x t - b l a c k " } ` }  
                                                         >  
                                                             �� �   B a c k  
                                                         < / b u t t o n >  
                                                     < / d i v >  
                                                 ) }  
  
                                                 < d i v   c l a s s N a m e = { ` h - p x   m x - 2   $ { i s D a r k M o d e   ?   " b g - w h i t e / 5 "   :   " b g - b l a c k / 5 " } ` }   / >  
  
                                                 < b u t t o n  
                                                     o n C l i c k = { c l e a r C h a t }  
                                                     c l a s s N a m e = { ` w - f u l l   f l e x   i t e m s - c e n t e r   g a p - 3   p x - 4   p y - 3   t e x t - s m   t r a n s i t i o n - c o l o r s   $ { i s D a r k M o d e   ?   " h o v e r : b g - d e s t r u c t i v e / 1 0   t e x t - d e s t r u c t i v e "   :   " h o v e r : b g - d e s t r u c t i v e / 5   t e x t - d e s t r u c t i v e "  
                                                         } ` }  
                                                 >  
                                                     < T r a s h 2   c l a s s N a m e = " w - 4   h - 4 "   / >  
                                                     < d i v   c l a s s N a m e = " f l e x - 1   t e x t - l e f t   f o n t - m e d i u m " > C l e a r   C h a t < / d i v >  
                                                 < / b u t t o n >  
                                             < / d i v >  
                                         < / m o t i o n . d i v >  
                                     ) }  
                                 < / A n i m a t e P r e s e n c e >  
                             < / d i v >  
                         < / d i v >  
                     < / h e a d e r >  
  
                     { / *   �� � �� �   B o d y :   m e s s a g e s   c o l   +   o p t i o n a l   d e s k t o p   s i d e b a r   �� � �� �   * / }  
                     < d i v   c l a s s N a m e = " f l e x - 1   f l e x   m i n - h - 0   o v e r f l o w - h i d d e n " >  
  
                         { / *   �� � �� �   M e s s a g e s   c o l u m n   �� � �� �   * / }  
                         < d i v   c l a s s N a m e = " f l e x - 1   f l e x   f l e x - c o l   m i n - w - 0   o v e r f l o w - h i d d e n   r e l a t i v e " >  
  
                             { / *   F l o a t i n g   j o i n / l e a v e   t o a s t s   * / }  
                             < A n i m a t e P r e s e n c e >  
                                 { s y s t e m M s g s . l e n g t h   >   0   & &   (  
                                     < m o t i o n . d i v  
                                         k e y = " t o a s t - s t a c k "  
                                         i n i t i a l = { {   o p a c i t y :   0 ,   y :   - 2 0   } }  
                                         a n i m a t e = { {   o p a c i t y :   1 ,   y :   0   } }  
                                         e x i t = { {   o p a c i t y :   0 ,   y :   - 2 0   } }  
                                         c l a s s N a m e = " a b s o l u t e   t o p - [ 1 0 p x ]   l e f t - 1 / 2   - t r a n s l a t e - x - 1 / 2   z - 3 0   f l e x   f l e x - c o l   i t e m s - c e n t e r   g a p - 1   p o i n t e r - e v e n t s - n o n e "  
                                     >  
                                         { s y s t e m M s g s . s l i c e ( - 1 ) . m a p ( s m   = >   (  
                                             < d i v   k e y = { s m . i d }   c l a s s N a m e = { ` t e x t - [ 1 1 p x ]   f o n t - b o l d   p x - 4   p y - 1 . 5   r o u n d e d - f u l l   b a c k d r o p - b l u r - x l   s h a d o w - e l e g a n t   b o r d e r   $ { s m . t y p e   = = =   " j o i n "  
                                                     ?   " b g - e m e r a l d - 5 0 0 / 2 0   t e x t - e m e r a l d - 3 0 0   b o r d e r - e m e r a l d - 5 0 0 / 3 0 "  
                                                     :   " b g - m u t e d / 6 0   t e x t - m u t e d - f o r e g r o u n d   b o r d e r - b o r d e r / 3 0 "  
                                                 } ` } >  
                                                 { s m . t y p e   = = =   " j o i n "   ?   " a"��� "   :   " �� � " }   { s m . t e x t }  
                                             < / d i v >  
                                         ) ) }  
                                     < / m o t i o n . d i v >  
                                 ) }  
                             < / A n i m a t e P r e s e n c e >  
  
                             { / *   S c r o l l   a r e a   �� �   o v e r f l o w - x : h i d d e n   p r e v e n t s   h o r i z o n t a l   b l e e d   f r o m   d r a g   * / }  
                             < d i v  
                                 r e f = { s c r o l l R e f }  
                                 c l a s s N a m e = " f l e x - 1   m i n - h - 0   o v e r f l o w - y - a u t o   o v e r s c r o l l - c o n t a i n   f l e x   f l e x - c o l   i t e m s - s t r e t c h   t o u c h - p a n - y   r e l a t i v e   b g - [ # 0 b 1 4 1 a ]   p r e m i u m - s c r o l l b a r "  
                                 s t y l e = { {   o v e r s c r o l l B e h a v i o r :   " c o n t a i n " ,   o v e r f l o w X :   " h i d d e n "   } }  
                                 o n S c r o l l = { ( e )   = >   {  
                                     c o n s t   t   =   e . c u r r e n t T a r g e t ;  
                                     s e t S h o w S c r o l l D o w n ( t . s c r o l l H e i g h t   -   t . s c r o l l T o p   >   t . c l i e n t H e i g h t   +   8 0 ) ;  
                                 } }  
                             >  
                                 < d i v   c l a s s N a m e = " f l e x - 1 "   / >  
  
                                 { e r r o r   & &   < d i v   c l a s s N a m e = " t e x t - x s   t e x t - d e s t r u c t i v e   b g - d e s t r u c t i v e / 1 0   b o r d e r   b o r d e r - d e s t r u c t i v e / 3 0   r o u n d e d - m d   p - 3   m b - 3 " > { e r r o r } < / d i v > }  
                                 { ! e r r o r   & &   c h a t M s g s . l e n g t h   = = =   0   & &   (  
                                     < d i v   c l a s s N a m e = " h - f u l l   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r   t e x t - c e n t e r   t e x t - m u t e d - f o r e g r o u n d   t e x t - s m   m y - a u t o " >  
                                         < d i v > < d i v   c l a s s N a m e = " t e x t - 4 x l   m b - 2 " > a"�� � < / d i v > N o   m e s s a g e s   y e t . < / d i v >  
                                     < / d i v >  
                                 ) }  
  
                                 < d i v   c l a s s N a m e = " f l e x - 1   f l e x   f l e x - c o l   j u s t i f y - e n d   s h r i n k - 0   r e l a t i v e   p x - [ 1 0 p x ]   p t - [ 1 2 p x ]   p b - [ 9 0 p x ]   g a p - [ 4 p x ] " >  
                                     < A n i m a t e P r e s e n c e >  
                                         { c h a t M s g s . m a p ( ( m ,   i )   = >   {  
                                             c o n s t   m i n e   =   m . u i d   = = =   u i d ;  
                                             c o n s t   p r e v M s g   =   c h a t M s g s [ i   -   1 ] ;  
                                             c o n s t   i s C o n s e c u t i v e   =   p r e v M s g   & &   p r e v M s g . u i d   = = =   m . u i d ;  
                                             c o n s t   n e x t M s g   =   c h a t M s g s [ i   +   1 ] ;  
                                             c o n s t   i s L a s t I n G r o u p   =   ! n e x t M s g   | |   n e x t M s g . u i d   ! = =   m . u i d ;  
  
                                             r e t u r n   (  
                                                 < d i v   k e y = { m . i d }   c l a s s N a m e = { ` w - f u l l   f l e x   $ { m i n e   ?   " j u s t i f y - e n d "   :   " j u s t i f y - s t a r t " }   $ { ! i s C o n s e c u t i v e   ?   " m t - 4 "   :   " m t - 0 " } ` } >  
                                                     < m o t i o n . d i v  
                                                         i n i t i a l = { {   o p a c i t y :   0 ,   y :   1 0   } }  
                                                         a n i m a t e = { {   o p a c i t y :   1 ,   y :   0   } }  
                                                         c l a s s N a m e = { ` f l e x   i t e m s - e n d   g a p - 2   m a x - w - [ 7 8 % ]   $ { m i n e   ?   " f l e x - r o w - r e v e r s e "   :   " f l e x - r o w " } ` }  
                                                     >  
                                                         < d i v   c l a s s N a m e = " w - 8   s h r i n k - 0 " >  
                                                             { i s L a s t I n G r o u p   & &   < i m g   s r c = { m . a v a t a r }   c l a s s N a m e = " h - 8   w - 8   r o u n d e d - f u l l   o b j e c t - c o v e r   s h a d o w - s m "   a l t = " "   / > }  
                                                         < / d i v >  
  
                                                         < d i v   c l a s s N a m e = { ` f l e x - 1   m i n - w - 0   f l e x   f l e x - c o l   $ { m i n e   ?   " i t e m s - e n d "   :   " i t e m s - s t a r t " } ` } >  
                                                             { ! m i n e   & &   ! i s C o n s e c u t i v e   & &   m . n a m e   & &   (  
                                                                 < s p a n   c l a s s N a m e = " t e x t - [ 1 2 p x ]   f o n t - b o l d   t e x t - m u t e d - f o r e g r o u n d / 6 0   m l - 2   m b - 1   u p p e r c a s e   t r a c k i n g - w i d e r " > { m . n a m e } < / s p a n >  
                                                             ) }  
  
                                                             < d i v   c l a s s N a m e = { ` r e l a t i v e   p x - [ 1 4 p x ]   p y - [ 1 0 p x ]   r o u n d e d - [ 1 8 p x ]   s h a d o w - s m   w - f i t   m a x - w - f u l l   $ {  
                                                                 m i n e    
                                                                     ?   ( i s D a r k M o d e   ?   " b g - [ # 0 0 5 c 4 b ]   t e x t - [ # e 9 e d e f ] "   :   " b g - [ # d c f 8 c 6 ]   t e x t - [ # 1 1 1 b 2 1 ] " )   +   ( i s L a s t I n G r o u p   ?   "   r o u n d e d - b r - [ 4 p x ] "   :   " " )  
                                                                     :   ( i s D a r k M o d e   ?   " b g - [ # 2 0 2 c 3 3 ]   t e x t - [ # e 9 e d e f ] "   :   " b g - w h i t e   t e x t - [ # 1 1 1 b 2 1 ] " )   +   ( i s L a s t I n G r o u p   ?   "   r o u n d e d - b l - [ 4 p x ] "   :   " " )  
                                                             } ` } >  
                                                                 { m . t y p e   = = =   " v o i c e "   ?   (  
                                                                     < A u d i o P l a y e r   s r c = { m . c o n t e n t }   i d = { m . i d }   m i n e = { m i n e }   s t a t u s = { m . s t a t u s }   c r e a t e d A t = { m . c r e a t e d A t }   i s D a r k M o d e = { i s D a r k M o d e }   / >  
                                                                 )   :   m . t y p e   = = =   " i m a g e "   ?   (  
                                                                     < d i v   c l a s s N a m e = " f l e x   f l e x - c o l   g a p - 2 " >  
                                                                         < d i v   c l a s s N a m e = " r o u n d e d - [ 1 2 p x ]   o v e r f l o w - h i d d e n   c u r s o r - p o i n t e r "   o n C l i c k = { ( )   = >   s e t S e l e c t e d I m a g e ( m . c o n t e n t ) } >  
                                                                             < i m g   s r c = { m . c o n t e n t }   a l t = " "   c l a s s N a m e = " m a x - w - f u l l   h - a u t o   o b j e c t - c o v e r   m a x - h - [ 3 0 0 p x ] "   / >  
                                                                         < / d i v >  
                                                                         { m . c a p t i o n   & &   < p   c l a s s N a m e = " t e x t - [ 1 6 p x ]   l e a d i n g - [ 1 . 4 5 ] " > { m . c a p t i o n } < / p > }  
                                                                         < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   j u s t i f y - e n d   g a p - 1 . 5   o p a c i t y - 6 0   t e x t - [ 1 0 p x ]   m t - 1 " >  
                                                                             { m . c r e a t e d A t ? . t o D a t e ( ) ? . t o L o c a l e T i m e S t r i n g ( [ ] ,   {   h o u r :   " 2 - d i g i t " ,   m i n u t e :   " 2 - d i g i t "   } ) }  
                                                                             { m i n e   & &   < M s g T i c k   s t a t u s = { m . s t a t u s }   / > }  
                                                                         < / d i v >  
                                                                     < / d i v >  
                                                                 )   :   (  
                                                                     < d i v   c l a s s N a m e = " f l e x   f l e x - c o l " >  
                                                                         < p   c l a s s N a m e = " t e x t - [ 1 6 p x ]   l e a d i n g - [ 1 . 4 5 ]   b r e a k - w o r d s   w h i t e s p a c e - p r e - w r a p " > { m . c o n t e n t } < / p >  
                                                                         < d i v   c l a s s N a m e = " f l e x   i t e m s - c e n t e r   j u s t i f y - e n d   g a p - 1 . 5   o p a c i t y - 6 0   t e x t - [ 1 0 p x ]   m t - 1 " >  
                                                                             { m . c r e a t e d A t ? . t o D a t e ( ) ? . t o L o c a l e T i m e S t r i n g ( [ ] ,   {   h o u r :   " 2 - d i g i t " ,   m i n u t e :   " 2 - d i g i t "   } ) }  
                                                                             { m i n e   & &   < M s g T i c k   s t a t u s = { m . s t a t u s }   / > }  
                                                                         < / d i v >  
                                                                     < / d i v >  
                                                                 ) }  
                                                             < / d i v >  
                                                         < / d i v >  
                                                     < / m o t i o n . d i v >  
                                                 < / d i v >  
                                             ) ;  
                                         } ) }  
                                     < / A n i m a t e P r e s e n c e >  
                                     < d i v   r e f = { m e s s a g e s E n d R e f }   / >  
                                 < / d i v >  
                             < / d i v >  
  
                             { / *   S c r o l l - t o - b o t t o m   b u t t o n   * / }  
                             < A n i m a t e P r e s e n c e >  
                                 { s h o w S c r o l l D o w n   & &   (  
                                     < m o t i o n . b u t t o n  
                                         i n i t i a l = { {   o p a c i t y :   0 ,   y :   2 0   } }  
                                         a n i m a t e = { {   o p a c i t y :   1 ,   y :   0   } }  
                                         e x i t = { {   o p a c i t y :   0 ,   y :   2 0   } }  
                                         o n C l i c k = { ( )   = >   s c r o l l T o B o t t o m ( ) }  
                                         c l a s s N a m e = " a b s o l u t e   b o t t o m - [ 8 0 p x ]   l e f t - 1 / 2   - t r a n s l a t e - x - 1 / 2   b g - p r i m a r y   t e x t - p r i m a r y - f o r e g r o u n d   p - 2   r o u n d e d - f u l l   s h a d o w - l g   z - 2 0   f l e x   i t e m s - c e n t e r   g a p - 1   p x - 3   t e x t - x s   f o n t - b o l d "  
                                     >  
                                         N e w   m e s s a g e   �� �  
                                     < / m o t i o n . b u t t o n >  
                                 ) }  
                             < / A n i m a t e P r e s e n c e >  
  
                             { / *   I n p u t   b a r   * / }  
  
                             < f o o t e r   c l a s s N a m e = " s h r i n k - 0   p - 2   p b - s a f e   z - [ 6 0 ]   r e l a t i v e " >  
                                 < d i v   c l a s s N a m e = " f l e x   i t e m s - e n d   g a p - 2   m a x - w - 5 x l   m x - a u t o " >  
                                     < d i v   c l a s s N a m e = " f l e x - 1   f l e x   i t e m s - e n d   b g - [ # 2 0 2 c 3 3 ]   r o u n d e d - [ 2 4 p x ]   m i n - h - [ 4 8 p x ]   p x - 3   p y - 1 . 5   s h a d o w - s m " >  
                                         < b u t t o n    
                                             o n C l i c k = { ( )   = >   f i l e R e f . c u r r e n t ? . c l i c k ( ) }  
                                             c l a s s N a m e = " p - 2   t e x t - [ # 8 6 9 6 a 0 ]   h o v e r : t e x t - w h i t e   t r a n s i t i o n - c o l o r s "  
                                         >  
                                             < I m a g e I c o n   c l a s s N a m e = " w - 6   h - 6 "   / >  
                                         < / b u t t o n >  
                                         < t e x t a r e a  
                                             r o w s = { 1 }  
                                             v a l u e = { t e x t }  
                                             o n C h a n g e = { ( e )   = >   {  
                                                 s e t T e x t ( e . t a r g e t . v a l u e ) ;  
                                                 e . t a r g e t . s t y l e . h e i g h t   =   ' a u t o ' ;  
                                                 e . t a r g e t . s t y l e . h e i g h t   =   M a t h . m i n ( e . t a r g e t . s c r o l l H e i g h t ,   1 2 0 )   +   ' p x ' ;  
                                             } }  
                                             o n K e y D o w n = { ( e )   = >   {  
                                                 i f   ( e . k e y   = = =   ' E n t e r '   & &   ! e . s h i f t K e y )   {  
                                                     e . p r e v e n t D e f a u l t ( ) ;  
                                                     o n T e x t ( ) ;  
                                                     e . c u r r e n t T a r g e t . s t y l e . h e i g h t   =   ' a u t o ' ;  
                                                 }  
                                             } }  
                                             p l a c e h o l d e r = " M e s s a g e "  
                                             c l a s s N a m e = " f l e x - 1   b g - t r a n s p a r e n t   b o r d e r - n o n e   f o c u s : r i n g - 0   t e x t - [ 1 6 p x ]   t e x t - w h i t e   p y - 2   p x - 2   r e s i z e - n o n e   m a x - h - [ 1 2 0 p x ]   o v e r f l o w - y - a u t o   p r e m i u m - s c r o l l b a r   l e a d i n g - [ 1 . 4 5 ]   p l a c e h o l d e r - [ # 8 6 9 6 a 0 ] "  
                                         / >  
                                     < / d i v >  
                                     < b u t t o n  
                                         o n C l i c k = { r e c o r d i n g   ?   s t o p A n d S e n d R e c   :   ( t e x t . t r i m ( )   ?   o n T e x t   :   s t a r t R e c ) }  
                                         c l a s s N a m e = " w - [ 4 8 p x ]   h - [ 4 8 p x ]   r o u n d e d - f u l l   b g - [ # 0 0 a 8 8 4 ]   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r   t e x t - w h i t e   s h a d o w - l g   a c t i v e : s c a l e - 9 0   t r a n s i t i o n - a l l   s h r i n k - 0 "  
                                     >  
                                         { r e c o r d i n g   ?   < X C i r c l e   c l a s s N a m e = " w - 6   h - 6   a n i m a t e - p u l s e "   / >   :   ( t e x t . t r i m ( )   ?   < S e n d   c l a s s N a m e = " w - 6   h - 6 "   / >   :   < M i c   c l a s s N a m e = " w - 6   h - 6 "   / > ) }  
                                     < / b u t t o n >  
                                 < / d i v >  
                             < / f o o t e r >  
  
                         { / *   �� � �� �   D e s k t o p   S i d e b a r   ( h i d d e n   o n   m o b i l e   v i a   C S S / T a i l w i n d )   �� � �� �   * / }  
                         < A n i m a t e P r e s e n c e >  
                             { s h o w F o l d e r   & &   (  
                                 < m o t i o n . d i v  
                                     i n i t i a l = { {   w i d t h :   0 ,   o p a c i t y :   0   } }  
                                     a n i m a t e = { {   w i d t h :   3 8 0 ,   o p a c i t y :   1   } }  
                                     e x i t = { {   w i d t h :   0 ,   o p a c i t y :   0   } }  
                                     t r a n s i t i o n = { {   t y p e :   " s p r i n g " ,   d a m p i n g :   3 0 ,   s t i f f n e s s :   3 0 0   } }  
                                     c l a s s N a m e = " h i d d e n   l g : f l e x   f l e x - c o l   b o r d e r - l   b o r d e r - b o r d e r / 4 0   b g - m u t e d / 5   r e l a t i v e   o v e r f l o w - h i d d e n   s h r i n k - 0 "  
                                 >  
                                     < d i v   c l a s s N a m e = " p - 4   b o r d e r - b   b o r d e r - b o r d e r / 6 0   f l e x   i t e m s - c e n t e r   j u s t i f y - b e t w e e n   b g - b a c k g r o u n d / 4 0   b a c k d r o p - b l u r - m d   s t i c k y   t o p - 0   z - 1 0 " >  
                                         < h 2   c l a s s N a m e = " t e x t - s m   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e r   f l e x   i t e m s - c e n t e r   g a p - 2 . 5 " >  
                                             < F o l d e r   c l a s s N a m e = " w - 4   h - 4   t e x t - d e s t r u c t i v e "   / >   F I L E S  
                                         < / h 2 >  
                                         < b u t t o n   o n C l i c k = { ( )   = >   s e t S h o w F o l d e r ( f a l s e ) }   c l a s s N a m e = " p - 2   r o u n d e d - f u l l   b g - b a c k g r o u n d / 6 0   h o v e r : b g - b a c k g r o u n d   t e x t - f o r e g r o u n d   t r a n s i t i o n - a l l   a c t i v e : s c a l e - 9 0   b o r d e r   b o r d e r - b o r d e r / 2 0   s h a d o w - s m " >  
                                             < X   c l a s s N a m e = " w - 4   h - 4 "   / >  
                                         < / b u t t o n >  
                                     < / d i v >  
                                     < d i v   c l a s s N a m e = " f l e x - 1   o v e r f l o w - y - a u t o   p - 4   s p a c e - y - 6   s c r o l l b a r - h i d e " >  
                                         < M e d i a L i s t   m s g s = { m s g s }   u i d = { u i d }   d o w n l o a d F i l e = { d o w n l o a d F i l e }   i s D a r k M o d e = { i s D a r k M o d e }   s e t S e l e c t e d I m a g e = { s e t S e l e c t e d I m a g e }   / >  
                                     < / d i v >  
                                 < / m o t i o n . d i v >  
                             ) }  
                         < / A n i m a t e P r e s e n c e >  
  
                     < / d i v > { / *   e n d   m s g s - c o l   * / }  
                     < / d i v > { / *   e n d   b o d y   * / }  
                 < / d i v > { / *   e n d   o v i i - c h a t - f r a m e   * / }  
             < / d i v > { / *   e n d   o v i i - c h a t - r o o t   * / }  
  
             { / *   �� � �� �   F u l l   I m a g e   P r e v i e w   O v e r l a y   �� � �� �   * / }  
             < A n i m a t e P r e s e n c e >  
                 { s e l e c t e d I m a g e   & &   (  
                     < m o t i o n . d i v  
                         i n i t i a l = { {   o p a c i t y :   0   } }  
                         a n i m a t e = { {   o p a c i t y :   1   } }  
                         e x i t = { {   o p a c i t y :   0   } }  
                         c l a s s N a m e = " f i x e d   i n s e t - 0   z - [ 1 0 0 ]   b g - b l a c k / 9 0   b a c k d r o p - b l u r - m d   f l e x   f l e x - c o l   i t e m s - c e n t e r   j u s t i f y - c e n t e r   p - 4   s m : p - 1 0 "  
                         o n C l i c k = { ( )   = >   s e t S e l e c t e d I m a g e ( n u l l ) }  
                     >  
                         < m o t i o n . b u t t o n  
                             i n i t i a l = { {   s c a l e :   0 . 5 ,   o p a c i t y :   0   } }  
                             a n i m a t e = { {   s c a l e :   1 ,   o p a c i t y :   1   } }  
                             o n C l i c k = { ( )   = >   s e t S e l e c t e d I m a g e ( n u l l ) }  
                             c l a s s N a m e = " a b s o l u t e   t o p - 5   r i g h t - 5   p - 2 . 5   b g - w h i t e / 1 0   h o v e r : b g - w h i t e / 2 0   b a c k d r o p - b l u r - m d   r o u n d e d - f u l l   t e x t - w h i t e   t r a n s i t i o n - a l l   z - 1 0 "  
                         >  
                             < X   c l a s s N a m e = " w - 6   h - 6 "   / >  
                         < / m o t i o n . b u t t o n >  
  
                         < m o t i o n . b u t t o n  
                             i n i t i a l = { {   s c a l e :   0 . 5 ,   o p a c i t y :   0   } }  
                             a n i m a t e = { {   s c a l e :   1 ,   o p a c i t y :   1   } }  
                             o n C l i c k = { ( )   = >   d o w n l o a d F i l e ( s e l e c t e d I m a g e ,   " p r e v i e w " ,   " i m a g e " ) }  
                             c l a s s N a m e = " a b s o l u t e   t o p - [ 7 5 p x ]   r i g h t - 5   p - 2 . 5   b g - w h i t e / 1 0   h o v e r : b g - w h i t e / 2 0   b a c k d r o p - b l u r - m d   r o u n d e d - f u l l   t e x t - w h i t e   t r a n s i t i o n - a l l   z - 1 0 "  
                         >  
                             < D o w n l o a d   c l a s s N a m e = " w - 6   h - 6 "   / >  
                         < / m o t i o n . b u t t o n >  
                          
                         < m o t i o n . d i v  
                             i n i t i a l = { {   s c a l e :   0 . 9 ,   o p a c i t y :   0   } }  
                             a n i m a t e = { {   s c a l e :   1 ,   o p a c i t y :   1   } }  
                             e x i t = { {   s c a l e :   0 . 9 ,   o p a c i t y :   0   } }  
                             c l a s s N a m e = " r e l a t i v e   m a x - w - 5 x l   w - f u l l   h - f u l l   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r "  
                             o n C l i c k = { ( e )   = >   e . s t o p P r o p a g a t i o n ( ) }  
                         >  
                             < i m g    
                                 s r c = { s e l e c t e d I m a g e }    
                                 a l t = " "    
                                 c l a s s N a m e = " m a x - w - f u l l   m a x - h - f u l l   o b j e c t - c o n t a i n   s h a d o w - 2 x l   r o u n d e d - l g "  
                             / >  
                         < / m o t i o n . d i v >  
                     < / m o t i o n . d i v >  
                 ) }  
             < / A n i m a t e P r e s e n c e >  
         < / >  
     ) ;  
 }  
 
```

---

## File: scratch\OViiChat_stable_base_utf8.tsx

```tsx
﻿import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs, writeBatch
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Image as ImageIcon, Send, Trash2, Folder, Reply, Download, X, Play, Pause, XCircle, ArrowLeftRight, ChevronDown, ChevronLeft, Sun, Moon, MoreVertical, ShieldOff, Clock } from "lucide-react";
import { Toaster, toast } from "sonner";
import WaveSurfer from "wavesurfer.js";

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  name?: string;
  type: "text" | "image" | "voice";
  content: string;
  caption?: string;
  createdAt?: Timestamp;
  status?: "sending" | "sent" | "delivered" | "read";
  replyTo?: { id: string, content: string, avatar: string, name?: string };
};

const ROOM = "ovii-room";
const STOP_AUDIO_EVENT = "ovii_stop_audio";

// ΓöÇΓöÇΓöÇ Detect if we're on a touch/mobile device ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

// ΓöÇΓöÇΓöÇ AudioPlayer ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const AudioPlayer = ({ src, id, mine, status, createdAt, isDarkMode }: { src: string, id: string, mine: boolean, status?: string, createdAt?: any, isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: isDarkMode ? (mine ? "#8696a0" : "#667781") : "#8696a0",
      progressColor: isDarkMode ? "#34b7f1" : "#34b7f1",
      cursorWidth: 0,
      barWidth: 2,
      barGap: 3,
      barRadius: 2,
      height: 32,
      normalize: true,
    });
    ws.load(src);
    waveRef.current = ws;
    ws.on("ready", () => setDuration(ws.getDuration()));
    ws.on("audioprocess", () => setCurrentTime(ws.getCurrentTime()));
    ws.on("finish", () => { setPlaying(false); setCurrentTime(ws.getDuration()); });
    const stopOthers = (e: any) => { if (e.detail !== id && ws.isPlaying()) { ws.pause(); setPlaying(false); } };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);
    return () => { window.removeEventListener(STOP_AUDIO_EVENT, stopOthers); ws.destroy(); };
  }, [src, id, isDarkMode, mine]);

  const toggle = () => {
    if (!waveRef.current) return;
    if (playing) waveRef.current.pause();
    else { window.dispatchEvent(new CustomEvent(STOP_AUDIO_EVENT, { detail: id })); waveRef.current.play(); }
    setPlaying(!playing);
  };

  const toggleSpeed = () => {
    if (!waveRef.current) return;
    const next = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    waveRef.current.setPlaybackRate(next);
    setSpeed(next);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss < 10 ? "0" : ""}${ss}`;
  };

  const timeStr = createdAt?.toDate?.()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "";

  return (
    <div className={`flex items-center gap-3 w-full max-w-[300px] p-[10px] rounded-[18px] transition-all ${mine 
        ? (isDarkMode ? "bg-[#005c4b] text-white" : "bg-[#dcf8c6] text-black") 
        : (isDarkMode ? "bg-[#202c33] text-white" : "bg-white text-black")
      } ${mine ? "rounded-br-[4px]" : "rounded-bl-[4px]"}`}>
      <button onClick={toggle} className="shrink-0 text-current opacity-80 hover:opacity-100">
        {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
      </button>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div ref={containerRef} className="w-full h-[32px]" />
        <div className="flex items-center justify-between opacity-60 text-[10px] font-medium uppercase tracking-wider mt-1">
          <span>{fmt(playing ? currentTime : duration)}</span>
          <div className="flex items-center gap-2">
            {!isMobileDevice() && (
              <button onClick={toggleSpeed} className="bg-black/10 px-1.5 py-0.5 rounded-md font-bold hover:bg-black/20">{speed}x</button>
            )}
            <span className={`font-medium ${isMobileDevice() ? "text-[9px]" : "text-[10px]"}`}>{timeStr}</span>
            {mine && <MsgTick status={status} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ΓöÇΓöÇΓöÇ MsgTick ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const MsgTick = ({ status }: { status?: string }) => {
  if (status === "sending") return <svg className="w-3 h-3 opacity-40" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>;
  if (status === "sent") return (
    <svg className="w-[13px] h-[9px] opacity-40" viewBox="0 0 12 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "delivered") return (
    <svg className="w-[17px] h-[9px] opacity-40" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "read") return (
    <svg className="w-[17px] h-[9px] text-[#53bdeb]" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
};

// ΓöÇΓöÇΓöÇ RecordingVisualizer ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const RecordingVisualizer = () => (
  <div className="flex items-center gap-0.5 h-4">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 4] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        className="w-1 bg-primary rounded-full"
      />
    ))}
  </div>
);

// ΓöÇΓöÇΓöÇ MediaList (formerly FilesList) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function MediaList({ msgs, uid, downloadFile, isDarkMode, setSelectedImage }: { msgs: Msg[], uid: string | null, downloadFile: (u: string, i: string, t: string) => void, isDarkMode: boolean, setSelectedImage: (url: string) => void }) {
  const mediaMsgs = msgs.filter(m => m.type === "voice" || m.type === "image");
  if (mediaMsgs.length === 0) return <p className="text-muted-foreground text-center mt-10 text-xs">No saved media.</p>;

  const groups = mediaMsgs.reduce((acc, m) => {
    const date = m.createdAt?.toDate().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) || "Today";
    if (!acc[date]) acc[date] = [];
    acc[date].push(m);
    return acc;
  }, {} as Record<string, Msg[]>);

  return (
    <>
      {Object.entries(groups).map(([date, items]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest pl-1">{date}</h3>
          {items.map(m => (
            <div key={m.id} className="bg-card/30 border border-border/10 p-2.5 rounded-2xl flex items-center gap-4 lg:gap-6 shadow-sm hover:bg-card/50 transition-all group">
              <div className="flex-1 min-w-0">
                {m.type === "voice" ? (
                  <AudioPlayer src={m.content} id={m.id} mine={m.uid === uid} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                ) : (
                  <div className="flex items-center gap-3 p-1">
                    <img src={m.content} className="w-12 h-12 rounded-lg object-cover shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedImage(m.content)} alt="" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] font-bold truncate ${isDarkMode ? "text-white/80" : "text-black/80"}`}>Photo</div>
                      <div className="text-[10px] opacity-40 uppercase">{m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {m.type === "image" && (
                  <button
                    onClick={() => setSelectedImage(m.content)}
                    className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-all shrink-0"
                    aria-label="View photo"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => downloadFile(m.content, m.id, m.type)}
                  className="p-2.5 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-all shrink-0 shadow-sm"
                  aria-label={`Download ${m.type}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

// ΓöÇΓöÇΓöÇ OViiChat ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [inputHeight, setInputHeight] = useState(44);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("ovii_dark_mode");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("ovii_dark_mode", String(isDarkMode));
  }, [isDarkMode]);

  // -- Scroll to bottom on mount --
  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => scrollToBottom(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ΓöÇΓöÇ Viewport height: ONLY used on mobile to compensate for software keyboard ΓöÇΓöÇ
  // On desktop we let position:fixed + inset:0 do the work (no zoom whitespace).
  const [mobileKeyboardOffset, setMobileKeyboardOffset] = useState(0);

  const [deviceId] = useState(() => {
    let id = localStorage.getItem("ovii_device_id");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("ovii_device_id", id);
      localStorage.removeItem("ovii-avatar-choice");
    }
    return id;
  });

  const isReturning = !!localStorage.getItem("ovii-avatar-choice") && !!localStorage.getItem("ovii-name");
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem("ovii-avatar-choice") || "");
  const [name, setName] = useState<string>(() => localStorage.getItem("ovii-name") || "");
  const [showAvatarPicker, setShowAvatarPicker] = useState(!isReturning);
  const [inputName, setInputName] = useState(name);

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [recordingUsers, setRecordingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Msg | null>(null);
  const [showFolder, setShowFolder] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<{ uid: string, name: string, avatar?: string }[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [systemMsgs, setSystemMsgs] = useState<{ id: string, text: string, ts: number, type: "join" | "leave" }[]>([]);
  const [otherLastSeen, setOtherLastSeen] = useState<number | null>(null);
  const [otherName, setOtherName] = useState<string | null>(null);
  const [otherOnline, setOtherOnline] = useState(false);
  const [otherAvatar, setOtherAvatar] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowNoLockSubmenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [noLockUntil, setNoLockUntil] = useState<number | null>(() => {
    const saved = localStorage.getItem("ovii_no_lock_until");
    return saved ? parseInt(saved) : null;
  });
  const [showNoLockSubmenu, setShowNoLockSubmenu] = useState(false);
  const prevOnlineRef = useRef<Map<string, string>>(new Map());

  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelRecRef = useRef(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef<number>(Date.now());
  const chunksRef = useRef<Blob[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (instant = false) => {
    if (!scrollRef.current) return;
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: instant ? "instant" : "smooth",
        });
      }
    };
    scroll();
    // Second pass for reliability
    setTimeout(scroll, 50);
  };

  // ΓöÇΓöÇ Auth + presence ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  useEffect(() => {
    if (!avatar) return;
    let unsubMsgs = () => { };
    let unsubPresence = () => { };
    let alive = true;
    let heartbeatId: NodeJS.Timeout | null = null;
    let currentUid: string | null = null;

    const cleanupPresence = () => {
      if (!currentUid) return;
      deleteDoc(doc(db, "ovii", ROOM, "presence", currentUid)).catch(() => { });
    };
    const handleBeforeUnload = () => cleanupPresence();
    const handlePageHide = () => cleanupPresence();

    (async () => {
      try {
        const u = await ensureAnonAuth();
        if (!alive) return;
        currentUid = u.uid;

        const presCol = collection(db, "ovii", ROOM, "presence");
        const snap = await getDocs(presCol);
        const now = Date.now();
        for (const d of snap.docs) {
          const ts = (d.data().lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
          if (now - ts > 30_000 && d.id !== u.uid) await deleteDoc(d.ref).catch(() => { });
        }
        const fresh = await getDocs(presCol);
        const others = fresh.docs.filter((d) => d.id !== u.uid).length;
        if (others >= 2 - 0 && fresh.docs.length >= 2 && !fresh.docs.find((d) => d.id === u.uid)) {
          setError("Room is full (2/2). Try again later.");
          return;
        }

        await setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
          uid: u.uid, avatar, name, lastSeen: serverTimestamp(), typing: false, recording: false
        });
        setUid(u.uid);
        setCount(Math.min(2, fresh.docs.length + (fresh.docs.find((d) => d.id === u.uid) ? 0 : 1)));

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("pagehide", handlePageHide);

        heartbeatId = setInterval(() => {
          setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
            uid: u.uid, avatar, name, lastSeen: serverTimestamp(),
          }, { merge: true }).catch(() => { });
        }, 15_000);

        unsubPresence = onSnapshot(presCol, (s) => {
          const t: string[] = [];
          const r: string[] = [];
          const currentOnline: { uid: string, name: string, avatar?: string }[] = [];
          const currentOnlineIds = new Set<string>();
          const now = Date.now();

          s.forEach((d) => {
            const data = d.data();
            const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
            if (lastSeen > 0 && now - lastSeen > 30_000 && d.id !== u.uid) {
              deleteDoc(d.ref).catch(() => { });
              return;
            }
            currentOnline.push({ uid: d.id, name: data.name || "Unknown", avatar: data.avatar });
            currentOnlineIds.add(d.id);
            if (d.id !== u.uid) {
              if (data.typing) t.push(data.avatar);
              if (data.recording) r.push(data.avatar);
              setOtherName(data.name || "User");
              setOtherAvatar(data.avatar || null);
              setOtherLastSeen(lastSeen);
              setOtherOnline(true);
            }
          });

          if (![...currentOnlineIds].some(id => id !== u.uid)) setOtherOnline(false);

          currentOnline.forEach(user => {
            if (user.uid !== u.uid && !prevOnlineRef.current.has(user.uid)) {
              const id = crypto.randomUUID();
              setSystemMsgs(prev => [...prev, { id, text: `${user.name} is online`, ts: Date.now(), type: "join" }]);
              setTimeout(() => setSystemMsgs(prev => prev.filter(m => m.id !== id)), 6000);
            }
          });
          if (prevOnlineRef.current.size > 0) {
            prevOnlineRef.current.forEach((prevName, prevUid) => {
              if (prevUid !== u.uid && !currentOnlineIds.has(prevUid)) {
                const id = crypto.randomUUID();
                setOtherLastSeen(Date.now());
                setSystemMsgs(prev => [...prev, { id, text: `${prevName} went offline`, ts: Date.now(), type: "leave" }]);
                setTimeout(() => setSystemMsgs(prev => prev.filter(m => m.id !== id)), 6000);
              }
            });
          }
          const nextMap = new Map<string, string>();
          currentOnline.forEach(user => nextMap.set(user.uid, user.name));
          prevOnlineRef.current = nextMap;

          setOnlineUsers(currentOnline);
          setTypingUsers(t);
          setRecordingUsers(r);
          setCount(currentOnline.length);
        });

        const q = query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "asc"));
        unsubMsgs = onSnapshot(q, { includeMetadataChanges: true }, (s) => {
          const list: Msg[] = s.docs.map((d) => {
            const data = d.data() as any;
            const msg: Msg = { id: d.id, ...data };
            if (d.metadata.hasPendingWrites && msg.uid === u.uid) msg.status = "sending";
            return msg;
          });
          setMsgs(list);
          const tnow = Date.now();
          for (const m of list) {
            if (m.uid !== u.uid && m.status !== "read" && !s.metadata.hasPendingWrites) {
              setDoc(doc(db, "ovii", ROOM, "messages", m.id), { status: "read" }, { merge: true }).catch(() => { });
            }
            const ts = m.createdAt?.toMillis?.() ?? 0;
            if (!ts) continue;

            // Retention logic:
            // Text: 5 days
            // Voice/Photo: 14 days
            const limit = m.type === "text" 
              ? 5 * 24 * 60 * 60 * 1000 
              : 14 * 24 * 60 * 60 * 1000;

            if (tnow - ts > limit) {
              deleteDoc(doc(db, "ovii", ROOM, "messages", m.id)).catch(() => { });
            }
          }
        });

        return () => {
          if (heartbeatId) clearInterval(heartbeatId);
          unsubPresence();
          deleteDoc(doc(db, "ovii", ROOM, "presence", u.uid)).catch(() => { });
        };
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Connection failed");
      }
    })();

    return () => {
      alive = false;
      unsubMsgs();
      unsubPresence();
      if (heartbeatId) clearInterval(heartbeatId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
      cleanupPresence();
    };
  }, [avatar]);

  // ΓöÇΓöÇ Inactivity lock ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  useEffect(() => {
    const bump = () => { lastActivity.current = Date.now(); };
    window.addEventListener("pointerdown", bump);
    window.addEventListener("keydown", bump);
    const t = setInterval(() => {
      const now = Date.now();
      if (noLockUntil && now < noLockUntil) return; // Bypass lock
      if (now - lastActivity.current > 180_000) onLock();
    }, 5_000);
    return () => {
      window.removeEventListener("pointerdown", bump);
      window.removeEventListener("keydown", bump);
      clearInterval(t);
    };
  }, [onLock]);

  // ΓöÇΓöÇ Mobile keyboard compensation (ONLY on mobile) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  // Desktop: position:fixed + inset:0 handles everything ΓÇö no JS height needed.
  // Mobile: track visualViewport to shrink the scroll area when keyboard opens.
  useEffect(() => {
    if (!isMobileDevice()) return; // ΓåÉ desktop: skip entirely

    const vv = window.visualViewport;
    const syncKeyboard = () => {
      if (!vv) return;
      const keyboardHeight = window.innerHeight - vv.height;
      setMobileKeyboardOffset(Math.max(0, keyboardHeight));
      requestAnimationFrame(() => scrollToBottom(true));
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    vv?.addEventListener("resize", syncKeyboard);
    vv?.addEventListener("scroll", syncKeyboard);
    syncKeyboard();

    return () => {
      vv?.removeEventListener("resize", syncKeyboard);
      vv?.removeEventListener("scroll", syncKeyboard);
    };
  }, []);

  // ΓöÇΓöÇ Scroll to bottom on load and new messages ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  useEffect(() => { 
    const timer = setTimeout(() => scrollToBottom(true), 250); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { 
    const timer = setTimeout(() => scrollToBottom(false), 100); 
    return () => clearTimeout(timer);
  }, [msgs.length]);

  const setPres = (data: any) => {
    if (uid) setDoc(doc(db, "ovii", ROOM, "presence", uid), data, { merge: true }).catch(() => { });
  };

  const send = async (type: Msg["type"], content: string) => {
    if (!uid || !content) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type, content, status: "sent", createdAt: Timestamp.now() };
    if (replyingTo) {
      msgData.replyTo = {
        id: replyingTo.id,
        content: replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note"),
        avatar: replyingTo.avatar,
        name: replyingTo.name,
      };
      setReplyingTo(null);
    }
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const sendImage = async (url: string, caption?: string) => {
    if (!uid || !url) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type: "image", content: url, caption, status: "sent", createdAt: Timestamp.now() };
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const onText = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText("");

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    setIsTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setPres({ typing: false });
    requestAnimationFrame(() => inputRef.current?.focus());
    const isImageUrl = /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(v);
    if (isImageUrl) await send("image", v);
    else await send("text", v.slice(0, 5000));
    setInputHeight(44); // Reset height after send
  };

  const uploadToCloudinary = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dte6c221f");
    const res = await fetch(`https://api.cloudinary.com/v1_1/dte6c221f/auto/upload`, { method: "POST", body: formData });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error?.message || "Upload failed"); }
    const data = await res.json();
    return data.secure_url;
  };

  const onImage = async (file: File) => {
    if (!uid) return;
    if (file.size > 8 * 1024 * 1024) { setError("Image too large (max 8MB)"); return; }
    
    setIsUploading(true); // Show loader immediately
    try {
      const url = await uploadToCloudinary(file);
      await sendImage(url, ""); // Send immediately with empty caption
    } catch (e: any) { 
      setError("Image upload failed: " + (e.message || "Unknown error")); 
    } finally {
      setIsUploading(false);
    }
  };

  const clearChat = async () => {
    if (!confirm("Are you sure you want to clear all messages? This cannot be undone.")) return;
    try {
      const q = query(collection(db, "ovii", ROOM, "messages"));
      const snapshot = await getDocs(q);
      const batch = snapshot.docs.map(d => deleteDoc(doc(db, "ovii", ROOM, "messages", d.id)));
      await Promise.all(batch);
      toast.success("Chat cleared");
      setShowMenu(false);
    } catch (e) {
      toast.error("Failed to clear chat");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      if (e.clipboardData.items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = e.clipboardData.items[i].getAsFile();
        if (file) onImage(file);
        return;
      }
    }
    const pastedText = e.clipboardData.getData("text/plain")?.trim();
    if (pastedText && /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(pastedText)) {
      e.preventDefault();
      send("image", pastedText);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const url = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
    if (url && (url.includes(".gif") || url.includes("images") || url.includes("media"))) { await send("image", url); return; }
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) onImage(file);
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (cancelRecRef.current) return;
        try {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = await uploadToCloudinary(blob);
          await send("voice", url);
        } catch (e: any) { setError("Voice upload failed: " + (e.message || "Unknown error")); }
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      setPres({ recording: true });
      cancelRecRef.current = false;
      setTimeout(() => {
        if (rec.state === "recording") { rec.stop(); setRecording(false); setPres({ recording: false }); }
      }, 10 * 60 * 1000);
    } catch (e: any) { setError("Microphone permission denied"); }
  };

  const stopAndSendRec = () => {
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setPres({ recording: false });
  };

  const cancelRec = () => {
    cancelRecRef.current = true;
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setPres({ recording: false });
  };

  const downloadFile = async (url: string, id: string, type: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      const ext = type === "voice" ? "webm" : "jpg";
      a.download = `${type}-${id.slice(0, 8)}.${ext}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success("Download started");
    } catch { window.open(url, "_blank"); }
  };

  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

  // chatMsgs: Text for 5 days, Media for 7 days
  const chatMsgs = msgs.filter(m => {
    const ts = m.createdAt?.toMillis?.() ?? 0;
    if (!ts) return true; // Keep pending messages
    const age = now - ts;
    if (m.type === "text") return age < FIVE_DAYS;
    return age < SEVEN_DAYS;
  }).sort((a, b) => (a.createdAt?.toMillis?.() ?? 0) - (b.createdAt?.toMillis?.() ?? 0));

  const mediaMsgs = msgs.filter(m => m.type === "voice" || m.type === "image");
  const unreadMedia = mediaMsgs.length;

  // ΓöÇΓöÇ Root style: fixed + inset:0 on desktop, keyboard-adjusted on mobile ΓöÇΓöÇ
  const rootStyle: React.CSSProperties = isMobileDevice() && mobileKeyboardOffset > 0
    ? { paddingBottom: mobileKeyboardOffset }
    : {};

  return (
    <>
      {/*
        ARCHITECTURE:
        .ovii-chat-root     ΓåÆ position:fixed; inset:0; overflow:hidden (CSS in styles.css)
          .ovii-chat-frame  ΓåÆ desktop: centered card with max-width; mobile: full-bleed
            header          ΓåÆ shrink-0
            .ovii-body      ΓåÆ flex-1; overflow:hidden; display:flex
              .ovii-msgs-col ΓåÆ flex-1; overflow:hidden; flex-col
                scroll area ΓåÆ flex-1; overflow-y:auto; overflow-x:hidden
              .ovii-sidebar  ΓåÆ desktop only, 380px
            input bar       ΓåÆ shrink-0
      */}
      <div className={`ovii-chat-root transition-colors duration-300 ${isDarkMode ? "bg-[#0b141a]" : "bg-[#efeae2]"}`} style={rootStyle}>
        <Toaster position="top-center" />

        {/* ΓöÇΓöÇ Avatar Picker Overlay ΓöÇΓöÇ */}
        {showAvatarPicker && (
          <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-elegant text-center">
              <h2 className="text-xl font-bold mb-2">Select Your Identity</h2>
              <p className="text-xs text-muted-foreground mb-4">Enter your name and pick an avatar.</p>
              <input
                type="text"
                placeholder="Your Name"
                maxLength={20}
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-primary/40 text-center"
              />
              <div className="grid grid-cols-4 gap-4 mb-6">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    disabled={!inputName.trim()}
                    onClick={() => {
                      setAvatar(av.url);
                      setName(inputName.trim());
                      localStorage.setItem("ovii-avatar-choice", av.url);
                      localStorage.setItem("ovii-name", inputName.trim());
                      setShowAvatarPicker(false);
                    }}
                    className="rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-transparent"
                  >
                    <img src={av.url} alt={av.name} className="w-full h-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ΓöÇΓöÇ Mobile Folder Overlay ΓöÇΓöÇ */}
        <AnimatePresence>
          {showFolder && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[150] bg-background flex flex-col"
            >
              <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
                <h2 className="text-base font-bold uppercase tracking-wider flex items-center gap-2.5">
                  <Folder className="w-5 h-5 text-destructive" /> FILES
                </h2>
                <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/*
          ΓöÇΓöÇ Chat Frame ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
          Mobile:  full-bleed, height 100%
          Desktop: centered card, max-width 1440px, 20px margin, rounded, bordered
          The CSS for .ovii-chat-frame lives in styles.css (see below comment).
          We use a single wrapper ΓÇö NO duplicate ovii-chat-inner.
        */}
        <div
          className="ovii-chat-frame flex flex-col h-full w-full"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* ΓöÇΓöÇ Header ΓöÇΓöÇ */}
          <header className={`h-[64px] px-3 flex items-center justify-between z-[60] shrink-0 shadow-sm ${isDarkMode ? "bg-[#202c33] border-b border-white/5 text-white" : "bg-white border-b border-black/5 text-black"}`}>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full overflow-hidden border border-black/5 bg-muted shadow-sm">
                {otherAvatar ? (
                  <img src={otherAvatar} alt="" className="w-full h-full object-cover" />
                ) : avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover opacity-40 grayscale" />
                ) : null}
              </div>
              <div>
                <div className="font-bold text-[14px] leading-tight">
                  {otherName || (count > 1 ? "Ovii User" : "Waiting...") || "Waiting..."}
                </div>
                <div className="text-[10px] opacity-60 flex items-center gap-1.5 font-medium">
                  {recordingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Recording...</span>
                  ) : typingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Typing...</span>
                  ) : otherOnline ? (
                    <span className="text-emerald-500">online</span>
                  ) : otherName ? (
                    "offline"
                  ) : (
                    "no one else here"
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {noLockUntil && Date.now() < noLockUntil && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  <ShieldOff className="w-3 h-3" />
                  <span>No Lock: {Math.ceil((noLockUntil - Date.now()) / 60000)}m left</span>
                </div>
              )}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => { window.location.href = "/news"; }}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title="Switch to News"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
              <button
                onClick={onLock}
                className={`ml-1 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all border ${isDarkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-black/80"
                  }`}
              >
                Lock
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={`p-2 rounded-full transition-colors relative ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                    } ${showMenu ? (isDarkMode ? "bg-white/10" : "bg-black/10") : ""}`}
                  title="Menu"
                >
                  <MoreVertical className="w-5 h-5" />
                  {unreadMedia > 0 && <span className="absolute top-1 right-1 bg-[#25d366] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">{unreadMedia}</span>}
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-elegant z-50 overflow-hidden border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/5"
                        }`}
                    >
                      <div className="py-1">
                        <button
                          onClick={() => { setShowFolder(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                            }`}
                        >
                          <Folder className="w-4 h-4 text-destructive" />
                          <div className="flex-1 text-left font-medium">Files</div>
                          {unreadMedia > 0 && <span className="bg-[#25d366] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadMedia}</span>}
                        </button>

                        <div className={`h-px mx-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        {!showNoLockSubmenu ? (
                          <button
                            onClick={() => setShowNoLockSubmenu(true)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                              }`}
                          >
                            <ShieldOff className="w-4 h-4 text-primary" />
                            <div className="flex-1 text-left font-medium">No Lock</div>
                            {noLockUntil && Date.now() < noLockUntil ? (
                              <span className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">Active</span>
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 opacity-40" />
                            )}
                          </button>
                        ) : (
                          <div className="py-1">
                            <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? "text-white" : "text-black"}`}>Select Duration</div>
                            {[
                              { label: "15 Minutes", val: 15 * 60 * 1000 },
                              { label: "1 Hour", val: 60 * 60 * 1000 },
                              { label: "5 Hours", val: 5 * 60 * 60 * 1000 },
                              { label: "24 Hours", val: 24 * 60 * 60 * 1000 },
                            ].map((d) => (
                              <button
                                key={d.label}
                                onClick={() => {
                                  const until = Date.now() + d.val;
                                  setNoLockUntil(until);
                                  localStorage.setItem("ovii_no_lock_until", until.toString());
                                  setShowMenu(false);
                                  setShowNoLockSubmenu(false);
                                  toast.success(`No Lock enabled for ${d.label}`);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/80" : "hover:bg-black/5 text-black/70"
                                  }`}
                              >
                                <Clock className="w-3.5 h-3.5 opacity-60" />
                                <span className="font-medium">{d.label}</span>
                              </button>
                            ))}
                            {noLockUntil && (
                              <button
                                onClick={() => {
                                  setNoLockUntil(null);
                                  localStorage.removeItem("ovii_no_lock_until");
                                  setShowMenu(false);
                                  setShowNoLockSubmenu(false);
                                  toast.info("No Lock disabled");
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-destructive hover:bg-destructive/5 transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="font-bold">Turn off No Lock</span>
                              </button>
                            )}
                            <button
                              onClick={() => setShowNoLockSubmenu(false)}
                              className={`w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-black"}`}
                            >
                              ΓåÉ Back
                            </button>
                          </div>
                        )}

                        <div className={`h-px mx-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        <button
                          onClick={clearChat}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-destructive/10 text-destructive" : "hover:bg-destructive/5 text-destructive"
                            }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <div className="flex-1 text-left font-medium">Clear Chat</div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* ΓöÇΓöÇ Body: messages col + optional desktop sidebar ΓöÇΓöÇ */}
          <div className="flex-1 flex min-h-0 overflow-hidden">

            {/* ΓöÇΓöÇ Messages column ΓöÇΓöÇ */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

              {/* Floating join/leave toasts */}
              <AnimatePresence>
                {systemMsgs.length > 0 && (
                  <motion.div
                    key="toast-stack"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
                  >
                    {systemMsgs.slice(-1).map(sm => (
                      <div key={sm.id} className={`text-[11px] font-bold px-4 py-1.5 rounded-full backdrop-blur-xl shadow-elegant border ${sm.type === "join"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-muted/60 text-muted-foreground border-border/30"
                        }`}>
                        {sm.type === "join" ? "≡ƒƒó" : "ΓÜ½"} {sm.text}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll area ΓÇö overflow-x:hidden prevents horizontal bleed from drag */}
              <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-stretch touch-pan-y relative bg-[#0b141a] premium-scrollbar"
                style={{ overscrollBehavior: "contain", overflowX: "hidden" }}
                onScroll={(e) => {
                  const t = e.currentTarget;
                  setShowScrollDown(t.scrollHeight - t.scrollTop > t.clientHeight + 80);
                }}
              >
                <div className="flex-1" />

                {error && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3 mb-3">{error}</div>}
                {!error && chatMsgs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm my-auto">
                    <div><div className="text-4xl mb-2">≡ƒæï</div>No messages yet.</div>
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-end shrink-0 relative px-[10px] pt-[12px] pb-[90px] gap-[4px]">
                  <AnimatePresence>
                    {chatMsgs.map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      return (
                        <div key={m.id} className={`w-full flex ${mine ? "justify-end" : "justify-start"} ${!isConsecutive ? "mt-4" : "mt-0"}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-end gap-2 max-w-[78%] ${mine ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <div className="w-8 shrink-0">
                              {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full object-cover shadow-sm" alt="" />}
                            </div>

                            <div className={`flex-1 min-w-0 flex flex-col ${mine ? "items-end" : "items-start"}`}>
                              {!mine && !isConsecutive && m.name && (
                                <span className="text-[12px] font-bold text-muted-foreground/60 ml-2 mb-1 uppercase tracking-wider">{m.name}</span>
                              )}

                              <div className={`relative px-[14px] py-[10px] rounded-[18px] shadow-sm w-fit max-w-full ${
                                mine 
                                  ? (isDarkMode ? "bg-[#005c4b] text-[#e9edef]" : "bg-[#dcf8c6] text-[#111b21]") + (isLastInGroup ? " rounded-br-[4px]" : "")
                                  : (isDarkMode ? "bg-[#202c33] text-[#e9edef]" : "bg-white text-[#111b21]") + (isLastInGroup ? " rounded-bl-[4px]" : "")
                              }`}>
                                {m.type === "voice" ? (
                                  <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                                ) : m.type === "image" ? (
                                  <div className="flex flex-col gap-2">
                                    <div className="rounded-[12px] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(m.content)}>
                                      <img src={m.content} alt="" className="max-w-full h-auto object-cover max-h-[300px]" />
                                    </div>
                                    {m.caption && <p className="text-[16px] leading-[1.45]">{m.caption}</p>}
                                    <div className="flex items-center justify-end gap-1.5 opacity-60 text-[10px] mt-1">
                                      {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                      {mine && <MsgTick status={m.status} />}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <p className="text-[16px] leading-[1.45] break-words whitespace-pre-wrap">{m.content}</p>
                                    <div className="flex items-center justify-end gap-1.5 opacity-60 text-[10px] mt-1">
                                      {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                      {mine && <MsgTick status={m.status} />}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Scroll-to-bottom button */}
              <AnimatePresence>
                {showScrollDown && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-20 flex items-center gap-1 px-3 text-xs font-bold"
                  >
                    New message Γåô
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Input bar */}

              <footer className="shrink-0 p-2 pb-safe z-[60] relative">
                <div className="flex items-end gap-2 max-w-5xl mx-auto">
                  <div className="flex-1 flex items-end bg-[#202c33] rounded-[24px] min-h-[48px] px-3 py-1.5 shadow-sm">
                    <button 
                      onClick={() => fileRef.current?.click()}
                      className="p-2 text-[#8696a0] hover:text-white transition-colors"
                    >
                      <ImageIcon className="w-6 h-6" />
                    </button>
                    <textarea
                      rows={1}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          onText();
                          e.currentTarget.style.height = 'auto';
                        }
                      }}
                      placeholder="Message"
                      className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] text-white py-2 px-2 resize-none max-h-[120px] overflow-y-auto premium-scrollbar leading-[1.45] placeholder-[#8696a0]"
                    />
                  </div>
                  <button
                    onClick={recording ? stopAndSendRec : (text.trim() ? onText : startRec)}
                    className="w-[48px] h-[48px] rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all shrink-0"
                  >
                    {recording ? <XCircle className="w-6 h-6 animate-pulse" /> : (text.trim() ? <Send className="w-6 h-6" /> : <Mic className="w-6 h-6" />)}
                  </button>
                </div>
              </footer>

            {/* ΓöÇΓöÇ Desktop Sidebar (hidden on mobile via CSS/Tailwind) ΓöÇΓöÇ */}
            <AnimatePresence>
              {showFolder && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 380, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="hidden lg:flex flex-col border-l border-border/40 bg-muted/5 relative overflow-hidden shrink-0"
                >
                  <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/40 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-destructive" /> FILES
                    </h2>
                    <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-background/60 hover:bg-background text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                    <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>{/* end msgs-col */}
          </div>{/* end body */}
        </div>{/* end ovii-chat-frame */}
      </div>{/* end ovii-chat-root */}

      {/* ΓöÇΓöÇ Full Image Preview Overlay ΓöÇΓöÇ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => downloadFile(selectedImage, "preview", "image")}
              className="absolute top-[75px] right-5 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
            >
              <Download className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="" 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

```

---

## File: src\components\novario\ArticleTimeline.tsx

```tsx
import React from "react";
import { Calendar, Briefcase, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

// Career milestone keywords that indicate a major life/career event
const MILESTONE_KEYWORDS = [
  "joined", "founded", "co-founded", "started", "left", "resigned", "appointed",
  "became CEO", "became president", "launched", "established", "acquired",
  "merged", "partnered", "signed", "released", "debuted", "retired", "won",
  "received", "awarded", "graduated", "enrolled"
];

// Company/org patterns — capitalized proper nouns after milestone keywords
const COMPANY_REGEX = /(?:joined|worked at|worked for|co-founded|founded|left|CEO of|president of|head of|signed with|acquired by)\s+([A-Z][a-zA-Z0-9.&' -]{2,30})/;

export function ArticleTimeline({ paragraphs }: { paragraphs: string[] }) {
  const { t } = useTranslation();

  const isMilestoneParagraph = (text: string): boolean => {
    const lower = text.toLowerCase();
    return MILESTONE_KEYWORDS.some(kw => lower.includes(kw));
  };

  const parseParagraph = (text: string, index: number) => {
    const trimmed = text.trim();
    const yearMatch = trimmed.match(/\b(19\d{2}|20\d{2})\b/);
    const companyMatch = trimmed.match(COMPANY_REGEX);
    const isMilestone = isMilestoneParagraph(trimmed);
    const showBento = isMilestone && (!!yearMatch || !!companyMatch);

    // Detect Wikipedia section headers like "Breakthrough (2019–2023)" or "Early life" or "Career"
    // Heuristic: short (< 80 chars), no sentence-ending punctuation, possibly has (YYYY–YYYY)
    const isSectionHeader =
      trimmed.length < 80 &&
      !trimmed.endsWith(".") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(";") &&
      index > 0 &&
      /^[A-Z]/.test(trimmed);

    // First paragraph: drop-cap intro
    if (index === 0) {
      return (
        <p key={index} className="mb-10 leading-[1.9] text-foreground/90 md:text-xl font-serif text-balance first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:-mt-2 first-letter:leading-none first-letter:text-primary">
          {t(trimmed)}
        </p>
      );
    }

    // Beautiful Section Header
    if (isSectionHeader) {
      // Extract year range if present: e.g. "(2019–2023)"
      const yearRange = trimmed.match(/\((\d{4}[–\-–]\d{4}|\d{4}[–\-–]present)\)/);
      const headingText = trimmed.replace(/\(.*?\)/, "").trim();
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 my-10"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
          <div className="flex flex-col items-center text-center shrink-0">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(135deg, #f9a825, #e65c00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(headingText)}
            </h2>
            {yearRange && (
              <span className="mt-1 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest border border-primary/20">
                {yearRange[1]}
              </span>
            )}
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-primary/60 via-primary/20 to-transparent" />
        </motion.div>
      );
    }

    // Normal paragraph (no milestone)
    if (!showBento) {
      return (
        <p key={index} className="mb-8 leading-[1.9] text-foreground/80 md:text-xl font-serif tracking-wide text-balance">
          {t(trimmed)}
        </p>
      );
    }

    // Bento Box — only for genuine milestones
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="my-12 group"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-white/5 shadow-2xl p-8 md:p-12 hover:border-primary/30 transition-all duration-500">

          {/* Ambient glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/40 transition-colors duration-700 pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px] group-hover:bg-gold/30 transition-colors duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8 border-b border-white/10 pb-6">

              {yearMatch && (
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {t("Year")}
                  </span>
                  <span
                    className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      background: "linear-gradient(135deg, #f9a825, #e65c00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {yearMatch[0]}
                  </span>
                </div>
              )}

              {companyMatch && (
                <div className="md:ml-auto flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-xl group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{t("Involvement")}</div>
                    <div className="text-lg font-black text-foreground">{t(companyMatch[1].trim())}</div>
                  </div>
                </div>
              )}

              {!yearMatch && isMilestone && (
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> {t("Career Milestone")}
                </span>
              )}
            </div>

            <p className="leading-[1.9] text-foreground/90 md:text-xl font-serif text-balance">
              {t(text)}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="py-4">
      {paragraphs.map((p, i) => parseParagraph(p, i))}
    </div>
  );
}


```

---

## File: src\components\novario\BottomNav.tsx

```tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/lib/i18n";

export function BottomNav() {
  const [joined, setJoined] = useState(false);
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <Link to="/news" className="serif text-2xl font-extrabold mb-3 inline-block">
              Nov<span className="text-primary">a</span>rio
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mt-2">
              {t("Independent journalism for a connected India. Premium reporting from newsrooms in 14 cities.")}
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">{t("Sections")}</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/news" search={{ cat: "India" }} className="hover:text-foreground">{t("India")}</Link></li>
              <li><Link to="/news" search={{ cat: "World" }} className="hover:text-foreground">{t("World")}</Link></li>
              <li><Link to="/news" search={{ cat: "Business" }} className="hover:text-foreground">{t("Business")}</Link></li>
              <li><Link to="/news" search={{ cat: "Tech" }} className="hover:text-foreground">{t("Tech")}</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">{t("Company")}</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">{t("About")}</Link></li>
              <li><Link to="/newsroom" className="hover:text-foreground">{t("Newsroom")}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">{t("Contact")}</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="font-bold mb-3">{t("Subscribe")}</div>
            <p className="text-xs text-muted-foreground mb-3">{t("Daily briefing, 7am IST.")}</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setJoined(true); }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-xs min-w-0"
                placeholder="you@email.com"
              />
              <button className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shrink-0">
                {joined ? "✓" : t("Join")}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span>© 2026 Novario Media Pvt. Ltd.</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase border border-primary/20">
              {t("100% Authentic")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-foreground cursor-pointer">{t("Terms")}</Link>
            <Link to="/privacy" className="hover:text-foreground cursor-pointer">{t("Privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

```

---

## File: src\components\novario\BreakingTicker.tsx

```tsx
import { useEffect, useState } from "react";
import { BREAKING } from "@/lib/news";
import { getNews } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";

export function BreakingTicker() {
  const [items, setItems] = useState<string[]>(BREAKING);
  const { t } = useTranslation();

  useEffect(() => {
    let alive = true;
    getNews("Top")
      .then((res) => {
        if (!alive) return;
        const live = res.articles.slice(0, 8).map((a) => a.title);
        if (live.length >= 3) setItems(live);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const loop = [...items, ...items];
  return (
    <div className="flex items-stretch border-y border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 bg-breaking px-4 py-2 text-breaking-foreground font-bold text-xs uppercase tracking-wider shrink-0">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
        {t("Breaking")}
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap py-2 animate-ticker">
          {loop.map((tText, i) => (
            <span key={i} className="text-sm text-foreground/90">
              <span className="text-breaking mr-2">●</span>
              {t(tText)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

```

---

## File: src\components\novario\CategoryGrid.tsx

```tsx
import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ARTICLES, CATEGORIES, type Article } from "@/lib/news";
import { getNews, type RemoteArticle } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

type Item = Pick<Article, "id" | "slug" | "title" | "excerpt" | "image" | "category" | "author" | "publishedAt">;

export function CategoryGrid({
  initial = "Top",
  articles,
  categories,
}: {
  initial?: string;
  articles?: Item[];
  categories?: string[];
}) {
  const [active, setActive] = useState<string>(initial);
  const [page, setPage] = useState(1);
  const [extra, setExtra] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => { 
    setActive(initial); 
    setPage(1); 
    setExtra([]); 
  }, [initial]);

  useEffect(() => {
    setPage(1);
    setExtra([]);
  }, [active]);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const { articles: res } = await getNews(active, nextPage);
      if (res.length > 0) {
        setExtra((prev) => [...prev, ...res]);
      }
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const source: Item[] = articles ?? ARTICLES;
  const cats = categories ?? (CATEGORIES as unknown as string[]);
  const baseList = active === "Top" || cats.length === 1 ? source : source.filter((a) => a.category === active);
  const list = [...baseList, ...extra];

  return (
    <section>
      {cats.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-5 border-b border-border">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                active === c ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(c)}
              {active === c && (
                <motion.span layoutId="cat-underline" className="absolute inset-x-2 -bottom-px h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((a) => (
          <Link
            key={a.id}
            to="/news/$slug"
            params={{ slug: a.slug }}
            className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <div className="text-xs text-primary font-bold uppercase tracking-wider">{t(a.category)}</div>
              <h3 className="mt-2 serif text-lg font-bold leading-snug text-balance line-clamp-2">{t(a.title)}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{t(a.excerpt)}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">{a.author}</span>
                <span>•</span><span>{a.publishedAt}</span>
              </div>
            </div>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">{t("No stories in this section yet.")}</div>
        )}
      </div>

      {list.length > 0 && (
        <div className="mt-8 py-8 flex justify-center">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t("Loading...")}
              </>
            ) : (
              t("Load More News")
            )}
          </button>
        </div>
      )}
    </section>
  );
}

```

---

## File: src\components\novario\Header.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { WeatherWidget } from "./WeatherWidget";
import { LiveCounter } from "./LiveCounter";
import { LanguageMenu } from "./LanguageMenu";
import { useTranslation } from "@/lib/i18n";

const NAV: { label: string; cat?: string }[] = [
  { label: "Home" },
  { label: "India", cat: "India" },
  { label: "World", cat: "World" },
  { label: "Business", cat: "Business" },
  { label: "Tech", cat: "Tech" },
  { label: "Sports", cat: "Sports" },
];

export function Header() {
  const [today, setToday] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const searchCat = useRouterState({ select: (s) => {
    try {
      const params = new URLSearchParams(s.location.searchStr);
      return params.get("cat") || undefined;
    } catch { return undefined; }
  }});
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Determine which nav item is active
  const getActiveLabel = () => {
    if (pathname !== "/news" && pathname !== "/news/") return undefined;
    if (!searchCat) return "Home";
    return searchCat;
  };
  const activeLabel = getActiveLabel();

  useEffect(() => {
    setToday(new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="flex items-center justify-between gap-4 py-2 text-xs text-muted-foreground border-b border-border/60 min-w-0">
          <div suppressHydrationWarning className="truncate">{today || "\u00A0"}</div>
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <div className="hidden md:flex items-center gap-6">
              <LiveCounter />
              <WeatherWidget />
            </div>
            <LanguageMenu />
          </div>
        </div>

        {/* Loading progress bar */}
        {isLoading && (
          <div className="absolute left-0 right-0 top-full h-0.5 z-50 overflow-hidden">
            <div className="h-full w-1/3 bg-primary rounded-full animate-loading-bar" />
          </div>
        )}

        <div className="flex items-center justify-between py-4 min-w-0 gap-2">
          <Link to="/news" className="flex items-baseline gap-2 shrink-0">
            <span className="serif text-3xl md:text-4xl font-extrabold tracking-tight">
              Nov<span className="text-primary">a</span>rio
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">News</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV.map((n) => {
              const isActive = activeLabel === n.label;
              return (
                <Link
                  key={n.label}
                  to="/news"
                  search={{ cat: n.cat }}
                  className={`relative py-1 transition-all duration-200 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {t(n.label)}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center rounded-full border border-border overflow-hidden focus-within:border-primary/50 transition-colors h-9">
              <span className="pl-3 text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input
                type="text"
                placeholder={t("Search...")}
                className="bg-transparent border-none focus:outline-none px-2 w-32 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = e.currentTarget.value.trim();
                    if (q) navigate({ to: "/news", search: { cat: q } });
                  }
                }}
              />
            </div>
            <button
              onClick={() => alert("Subscribe feature coming soon!")}
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
            >
              {t("Subscribe")}
            </button>
          </div>
        </div>
        {/* Mobile category nav with active glow */}
        <nav className="md:hidden flex items-center gap-4 overflow-x-auto scrollbar-hide pb-3 text-sm font-medium">
          {NAV.map((n) => {
            const isActive = activeLabel === n.label;
            return (
              <Link
                key={n.label}
                to="/news"
                search={{ cat: n.cat }}
                className={`relative shrink-0 pb-1 transition-all duration-200 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {t(n.label)}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

```

---

## File: src\components\novario\HeroSlider.tsx

```tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES, type Article } from "@/lib/news";
import { useTranslation } from "@/lib/i18n";

type Slide = Pick<Article, "id" | "slug" | "title" | "excerpt" | "image" | "category" | "author" | "publishedAt" | "readTime">;

export function HeroSlider({ articles }: { articles?: Slide[] }) {
  const slides: Slide[] = (articles && articles.length > 0 ? articles : ARTICLES).slice(0, 5);
  const [i, setI] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const s = slides[i];

  return (
    <div className="relative h-[62vh] min-h-[420px] max-h-[640px] w-full overflow-hidden rounded-2xl shadow-elegant">
      <AnimatePresence mode="sync">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img src={s.image} alt={s.title} loading="eager" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <motion.div key={s.id + "-t"} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {t(s.category)}
          </span>
          <Link to="/news/$slug" params={{ slug: s.slug }} className="block mt-3 hover:opacity-90">
            <h1 className="serif text-2xl md:text-5xl font-bold text-white text-balance max-w-3xl leading-tight">
              {t(s.title)}
            </h1>
          </Link>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/80 line-clamp-2">{t(s.excerpt)}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
            <span>{s.author}</span><span>•</span><span>{s.publishedAt}</span><span>•</span><span>{s.readTime} {t("min read")}</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 flex gap-2">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-3 bg-white/40"}`}
            aria-label={`Slide ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

```

---

## File: src\components\novario\LanguageMenu.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES } from "@/lib/languages";
import { useTranslation } from "@/lib/i18n";

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState("English · India");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 320 });
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const { setLang, lang } = useTranslation();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Sync initial language label on mount
  useEffect(() => {
    if (lang === "en") return;
    const l = LANGUAGES.find(x => x.code.startsWith(lang));
    if (l) setCurrent(l.region ? `${l.native} · ${l.region}` : l.native);
  }, [lang]);

  const updatePos = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const dropW = Math.min(320, vw - 16);
      let left = rect.right - dropW;
      left = Math.max(8, Math.min(left, vw - dropW - 8));
      setDropdownPos({ top: rect.bottom + 8, left, width: dropW });
    }
  };

  useEffect(() => {
    if (open) {
      updatePos(); // just in case
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
    }
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open]);

  const handleToggle = () => {
    if (!open) {
      updatePos();
    }
    setOpen((o) => !o);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.native.toLowerCase().includes(q) ||
        l.english.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q),
    );
  }, [query]);

  const onPick = (code: string, label: string) => {
    if (code === "zulad") {
      setOpen(false);
      window.dispatchEvent(new Event("open-ovii"));
      return;
    }
    setCurrent(label);
    setLang(code);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/50 transition-colors"
        aria-label="Choose language"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
        <span className="font-medium">{current}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropRef}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
                zIndex: 99999,
              }}
              className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden"
            >
              <div className="p-3 border-b border-border">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search languages…"
                  className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {filtered.map((l) => {
                  const label = l.region ? `${l.native} · ${l.region}` : l.native;
                  return (
                    <button
                      key={l.code}
                      onClick={() => onPick(l.code, label)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted/40 flex items-center justify-between gap-3"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="font-medium truncate block">{l.native}</span>
                        {l.region && (
                          <span className="text-xs text-muted-foreground">{l.english} · {l.region}</span>
                        )}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                        {l.code === "zulad" ? "" : l.code}
                      </span>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">No matches.</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

```

---

## File: src\components\novario\LiveCounter.tsx

```tsx
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

export function LiveCounter() {
  const [n, setN] = useState<number | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    setN(8400 + Math.floor(Math.random() * 3000));
    const timer = setInterval(() => setN((v) => (v ?? 9000) + Math.floor(Math.random() * 7) - 2), 1800);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-breaking opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-breaking" />
      </span>
      <span className="font-semibold tabular-nums">{n?.toLocaleString() ?? "—"}</span>
      <span className="text-muted-foreground">{t("reading now")}</span>
    </div>
  );
}

```

---

## File: src\components\novario\LiveIllustration.tsx

```tsx
import { motion } from "framer-motion";

export function LiveIllustration({ category }: { category?: string }) {
  const colors = {
    Tech: "rgba(59, 130, 246, 0.15)",
    Business: "rgba(16, 185, 129, 0.15)",
    World: "rgba(245, 158, 11, 0.15)",
    Sports: "rgba(239, 68, 68, 0.15)",
    Entertainment: "rgba(236, 72, 153, 0.15)",
    Science: "rgba(14, 165, 233, 0.15)",
    Health: "rgba(20, 184, 166, 0.15)",
    default: "rgba(139, 92, 246, 0.15)"
  };
  
  const color = colors[category as keyof typeof colors] || colors.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ background: `linear-gradient(to bottom, ${color}, transparent 60%)` }}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

```

---

## File: src\components\novario\OViiChat.tsx

```tsx
import { useEffect, useRef, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs, writeBatch
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Image as ImageIcon, Send, Trash2, Folder, Reply, Download, X, Play, Pause, XCircle, ArrowLeftRight, ChevronDown, ChevronLeft, Sun, Moon, MoreVertical, ShieldOff, Clock, RotateCw, Phone, CheckCircle2, AlertCircle, Info, Pencil, Users2 } from "lucide-react";
import WaveSurfer from "wavesurfer.js";

// ─── Link Preview ────────────────────────────────────────────────────────────
const LinkPreview = ({ url, isDarkMode }: { url: string, isDarkMode: boolean }) => {
  const [preview, setPreview] = useState<{ title?: string; description?: string; image?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const fetchMetadata = async () => {
      try {
        // Try Microlink first - excellent for social media (Instagram, Reels, etc.)
        const microRes = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        if (microRes.ok) {
          const data = await microRes.json();
          if (alive && data.status === "success") {
            setPreview({
              title: data.data.title,
              description: data.data.description,
              image: data.data.image?.url || data.data.logo?.url || data.data.screenshot?.url
            });
            setLoading(false);
            return;
          }
        }

        // Fallback to manual parsing via allorigins
        const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxy);
        if (!res.ok) throw new Error("Fetch failed");
        const html = await res.text();

        if (!alive) return;

        const getMeta = (prop: string) => {
          const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["'](?:og:|twitter:)?${prop}["'][^>]+content=["']([^"']+)["']`, 'i'))
            || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:|twitter:)?${prop}["']`, 'i'));
          return match?.[1] || "";
        };

        const title = (getMeta("title") || html.match(/<title>([^<]+)<\/title>/i)?.[1] || "").trim();
        const description = (getMeta("description") || "").trim();
        const image = getMeta("image");

        if (title || description || image) {
          setPreview({ title, description, image });
        }
      } catch (e) {
        // Silently fail for previews
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchMetadata();
    return () => { alive = false; };
  }, [url]);

  if (loading) return (
    <div className={`mt-2 rounded-xl p-2 border animate-pulse flex gap-3 mb-2 ${isDarkMode ? "bg-black/20 border-white/5" : "bg-black/5 border-black/5"}`}>
      <div className="w-12 h-12 rounded-lg bg-muted/40 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 bg-muted/40 rounded" />
        <div className="h-2 w-full bg-muted/40 rounded" />
      </div>
    </div>
  );
  if (!preview) return null;

  return (
    <motion.a
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block mt-2 mb-1 rounded-xl overflow-hidden border transition-all hover:brightness-110 active:scale-[0.98] group/link ${isDarkMode ? "bg-[#0b141a]/60 border-white/5" : "bg-black/5 border-black/10"
        } no-underline max-w-[280px] sm:max-w-[320px]`}
    >
      {preview.image && (
        <div className="relative aspect-[1.91/1] overflow-hidden">
          <img src={preview.image} alt="" className="w-full h-full object-cover transition-transform group-hover/link:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="p-2.5">
        <div className={`text-[12px] font-bold truncate leading-tight ${isDarkMode ? "text-[#e9edef]" : "text-[#111b21]"}`}>{preview.title || "Link"}</div>
        {preview.description && <div className={`text-[10px] line-clamp-2 mt-1 opacity-70 leading-normal ${isDarkMode ? "text-white" : "text-black"}`}>{preview.description}</div>}
        <div className="flex items-center gap-1 mt-2 opacity-40">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
          <span className="text-[9px] font-bold uppercase tracking-widest truncate">
            {(() => {
              try { return new URL(url).hostname; }
              catch { return "Link"; }
            })()}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  name?: string;
  type: "text" | "image" | "voice";
  content: string;
  caption?: string;
  createdAt?: Timestamp;
  status?: "sending" | "sent" | "delivered" | "read";
  replyTo?: { id: string, content: string, avatar: string, name?: string };
  isEdited?: boolean;
  isDeleted?: boolean;
  deletedFor?: string[];
};

const ROOM = "ovii-room";
const STOP_AUDIO_EVENT = "ovii_stop_audio";

// ─── Detect if we're on a touch/mobile device ───────────────────────────────
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const formatMessageDate = (date: Date) => {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString(undefined, { weekday: 'long' });
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatLastSeen = (timestamp: number | null | undefined) => {
  if (!timestamp) return "";
  const now = Date.now();

  const date = new Date(timestamp);
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const isToday = date.toDateString() === new Date().toDateString();
  const isYesterday = date.toDateString() === new Date(Date.now() - 86400000).toDateString();
  
  const dayStr = isToday ? "today" : isYesterday ? "yesterday" : 
                 date.toLocaleDateString(undefined, { day: "numeric", month: "short" });

  return `last seen ${dayStr} at ${timeStr}`;
};

// ─── AudioPlayer ─────────────────────────────────────────────────────────────
const AudioPlayer = ({ src, id, mine, status, createdAt, isDarkMode }: { src: string, id: string, mine: boolean, status?: string, createdAt?: any, isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // WaveSurfer needs a bit of time to ensure container has dimensions
    let ws: WaveSurfer | null = null;

    const init = () => {
      try {
        ws = WaveSurfer.create({
          container: containerRef.current!,
          waveColor: isDarkMode ? "#3b4a54" : "#d1d7db",
          progressColor: isDarkMode ? "#34b7f1" : "#34b7f1",
          cursorWidth: 0,
          barWidth: 2,
          barGap: 3,
          barRadius: 4,
          height: 32,
          normalize: true,
          interact: true,
          hideScrollbar: true,
        });

        ws.on("ready", () => {
          setDuration(ws!.getDuration());
          setIsReady(true);
          setHasError(false);
        });

        ws.on("audioprocess", () => setCurrentTime(ws!.getCurrentTime()));
        ws.on("finish", () => { setPlaying(false); setCurrentTime(ws!.getDuration()); });
        ws.on("error", (err) => {
          console.error("WaveSurfer error:", err);
          setHasError(true);
        });

        ws.load(src);
        waveRef.current = ws;
      } catch (err) {
        console.error("WaveSurfer init error:", err);
        setHasError(true);
      }
    };

    // Use ResizeObserver to handle container size changes which can cause blank canvas
    const observer = new ResizeObserver(() => {
      if (ws && isReady) {
        // WaveSurfer 7 handles resize automatically but we can trigger redraw if needed
      }
    });
    observer.observe(containerRef.current);

    init();

    const stopOthers = (e: any) => {
      if (e.detail !== id && ws?.isPlaying()) { ws.pause(); setPlaying(false); }
    };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);

    return () => {
      window.removeEventListener(STOP_AUDIO_EVENT, stopOthers);
      observer.disconnect();
      if (ws) ws.destroy();
    };
  }, [src, id, isDarkMode]);

  const toggle = () => {
    if (!waveRef.current) return;
    if (playing) { waveRef.current.pause(); }
    else { window.dispatchEvent(new CustomEvent(STOP_AUDIO_EVENT, { detail: id })); waveRef.current.play(); }
    setPlaying(!playing);
  };

  const toggleSpeed = () => {
    if (!waveRef.current) return;
    const next = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    waveRef.current.setPlaybackRate(next);
    setSpeed(next);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss < 10 ? "0" : ""}${ss}`;
  };

  const timeStr = createdAt?.toDate?.()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "";

  return (
    <div className={`flex items-center gap-3 w-full p-3.5 rounded-[22px] overflow-hidden transition-all min-w-[280px] ${mine
      ? (isDarkMode ? "bg-[#005c4b] text-white" : "bg-[#dcf8c6] text-black")
      : (isDarkMode ? "bg-[#202c33] text-white" : "bg-white text-black")
      }`}>
      <div className="relative shrink-0">
        <button
          onClick={toggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 hover:bg-black/5 ${isDarkMode ? "text-white" : "text-[#54656f]"
            }`}
        >
          {playing ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </button>
        <div className={`absolute bottom-0 right-0 w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 ${isDarkMode ? "bg-[#202c33] border-[#005c4b]" : "bg-white border-[#dcf8c6]"
          }`}>
          <Mic className="w-3 h-3 text-[#00a884] fill-[#00a884]/10" />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="relative w-full" style={{ height: 32 }}>
          <div
            className={`w-full transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
            style={{ height: 32, overflow: "hidden" }}
            ref={containerRef}
          />
          {!isReady && !hasError && (
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="w-full flex items-center gap-1 h-full opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={`flex-1 bg-current rounded-full`} style={{ height: `${Math.random() * 60 + 20}%` }} />
                ))}
              </div>
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-start text-[10px] opacity-40 italic">
              Failed to load waveform
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-0.5 mt-1.5 gap-2">
          <div className="flex items-center gap-2 min-w-0 opacity-60">
            <span className="text-[10px] font-normal tabular-nums whitespace-nowrap">
              {fmt(playing ? currentTime : duration)}
            </span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2.5 shrink-0">
            {timeStr && (
              <span className="text-[11px] font-['Inter'] font-extralight uppercase tracking-tight whitespace-nowrap truncate opacity-40 mr-1">
                {timeStr}
              </span>
            )}
            <button
              onClick={toggleSpeed}
              className={`text-[9px] font-normal h-5 px-2 rounded-full border transition-all active:scale-90 flex items-center justify-center shrink-0 ${isDarkMode
                ? "bg-white/10 border-white/5 text-white/80 hover:bg-white/20"
                : "bg-black/5 border-black/5 text-black/70 hover:bg-black/10"
                }`}
            >
              {speed}x
            </button>
            {mine && (
              <div className="opacity-50 shrink-0 scale-90">
                <MsgTick status={status} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MsgTick ─────────────────────────────────────────────────────────────────
const MsgTick = ({ status }: { status?: string }) => {
  if (status === "sending") return <svg className="w-3 h-3 opacity-40" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>;
  if (status === "sent") return (
    <svg className="w-[13px] h-[9px] opacity-40" viewBox="0 0 12 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "delivered") return (
    <svg className="w-[17px] h-[9px] opacity-40" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "read") return (
    <svg className="w-[17px] h-[9px] text-[#53bdeb]" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
};

// ─── RecordingVisualizer ──────────────────────────────────────────────────────
const RecordingVisualizer = () => (
  <div className="flex items-center gap-0.5 h-4">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 4] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        className="w-1 bg-primary rounded-full"
      />
    ))}
  </div>
);

// ─── MediaList (formerly FilesList) ───────────────────────────────────────────
function MediaList({ msgs, uid, downloadFile, isDarkMode, setSelectedImage }: { msgs: Msg[], uid: string | null, downloadFile: (u: string, i: string, t: string) => void, isDarkMode: boolean, setSelectedImage: (url: string) => void }) {
  const mediaMsgs = msgs.filter(m => m.type === "voice" || m.type === "image");
  if (mediaMsgs.length === 0) return <p className="text-muted-foreground text-center mt-10 text-xs">No saved media.</p>;

  const groups = mediaMsgs.reduce((acc, m) => {
    const date = m.createdAt?.toDate().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) || "Today";
    if (!acc[date]) acc[date] = [];
    acc[date].push(m);
    return acc;
  }, {} as Record<string, Msg[]>);

  return (
    <>
      {Object.entries(groups).map(([date, items]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest pl-1">{date}</h3>
          {items.map(m => (
            <div key={m.id} className={`p-2.5 rounded-2xl flex items-center gap-4 lg:gap-6 shadow-sm transition-all group border ${isDarkMode
                ? "bg-card/30 border-white/5 hover:bg-card/50"
                : "bg-white border-black/5 hover:bg-black/5 shadow-md"
              }`}>
              <div className="flex-1 min-w-0">
                {m.type === "voice" ? (
                  <AudioPlayer src={m.content} id={m.id} mine={m.uid === uid} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                ) : (
                  <div className="flex items-center gap-3 p-1">
                    <img src={m.content} className="w-12 h-12 rounded-lg object-cover shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedImage(m.content)} alt="" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] font-bold truncate ${isDarkMode ? "text-white/80" : "text-black/80"}`}>Photo</div>
                      <div className="text-[10px] opacity-40 uppercase">{m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {m.type === "image" && (
                  <button
                    onClick={() => setSelectedImage(m.content)}
                    className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-all shrink-0"
                    aria-label="View photo"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => downloadFile(m.content, m.id, m.type)}
                  className="p-2.5 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-all shrink-0 shadow-sm"
                  aria-label={`Download ${m.type}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingText, setUploadingText] = useState("");
  const [inputHeight, setInputHeight] = useState(44);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("ovii_dark_mode");
    return saved === null ? true : saved === "true";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recDuration, setRecDuration] = useState(0);
  const recTimerRef = useRef<any>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("ovii_dark_mode", String(isDarkMode));
  }, [isDarkMode]);

  // -- Scroll to bottom on mount --
  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => scrollToBottom(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ── Viewport height: ONLY used on mobile to compensate for software keyboard ──
  // On desktop we let position:fixed + inset:0 do the work (no zoom whitespace).
  const [mobileKeyboardOffset, setMobileKeyboardOffset] = useState(0);

  const [deviceId] = useState(() => {
    let id = localStorage.getItem("ovii_device_id");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("ovii_device_id", id);
      localStorage.removeItem("ovii-avatar-choice");
    }
    return id;
  });

  const isReturning = !!localStorage.getItem("ovii-avatar-choice") && !!localStorage.getItem("ovii-name");
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem("ovii-avatar-choice") || "");
  const [name, setName] = useState<string>(() => localStorage.getItem("ovii-name") || "");
  const [showAvatarPicker, setShowAvatarPicker] = useState(!isReturning);
  const [inputName, setInputName] = useState(name);

  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [appNotifications, setAppNotifications] = useState<{ id: string, message: string, type: "success" | "error" | "info" }[]>([]);
  const [particles] = useState(() => Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  })));

  const addNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setAppNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAppNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const renderMessageContent = (content: string) => {
    if (!content) return null;
    // Regex for URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Regex for phone numbers (5+ digits, optionally starting with +)
    const phoneRegex = /(\+?\d{5,15})/g;

    const parts = content.split(/((?:https?:\/\/[^\s]+)|(?:\+?\d{5,15}))/g);

    return parts.map((part, i) => {
      if (!part) return null;
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#25d366] hover:brightness-110 break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      if (part.match(phoneRegex)) {
        return (
          <span
            key={i}
            className="underline font-bold cursor-pointer text-[#25d366] hover:brightness-110"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhone(part);
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [recordingUsers, setRecordingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Msg | null>(null);
  const [showFolder, setShowFolder] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<{ uid: string, name: string, avatar?: string }[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [systemMsgs, setSystemMsgs] = useState<{ id: string, text: string, ts: number, type: "join" | "leave" }[]>([]);
  const [otherLastSeen, setOtherLastSeen] = useState<number | null>(null);
  const [otherName, setOtherName] = useState<string | null>(null);
  const [otherOnline, setOtherOnline] = useState(false);
  const [otherAvatar, setOtherAvatar] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // -- Back gesture handling for image preview --
  useEffect(() => {
    if (selectedImage) {
      window.history.pushState({ modal: "image" }, "");
      const handlePop = () => setSelectedImage(null);
      window.addEventListener("popstate", handlePop);
      return () => window.removeEventListener("popstate", handlePop);
    }
  }, [selectedImage]);
  const [showMenu, setShowMenu] = useState(false);
  const [contextMsg, setContextMsg] = useState<Msg | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowNoLockSubmenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [noLockUntil, setNoLockUntil] = useState<number | null>(() => {
    const saved = localStorage.getItem("ovii_no_lock_until");
    return saved ? parseInt(saved) : null;
  });
  const [showNoLockSubmenu, setShowNoLockSubmenu] = useState(false);
  const prevOnlineRef = useRef<Map<string, string>>(new Map());

  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelRecRef = useRef(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef<number>(Date.now());
  const chunksRef = useRef<Blob[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (instant = false) => {
    if (!scrollRef.current) return;
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: instant ? "instant" : "smooth",
        });
      }
    };
    scroll();
    // Second pass for reliability
    setTimeout(scroll, 50);
  };

  // ── Auth + presence ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!avatar) return;
    let unsubMsgs = () => { };
    let unsubPresence = () => { };
    let alive = true;
    let heartbeatId: NodeJS.Timeout | null = null;
    let currentUid: string | null = null;

    const cleanupPresence = () => {
      if (!currentUid) return;
      deleteDoc(doc(db, "ovii", ROOM, "presence", currentUid)).catch(() => { });
    };
    const handleBeforeUnload = () => cleanupPresence();
    const handlePageHide = () => cleanupPresence();

    (async () => {
      try {
        const u = await ensureAnonAuth();
        if (!alive) return;
        currentUid = u.uid;

        const presCol = collection(db, "ovii", ROOM, "presence");
        const snap = await getDocs(presCol);
        const now = Date.now();
        for (const d of snap.docs) {
          const ts = (d.data().lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
          if (now - ts > 30_000 && d.id !== u.uid) await deleteDoc(d.ref).catch(() => { });
        }
        const fresh = await getDocs(presCol);
        const others = fresh.docs.filter((d) => d.id !== u.uid).length;
        if (others >= 2 - 0 && fresh.docs.length >= 2 && !fresh.docs.find((d) => d.id === u.uid)) {
          setError("Room is full (2/2). Try again later.");
          return;
        }

        await setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
          uid: u.uid, avatar, name, lastSeen: serverTimestamp(), typing: false, recording: false
        });
        setUid(u.uid);
        setCount(Math.min(2, fresh.docs.length + (fresh.docs.find((d) => d.id === u.uid) ? 0 : 1)));

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("pagehide", handlePageHide);

        heartbeatId = setInterval(() => {
          setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
            uid: u.uid, avatar, name, lastSeen: serverTimestamp(),
          }, { merge: true }).catch(() => { });
        }, 15_000);

        unsubPresence = onSnapshot(presCol, (s) => {
          const t: string[] = [];
          const r: string[] = [];
          const currentOnline: { uid: string, name: string, avatar?: string }[] = [];
          const currentOnlineIds = new Set<string>();
          const now = Date.now();

          s.forEach((d) => {
            const data = d.data();
            const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
            const isOnline = lastSeen > 0 && (now - lastSeen < 45_000); // 45s margin for heartbeat

            if (lastSeen > 0 && now - lastSeen > 60_000 && d.id !== u.uid) {
              deleteDoc(d.ref).catch(() => { });
              return;
            }

            currentOnline.push({ uid: d.id, name: data.name || "Unknown", avatar: data.avatar });
            currentOnlineIds.add(d.id);

            if (d.id !== u.uid) {
              if (data.typing) t.push(data.avatar);
              if (data.recording) r.push(data.avatar);
              setOtherName(data.name || "User");
              setOtherAvatar(data.avatar || null);
              setOtherLastSeen(lastSeen);
              setOtherOnline(isOnline);
            }
          });

          const othersOnline = [...currentOnlineIds].filter(id => id !== u.uid);
          if (othersOnline.length === 0) {
            setOtherOnline(false);
          }

          currentOnline.forEach(user => {
            if (user.uid !== u.uid && !prevOnlineRef.current.has(user.uid)) {
              const id = crypto.randomUUID();
              setSystemMsgs(prev => [...prev, { id, text: `${user.name} is online`, ts: Date.now(), type: "join" }]);
              setTimeout(() => setSystemMsgs(prev => prev.filter(m => m.id !== id)), 6000);
            }
          });
          if (prevOnlineRef.current.size > 0) {
            prevOnlineRef.current.forEach((prevName, prevUid) => {
              if (prevUid !== u.uid && !currentOnlineIds.has(prevUid)) {
                const id = crypto.randomUUID();
                setOtherLastSeen(Date.now());
                setSystemMsgs(prev => [...prev, { id, text: `${prevName} went offline`, ts: Date.now(), type: "leave" }]);
                setTimeout(() => setSystemMsgs(prev => prev.filter(m => m.id !== id)), 6000);
              }
            });
          }
          const nextMap = new Map<string, string>();
          currentOnline.forEach(user => nextMap.set(user.uid, user.name));
          prevOnlineRef.current = nextMap;

          setOnlineUsers(currentOnline);
          setTypingUsers(t);
          setRecordingUsers(r);
          setCount(currentOnline.length);
        });

        const q = query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "asc"));
        unsubMsgs = onSnapshot(q, { includeMetadataChanges: true }, (s) => {
          const list: Msg[] = s.docs.map((d) => {
            const data = d.data() as any;
            const msg: Msg = { id: d.id, ...data };
            if (d.metadata.hasPendingWrites && msg.uid === u.uid) msg.status = "sending";
            return msg;
          });
          setMsgs(list);
          setIsLoading(false);
          const tnow = Date.now();
          for (const m of list) {
            if (m.uid !== u.uid && m.status !== "read" && !s.metadata.hasPendingWrites) {
              setDoc(doc(db, "ovii", ROOM, "messages", m.id), { status: "read" }, { merge: true }).catch(() => { });
            }
            const ts = m.createdAt?.toMillis?.() ?? 0;
            if (!ts) continue;

            // Retention logic:
            // Text: 5 days
            // Voice/Photo: 14 days
            const limit = m.type === "text"
              ? 5 * 24 * 60 * 60 * 1000
              : 14 * 24 * 60 * 60 * 1000;

            if (tnow - ts > limit) {
              deleteDoc(doc(db, "ovii", ROOM, "messages", m.id)).catch(() => { });
            }
          }
        });

        return () => {
          if (heartbeatId) clearInterval(heartbeatId);
          unsubPresence();
          deleteDoc(doc(db, "ovii", ROOM, "presence", u.uid)).catch(() => { });
        };
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Connection failed");
      }
    })();

    return () => {
      alive = false;
      unsubMsgs();
      unsubPresence();
      if (heartbeatId) clearInterval(heartbeatId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
      cleanupPresence();
    };
  }, [avatar]);

  // ── Inactivity lock ──────────────────────────────────────────────────────
  useEffect(() => {
    const bump = () => { lastActivity.current = Date.now(); };
    window.addEventListener("pointerdown", bump);
    window.addEventListener("keydown", bump);
    const t = setInterval(() => {
      const now = Date.now();
      if (noLockUntil && now < noLockUntil) return; // Bypass lock
      if (now - lastActivity.current > 180_000) onLock();
    }, 5_000);
    return () => {
      window.removeEventListener("pointerdown", bump);
      window.removeEventListener("keydown", bump);
      clearInterval(t);
    };
  }, [onLock]);

  // ── Mobile keyboard compensation (ONLY on mobile) ────────────────────────
  // Desktop: position:fixed + inset:0 handles everything — no JS height needed.
  // Mobile: track visualViewport to shrink the scroll area when keyboard opens.
  useEffect(() => {
    if (!isMobileDevice()) return; // ← desktop: skip entirely

    const vv = window.visualViewport;
    const syncKeyboard = () => {
      if (!vv) return;
      const keyboardHeight = window.innerHeight - vv.height;
      setMobileKeyboardOffset(Math.max(0, keyboardHeight));
      requestAnimationFrame(() => scrollToBottom(true));
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    vv?.addEventListener("resize", syncKeyboard);
    vv?.addEventListener("scroll", syncKeyboard);
    syncKeyboard();

    return () => {
      vv?.removeEventListener("resize", syncKeyboard);
      vv?.removeEventListener("scroll", syncKeyboard);
    };
  }, []);

  // ── Robust Auto-Scroll: Handles images, videos, and dynamic content ─────
  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Initial scroll sequence to ensure we land at the bottom
    const timers = [
      setTimeout(() => scrollToBottom(true), 100),
      setTimeout(() => scrollToBottom(true), 500),
      setTimeout(() => scrollToBottom(false), 1500)
    ];

    // ResizeObserver: Triggered when images or previews load and expand the container
    const observer = new ResizeObserver(() => {
      // Only auto-scroll if the user is already near the bottom or if it's the initial load
      const t = scrollRef.current;
      if (!t) return;
      const isNearBottom = t.scrollHeight - t.scrollTop < t.clientHeight + 200;
      if (isNearBottom || isLoading) {
        scrollToBottom(false);
      }
    });

    observer.observe(scrollRef.current);
    
    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [msgs.length, isLoading]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => scrollToBottom(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const setPres = (data: any) => {
    if (uid) setDoc(doc(db, "ovii", ROOM, "presence", uid), data, { merge: true }).catch(() => { });
  };

  const send = async (type: Msg["type"], content: string, extra: Partial<Msg> = {}) => {
    if (!uid || !content) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type, content, status: "sent", createdAt: Timestamp.now(), ...extra };
    if (replyingTo) {
      msgData.replyTo = {
        id: replyingTo.id,
        content: replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note"),
        avatar: replyingTo.avatar,
        name: replyingTo.name,
      };
      setReplyingTo(null);
    }
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const deleteMessage = async (msgId: string, mode: "me" | "everyone") => {
    try {
      if (mode === "everyone") {
        await setDoc(doc(db, "ovii", ROOM, "messages", msgId), {
          isDeleted: true,
          content: "This message was deleted",
          type: "text"
        }, { merge: true });
      } else {
        const msg = msgs.find(m => m.id === msgId);
        if (!msg || !uid) return;
        const deletedFor = [...(msg.deletedFor || []), uid];
        await setDoc(doc(db, "ovii", ROOM, "messages", msgId), { deletedFor }, { merge: true });
      }
    } catch (e) {
      addNotification("Action failed", "error");
    }
  };

  const editMessage = async (msgId: string, newContent: string) => {
    try {
      await setDoc(doc(db, "ovii", ROOM, "messages", msgId), {
        content: newContent,
        isEdited: true
      }, { merge: true });
      setIsEditing(null);
    } catch (e) {
      addNotification("Edit failed", "error");
    }
  };

  const sendImage = async (url: string, caption?: string) => {
    if (!uid || !url) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type: "image", content: url, caption, status: "sent", createdAt: Timestamp.now() };
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
    setTimeout(() => scrollToBottom(false), 300); // Wait for image to start loading and scroll down
  };

  const onText = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const v = text.trim();
    if (!v) return;

    if (isEditing) {
      await editMessage(isEditing, v);
      setText("");
      setIsEditing(null);
      return;
    }

    setText("");
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    setIsTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setPres({ typing: false });
    requestAnimationFrame(() => inputRef.current?.focus());
    const isImageUrl = /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(v);
    if (isImageUrl) await send("image", v);
    else await send("text", v.slice(0, 5000));
    setInputHeight(44); // Reset height after send
  };

  const uploadToCloudinary = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dte6c221f");
    const res = await fetch(`https://api.cloudinary.com/v1_1/dte6c221f/auto/upload`, { method: "POST", body: formData });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error?.message || "Upload failed"); }
    const data = await res.json();
    return data.secure_url;
  };

  const onImage = async (file: File) => {
    if (!uid) return;
    if (file.size > 200 * 1024 * 1024) { setError("File too large (max 200MB)"); return; }

    setUploadingText("Sending photo...");
    setIsUploading(true); // Show loader immediately
    try {
      const url = await uploadToCloudinary(file);
      await sendImage(url, ""); // Send immediately with empty caption
    } catch (e: any) {
      setError("Image upload failed: " + (e.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  const clearChat = async () => {
    setShowClearConfirm(false);
    try {
      const q = query(collection(db, "ovii", ROOM, "messages"));
      const snapshot = await getDocs(q);
      const batch = snapshot.docs.map(d => deleteDoc(doc(db, "ovii", ROOM, "messages", d.id)));
      await Promise.all(batch);
      addNotification("Chat cleared", "success");
      setShowMenu(false);
    } catch (e) {
      addNotification("Failed to clear chat", "error");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      if (e.clipboardData.items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = e.clipboardData.items[i].getAsFile();
        if (file) onImage(file);
        return;
      }
    }
    const pastedText = e.clipboardData.getData("text/plain")?.trim();
    if (pastedText && /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(pastedText)) {
      e.preventDefault();
      send("image", pastedText);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const url = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
    if (url && (url.includes(".gif") || url.includes("images") || url.includes("media"))) { await send("image", url); return; }
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) onImage(file);
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (cancelRecRef.current) return;
        try {
          setUploadingText("Sending voice note...");
          setIsUploading(true);
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = await uploadToCloudinary(blob);
          await send("voice", url);
        } catch (e: any) { setError("Voice upload failed: " + (e.message || "Unknown error")); }
        finally { setIsUploading(false); }
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      setRecDuration(0);
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      recTimerRef.current = setInterval(() => {
        setRecDuration(prev => prev + 1);
      }, 1000);
      setPres({ recording: true });
      cancelRecRef.current = false;
      setTimeout(() => {
        if (rec.state === "recording") {
          if (recTimerRef.current) clearInterval(recTimerRef.current);
          rec.stop();
          setRecording(false);
          setPres({ recording: false });
        }
      }, 10 * 60 * 1000);
    } catch (e: any) { setError("Microphone permission denied"); }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const stopAndSendRec = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setRecDuration(0);
    setPres({ recording: false });
  };

  const cancelRec = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    cancelRecRef.current = true;
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setRecDuration(0);
    setPres({ recording: false });
  };

  const downloadFile = async (url: string, id: string, type: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      const ext = type === "voice" ? "webm" : "jpg";
      a.download = `${type}-${id.slice(0, 8)}.${ext}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      addNotification("Download started", "success");
    } catch { window.open(url, "_blank"); }
  };

  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

  // chatMsgs: Text for 5 days, Media for 7 days
  const chatMsgs = msgs.filter(m => {
    const ts = m.createdAt?.toMillis?.() ?? 0;
    if (!ts) return true; // Keep pending messages
    const age = now - ts;
    if (m.type === "text") return age < FIVE_DAYS;
    return age < SEVEN_DAYS;
  }).sort((a, b) => (a.createdAt?.toMillis?.() ?? 0) - (b.createdAt?.toMillis?.() ?? 0));

  const mediaMsgs = msgs.filter(m => m.type === "voice" || m.type === "image");
  const unreadMedia = mediaMsgs.length;

  // ── Root style: fixed + inset:0 on desktop, keyboard-adjusted on mobile ──
  const rootStyle: React.CSSProperties = {
    ...(isMobileDevice() && mobileKeyboardOffset > 0 ? { paddingBottom: mobileKeyboardOffset } : {}),
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='440' height='440' viewBox='0 0 440 440'%3E%3Cg fill='none' stroke='${isDarkMode ? "%23ffffff" : "%23000000"}' stroke-opacity='${isDarkMode ? "0.04" : "0.03"}' stroke-width='1'%3E%3Cpath d='M200 200c0-10 10-10 10-20s-10-10-10-20 10-10 10-20-10-10-10-20 10-10 10-20-10-10-10-20 10-10 10-20'/%3E%3Cpath d='M300 100c10 10 20 10 20 20s-10 10-20 10-10-10-20-10 10-10 20-10'/%3E%3Ccircle cx='350' cy='350' r='15'/%3E%3Ccircle cx='50' cy='150' r='10'/%3E%3Cpath d='M100 300l15 15m0-15l-15 15'/%3E%3Cpath d='M50 350q10-10 20 0t20 0 20 0 20 0'/%3E%3Cpath d='M380 50l10 10m0-10l-10 10'/%3E%3Ccircle cx='180' cy='80' r='5'/%3E%3Cpath d='M20 200h20m-10-10v20'/%3E%3Cpath d='M400 250c-10 0-10 10-20 10s-10-10-20-10'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: "440px 440px"
  };

  return (
    <AnimatePresence>
      <motion.div
        key="ovii-chat-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`ovii-chat-root fixed inset-0 z-[150] overflow-hidden flex flex-col items-center justify-center backdrop-blur-xl transition-colors duration-300 ${isDarkMode ? "bg-[#0b141a]/95" : "bg-[#efeae2]/95"}`}
        style={rootStyle}
      >
        {/* Magical Atmosphere Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          {particles.map(p => (
            <div
              key={p.id}
              className={`absolute rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-primary/20'} animate-float-slow`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                willChange: "transform, opacity"
              }}
            />
          ))}
        </div>
        <motion.div
          key="ovii-chat-frame"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
          className="ovii-chat-frame w-full h-full md:max-w-[1200px] md:h-[92vh] md:rounded-[32px] md:shadow-2xl overflow-hidden flex flex-col relative border border-white/5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* No Toaster needed anymore */}


          {/* ── Avatar Picker Overlay ── */}
          {showAvatarPicker && (
            <div className={`absolute inset-0 z-[500] flex items-center justify-center p-4 backdrop-blur-md ${isDarkMode ? "bg-black/40" : "bg-white/40"}`}>
              <div className={`w-full max-w-sm rounded-[32px] border p-8 shadow-2xl text-center relative overflow-hidden transition-all ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={() => setShowAvatarPicker(false)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white/50" : "bg-black/5 hover:bg-black/10 text-black/40"}`}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className={`text-2xl font-black mb-1 tracking-tight ${isDarkMode ? "text-white" : "text-black"}`}>Profile</h2>
                <p className={`text-xs mb-8 font-medium ${isDarkMode ? "text-white/50" : "text-black/40"}`}>Customize your presence in the room</p>

                <div className="space-y-6 relative z-10">
                  <div className="text-left">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 mb-1.5 block ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Display Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      maxLength={20}
                      value={inputName}
                      onChange={e => setInputName(e.target.value)}
                      className={`w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${isDarkMode ? "bg-white/5 border-white/10 text-white placeholder:text-white/20" : "bg-black/5 border-black/10 text-black placeholder:text-black/30"
                        }`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 mb-3 block text-left ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Choose Avatar</label>
                    <div className="grid grid-cols-4 gap-4 max-h-[280px] overflow-y-auto pr-2 scrollbar-hide">
                      {AVATARS.map((av) => (
                        <button
                          key={av.id}
                          disabled={!inputName.trim()}
                          onClick={() => {
                            setAvatar(av.url);
                            setName(inputName.trim());
                            localStorage.setItem("ovii-avatar-choice", av.url);
                            localStorage.setItem("ovii-name", inputName.trim());
                            setShowAvatarPicker(false);
                            addNotification("Profile updated", "success");
                          }}
                          className={`rounded-full overflow-hidden border-2 aspect-square transition-all hover:scale-110 disabled:opacity-20 disabled:hover:scale-100 ${avatar === av.url ? "border-primary shadow-[0_0_15px_rgba(245,158,11,0.4)]" : `border-transparent ${isDarkMode ? "hover:border-white/30" : "hover:border-black/20"}`
                            }`}
                        >
                          <img src={av.url} alt={av.name} className="w-full h-full object-cover scale-[1.25]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Mobile Folder Overlay ── */}
          <AnimatePresence>
            {showFolder && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed inset-0 z-[150] flex flex-col ${isDarkMode ? "bg-[#0b141a]" : "bg-[#f0f2f5]"}`}
              >
                <div className={`p-4 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${isDarkMode ? "bg-[#202c33]/80 border-white/5 text-white" : "bg-white/80 border-black/5 text-black"
                  }`}>
                  <h2 className="text-base font-bold uppercase tracking-wider flex items-center gap-2.5">
                    <Folder className="w-5 h-5 text-destructive" /> FILES
                  </h2>
                  <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* ── Header ── */}
          <header className={`px-4 py-2 flex items-center justify-between z-[60] shrink-0 border-b backdrop-blur-xl transition-all duration-500 shadow-lg ${isDarkMode
              ? "bg-gradient-to-r from-[#202c33]/90 via-[#2a3942]/90 to-[#202c33]/90 border-white/5 text-white"
              : "bg-gradient-to-r from-white/95 via-[#f0f2f5]/95 to-white/95 border-black/5 text-black"
            }`}>
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full overflow-hidden border border-black/5 bg-muted shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all active:scale-95 relative"
                onClick={() => {
                  if (!otherAvatar) {
                    setShowAvatarPicker(true);
                  }
                }}
                title={!otherAvatar ? "Edit Profile" : ""}
              >
                {otherAvatar ? (
                  <img src={otherAvatar} alt="" className="w-full h-full object-cover" />
                ) : avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                ) : null}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0, 0.2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-primary rounded-full pointer-events-none"
                />
              </div>
              <div>
                <div className="font-bold text-[14px] leading-tight">
                  {otherName || (count > 1 ? "Ovii User" : "Waiting...") || "Waiting..."}
                </div>
                <div className="text-[10px] opacity-60 flex items-center gap-1.5 font-medium">
                  {recordingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Recording...</span>
                  ) : typingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Typing...</span>
                  ) : (
                    <span className={otherOnline ? "text-emerald-500" : ""}>
                      {otherOnline ? "Online" : formatLastSeen(otherLastSeen ?? undefined)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">

              {noLockUntil && Date.now() < noLockUntil && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  <ShieldOff className="w-3 h-3" />
                  <span>No Lock: {Math.ceil((noLockUntil - Date.now()) / 60000)}m left</span>
                </div>
              )}
              <label className="switch" title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <input
                  type="checkbox"
                  checked={!isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <span className="slider">
                  <span className="star star_1"></span>
                  <span className="star star_2"></span>
                  <span className="star star_3"></span>
                  <span className="cloud">
                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" fill="white">
                      <path d="M410.8,247c-2.3-25.6-23.7-45.6-49.8-45.6c-5.8,0-11.4,1-16.5,2.8c-12.8-31.9-43.9-54.6-80.4-54.6 c-32.2,0-60.1,17.7-74.8,44.1c-9.1-5.1-19.6-8-30.8-8c-33.8,0-61.1,27.3-61.1,61.1c0,1,0.1,2,0.2,3c-23.9,8.6-41,31.4-41,58.2 c0,33.9,27.5,61.4,61.4,61.4h276.7c33.9,0,61.4-27.5,61.4-61.4C451.8,278.4,434.7,255.6,410.8,247z" />
                    </svg>
                  </span>
                </span>
              </label>
              <button
                onClick={() => { onLock(); window.location.href = "/news"; }}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title="Switch to News"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={`p-2 rounded-full transition-colors relative ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                    } ${showMenu ? (isDarkMode ? "bg-white/10" : "bg-black/10") : ""}`}
                  title="Menu"
                >
                  <MoreVertical className="w-5 h-5" />
                  {unreadMedia > 0 && <span className="absolute top-1 right-1 bg-[#25d366] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">{unreadMedia}</span>}
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute right-0 mt-2 w-64 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                        }`}
                    >
                      <div className="py-2">
                        {/* Profile Item */}
                        <button
                          onClick={() => { setShowAvatarPicker(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all active:scale-[0.98] ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                            }`}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 shadow-sm">
                            <img src={avatar} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-black leading-tight truncate">{name || "Me"}</div>
                            <div className="text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-emerald-500/80">Online</span>
                            </div>
                          </div>
                          <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" />
                        </button>

                        <div className={`h-px mx-4 my-1 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        <button
                          onClick={() => { setShowFolder(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all active:scale-[0.98] ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                            }`}
                        >
                          <Folder className="w-4 h-4 text-destructive" />
                          <div className="flex-1 text-left font-medium">Files</div>
                          {unreadMedia > 0 && <span className="bg-[#25d366] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadMedia}</span>}
                        </button>

                        <div className={`h-px mx-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        {!showNoLockSubmenu ? (
                          <button
                            onClick={() => setShowNoLockSubmenu(true)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                              }`}
                          >
                            <ShieldOff className="w-4 h-4 text-primary" />
                            <div className="flex-1 text-left font-medium">No Lock</div>
                            {noLockUntil && Date.now() < noLockUntil ? (
                              <span className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">Active</span>
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 opacity-40" />
                            )}
                          </button>
                        ) : (
                          <div className="py-1">
                            <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? "text-white" : "text-black"}`}>Select Duration</div>
                            {[
                              { label: "15 Minutes", val: 15 * 60 * 1000 },
                              { label: "1 Hour", val: 60 * 60 * 1000 },
                              { label: "5 Hours", val: 5 * 60 * 60 * 1000 },
                              { label: "24 Hours", val: 24 * 60 * 60 * 1000 },
                            ].map((d) => (
                              <button
                                key={d.label}
                                onClick={() => {
                                  const until = Date.now() + d.val;
                                  setNoLockUntil(until);
                                  localStorage.setItem("ovii_no_lock_until", until.toString());
                                  setShowMenu(false);
                                  setShowNoLockSubmenu(false);
                                  addNotification(`No Lock enabled for ${d.label}`, "success");
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/80" : "hover:bg-black/5 text-black/70"
                                  }`}
                              >
                                <Clock className="w-3.5 h-3.5 opacity-60" />
                                <span className="font-medium">{d.label}</span>
                              </button>
                            ))}
                            {noLockUntil && (
                              <button
                                onClick={() => {
                                  setNoLockUntil(null);
                                  localStorage.removeItem("ovii_no_lock_until");
                                  setShowMenu(false);
                                  setShowNoLockSubmenu(false);
                                  addNotification("No Lock disabled", "info");
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-destructive hover:bg-destructive/5 transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="font-bold">Turn off No Lock</span>
                              </button>
                            )}
                            <button
                              onClick={() => setShowNoLockSubmenu(false)}
                              className={`w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-black"}`}
                            >
                              ← Back
                            </button>
                          </div>
                        )}

                        <div className={`h-px mx-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        <button
                          onClick={() => { setShowClearConfirm(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-destructive/10 text-destructive" : "hover:bg-destructive/5 text-destructive"
                            }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <div className="flex-1 text-left font-medium">Clear Chat</div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>


              </div>
            </div>
          </header>
          
          {/* ── Error Toast (Up Front) ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
              >
                <div className="bg-destructive/10 backdrop-blur-md border border-destructive/20 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                  <div className="bg-destructive text-white p-1.5 rounded-full">
                    <X className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-0.5">Error</div>
                    <div className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-black"}`}>{error}</div>
                  </div>
                  <button onClick={() => setError("")} className="p-1 opacity-40 hover:opacity-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Body: messages col + optional desktop sidebar ── */}
          <div className="flex-1 flex min-h-0 overflow-hidden">

            {/* ── Messages column ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

              {/* App Notifications */}
              <div className="absolute top-[75px] left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full max-w-[320px]">
                <AnimatePresence mode="popLayout">
                  {appNotifications.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className={`px-5 py-3 rounded-[24px] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] border flex items-center gap-3 pointer-events-auto text-[13px] font-black tracking-tight transition-all ${n.type === "success" ? "bg-[#00a884] text-white border-white/20 shadow-[#00a884]/20" :
                          n.type === "error" ? "bg-[#ea4335] text-white border-white/20 shadow-red-500/20" :
                            "bg-[#005c4b] text-white border-white/20 shadow-primary/20"
                        }`}
                    >
                      {n.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {n.type === "error" && <AlertCircle className="w-4 h-4 shrink-0" />}
                      {n.type === "info" && <Info className="w-4 h-4 shrink-0" />}
                      <span>{n.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating join/leave toasts */}
              <AnimatePresence>
                {systemMsgs.length > 0 && (
                  <motion.div
                    key="toast-stack"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
                  >
                    {systemMsgs.slice(-1).map(sm => (
                      <div key={sm.id} className={`text-[11px] font-bold px-4 py-1.5 rounded-full backdrop-blur-xl shadow-elegant border ${sm.type === "join"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-muted/60 text-muted-foreground border-border/30"
                        }`}>
                        {sm.type === "join" ? "🟢" : "⚫"} {sm.text}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll area — overflow-x:hidden prevents horizontal bleed from drag */}
              <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-2 flex flex-col items-stretch touch-pan-y relative"
                style={{
                  overscrollBehavior: "contain",
                  overflowX: "hidden",
                  willChange: "scroll-position"
                }}
                onScroll={(e) => {
                  const t = e.currentTarget;
                  setShowScrollDown(t.scrollHeight - t.scrollTop > t.clientHeight + 80);
                }}
              >
                <div className="flex-1" />

                {!error && isLoading && (
                  <div className="h-full flex items-center justify-center text-center my-auto">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      <div className="text-muted-foreground text-sm font-medium animate-pulse">Loading messages...</div>
                    </div>
                  </div>
                )}
                {!error && !isLoading && chatMsgs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 my-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-24 h-24 mb-6 relative"
                    >
                      <div className={`absolute inset-0 rounded-full animate-ping ${isDarkMode ? "bg-primary/10" : "bg-primary/5"}`} />
                      <div className={`absolute inset-4 rounded-full animate-pulse ${isDarkMode ? "bg-primary/20" : "bg-primary/10"}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Send className={`w-10 h-10 rotate-[-20deg] ${isDarkMode ? "text-primary/40" : "text-primary/60"}`} />
                      </div>
                    </motion.div>
                    <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white opacity-80" : "text-black opacity-70"}`}>Start a Magical Conversation</h3>
                    <p className={`text-[11px] max-w-[200px] leading-relaxed font-medium ${isDarkMode ? "text-white opacity-50" : "text-black opacity-40"}`}>
                      Your messages are private and will disappear like stardust after a few days.
                    </p>
                  </div>
                )}

                <div className="w-full space-y-1 flex flex-col justify-end items-stretch shrink-0 relative px-3.5 sm:px-6">
                  <AnimatePresence initial={false}>
                    {chatMsgs.filter(m => !m.deletedFor?.includes(uid || "")).map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      // Date grouping logic
                      const showDateHeader = !prevMsg ||
                        m.createdAt?.toDate().toDateString() !== prevMsg.createdAt?.toDate().toDateString();

                      const dateStr = showDateHeader ? formatMessageDate(m.createdAt?.toDate() || new Date()) : null;

                      return (
                        <Fragment key={m.id}>
                          {showDateHeader && dateStr !== "Today" && (
                            <div className="w-full flex justify-center my-4 sticky top-2 z-10 pointer-events-none">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border pointer-events-auto ${isDarkMode ? "bg-[#182229] text-white/50 border-white/5" : "bg-white text-black/40 border-black/5"
                                }`}>
                                {dateStr}
                              </span>
                            </div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`w-full flex ${mine ? "justify-end" : "justify-start"} ${!isConsecutive ? "mt-4" : "mt-1.5"}`}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.2}
                              onDragStart={() => {
                                if (longPressTimer.current) clearTimeout(longPressTimer.current);
                              }}
                              onPointerDown={() => {
                                if (isMobileDevice()) {
                                  longPressTimer.current = setTimeout(() => {
                                    setContextMsg(m);
                                    if (window.navigator.vibrate) window.navigator.vibrate([20]);
                                  }, 500);
                                }
                              }}
                              onPointerUp={() => {
                                if (longPressTimer.current) clearTimeout(longPressTimer.current);
                              }}
                              onContextMenu={(e) => {
                                if (!isMobileDevice()) {
                                  e.preventDefault();
                                  setContextMsg(m);
                                }
                              }}
                              onDrag={(e, info) => {
                                const threshold = 70;
                                const isSwipeRight = info.offset.x > threshold;
                                const isSwipeLeft = info.offset.x < -threshold;

                                // Received messages: swipe right to reply
                                // Sent messages: swipe left to reply
                                if ((!mine && isSwipeRight) || (mine && isSwipeLeft)) {
                                  if (replyingTo?.id !== m.id) {
                                    setReplyingTo(m);
                                    if (window.navigator.vibrate) window.navigator.vibrate(10);
                                  }
                                }
                              }}
                              className={`relative flex gap-2 group w-fit max-w-[85%] md:max-w-[550px] lg:max-w-[600px] ${mine ? "ml-auto" : "mr-auto"}`}
                            >
                              <div className={`absolute inset-y-0 flex items-center transition-opacity pointer-events-none opacity-0 group-drag:opacity-100 ${mine ? "-right-12 pl-4" : "-left-12 pr-4"
                                }`}>
                                <Reply className="w-5 h-5 text-primary/40" />
                              </div>

                              {!mine && (
                                <div className="hidden md:flex flex-col items-center mt-auto gap-1 w-8 shrink-0">
                                  {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full bg-muted object-cover border border-border/40 shadow-sm" alt="" />}
                                </div>
                              )}

                              <div className={`flex-1 min-w-0 ${mine ? "items-end" : "items-start"} flex flex-col gap-[2px] md:gap-0.5`}>
                                {!mine && !isConsecutive && m.name && <span className="hidden md:inline-block text-[10px] font-bold text-muted-foreground ml-1.5 mb-0.5 uppercase tracking-tighter">{m.name}</span>}

                                {m.replyTo && (
                                  <div className={`px-2.5 py-1.5 rounded-t-xl rounded-b-sm text-xs opacity-90 flex items-center gap-2 border-l-3 border-primary/80 mb-0.5 mx-1 max-w-full overflow-hidden ${isDarkMode ? "bg-m3-surface-container-high/50 text-[#e9edef]/80" : "bg-black/5 text-[#111b21]/70"
                                    }`}>
                                    <img src={m.replyTo.avatar} className="w-4 h-4 rounded-full border border-border/20 shrink-0" alt="" />
                                    <div className="flex flex-col min-w-0">
                                      {m.replyTo.name && <span className="text-[8px] font-black text-primary uppercase tracking-tighter truncate">{m.replyTo.name}</span>}
                                      <span className="truncate italic text-[10px] leading-tight">{m.replyTo.content}</span>
                                    </div>
                                  </div>
                                )}

                                {m.type === "voice" ? (
                                  <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                                ) : (
                                  <div
                                    className={`md:rounded-[20px] ${m.type === "image" ? "p-0 overflow-hidden rounded-[12px] md:rounded-[20px]" : "px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 md:sm:px-5 md:sm:py-2.5 min-w-[65px] md:min-w-[80px] md:sm:min-w-[140px] rounded-[10px]"} text-[14.5px] md:text-[14px] leading-[1.35] md:leading-relaxed break-words relative flex flex-col shadow-sm md:shadow-md transition-all w-fit max-w-full
                                  ${mine
                                        ? (isDarkMode ? "bg-[#005c4b] text-[#e9edef] " : "bg-[#dcf8c6] text-[#111b21] ") + (isLastInGroup ? "rounded-br-sm md:rounded-br-none" : "")
                                        : (isDarkMode ? "bg-[#202c33] text-[#e9edef] " : "bg-white text-[#111b21] ") + (isLastInGroup ? "rounded-bl-sm md:rounded-bl-none" : "")
                                      } ${m.isDeleted ? "opacity-60 italic" : ""}`}
                                  >
                                    <div className="relative flex flex-col">
                                      {!mine && !isConsecutive && m.name && <span className="md:hidden text-[12px] font-bold text-[#eb5528] dark:text-[#f28b82] mb-0.5 leading-tight">{m.name}</span>}


                                      {m.type === "image" && !m.isDeleted && (
                                        <div className="mb-0 overflow-hidden rounded-[18px] relative group/img cursor-pointer active:scale-[0.99] transition-transform" onClick={() => setSelectedImage(m.content)}>
                                          <img 
                                            src={m.content} 
                                            alt="" 
                                            onContextMenu={(e) => e.preventDefault()}
                                            style={{ WebkitTouchCallout: 'none' }}
                                            className="w-full max-w-[320px] md:max-w-[500px] max-h-[250px] object-cover shadow-sm block transition-transform group-hover/img:scale-[1.02]" 
                                          />

                                          {/* Photo overlay actions */}
                                          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            <button
                                              onClick={(e) => { e.stopPropagation(); setSelectedImage(m.content); }}
                                              className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
                                            >
                                              <ImageIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); downloadFile(m.content, m.id, "image"); }}
                                              className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
                                            >
                                              <Download className="w-4 h-4" />
                                            </button>
                                          </div>

                                          {m.caption && (
                                            <div className={`px-3 py-2 text-[13px] leading-tight font-medium ${isDarkMode ? "bg-black/20 text-white/90" : "bg-black/5 text-black/80"}`}>
                                              {m.caption}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      <div className="relative min-w-[60px]">
                                        {m.type === "text" && (
                                          <>
                                            <span className={`block break-words whitespace-pre-wrap leading-relaxed text-[14px] ${m.isDeleted ? "text-[12px]" : ""}`}>
                                              {m.isDeleted ? (
                                                <span className="flex items-center gap-1.5">
                                                  <ShieldOff className="w-3.5 h-3.5" /> This message was deleted
                                                </span>
                                              ) : renderMessageContent(m.content)}
                                              {/* Spacer to reserve room for absolute timestamp on the same line */}
                                              <span className={`inline-block h-[1px] ${mine ? "w-[85px]" : "w-[65px]"} ${m.isEdited ? "ml-8" : ""}`} />
                                            </span>
                                            {(() => {
                                              const urlRegex = /(https?:\/\/[^\s]+)/g;
                                              const match = m.content.match(urlRegex);
                                              if (match && !m.isDeleted) {
                                                return (
                                                  <>
                                                    <div className="mt-1"><LinkPreview url={match[0]} isDarkMode={isDarkMode} /></div>
                                                    <div className="h-5 w-full" /> {/* Space for timestamp below preview */}
                                                  </>
                                                );
                                              }
                                              return null;
                                            })()}
                                          </>
                                        )}

                                        {/* Timestamp: absolute for image, relative for text */}
                                        <div className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-0 right-0"} flex items-center gap-1.5 opacity-90 pointer-events-none select-none`}>
                                          {m.isEdited && !m.isDeleted && <span className="text-[9px] opacity-40 font-bold uppercase mr-1">Edited</span>}
                                          <span className={`text-[11px] tabular-nums font-['Inter'] font-extralight tracking-tight ${m.type === "image" ? "text-white" : ""}`}>
                                            {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || ""}
                                          </span>
                                          {mine && <div className={`shrink-0 scale-95 ${m.type === "image" ? "text-[#53bdeb]" : ""}`}><MsgTick status={m.status} /></div>}
                                        </div>
                                      </div>

                                      {/* Reactions Display */}
                                    </div>

                                    {/* Desktop hover reply button */}
                                    <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${mine ? "-left-10" : "-right-10"} items-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                                      <button onClick={() => setReplyingTo(m)} className="p-2 rounded-full bg-background/60 hover:bg-background shadow-elegant border border-border/40 text-muted-foreground hover:text-primary">
                                        <Reply className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {mine && (
                                <div className="hidden md:flex flex-col items-center mt-auto gap-1 w-8 shrink-0">
                                  {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full bg-muted object-cover border border-border/40 shadow-sm" alt="" />}
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        </Fragment>
                      );
                    })}
                  </AnimatePresence>

                  {typingUsers.length > 0 && (
                    <div className="flex justify-start gap-2 items-end text-muted-foreground pt-2">
                      <img src={typingUsers[0]} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border" alt="" />
                      <div className="text-xs bg-card border border-border px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  {recordingUsers.length > 0 && (
                    <div className="flex justify-start gap-2 items-end text-muted-foreground pt-2">
                      <img src={recordingUsers[0]} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border" alt="" />
                      <div className="text-xs font-medium text-destructive bg-card border border-border px-3 py-1.5 rounded-2xl rounded-bl-sm flex gap-2 items-center animate-pulse">
                        <Mic className="w-3.5 h-3.5" /> Recording...
                      </div>
                    </div>
                  )}
                  {isUploading && (
                    <div className="w-full flex justify-end mt-2 px-4 sm:px-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#dcf8c6] dark:bg-[#005c4b] p-3 rounded-[20px] rounded-br-none shadow-sm flex items-center gap-3 min-w-[140px]"
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                        <span className="text-[12px] font-bold opacity-70">{uploadingText}</span>
                      </motion.div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-0 w-full shrink-0" />
                </div>
              </div>

              {/* Scroll-to-bottom button */}
              <AnimatePresence>
                {showScrollDown && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-20 flex items-center gap-1 px-3 text-xs font-bold"
                  >
                    New message ↓
                  </motion.button>
                )}
              </AnimatePresence>


              {/* ── Edit Message Preview Banner ── */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mx-4 mb-2 p-3 rounded-2xl flex items-center gap-3 border-l-4 border-orange-500 shadow-lg ${isDarkMode ? "bg-[#1f2c33]" : "bg-white"
                      }`}
                  >
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                      <ChevronDown className="w-4 h-4 rotate-180" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">Editing message</div>
                      <div className={`text-xs truncate ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        {msgs.find(m => m.id === isEditing)?.content || "..."}
                      </div>
                    </div>
                    <button onClick={() => { setIsEditing(null); setText(""); }} className={`p-2 transition-opacity ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Reply Preview Banner ── */}
              <AnimatePresence>
                {replyingTo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mx-4 mb-2 p-3 rounded-2xl flex items-center gap-3 border-l-4 border-primary shadow-lg ${isDarkMode ? "bg-[#1f2c33]" : "bg-white"
                      }`}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Reply className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-tighter">Replying to {replyingTo.name || "User"}</div>
                      <div className={`text-xs truncate ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        {replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note")}
                      </div>
                    </div>
                    <button onClick={() => setReplyingTo(null)} className={`p-2 transition-opacity ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>


              {/* Input bar */}
              <div className={`px-2 pt-2 pb-[max(14px,env(safe-area-inset-bottom))] sm:px-4 sm:pt-3 sm:pb-[max(16px,env(safe-area-inset-bottom))] flex items-end gap-2 sm:gap-3 z-20 shrink-0 bg-transparent`}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,.gif"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) onImage(f); e.target.value = ""; }}
                />

                {recording ? (
                  /* ── Recording state ── */
                  <div className={`flex-1 flex items-center gap-3 rounded-[28px] px-4 h-[54px] overflow-hidden shadow-inner ${isDarkMode ? "bg-[#2a3942]" : "bg-white"}`}>
                    <RecordingVisualizer />
                    <div className="flex-1 overflow-hidden">
                      <motion.span 
                        animate={{ opacity: [0.4, 1, 0.4] }} 
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`text-[13px] font-medium truncate ${isDarkMode ? "text-white" : "text-black"}`}
                      >
                        Recording...
                      </motion.span>
                    </div>
                    <button 
                      onPointerDown={(e) => { e.preventDefault(); cancelRec(); }}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={`shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"
                        }`}
                    >
                      <ImageIcon className="w-6 h-6 md:w-7 md:h-7" />
                    </button>

                    <div className={`flex-1 flex items-end rounded-[24px] shadow-sm md:shadow-md border border-border/10 overflow-hidden relative ${isDarkMode ? "bg-[#2a3942]" : "bg-white"
                      }`}>
                      <textarea
                        ref={inputRef}
                        rows={1}
                        autoComplete="off"
                        value={text}
                        placeholder={isEditing ? "Edit message" : "Write a message"}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isMobileDevice()) {
                            e.preventDefault();
                            onText();
                          }
                          if (e.key === "Escape" && isEditing) {
                            setIsEditing(null);
                            setText("");
                          }
                        }}
                        onPaste={handlePaste}
                        onChange={(e) => {
                          const val = e.target.value;
                          setText(val);
                          const prevH = e.target.style.height;
                          e.target.style.height = '1px';
                          const nextH = Math.max(44, Math.min(e.target.scrollHeight, 138));
                          e.target.style.height = prevH;
                          setInputHeight(nextH);
                          if (uid && !isEditing) {
                            const typingNow = val.length > 0;
                            if (typingNow !== isTyping) { setIsTyping(typingNow); setPres({ typing: typingNow }); }
                            if (typingTimer.current) clearTimeout(typingTimer.current);
                            if (typingNow) typingTimer.current = setTimeout(() => { setIsTyping(false); setPres({ typing: false }); }, 2000);
                          }
                        }}
                        className={`w-full bg-transparent border-none focus:ring-0 focus:outline-none py-3.5 px-4 text-[15px] resize-none max-h-[150px] scrollbar-hide ${isDarkMode ? "text-[#e9edef] placeholder-[#8696a0]" : "text-[#111b21] placeholder-[#667781]"
                          }`}
                        style={{ height: `${inputHeight}px` }}
                      />
                    </div>

                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative">
                      <AnimatePresence mode="popLayout">
                        {text.trim() || isEditing ? (
                          <motion.button
                            key="send"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            type="button"
                            onClick={() => onText()}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${isEditing ? "bg-orange-500" : "bg-[#00a884]"} text-white flex items-center justify-center shadow-md md:shadow-lg active:scale-90 transition-all shrink-0`}
                          >
                            {isEditing ? <CheckCircle2 className="w-5 h-5" /> : <Send className="w-5 h-5 md:w-6 md:h-6 fill-white stroke-[1.5] md:stroke-2" />}
                          </motion.button>
                        ) : (
                          <motion.button
                            key="mic"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            type="button"
                            onPointerDown={(e) => { e.preventDefault(); startRec(); }}
                            onPointerUp={() => stopAndSendRec()}
                            onPointerLeave={() => { if (recording) stopAndSendRec(); }}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "text-white/50 hover:text-white hover:bg-white/10" : "text-black/40 hover:text-black hover:bg-black/10"
                              }`}
                            aria-label="Tap to record"
                          >
                            <Mic className="w-6 h-6 md:w-7 md:h-7" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Message Context Menu (Reactions, Edit, Delete) ── */}
            <AnimatePresence>
              {contextMsg && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
                  onPointerDown={() => setContextMsg(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                      }`}
                    onPointerDown={(e) => e.stopPropagation()}
                  >

                    <div className="py-2">
                      <button
                        onClick={() => {
                          setReplyingTo(contextMsg);
                          setContextMsg(null);
                          setTimeout(() => inputRef.current?.focus(), 100);
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium ${isDarkMode ? "hover:bg-white/5 text-white" : "hover:bg-black/5 text-black"}`}
                      >
                        <Reply className="w-4 h-4 opacity-60" /> Reply
                      </button>

                      {!contextMsg.isDeleted && contextMsg.uid === uid && contextMsg.type === "text" && (
                        <button
                          onClick={() => {
                            setIsEditing(contextMsg.id);
                            setText(contextMsg.content);
                            setContextMsg(null);
                            setTimeout(() => inputRef.current?.focus(), 100);
                          }}
                          className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium ${isDarkMode ? "hover:bg-white/5 text-white" : "hover:bg-black/5 text-black"}`}
                        >
                          <Pencil className="w-4 h-4 opacity-60" /> Edit Message
                        </button>
                      )}

                      <button
                        onClick={() => {
                          deleteMessage(contextMsg.id, "me");
                          setContextMsg(null);
                        }}
                        className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                      >
                        <Trash2 className="w-4 h-4 opacity-60" /> Delete for Me
                      </button>

                      {!contextMsg.isDeleted && contextMsg.uid === uid && (
                        <button
                          onClick={() => {
                            deleteMessage(contextMsg.id, "everyone");
                            setContextMsg(null);
                          }}
                          className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                        >
                          <Users2 className="w-4 h-4 opacity-60" /> Delete for Everyone
                        </button>
                      )}

                      {!contextMsg.isDeleted && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(contextMsg.content);
                            addNotification("Copied", "success");
                            setContextMsg(null);
                          }}
                          className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium ${isDarkMode ? "hover:bg-white/5 text-white" : "hover:bg-black/5 text-black"}`}
                        >
                          <CheckCircle2 className="w-4 h-4 opacity-60" /> Copy
                        </button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Desktop Sidebar (hidden on mobile via CSS/Tailwind) ── */}
            <AnimatePresence>
              {showFolder && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 380, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className={`hidden lg:flex flex-col border-l relative overflow-hidden shrink-0 ${isDarkMode ? "bg-[#202c33]/20 border-white/5" : "bg-white/40 border-black/5"
                    }`}
                >
                  <div className={`p-4 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${isDarkMode ? "bg-[#202c33]/80 border-white/5 text-white" : "bg-white/80 border-black/5 text-black"
                    }`}>
                    <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-destructive" /> FILES
                    </h2>
                    <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-background/60 hover:bg-background text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                    <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* ── Full Image Preview Overlay ── */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.button
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => { if (selectedImage) window.history.back(); else setSelectedImage(null); }}
                    className="absolute top-5 right-5 p-2.5 bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => downloadFile(selectedImage, "preview", "image")}
                    className="absolute top-[75px] right-5 p-2.5 bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
                  >
                    <Download className="w-6 h-6" />
                  </motion.button>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative max-w-5xl w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={selectedImage}
                      alt=""
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ WebkitTouchCallout: 'none' }}
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Custom Clear Chat Confirmation Modal ── */}
            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`w-full max-w-sm rounded-[32px] overflow-hidden border shadow-2xl p-8 relative ${isDarkMode ? "bg-[#233138] border-white/10 text-white" : "bg-white border-black/10 text-black"
                      }`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                        <Trash2 className="w-8 h-8 text-destructive" />
                      </div>
                      <h3 className="text-xl font-black mb-3 tracking-tight">Clear all messages?</h3>
                      <p className="text-sm opacity-60 font-medium mb-8">
                        This will permanently delete all messages in this room for everyone. This action cannot be undone.
                      </p>
                      <div className="flex flex-col w-full gap-3">
                        <button
                          onClick={() => {
                            clearChat();
                            setShowClearConfirm(false);
                          }}
                          className="w-full py-4 rounded-2xl text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-destructive/30 bg-[linear-gradient(45deg,#4a0000,#ff1a1a,#4a0000)] animate-gradient"
                        >
                          Yes, Clear Everything
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white/70" : "bg-black/5 hover:bg-black/10 text-black/60"
                            }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phone Action Modal ── */}
            <AnimatePresence>
              {selectedPhone && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSelectedPhone(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={`relative w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                      }`}
                  >
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                        {selectedPhone}
                      </h3>
                      <p className="text-xs opacity-50 mb-6 font-medium">Phone Number</p>

                      <div className="space-y-2">
                        <a
                          href={`tel:${selectedPhone}`}
                          onClick={() => setSelectedPhone(null)}
                          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                          Dial the number
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedPhone || "");
                            addNotification("Number copied!", "success");
                            setSelectedPhone(null);
                          }}
                          className={`w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 border ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-black"
                            }`}
                        >
                          Copy number
                        </button>
                        <button
                          onClick={() => setSelectedPhone(null)}
                          className="w-full py-3 text-xs opacity-50 font-bold uppercase tracking-widest hover:opacity-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>{/* end body */}
        </motion.div>{/* end ovii-chat-frame */}
      </motion.div>{/* end ovii-chat-root */}
    </AnimatePresence>
  );
}

```

---

## File: src\components\novario\PasswordModal.tsx

```tsx
import { useState } from "react";
import { motion } from "framer-motion";

export function PasswordModal({ onUnlock }: { onUnlock: (mode: "chat" | "master") => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val === "112233") {
      onUnlock("chat");
    } else {
      setErr("Wrong key. Try again.");
      setShake((s) => s + 1);
    }
  };

  const [showHint, setShowHint] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.form
        key={shake}
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, x: shake > 0 ? [0, -10, 10, -8, 8, 0] : 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-elegant"
      >
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full gradient-gold flex items-center justify-center text-2xl">🔒</div>
          <h1 className="serif text-2xl font-bold">OVii</h1>
          <p className="text-xs text-muted-foreground mt-1">Private channel · enter key to continue</p>
        </div>
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(""); }}
          placeholder="••••••"
          className="w-full text-center tracking-[0.6em] text-lg rounded-lg bg-background border border-border px-4 py-3 focus:border-primary focus:outline-none"
        />
        {err && <div className="mt-3 text-xs text-destructive text-center">{err}</div>}
        <button type="submit" className="mt-5 w-full rounded-lg bg-primary text-primary-foreground py-3 font-bold hover:opacity-90">
          Unlock
        </button>
        
        <button type="button" onClick={() => setShowHint(!showHint)} className="mt-3 w-full text-xs text-muted-foreground hover:text-primary transition-colors">
          Forgot PIN
        </button>
        
        {showHint && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg text-center border border-border">
            <span className="block text-xl font-bold text-primary mb-1">आँसू</span>
            <span className="text-xs text-muted-foreground tracking-[0.3em]">अ आ इ ई उ ऊ</span>
          </div>
        )}

        <div className="mt-4 text-center text-[10px] text-muted-foreground/70 uppercase tracking-widest">
          end-to-anonymous
        </div>
      </motion.form>
    </div>
  );
}

```

---

## File: src\components\novario\ShareCard.tsx

```tsx
import React, { useState, MouseEvent } from "react";
import { X, Share2, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function ShareCard({
  isOpen,
  onClose,
  title,
  image,
  category
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  category: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md flex flex-col items-center perspective-1000"
        style={{ perspective: 1000 }}
      >
        <button onClick={onClose} className="fixed top-6 right-6 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors z-[100] shadow-lg border border-white/20">
          <X className="w-6 h-6" />
        </button>

        {/* 3D Interactive Card */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
          className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 bg-black cursor-grab active:cursor-grabbing"
        >
          {/* Card Background Image (Blurred base) */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-125"
            style={{ backgroundImage: `url(${image})` }} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/50 to-black/90 mix-blend-overlay" />

          {/* Floating Image Layer */}
          <motion.div 
            style={{ transform: "translateZ(50px)" }}
            className="absolute top-8 left-8 right-8 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={image} alt="Story bg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>

          {/* Floating Content Layer */}
          <motion.div 
            style={{ transform: "translateZ(80px)" }}
            className="absolute bottom-8 left-8 right-8 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg">
              <Sparkles className="w-3 h-3 text-gold" /> {category}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight serif drop-shadow-xl text-balance">
              "{title}"
            </h2>
            
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/20 w-full">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shadow-lg border border-white/20">
                <span className="text-black font-black text-xl serif">N</span>
              </div>
              <div>
                <div className="text-white font-black tracking-wide text-sm drop-shadow-md">NOVARIO NEWS</div>
                <div className="text-white/60 text-xs font-medium">Read the full story</div>
              </div>
            </div>
          </motion.div>

          {/* Shimmer Effect overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 mix-blend-overlay" />
        </motion.div>
        
        <div className="mt-8 text-center space-y-4 w-full">
          <p className="text-sm text-white/70 font-medium">
            Screenshot to share on Instagram Story
          </p>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "Novario News", text: title, url: window.location.href });
              } else {
                alert("Native sharing not supported on this browser.");
              }
            }}
            className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl"
          >
            <Share2 className="w-5 h-5" /> Share Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}

```

---

## File: src\components\novario\TrendingPeople.tsx

```tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchWikipediaFallback, type RemoteArticle } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";

const TRENDING_FIGURES = [
  "Elon Musk", "Taylor Swift", "Sam Altman", "Virat Kohli", "Zendaya", "MrBeast",
  "Cristiano Ronaldo", "Lionel Messi", "LeBron James", "Donald Trump", "Joe Biden",
  "Barack Obama", "Narendra Modi", "Shah Rukh Khan", "Tom Cruise", "Leonardo DiCaprio",
  "Keanu Reeves", "Dwayne Johnson", "Selena Gomez", "Ariana Grande", "Justin Bieber",
  "Billie Eilish", "Drake", "Eminem", "Snoop Dogg", "Mark Zuckerberg", "Bill Gates",
  "Jeff Bezos", "Warren Buffett", "Tim Cook", "Sundar Pichai", "Satya Nadella",
  "Jensen Huang", "Ryan Reynolds", "Hugh Jackman", "Scarlett Johansson", "Margot Robbie",
  "Ryan Gosling", "Cillian Murphy", "Robert Downey Jr.", "Chris Hemsworth", "Chris Evans",
  "Tom Holland", "Chris Pratt", "Rihanna", "Beyoncé", "Jay-Z", "Kanye West",
  "Kim Kardashian", "Kylie Jenner"
];

export function TrendingPeople() {
  const [people, setPeople] = useState<RemoteArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        TRENDING_FIGURES.map((name) => fetchWikipediaFallback(name, "Person"))
      );
      // Flatten the array of arrays and filter out failures
      setPeople(results.flat().filter(Boolean));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-6 border-b border-border">
        <h2 className="serif text-2xl font-bold mb-4 px-4 lg:px-0">{t("Trending People")}</h2>
        <div className="flex gap-4 overflow-x-auto px-4 lg:px-0 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-24 h-24 shrink-0 rounded-full bg-card animate-pulse border border-border" />
          ))}
        </div>
      </section>
    );
  }

  if (people.length === 0) return null;

  return (
    <section className="py-6 border-b border-border">
      <h2 className="serif text-2xl font-bold mb-5 px-4 lg:px-0">{t("Trending People")}</h2>
      <div className="flex gap-5 overflow-x-auto px-4 lg:px-0 scrollbar-hide pb-4">
        {people.map((person) => (
          <Link
            key={person.id}
            to="/news/$slug"
            params={{ slug: person.slug }}
            className="group flex flex-col items-center gap-3 shrink-0 w-24 transition-all hover:-translate-y-1"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-md">
              <img
                src={person.image}
                alt={person.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-xs font-bold text-center leading-tight">
              {t(person.title)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

```

---

## File: src\components\novario\TrendingRow.tsx

```tsx
import { Link } from "@tanstack/react-router";
import { ARTICLES, type Article } from "@/lib/news";

type Item = Pick<Article, "id" | "slug" | "title" | "image" | "category" | "publishedAt" | "readTime"> & { trending?: boolean };

export function TrendingRow({ articles }: { articles?: Item[] }) {
  const items: Item[] = articles && articles.length > 0
    ? articles.slice(0, 10)
    : (ARTICLES as Item[]).filter((a) => a.trending);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="serif text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">🔥</span> Trending Now
        </h2>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Updated live</span>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
        {items.map((a, idx) => (
          <Link
            key={a.id}
            to="/news/$slug"
            params={{ slug: a.slug }}
            className="group relative shrink-0 w-72 rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur rounded-full px-2 py-1 text-xs font-bold text-primary">
                #{idx + 1}
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-primary font-semibold uppercase tracking-wide">{a.category}</div>
              <h3 className="mt-1 serif font-bold leading-snug line-clamp-3">{a.title}</h3>
              <div className="mt-3 text-xs text-muted-foreground">{a.publishedAt} • {a.readTime} min</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

```

---

## File: src\components\novario\WeatherWidget.tsx

```tsx
import { useEffect, useState } from "react";
import { detectLocation, fetchWeather, type LocationInfo, type WeatherInfo } from "@/lib/location";

export function WeatherWidget() {
  const [loc, setLoc] = useState<LocationInfo | null>(null);
  const [w, setW] = useState<WeatherInfo | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      const l = await detectLocation();
      if (!alive) return;
      setLoc(l);
      const ww = await fetchWeather(l.lat, l.lon);
      if (alive) setW(ww);
    })();
    return () => { alive = false; };
  }, []);

  if (!loc) {
    return <div className="text-xs text-muted-foreground">Detecting location…</div>;
  }
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-base">{w?.emoji ?? "🌡️"}</span>
      <div className="leading-tight">
        <div className="font-semibold">{loc.city}{loc.region ? `, ${loc.region}` : ""}</div>
        <div className="text-muted-foreground">
          {w ? `${w.tempC}°C · ${w.description}` : "—"}
        </div>
      </div>
    </div>
  );
}

```

---

## File: src\components\ui\accordion.tsx

```tsx
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

---

## File: src\components\ui\alert-dialog.tsx

```tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```

---

## File: src\components\ui\alert.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

```

---

## File: src\components\ui\aspect-ratio.tsx

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

```

---

## File: src\components\ui\avatar.tsx

```tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

```

---

## File: src\components\ui\badge.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```

---

## File: src\components\ui\breadcrumb.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```

---

## File: src\components\ui\button.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

---

## File: src\components\ui\calendar.tsx

```tsx
"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };

```

---

## File: src\components\ui\card.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

```

---

## File: src\components\ui\carousel.tsx

```tsx
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

```

---

## File: src\components\ui\chart.tsx

```tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== "none")
            .map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload.fill || item.color;

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    indicator === "dot" && "items-center",
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              },
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center",
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

```

---

## File: src\components\ui\checkbox.tsx

```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

---

## File: src\components\ui\collapsible.tsx

```tsx
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

---

## File: src\components\ui\command.tsx

```tsx
"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```

---

## File: src\components\ui\context-menu.tsx

```tsx
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```

---

## File: src\components\ui\dialog.tsx

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

```

---

## File: src\components\ui\drawer.tsx

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```

---

## File: src\components\ui\dropdown-menu.tsx

```tsx
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```

---

## File: src\components\ui\form.tsx

```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

```

---

## File: src\components\ui\hover-card.tsx

```tsx
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

---

## File: src\components\ui\input-otp.tsx

```tsx
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

---

## File: src\components\ui\input.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

```

---

## File: src\components\ui\label.tsx

```tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

---

## File: src\components\ui\menubar.tsx

```tsx
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

```

---

## File: src\components\ui\navigation-menu.tsx

```tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

```

---

## File: src\components\ui\pagination.tsx

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

```

---

## File: src\components\ui\popover.tsx

```tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

```

---

## File: src\components\ui\progress.tsx

```tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```

---

## File: src\components\ui\radio-group.tsx

```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

---

## File: src\components\ui\resizable.tsx

```tsx
import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```

---

## File: src\components\ui\scroll-area.tsx

```tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

```

---

## File: src\components\ui\select.tsx

```tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```

---

## File: src\components\ui\separator.tsx

```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```

---

## File: src\components\ui\sheet.tsx

```tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

```

---

## File: src\components\ui\sidebar.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          )}
        />
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  },
);
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        {...props}
      />
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  ),
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  ),
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ ...props }, ref) => <li ref={ref} {...props} />,
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

---

## File: src\components\ui\skeleton.tsx

```tsx
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />;
}

export { Skeleton };

```

---

## File: src\components\ui\slider.tsx

```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

---

## File: src\components\ui\sonner.tsx

```tsx
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

```

---

## File: src\components\ui\switch.tsx

```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```

---

## File: src\components\ui\table.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

```

---

## File: src\components\ui\tabs.tsx

```tsx
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

---

## File: src\components\ui\textarea.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

```

---

## File: src\components\ui\toggle-group.tsx

```tsx
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

```

---

## File: src\components\ui\toggle.tsx

```tsx
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

```

---

## File: src\components\ui\tooltip.tsx

```tsx
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

---

## File: src\hooks\use-mobile.tsx

```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

---

## File: src\lib\avatars.ts

```ts
// 16 premium 3D Pixar-style avatars (Headshots)
export const AVATARS = [
  { id: "boy1", name: "Alex", url: "/avatars/boy1.png", color: "#6EC6F5" },
  { id: "girl1", name: "Mia", url: "/avatars/girl1.png", color: "#FB7185" },
  { id: "boy2", name: "Zane", url: "/avatars/boy2.png", color: "#38BDF8" },
  { id: "girl2", name: "Luna", url: "/avatars/girl2.png", color: "#A78BFA" },
  { id: "boy3", name: "Leo", url: "/avatars/boy3.png", color: "#FBBF24" },
  { id: "girl3", name: "Hana", url: "/avatars/girl3.png", color: "#10B981" },
  { id: "boy4", name: "Finn", url: "/avatars/boy4.png", color: "#94a3b8" },
  { id: "girl4", name: "Ava", url: "/avatars/girl4.png", color: "#facc15" },
  { id: "boy5", name: "Kai", url: "/avatars/boy5.png", color: "#60a5fa" },
  { id: "girl5", name: "Emi", url: "/avatars/girl5.png", color: "#f472b6" },
  { id: "boy6", name: "Jace", url: "/avatars/boy6.png", color: "#4ade80" },
  { id: "girl6", name: "Mila", url: "/avatars/girl6.png", color: "#c084fc" },
  { id: "boy7", name: "Hugo", url: "/avatars/boy7.png", color: "#fb923c" },
  { id: "girl7", name: "Zoe", url: "/avatars/girl7.png", color: "#2dd4bf" },
  { id: "boy8", name: "Otis", url: "/avatars/boy8.png", color: "#fcd34d" },
  { id: "girl8", name: "Ivy", url: "/avatars/girl8.png", color: "#f87171" },
];

export function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

```

---

## File: src\lib\cities.ts

```ts
// Curated list of well-known cities for the Novario Newsroom.
// Population is kept in the type for future use but never shown in the UI.
export type City = { city: string; country: string; pop?: number };

export const INDIA_CITIES: City[] = [
  { city: "Delhi", country: "India" },
  { city: "Mumbai", country: "India" },
  { city: "Kolkata", country: "India" },
  { city: "Bangalore", country: "India" },
  { city: "Chennai", country: "India" },
  { city: "Hyderabad", country: "India" },
  { city: "Pune", country: "India" },
  { city: "Ahmedabad", country: "India" },
  { city: "Surat", country: "India" },
  { city: "Prayagraj", country: "India" },
  { city: "Lucknow", country: "India" },
  { city: "Jaipur", country: "India" },
  { city: "Nagpur", country: "India" },
  { city: "Ghaziabad", country: "India" },
  { city: "Vadodara", country: "India" },
  { city: "Rajkot", country: "India" },
  { city: "Visakhapatnam", country: "India" },
  { city: "Indore", country: "India" },
  { city: "Thane", country: "India" },
  { city: "Bhopal", country: "India" },
  { city: "Agra", country: "India" },
  { city: "Pimpri-Chinchwad", country: "India" },
  { city: "Patna", country: "India" },
  { city: "Ludhiana", country: "India" },
  { city: "Madurai", country: "India" },
  { city: "Jamshedpur", country: "India" },
  { city: "Nashik", country: "India" },
  { city: "Vijayawada", country: "India" },
  { city: "Faridabad", country: "India" },
  { city: "Meerut", country: "India" },
  { city: "Jabalpur", country: "India" },
  { city: "Varanasi", country: "India" },
  { city: "Srinagar", country: "India" },
  { city: "Aurangabad", country: "India" },
  { city: "Amritsar", country: "India" },
  { city: "Guwahati", country: "India" },
  { city: "Ranchi", country: "India" },
  { city: "Gwalior", country: "India" },
  { city: "Chandigarh", country: "India" },
  { city: "Jodhpur", country: "India" },
  { city: "Raipur", country: "India" },
  { city: "Kochi", country: "India" },
  { city: "Coimbatore", country: "India" },
  { city: "Mysuru", country: "India" },
  { city: "Dehradun", country: "India" },
  { city: "Bhubaneswar", country: "India" },
  { city: "Goa", country: "India" },
  { city: "Shimla", country: "India" },
];

export const WORLD_CITIES: City[] = [
  { city: "New York", country: "United States" },
  { city: "London", country: "United Kingdom" },
  { city: "Tokyo", country: "Japan" },
  { city: "Paris", country: "France" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Singapore", country: "Singapore" },
  { city: "Hong Kong", country: "Hong Kong" },
  { city: "Sydney", country: "Australia" },
  { city: "Toronto", country: "Canada" },
  { city: "Berlin", country: "Germany" },
  { city: "Moscow", country: "Russia" },
  { city: "Beijing", country: "China" },
  { city: "Shanghai", country: "China" },
  { city: "Seoul", country: "South Korea" },
  { city: "Bangkok", country: "Thailand" },
  { city: "Kuala Lumpur", country: "Malaysia" },
  { city: "Jakarta", country: "Indonesia" },
  { city: "Manila", country: "Philippines" },
  { city: "Karachi", country: "Pakistan" },
  { city: "Dhaka", country: "Bangladesh" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Tehran", country: "Iran" },
  { city: "Riyadh", country: "Saudi Arabia" },
  { city: "Cairo", country: "Egypt" },
  { city: "Johannesburg", country: "South Africa" },
  { city: "Lagos", country: "Nigeria" },
  { city: "Nairobi", country: "Kenya" },
  { city: "Mexico City", country: "Mexico" },
  { city: "São Paulo", country: "Brazil" },
  { city: "Rio de Janeiro", country: "Brazil" },
  { city: "Buenos Aires", country: "Argentina" },
  { city: "Lima", country: "Peru" },
  { city: "Bogota", country: "Colombia" },
  { city: "Los Angeles", country: "United States" },
  { city: "Chicago", country: "United States" },
  { city: "San Francisco", country: "United States" },
  { city: "Washington", country: "United States" },
  { city: "Miami", country: "United States" },
  { city: "Vancouver", country: "Canada" },
  { city: "Madrid", country: "Spain" },
  { city: "Barcelona", country: "Spain" },
  { city: "Rome", country: "Italy" },
  { city: "Milan", country: "Italy" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Brussels", country: "Belgium" },
  { city: "Vienna", country: "Austria" },
  { city: "Zurich", country: "Switzerland" },
  { city: "Stockholm", country: "Sweden" },
  { city: "Oslo", country: "Norway" },
  { city: "Copenhagen", country: "Denmark" },
  { city: "Dublin", country: "Ireland" },
  { city: "Lisbon", country: "Portugal" },
  { city: "Athens", country: "Greece" },
  { city: "Warsaw", country: "Poland" },
  { city: "Prague", country: "Czechia" },
  { city: "Tel Aviv", country: "Israel" },
  { city: "Doha", country: "Qatar" },
  { city: "Auckland", country: "New Zealand" },
];

```

---

## File: src\lib\crypto.ts

```ts
// Web Crypto API - End-to-End Encryption for Ovii Chat
// Uses AES-GCM symmetric encryption. Key is derived from roomId.

const ALGO = "AES-GCM";
const KEY_LENGTH = 256;

async function deriveKey(roomId: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(roomId.padEnd(32, "0").slice(0, 32)),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("ovii-salt-2024"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGO, length: KEY_LENGTH },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(text: string, roomId: string): Promise<string> {
  try {
    const key = await deriveKey(roomId);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      { name: ALGO, iv },
      key,
      enc.encode(text)
    );
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...combined));
  } catch {
    return text; // fallback
  }
}

export async function decryptMessage(ciphertext: string, roomId: string): Promise<string> {
  try {
    const key = await deriveKey(roomId);
    const combined = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt({ name: ALGO, iv }, key, data);
    return new TextDecoder().decode(decrypted);
  } catch {
    return ciphertext; // fallback
  }
}

```

---

## File: src\lib\firebase.ts

```ts
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDITTDkAnnltIZA1EZAKxY4A7KBUbAqqpM",
  authDomain: "zulad-89115.firebaseapp.com",
  projectId: "zulad-89115",
  storageBucket: "zulad-89115.firebasestorage.app",
  messagingSenderId: "389509460096",
  appId: "1:389509460096:web:cfe55f4ebded136bbf7665",
  measurementId: "G-LMN9LKP9WG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function ensureAnonAuth(): Promise<User> {
  return new Promise((resolve, reject) => {
    const current = auth.currentUser;
    if (current) { resolve(current); return; }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        try {
          const credential = await signInAnonymously(auth);
          resolve(credential.user);
        } catch (err) { reject(err); }
      }
    }, reject);
  });
}

```

---

## File: src\lib\i18n.tsx

```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TranslationContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: (text: string) => string;
};

const TranslationContext = createContext<TranslationContextType>({
  lang: "en",
  setLang: () => {},
  t: (text: string) => text,
});

const CACHE_KEY = "novario-translations-cache";

// Simple in-memory cache to avoid duplicate API calls
const memCache: Record<string, Record<string, string>> = {};
let localCache: Record<string, Record<string, string>> = {};

try {
  localCache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
} catch (e) {
  localCache = {};
}

// Ensure nested object exists
const getCacheObj = (lang: string) => {
  if (!localCache[lang]) localCache[lang] = {};
  if (!memCache[lang]) memCache[lang] = {};
};

const saveCache = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(localCache));
  } catch (e) {}
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Try to load user's last selected language, default to 'en'
  const [lang, setLangState] = useState<string>(() => {
    try {
      return localStorage.getItem("novario-lang") || "en";
    } catch {
      return "en";
    }
  });

  const [tick, setTick] = useState(0); // Used to force re-render when a new translation arrives

  const setLang = (newLang: string) => {
    // Extract base language code (e.g., 'hi-IN' -> 'hi'), except for 'zh'
    let gtCode = newLang;
    if (newLang !== 'en' && newLang.includes("-") && !newLang.startsWith("zh")) {
      gtCode = newLang.split("-")[0];
    }
    
    setLangState(gtCode);
    try {
      localStorage.setItem("novario-lang", gtCode);
    } catch {}
  };

  const translateText = async (text: string, targetLang: string) => {
    if (!text || text.trim() === "" || targetLang === "en") return;
    
    getCacheObj(targetLang);

    // If we already have it, no need to fetch
    if (localCache[targetLang][text] || memCache[targetLang][text]) return;

    // Mark as fetching to avoid concurrent duplicate requests
    memCache[targetLang][text] = "fetching...";

    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      
      let translated = "";
      if (data && data[0]) {
        for (let i = 0; i < data[0].length; i++) {
          translated += data[0][i][0];
        }
      }

      if (translated) {
        localCache[targetLang][text] = translated;
        memCache[targetLang][text] = translated;
        saveCache();
        // Force a re-render so components get the new text
        setTick((t) => t + 1);
      } else {
        delete memCache[targetLang][text];
      }
    } catch (e) {
      console.error("Translation failed for:", text, e);
      delete memCache[targetLang][text];
    }
  };

  const t = (text: string): string => {
    if (!text || lang === "en" || lang === "zulad") return text;
    
    getCacheObj(lang);

    // Return from cache if available
    const cached = localCache[lang][text];
    if (cached) return cached;

    // If not in cache and not currently fetching, initiate fetch
    if (!memCache[lang][text]) {
      translateText(text, lang);
    }

    // Return original text temporarily while fetching
    return text;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}

```

---

## File: src\lib\languages.ts

```ts
export type Language = {
  code: string;
  native: string;
  english: string;
  region: string;
};

// 70+ language-region combinations + the special "Zulad" entry
export const LANGUAGES: Language[] = [
  { code: "en-IN", native: "English", english: "English", region: "India" },
  { code: "en-US", native: "English", english: "English", region: "United States" },
  { code: "en-GB", native: "English", english: "English", region: "United Kingdom" },
  { code: "en-AU", native: "English", english: "English", region: "Australia" },
  { code: "en-CA", native: "English", english: "English", region: "Canada" },
  { code: "en-NZ", native: "English", english: "English", region: "New Zealand" },
  { code: "en-IE", native: "English", english: "English", region: "Ireland" },
  { code: "en-ZA", native: "English", english: "English", region: "South Africa" },
  { code: "hi-IN", native: "हिन्दी", english: "Hindi", region: "India" },
  { code: "bn-IN", native: "বাংলা", english: "Bengali", region: "India" },
  { code: "bn-BD", native: "বাংলা", english: "Bengali", region: "Bangladesh" },
  { code: "ta-IN", native: "தமிழ்", english: "Tamil", region: "India" },
  { code: "te-IN", native: "తెలుగు", english: "Telugu", region: "India" },
  { code: "mr-IN", native: "मराठी", english: "Marathi", region: "India" },
  { code: "gu-IN", native: "ગુજરાતી", english: "Gujarati", region: "India" },
  { code: "kn-IN", native: "ಕನ್ನಡ", english: "Kannada", region: "India" },
  { code: "ml-IN", native: "മലയാളം", english: "Malayalam", region: "India" },
  { code: "pa-IN", native: "ਪੰਜਾਬੀ", english: "Punjabi", region: "India" },
  { code: "or-IN", native: "ଓଡ଼ିଆ", english: "Odia", region: "India" },
  { code: "as-IN", native: "অসমীয়া", english: "Assamese", region: "India" },
  { code: "ur-IN", native: "اردو", english: "Urdu", region: "India" },
  { code: "ur-PK", native: "اردو", english: "Urdu", region: "Pakistan" },
  { code: "ne-NP", native: "नेपाली", english: "Nepali", region: "Nepal" },
  { code: "si-LK", native: "සිංහල", english: "Sinhala", region: "Sri Lanka" },
  { code: "es-ES", native: "Español", english: "Spanish", region: "Spain" },
  { code: "es-MX", native: "Español", english: "Spanish", region: "Mexico" },
  { code: "es-AR", native: "Español", english: "Spanish", region: "Argentina" },
  { code: "es-CO", native: "Español", english: "Spanish", region: "Colombia" },
  { code: "es-CL", native: "Español", english: "Spanish", region: "Chile" },
  { code: "es-US", native: "Español", english: "Spanish", region: "United States" },
  { code: "pt-BR", native: "Português", english: "Portuguese", region: "Brazil" },
  { code: "pt-PT", native: "Português", english: "Portuguese", region: "Portugal" },
  { code: "fr-FR", native: "Français", english: "French", region: "France" },
  { code: "fr-CA", native: "Français", english: "French", region: "Canada" },
  { code: "fr-BE", native: "Français", english: "French", region: "Belgium" },
  { code: "fr-CH", native: "Français", english: "French", region: "Switzerland" },
  { code: "de-DE", native: "Deutsch", english: "German", region: "Germany" },
  { code: "de-AT", native: "Deutsch", english: "German", region: "Austria" },
  { code: "de-CH", native: "Deutsch", english: "German", region: "Switzerland" },
  { code: "it-IT", native: "Italiano", english: "Italian", region: "Italy" },
  { code: "nl-NL", native: "Nederlands", english: "Dutch", region: "Netherlands" },
  { code: "nl-BE", native: "Nederlands", english: "Dutch", region: "Belgium" },
  { code: "sv-SE", native: "Svenska", english: "Swedish", region: "Sweden" },
  { code: "no-NO", native: "Norsk", english: "Norwegian", region: "Norway" },
  { code: "da-DK", native: "Dansk", english: "Danish", region: "Denmark" },
  { code: "fi-FI", native: "Suomi", english: "Finnish", region: "Finland" },
  { code: "is-IS", native: "Íslenska", english: "Icelandic", region: "Iceland" },
  { code: "pl-PL", native: "Polski", english: "Polish", region: "Poland" },
  { code: "cs-CZ", native: "Čeština", english: "Czech", region: "Czechia" },
  { code: "sk-SK", native: "Slovenčina", english: "Slovak", region: "Slovakia" },
  { code: "hu-HU", native: "Magyar", english: "Hungarian", region: "Hungary" },
  { code: "ro-RO", native: "Română", english: "Romanian", region: "Romania" },
  { code: "bg-BG", native: "Български", english: "Bulgarian", region: "Bulgaria" },
  { code: "el-GR", native: "Ελληνικά", english: "Greek", region: "Greece" },
  { code: "tr-TR", native: "Türkçe", english: "Turkish", region: "Türkiye" },
  { code: "ru-RU", native: "Русский", english: "Russian", region: "Russia" },
  { code: "uk-UA", native: "Українська", english: "Ukrainian", region: "Ukraine" },
  { code: "ar-SA", native: "العربية", english: "Arabic", region: "Saudi Arabia" },
  { code: "ar-AE", native: "العربية", english: "Arabic", region: "UAE" },
  { code: "ar-EG", native: "العربية", english: "Arabic", region: "Egypt" },
  { code: "ar-MA", native: "العربية", english: "Arabic", region: "Morocco" },
  { code: "he-IL", native: "עברית", english: "Hebrew", region: "Israel" },
  { code: "fa-IR", native: "فارسی", english: "Persian", region: "Iran" },
  { code: "zh-CN", native: "中文", english: "Chinese (Simplified)", region: "China" },
  { code: "zh-TW", native: "中文", english: "Chinese (Traditional)", region: "Taiwan" },
  { code: "zh-HK", native: "中文", english: "Chinese (Cantonese)", region: "Hong Kong" },
  { code: "ja-JP", native: "日本語", english: "Japanese", region: "Japan" },
  { code: "ko-KR", native: "한국어", english: "Korean", region: "South Korea" },
  { code: "th-TH", native: "ไทย", english: "Thai", region: "Thailand" },
  { code: "vi-VN", native: "Tiếng Việt", english: "Vietnamese", region: "Vietnam" },
  { code: "id-ID", native: "Bahasa Indonesia", english: "Indonesian", region: "Indonesia" },
  { code: "ms-MY", native: "Bahasa Melayu", english: "Malay", region: "Malaysia" },
  { code: "fil-PH", native: "Filipino", english: "Filipino", region: "Philippines" },
  { code: "km-KH", native: "ខ្មែរ", english: "Khmer", region: "Cambodia" },
  { code: "my-MM", native: "မြန်မာ", english: "Burmese", region: "Myanmar" },
  { code: "sw-KE", native: "Kiswahili", english: "Swahili", region: "Kenya" },
  { code: "am-ET", native: "አማርኛ", english: "Amharic", region: "Ethiopia" },
  { code: "yo-NG", native: "Yorùbá", english: "Yoruba", region: "Nigeria" },
  { code: "zu-ZA", native: "isiZulu", english: "Zulu", region: "South Africa" },
  // Hidden door — placed naturally in the alphabetical tail, not highlighted
  { code: "zulad", native: "Zulad", english: "Zulad", region: "" },
];

```

---

## File: src\lib\location.ts

```ts
export type LocationInfo = {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
};

export type WeatherInfo = {
  tempC: number;
  code: number;
  description: string;
  emoji: string;
};

const FALLBACK: LocationInfo = {
  city: "Indore",
  region: "Madhya Pradesh",
  country: "India",
  lat: 22.7196,
  lon: 75.8577,
};

export async function detectLocation(): Promise<LocationInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) throw new Error("ipapi failed");
    const j = await res.json();
    if (!j.city) throw new Error("no city");
    return {
      city: j.city,
      region: j.region || "",
      country: j.country_name || "",
      lat: Number(j.latitude),
      lon: Number(j.longitude),
    };
  } catch {
    return FALLBACK;
  }
}

const WEATHER_CODES: Record<number, { d: string; e: string }> = {
  0: { d: "Clear sky", e: "☀️" },
  1: { d: "Mostly clear", e: "🌤️" },
  2: { d: "Partly cloudy", e: "⛅" },
  3: { d: "Overcast", e: "☁️" },
  45: { d: "Foggy", e: "🌫️" },
  48: { d: "Foggy", e: "🌫️" },
  51: { d: "Light drizzle", e: "🌦️" },
  61: { d: "Light rain", e: "🌧️" },
  63: { d: "Rain", e: "🌧️" },
  65: { d: "Heavy rain", e: "⛈️" },
  71: { d: "Snow", e: "🌨️" },
  80: { d: "Showers", e: "🌦️" },
  95: { d: "Thunderstorm", e: "⛈️" },
};

export async function fetchWeather(lat: number, lon: number): Promise<WeatherInfo | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const j = await res.json();
    const code = j.current?.weather_code ?? 0;
    const meta = WEATHER_CODES[code] || { d: "Fair", e: "🌡️" };
    return {
      tempC: Math.round(j.current?.temperature_2m ?? 0),
      code,
      description: meta.d,
      emoji: meta.e,
    };
  } catch {
    return null;
  }
}

```

---

## File: src\lib\news.ts

```ts
import { fetchBingImage, getPicsumFallback } from "../server/newsapi.functions";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  trending?: boolean;
  breaking?: boolean;
};

export const CATEGORIES = ["Top", "India", "World", "Business", "Tech", "Sports", "Entertainment", "Science"] as const;

export const BREAKING: string[] = [
  "BREAKING: RBI holds repo rate at 6.5% for the seventh consecutive review",
  "ISRO confirms successful docking of SpaDeX modules in low-earth orbit",
  "Madhya Pradesh signs ₹4,200 crore green hydrogen MoU with two global firms",
  "Sensex closes 612 points higher; Nifty reclaims 24,800 mark",
  "Heavy rain alert: IMD issues orange warning for 12 districts in central India",
  "Indian women's cricket team clinches T20 series 3-1 against Australia",
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "mp-industrial-growth",
    title: "Madhya Pradesh emerges as India's new industrial powerhouse with record FDI",
    excerpt:
      "With ₹15.4 lakh crore in fresh investment commitments and three new industrial corridors approved, Madhya Pradesh is rewriting the manufacturing map of India.",
    body: [
      "INDORE — Madhya Pradesh has quietly become one of the most aggressive industrial destinations in the country, attracting a record ₹15.4 lakh crore in investment commitments over the past eighteen months. Industry watchers say the state's combination of central location, low logistics cost, and a streamlined single-window clearance system has begun to draw manufacturers that historically favoured Gujarat or Tamil Nadu.",
      "The Global Investors Summit held in Bhopal earlier this year was followed by ground-breakings in Pithampur, Mandideep, Ratlam and Dewas. Together these clusters are expected to generate close to 9.2 lakh direct jobs by 2028, according to projections shared by the state's Department of Industrial Policy and Investment Promotion.",
      "Semiconductor packaging, EV battery cells, and pharmaceutical APIs make up nearly 40% of the new pipeline. A consortium led by a Taiwanese fab partner has signed an MoU for a 28nm OSAT facility outside Indore — the first of its scale in central India.",
      "Logistics infrastructure is keeping pace. The Indore–Manmad rail corridor, long delayed, has cleared its final environmental hurdles and tendering will begin next quarter. The Delhi–Mumbai Expressway already cuts truck transit from Indore to JNPT to under 14 hours.",
      "\"The story used to be Bengaluru and Hyderabad for software, Chennai and Pune for cars,\" said Dr. Anjali Verma, an industrial economist at IIM Indore. \"That story now includes Indore and Bhopal, and not as supporting characters.\"",
      "Critics caution that water availability and grid reliability remain real constraints, particularly in the Malwa belt. The state has earmarked ₹6,800 crore for industrial water reuse and a dedicated 765kV transmission ring is under construction.",
      "For residents of Indore — already India's cleanest city for the seventh year running — the next chapter appears to be industrial as much as civic.",
    ],
    image: "__bing__",
    category: "Business",
    author: "Rohan Mehta",
    publishedAt: "2 hours ago",
    readTime: 6,
    trending: true,
    breaking: true,
  },
  {
    id: "2",
    slug: "isro-spadex",
    title: "ISRO's SpaDeX mission achieves historic in-orbit docking",
    excerpt: "India becomes the fourth nation to demonstrate autonomous space docking, paving the way for Bharatiya Antariksh Station.",
    body: ["BENGALURU — In a milestone that places India in an exclusive club, ISRO confirmed that the two SpaDeX satellites successfully completed an autonomous docking maneuver at 06:20 IST.", "The capability is foundational for the Bharatiya Antariksh Station and for crewed Gaganyaan follow-on missions.", "Chairman S. Somanath called it \"a quiet triumph of indigenous guidance, navigation and control\"."],
    image: "__bing__",
    category: "Science",
    author: "Priya Iyer",
    publishedAt: "4 hours ago",
    readTime: 4,
    trending: true,
  },
  {
    id: "3",
    slug: "rbi-policy",
    title: "RBI holds repo rate, signals cautious optimism on inflation trajectory",
    excerpt: "Governor flags resilient growth but warns of geopolitical risks to crude prices.",
    body: ["MUMBAI — The Reserve Bank of India's Monetary Policy Committee voted 5-1 to keep the repo rate unchanged at 6.5%."],
    image: "__bing__",
    category: "Business",
    author: "Karan Shah",
    publishedAt: "5 hours ago",
    readTime: 3,
    trending: true,
  },
  {
    id: "4",
    slug: "tech-ai-india",
    title: "India's AI compute capacity to triple by 2026, government tells parliament",
    excerpt: "MeitY outlines ₹10,372 crore IndiaAI Mission deployment roadmap.",
    body: ["NEW DELHI — The IndiaAI Mission has commissioned its first 14,000-GPU cluster."],
    image: "__bing__",
    category: "Tech",
    author: "Neha Gupta",
    publishedAt: "7 hours ago",
    readTime: 5,
    trending: true,
  },
  {
    id: "5",
    slug: "world-summit",
    title: "G20 sherpas convene in Cape Town to draft climate finance framework",
    excerpt: "Developing nations push for tripling of concessional finance commitments.",
    body: ["CAPE TOWN — Negotiators from twenty major economies began three days of closed-door talks."],
    image: "__bing__",
    category: "World",
    author: "James Okafor",
    publishedAt: "9 hours ago",
    readTime: 4,
  },
  {
    id: "6",
    slug: "sports-cricket",
    title: "Smriti Mandhana's century powers India to historic series win",
    excerpt: "Captain's unbeaten 117 seals 3-1 T20I series triumph over Australia.",
    body: ["MELBOURNE — Smriti Mandhana hit her fifth T20I century to chase down 198."],
    image: "__bing__",
    category: "Sports",
    author: "Vikas Rao",
    publishedAt: "11 hours ago",
    readTime: 3,
  },
  {
    id: "7",
    slug: "ent-bollywood",
    title: "Indian cinema dominates Busan with three feature premieres",
    excerpt: "Regional language films from Kerala, Assam and Maharashtra take centre stage.",
    body: ["BUSAN — Three Indian features premiered to standing ovations at the Busan International Film Festival."],
    image: "__bing__",
    category: "Entertainment",
    author: "Anaya Kapoor",
    publishedAt: "13 hours ago",
    readTime: 4,
  },
  {
    id: "8",
    slug: "india-infra",
    title: "Vande Bharat sleeper trials clear 180 km/h benchmark on Kota stretch",
    excerpt: "Indigenous sleeper rake to enter commercial service by March.",
    body: ["KOTA — The first prototype Vande Bharat sleeper rake completed high-speed trials."],
    image: "__bing__",
    category: "India",
    author: "Sanjay Pillai",
    publishedAt: "15 hours ago",
    readTime: 3,
  },
  {
    id: "9",
    slug: "tech-startup",
    title: "Bengaluru deep-tech startup raises $120M to scale silicon photonics",
    excerpt: "Series C led by sovereign fund signals maturing hardware ecosystem.",
    body: ["BENGALURU — A four-year-old silicon photonics startup announced a $120 million Series C round."],
    image: "__bing__",
    category: "Tech",
    author: "Meera Singh",
    publishedAt: "18 hours ago",
    readTime: 4,
  },
];

/** Populate images for every static article via Bing Image Search (runs once). */
let imagesInitialised = false;
export async function initArticleImages() {
  if (imagesInitialised) return;
  imagesInitialised = true;
  await Promise.all(
    ARTICLES.map(async (article) => {
      if (article.image === "__bing__") {
        const img = await fetchBingImage(article.title);
        article.image = img || getPicsumFallback(article.title);
      }
    })
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

```

---

## File: src\lib\utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---

## File: src\main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import { initArticleImages } from "./lib/news";
import "./styles.css";

// Pre-fetch logic moved to news-related routes for faster initial load.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const router = getRouter();

import { TranslationProvider } from "./lib/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TranslationProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </TranslationProvider>
  </StrictMode>,
);

```

---

## File: src\router.tsx

```tsx
import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        {import.meta.env.DEV && error.message && (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};

```

---

## File: src\routes\about.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Novario" },
      { name: "description", content: "Novario is independent journalism for a connected India, with newsrooms in 14 cities." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
        <h1 className="serif text-4xl md:text-5xl font-extrabold">About Novario</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Novario is independent journalism for a connected India. We publish premium reporting
          from newsrooms in 14 cities, covering the stories that move markets, shape policy,
          and define our culture.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { k: "14", v: "Newsroom cities" },
            { k: "260+", v: "Journalists & editors" },
            { k: "9M", v: "Monthly readers" },
          ].map((s) => (
            <div key={s.v} className="rounded-xl border border-border bg-card p-6">
              <div className="serif text-3xl font-bold text-primary">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
        <h2 className="serif text-2xl font-bold mt-12">Our charter</h2>
        <p className="mt-3 text-foreground/90 leading-relaxed">
          Accuracy before speed. Sources before opinions. Readers before advertisers. We
          publish corrections in public, fund original reporting from subscriber revenue, and
          decline stories we cannot independently verify.
        </p>
      </main>
      <BottomNav />
    </div>
  );
}

```

---

## File: src\routes\contact.tsx

```tsx
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Novario" },
      { name: "description", content: "Reach the Novario newsroom, tip line, and corrections desk." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
        <h1 className="serif text-4xl md:text-5xl font-extrabold">Contact Novario</h1>
        <p className="mt-4 text-muted-foreground">
          Tips, corrections, partnerships — we read everything.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Newsroom</div>
            <div className="mt-1 font-medium">tips@novario.in</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Corrections</div>
            <div className="mt-1 font-medium">corrections@novario.in</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Press</div>
            <div className="mt-1 font-medium">press@novario.in</div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-10 rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Your name" className="rounded-md bg-background border border-border px-3 py-2 text-sm" />
            <input required type="email" placeholder="you@email.com" className="rounded-md bg-background border border-border px-3 py-2 text-sm" />
          </div>
          <textarea required rows={5} placeholder="Your message" className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm" />
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90">
            {sent ? "✓ Sent" : "Send message"}
          </button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}

```

---

## File: src\routes\index.tsx

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/news" });
  },
  component: () => null,
});

```

---

## File: src\routes\news.$slug.tsx

```tsx
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { useState } from "react";
import { getArticle, getNews } from "@/server/newsapi.functions";
import { LiveIllustration } from "@/components/novario/LiveIllustration";
import { ArticleTimeline } from "@/components/novario/ArticleTimeline";
import { ShareCard } from "@/components/novario/ShareCard";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const { article } = await getArticle(params.slug);
    if (!article) throw notFound();
    const { articles } = await getNews(article.category);
    const related = articles.filter((a: any) => a.slug !== article.slug).slice(0, 3);
    return { article, related };
  },
  component: ArticlePage,
  errorComponent: ({ error }) => <div className="p-10 text-center text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center p-10">
      <div>
        <h1 className="serif text-3xl font-bold">Story not found</h1>
        <p className="text-muted-foreground mt-2">It may have rolled off the live wire.</p>
        <Link to="/news" className="text-primary mt-4 inline-block">Back to Novario</Link>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const [isShareOpen, setShareOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground flex flex-col relative"
    >
      <LiveIllustration category={article.category} />
      
      <div className="z-10 flex flex-col flex-1">
        <Header />
        <BreakingTicker />

        <article className="mx-auto max-w-3xl w-full px-4 pt-10 pb-16 flex-1">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider mb-4">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 font-bold">{article.category}</span>
            <span className="text-muted-foreground">{article.publishedAt} · {article.readTime} min read</span>
          </div>
          <h1 className="serif text-4xl md:text-5xl font-extrabold leading-tight text-balance">{article.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>

          <div className="mt-6 flex items-center justify-between gap-3 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center font-bold text-primary-foreground">
                {article.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-sm">{article.author}</div>
                <div className="text-xs text-muted-foreground">{article.source} · via Novario</div>
              </div>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Read source ↗</a>
          </div>

          <div className="my-8 rounded-xl overflow-hidden shadow-elegant">
            <img src={article.image} alt={article.title} className="w-full h-auto" />
          </div>

          <div className="max-w-none text-[18px] leading-[1.8] text-foreground/90 font-serif">
            <ArticleTimeline paragraphs={article.body} />
          </div>

          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between text-sm">
            <div className="flex gap-3">
              <button 
                onClick={() => setShareOpen(true)}
                className="rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 transition-colors font-bold"
              >
                Share
              </button>
            </div>
            <Link to="/news" className="text-primary hover:underline">More stories →</Link>
          </div>
        </motion.div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="serif text-2xl font-bold mb-6">More from Novario</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-primary font-bold uppercase">{a.category}</div>
                    <h3 className="serif font-bold mt-2 line-clamp-2">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      </div>
      <BottomNav />
      <ShareCard 
        isOpen={isShareOpen} 
        onClose={() => setShareOpen(false)} 
        title={article.title} 
        image={article.image} 
        category={article.category} 
      />
    </motion.div>
  );
}

```

---

## File: src\routes\news.tsx

```tsx
import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { HeroSlider } from "@/components/novario/HeroSlider";
import { TrendingRow } from "@/components/novario/TrendingRow";
import { TrendingPeople } from "@/components/novario/TrendingPeople";
import { CategoryGrid } from "@/components/novario/CategoryGrid";
import { getHomeFeed, getNews } from "@/server/newsapi.functions";
import { CATEGORIES, initArticleImages } from "@/lib/news";

type NewsSearch = { cat?: string };

export const Route = createFileRoute("/news")({
  validateSearch: (s: Record<string, unknown>): NewsSearch => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  loaderDeps: ({ search }) => ({ cat: search.cat }),
  loader: async ({ deps }) => {
    if (deps.cat) {
      const { articles } = await getNews(deps.cat);
      return { mode: "cat" as const, cat: deps.cat, articles };
    }
    const home = await getHomeFeed();
    return { mode: "home" as const, ...home };
  },
  component: NewsHome,
  errorComponent: ({ error }) => <div className="p-10 text-center text-destructive">{error.message}</div>,
});

function NewsHome() {
  const data = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Only pre-fetch when on the news section
    initArticleImages();

    const interval = setInterval(() => {
      window.location.reload();
    }, 15 * 60 * 1000); // 15 minutes
    return () => clearInterval(interval);
  }, []);

  if (pathname !== "/news" && pathname !== "/news/") {
    return <Outlet />;
  }

  if (data.mode === "cat") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background text-foreground flex flex-col"
      >
        <Header />
        <BreakingTicker />
        <main className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Section</div>
              <h1 className="serif text-4xl font-extrabold mt-1">{data.cat}</h1>
            </div>
            <Link to="/news" className="text-sm text-muted-foreground hover:text-primary">← Front page</Link>
          </div>
          <CategoryGrid initial={data.cat} articles={data.articles} categories={[data.cat]} />
        </main>
        <BottomNav />
      </motion.div>
    );
  }

  const heroPool = data.all.slice(0, 8);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-foreground flex flex-col"
    >
      <Header />
      <BreakingTicker />
      <main className="mx-auto max-w-7xl w-full px-4 py-6 space-y-12 flex-1">
        <HeroSlider articles={heroPool} />
        <TrendingRow articles={data.all.slice(0, 12)} />
        <TrendingPeople />

        {/* Per-section strips so the homepage isn't repetitive */}
        {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat) => {
          const list = data.byCategory[cat]?.slice(0, 4) ?? [];
          if (list.length === 0) return null;
          return (
            <section key={cat}>
              <div className="flex items-center justify-between mb-5 border-b border-border pb-2">
                <h2 className="serif text-2xl font-bold">{cat}</h2>
                <Link to="/news" search={{ cat }} className="text-xs uppercase tracking-wider text-primary hover:underline">More {cat} →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {list.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                  <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{a.source}</div>
                      <h3 className="mt-2 serif font-bold leading-snug line-clamp-3">{a.title}</h3>
                      <div className="mt-3 text-xs text-muted-foreground">{a.publishedAt} · {a.readTime} min</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="pt-4">
          <CategoryGrid initial="Top" articles={data.all} categories={CATEGORIES as unknown as string[]} />
        </div>
      </main>
      <BottomNav />
    </motion.div>
  );
}

```

---

## File: src\routes\newsroom.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Globe2, Newspaper, ArrowRight } from "lucide-react";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { INDIA_CITIES, WORLD_CITIES, type City } from "@/lib/cities";
import { getCityNews, type RemoteArticle } from "@/server/newsapi.functions";

type Search = { city?: string; scope?: "india" | "world" };

export const Route = createFileRoute("/newsroom")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    city: typeof s.city === "string" ? s.city : undefined,
    scope: s.scope === "world" ? "world" : "india",
  }),
  component: Newsroom,
});

function Newsroom() {
  const { city: cityParam, scope = "india" } = Route.useSearch();
  const navigate = Route.useNavigate();

  const list: City[] = scope === "world" ? WORLD_CITIES : INDIA_CITIES;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? list.filter((c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)) : list;
  }, [list, query]);

  const activeCity: City | undefined =
    (cityParam && list.find((c) => c.city.toLowerCase() === cityParam.toLowerCase())) || filtered[0] || list[0];

  const [articles, setArticles] = useState<RemoteArticle[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeCity) return;
    let alive = true;
    setLoading(true);
    setArticles(null);
    getCityNews(activeCity.city)
      .then((res) => { if (alive) setArticles(res.articles); })
      .catch(() => { if (alive) setArticles([]); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [activeCity?.city, activeCity?.country]);

  // Featured chips: a quick-jump row of marquee cities
  const featured = scope === "india"
    ? ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]
    : ["New York", "London", "Tokyo", "Paris", "Dubai", "Singapore", "Sydney", "Berlin"];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
        {/* M3-style header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-bold">
            <Newspaper className="h-3.5 w-3.5" /> Inside the Newsroom
          </div>
          <h1 className="serif text-3xl md:text-5xl font-extrabold mt-2 text-balance">
            City desks, filing live.
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Pick a city to see the latest stories our editors are tracking from there.
          </p>
        </div>

        {/* M3 segmented button */}
        <div className="inline-flex p-1 rounded-full bg-secondary/60 border border-border mb-5">
          {(["india", "world"] as const).map((s) => {
            const active = scope === s;
            const Icon = s === "india" ? MapPin : Globe2;
            return (
              <button
                key={s}
                onClick={() => navigate({ search: { scope: s, city: undefined } })}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s === "india" ? "India" : "World"}
              </button>
            );
          })}
        </div>

        {/* Featured city chips */}
        {!query && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-5">
            {featured.map((name) => {
              const active = activeCity?.city === name;
              return (
                <button
                  key={name}
                  onClick={() => navigate({ search: { scope, city: name } })}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    active
                      ? "bg-primary/15 border-primary text-primary"
                      : "border-border bg-card hover:border-primary/40 text-foreground/80"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* M3 surface — city list */}
          <aside className="lg:sticky lg:top-4 lg:self-start lg:max-h-[80vh] flex flex-col rounded-3xl bg-card/80 border border-border overflow-hidden shadow-elegant">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a city"
                  className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-full pl-9 pr-3 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[60vh] lg:max-h-none p-2">
              {filtered.map((c) => {
                const active = activeCity && c.city === activeCity.city && c.country === activeCity.country;
                return (
                  <button
                    key={`${c.city}-${c.country}`}
                    onClick={() => navigate({ search: { scope, city: c.city } })}
                    className={`w-full text-left px-3 py-2.5 my-0.5 rounded-2xl text-sm transition-all flex items-center gap-3 ${
                      active
                        ? "bg-primary/15 text-foreground"
                        : "hover:bg-muted/50 text-foreground/85"
                    }`}
                  >
                    <span className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                    }`}>
                      {c.city.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold truncate">{c.city}</span>
                      <span className="block text-[11px] text-muted-foreground truncate">{c.country}</span>
                    </span>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-6 text-sm text-muted-foreground text-center">No cities match “{query}”.</div>
              )}
            </div>
          </aside>

          {/* Feed */}
          <section>
            {activeCity && (
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-breaking animate-pulse-dot" />
                    Now reporting from
                  </div>
                  <h2 className="serif text-2xl md:text-3xl font-bold mt-1">
                    {activeCity.city}
                    <span className="text-muted-foreground font-normal">, {activeCity.country}</span>
                  </h2>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {loading ? "Loading…" : articles ? `${articles.length} stories` : ""}
                </div>
              </div>
            )}

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-3xl border border-border bg-card overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-muted/40" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-muted/40 rounded w-1/3" />
                      <div className="h-4 bg-muted/40 rounded w-5/6" />
                      <div className="h-4 bg-muted/40 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && articles && articles.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground bg-card/40">
                No stories filed from {activeCity?.city} in the last cycle. Try another city.
              </div>
            )}

            {!loading && articles && articles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {articles.map((a) => (
                  <Link
                    key={a.id}
                    to="/news/$slug"
                    params={{ slug: a.slug }}
                    className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{a.source}</div>
                      <h3 className="mt-2 serif font-bold text-lg leading-snug line-clamp-3">{a.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{a.publishedAt} · {a.readTime} min read</span>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

```

---

## File: src\routes\ovii.tsx

```tsx
import { useState, useEffect, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";

// Lazy load chat to keep initial bundle small
const OViiChat = lazy(() => import("@/components/novario/OViiChat").then(m => ({ default: m.OViiChat })));

export const Route = createFileRoute("/ovii")({
  head: () => ({
    meta: [
      { title: "OVii" },
      { name: "robots", content: "noindex,nofollow" },
      { name: "google", content: "notranslate" },
      { name: "autocomplete", content: "off" },
    ],
  }),
  component: OViiPage,
});

function OViiPage() {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ovii_unlocked") === "true";
    }
    return false;
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    localStorage.setItem("ovii_unlocked", "true");
  };

  const handleLock = () => {
    setUnlocked(false);
    localStorage.removeItem("ovii_unlocked");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background" style={{ position: 'fixed', inset: 0 }}>
      {!unlocked && <PasswordModal onUnlock={handleUnlock} />}
      {unlocked && (
        <Suspense fallback={
          <div className="flex items-center justify-center h-full w-full bg-[#0b141a]">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        }>
          <OViiChat onLock={handleLock} />
        </Suspense>
      )}
    </div>
  );
}

```

---

## File: src\routes\privacy.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-6 py-16 flex-1">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Legal Documentation</div>
          <h1 className="serif text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">Last Updated: May 4, 2026</p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-relaxed font-serif text-lg">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">1. Introduction and Acceptance of Terms</h2>
            <p className="mb-4">
              Welcome to Novario ("Novario", "we", "us", or "our"). Novario provides an advanced, premium, and login-free digital news aggregation platform (the "Service"). By accessing or using our Service in any manner, including but not limited to visiting or browsing the Novario website, you expressly agree to be bound by these Terms of Service (the "Terms").
            </p>
            <p className="mb-4">
              These Terms govern your access to and use of all Novario services. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. Our platform is designed with a frictionless philosophy: we believe in providing world-class information access without the barrier of account creation, paywalls, or mandatory subscriptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">2. The Novario Experience & Login-Free Philosophy</h2>
            <p className="mb-4">
              Novario is committed to offering a premium, unimpeded reading experience. Unlike other platforms that mandate user registration, data harvesting, or restrictive paywalls, Novario is proudly a <strong>login-free</strong> environment.
            </p>
            <p className="mb-4">
              Our core offerings include:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Zero Friction Access:</strong> Immediate access to breaking news and curated stories without the need for an account.</li>
              <li><strong>Aggregated Intelligence:</strong> A unified, seamless reading interface that aggregates global intelligence into a single, beautiful dashboard.</li>
            </ul>
            <p className="mb-4">
              While we pride ourselves on this frictionless experience, your use of the Service must still comply with all applicable local, national, and international laws, rules, and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">3. Content Aggregation and Data Retrieval</h2>
            <p className="mb-4">
              To provide you with the most up-to-date and comprehensive news coverage, Novario operates as a sophisticated content aggregator. We utilize authorized third-party Application Programming Interfaces (APIs), RSS feeds, and standard web data retrieval methodologies to curate and display public content, headlines, snippets, and media.
            </p>
            <p className="mb-4">
              By using our Service, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Third-Party Ownership:</strong> The news articles, images, trademarks, and media displayed on Novario are the intellectual property of their respective original publishers and copyright holders. Novario does not claim ownership over the raw data or journalistic content fetched via these external APIs.</li>
              <li><strong>Fair Use and Aggregation:</strong> Our display of content snippets and thumbnails is strictly for the purpose of aggregation, commentary, and directing users to the original source, in accordance with standard internet fair use principles.</li>
              <li><strong>API Continuity:</strong> Because our service relies on external data sources (including but not limited to search engines, media databases, and news wires), the availability of specific content is subject to the continuous operation of these third-party APIs. We are not liable for any temporary or permanent disruptions in content availability caused by changes to third-party API policies or rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">4. Intellectual Property Rights</h2>
            <p className="mb-4">
              Excluding the aggregated third-party content described in Section 3, the Novario platform itself—including its original design, source code, user interface, proprietary algorithms, and logo—is the exclusive property of Novario Media Pvt. Ltd. and its licensors.
            </p>
            <p className="mb-4">
              You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Service strictly for your personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the proprietary material on our Service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">5. User Conduct and Acceptable Use</h2>
            <p className="mb-4">
              While Novario does not require user accounts, your access to the platform is contingent upon your compliance with our acceptable use policy. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Novario, a Novario employee, another user, or any other person or entity.</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Novario or users of the Service.</li>
              <li>To attempt to bypass, disable, or interfere with our API rate-limiting mechanisms or reverse-engineer any proprietary platform protocols.</li>
            </ul>
            <p className="mb-4">
              We reserve the right to block IP addresses or terminate access to our platform for any user who violates these conduct guidelines, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">6. Disclaimer of Warranties</h2>
            <p className="mb-4">
              YOUR USE OF THE SERVICE, ITS CONTENT, AND ANY ITEMS OBTAINED THROUGH THE SERVICE IS AT YOUR OWN RISK. THE SERVICE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p className="mb-4">
              NEITHER NOVARIO NOR ANY PERSON ASSOCIATED WITH NOVARIO MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE OR THE THIRD-PARTY CONTENT AGGREGATED THEREIN.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">7. Limitation of Liability</h2>
            <p className="mb-4">
              IN NO EVENT WILL NOVARIO, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SERVICE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">8. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless Novario, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">9. Governing Law and Jurisdiction</h2>
            <p className="mb-4">
              All matters relating to the Service and these Terms, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the jurisdiction in which Novario operates, without giving effect to any choice or conflict of law provision or rule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">10. Changes to the Terms of Service</h2>
            <p className="mb-4">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center">
            If you have any questions regarding these Terms, please contact our legal department via the Contact page.
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

```

---

## File: src\routes\terms.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-6 py-16 flex-1">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Legal Documentation</div>
          <h1 className="serif text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">Last Updated: May 4, 2026</p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-relaxed font-serif text-lg">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">1. Introduction and Acceptance of Terms</h2>
            <p className="mb-4">
              Welcome to Novario ("Novario", "we", "us", or "our"). Novario provides an advanced, premium, and login-free digital news aggregation platform (the "Service"). By accessing or using our Service in any manner, including but not limited to visiting or browsing the Novario website, you expressly agree to be bound by these Terms of Service (the "Terms").
            </p>
            <p className="mb-4">
              These Terms govern your access to and use of all Novario services. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. Our platform is designed with a frictionless philosophy: we believe in providing world-class information access without the barrier of account creation, paywalls, or mandatory subscriptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">2. The Novario Experience & Login-Free Philosophy</h2>
            <p className="mb-4">
              Novario is committed to offering a premium, unimpeded reading experience. Unlike other platforms that mandate user registration, data harvesting, or restrictive paywalls, Novario is proudly a <strong>login-free</strong> environment.
            </p>
            <p className="mb-4">
              Our core offerings include:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Zero Friction Access:</strong> Immediate access to breaking news and curated stories without the need for an account.</li>
              <li><strong>Aggregated Intelligence:</strong> A unified, seamless reading interface that aggregates global intelligence into a single, beautiful dashboard.</li>
            </ul>
            <p className="mb-4">
              While we pride ourselves on this frictionless experience, your use of the Service must still comply with all applicable local, national, and international laws, rules, and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">3. Content Aggregation and Data Retrieval</h2>
            <p className="mb-4">
              To provide you with the most up-to-date and comprehensive news coverage, Novario operates as a sophisticated content aggregator. We utilize authorized third-party Application Programming Interfaces (APIs), RSS feeds, and standard web data retrieval methodologies to curate and display public content, headlines, snippets, and media.
            </p>
            <p className="mb-4">
              By using our Service, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Third-Party Ownership:</strong> The news articles, images, trademarks, and media displayed on Novario are the intellectual property of their respective original publishers and copyright holders. Novario does not claim ownership over the raw data or journalistic content fetched via these external APIs.</li>
              <li><strong>Fair Use and Aggregation:</strong> Our display of content snippets and thumbnails is strictly for the purpose of aggregation, commentary, and directing users to the original source, in accordance with standard internet fair use principles.</li>
              <li><strong>API Continuity:</strong> Because our service relies on external data sources (including but not limited to search engines, media databases, and news wires), the availability of specific content is subject to the continuous operation of these third-party APIs. We are not liable for any temporary or permanent disruptions in content availability caused by changes to third-party API policies or rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">4. Intellectual Property Rights</h2>
            <p className="mb-4">
              Excluding the aggregated third-party content described in Section 3, the Novario platform itself—including its original design, source code, user interface, proprietary algorithms, and logo—is the exclusive property of Novario Media Pvt. Ltd. and its licensors.
            </p>
            <p className="mb-4">
              You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Service strictly for your personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the proprietary material on our Service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">5. User Conduct and Acceptable Use</h2>
            <p className="mb-4">
              While Novario does not require user accounts, your access to the platform is contingent upon your compliance with our acceptable use policy. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Novario, a Novario employee, another user, or any other person or entity.</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Novario or users of the Service.</li>
              <li>To attempt to bypass, disable, or interfere with our API rate-limiting mechanisms or reverse-engineer any proprietary platform protocols.</li>
            </ul>
            <p className="mb-4">
              We reserve the right to block IP addresses or terminate access to our platform for any user who violates these conduct guidelines, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">6. Disclaimer of Warranties</h2>
            <p className="mb-4">
              YOUR USE OF THE SERVICE, ITS CONTENT, AND ANY ITEMS OBTAINED THROUGH THE SERVICE IS AT YOUR OWN RISK. THE SERVICE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p className="mb-4">
              NEITHER NOVARIO NOR ANY PERSON ASSOCIATED WITH NOVARIO MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE OR THE THIRD-PARTY CONTENT AGGREGATED THEREIN.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">7. Limitation of Liability</h2>
            <p className="mb-4">
              IN NO EVENT WILL NOVARIO, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SERVICE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">8. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless Novario, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">9. Governing Law and Jurisdiction</h2>
            <p className="mb-4">
              All matters relating to the Service and these Terms, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the jurisdiction in which Novario operates, without giving effect to any choice or conflict of law provision or rule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">10. Changes to the Terms of Service</h2>
            <p className="mb-4">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center">
            If you have any questions regarding these Terms, please contact our legal department via the Contact page.
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

```

---

## File: src\routes\__root.tsx

```tsx
import { Suspense, useEffect, useState, lazy, useRef } from "react";
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, ensureAnonAuth } from "@/lib/firebase";

const OViiChat = lazy(() => import("@/components/novario/OViiChat").then(m => ({ default: m.OViiChat })));

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground serif">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This story doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link
            to="/news"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to Novario
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});


function RootComponent() {
  const [showOvii, setShowOvii] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
  const [unlocked, setUnlocked] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
  const initialLoadRef = useRef(true);

  // ── Presence Logic ─────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        await ensureAnonAuth();
      } catch (e) {
        console.error("Auth failed", e);
      }
    })();
  }, []);



  const chatOpen = showOvii && unlocked;

  useEffect(() => {
    const handleOpen = () => setShowOvii(true);
    window.addEventListener("open-ovii", handleOpen);
    return () => window.removeEventListener("open-ovii", handleOpen);
  }, []);

  // Freeze EVERYTHING when chat is open — no leaking, no scrolling
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (chatOpen) {
      html.style.overflow = "hidden";
      html.style.position = "fixed";
      html.style.width = "100%";
      html.style.height = "100%";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
      body.style.overflow = "";
    };
  }, [chatOpen]);

  return (
    <div className="w-full overflow-x-hidden relative flex flex-col min-h-screen">
      {/* Only render news page when chat is NOT open to prevent paint-through */}
      {!chatOpen && <Outlet />}
      {showOvii && !unlocked && (
        <PasswordModal onUnlock={() => setUnlocked(true)} />
      )}
      {chatOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b141a]">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        }>
          <OViiChat onLock={() => { setUnlocked(false); setShowOvii(false); }} />
        </Suspense>
      )}
    </div>
  );
}

```

---

## File: src\routeTree.gen.ts

```ts
/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as OviiRouteImport } from './routes/ovii'
import { Route as NewsroomRouteImport } from './routes/newsroom'
import { Route as NewsRouteImport } from './routes/news'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as AboutRouteImport } from './routes/about'
import { Route as TermsRouteImport } from './routes/terms'
import { Route as PrivacyRouteImport } from './routes/privacy'
import { Route as IndexRouteImport } from './routes/index'
import { Route as NewsSlugRouteImport } from './routes/news.$slug'

const OviiRoute = OviiRouteImport.update({
  id: '/ovii',
  path: '/ovii',
  getParentRoute: () => rootRouteImport,
} as any)
const NewsroomRoute = NewsroomRouteImport.update({
  id: '/newsroom',
  path: '/newsroom',
  getParentRoute: () => rootRouteImport,
} as any)
const NewsRoute = NewsRouteImport.update({
  id: '/news',
  path: '/news',
  getParentRoute: () => rootRouteImport,
} as any)
const ContactRoute = ContactRouteImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRouteImport,
} as any)
const AboutRoute = AboutRouteImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRouteImport,
} as any)
const TermsRoute = TermsRouteImport.update({
  id: '/terms',
  path: '/terms',
  getParentRoute: () => rootRouteImport,
} as any)
const PrivacyRoute = PrivacyRouteImport.update({
  id: '/privacy',
  path: '/privacy',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const NewsSlugRoute = NewsSlugRouteImport.update({
  id: '/$slug',
  path: '/$slug',
  getParentRoute: () => NewsRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/terms': typeof TermsRoute
  '/privacy': typeof PrivacyRoute
  '/contact': typeof ContactRoute
  '/news': typeof NewsRouteWithChildren
  '/newsroom': typeof NewsroomRoute
  '/ovii': typeof OviiRoute
  '/news/$slug': typeof NewsSlugRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/terms': typeof TermsRoute
  '/privacy': typeof PrivacyRoute
  '/contact': typeof ContactRoute
  '/news': typeof NewsRouteWithChildren
  '/newsroom': typeof NewsroomRoute
  '/ovii': typeof OviiRoute
  '/news/$slug': typeof NewsSlugRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/terms': typeof TermsRoute
  '/privacy': typeof PrivacyRoute
  '/contact': typeof ContactRoute
  '/news': typeof NewsRouteWithChildren
  '/newsroom': typeof NewsroomRoute
  '/ovii': typeof OviiRoute
  '/news/$slug': typeof NewsSlugRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/terms'
    | '/privacy'
    | '/contact'
    | '/news'
    | '/newsroom'
    | '/ovii'
    | '/news/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/terms'
    | '/privacy'
    | '/contact'
    | '/news'
    | '/newsroom'
    | '/ovii'
    | '/news/$slug'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/terms'
    | '/privacy'
    | '/contact'
    | '/news'
    | '/newsroom'
    | '/ovii'
    | '/news/$slug'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  TermsRoute: typeof TermsRoute
  PrivacyRoute: typeof PrivacyRoute
  ContactRoute: typeof ContactRoute
  NewsRoute: typeof NewsRouteWithChildren
  NewsroomRoute: typeof NewsroomRoute
  OviiRoute: typeof OviiRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/ovii': {
      id: '/ovii'
      path: '/ovii'
      fullPath: '/ovii'
      preLoaderRoute: typeof OviiRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/newsroom': {
      id: '/newsroom'
      path: '/newsroom'
      fullPath: '/newsroom'
      preLoaderRoute: typeof NewsroomRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/news': {
      id: '/news'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof NewsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/terms': {
      id: '/terms'
      path: '/terms'
      fullPath: '/terms'
      preLoaderRoute: typeof TermsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/privacy': {
      id: '/privacy'
      path: '/privacy'
      fullPath: '/privacy'
      preLoaderRoute: typeof PrivacyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/news/$slug': {
      id: '/news/$slug'
      path: '/$slug'
      fullPath: '/news/$slug'
      preLoaderRoute: typeof NewsSlugRouteImport
      parentRoute: typeof NewsRoute
    }
  }
}

interface NewsRouteChildren {
  NewsSlugRoute: typeof NewsSlugRoute
}

const NewsRouteChildren: NewsRouteChildren = {
  NewsSlugRoute: NewsSlugRoute,
}

const NewsRouteWithChildren = NewsRoute._addFileChildren(NewsRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  TermsRoute: TermsRoute,
  PrivacyRoute: PrivacyRoute,
  ContactRoute: ContactRoute,
  NewsRoute: NewsRouteWithChildren,
  NewsroomRoute: NewsroomRoute,
  OviiRoute: OviiRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()


```

---

## File: src\server\newsapi.functions.ts

```ts
// News feed powered by The Guardian API

const GUARDIAN_API_KEY = "70f3d718-766d-49bd-ae89-44b455129f16";

// ── Image Search: Bing → Wikimedia fallback cascade ──────────────────────────
// Primary:  Microsoft Bing Image Search API (high-quality editorial photos)
// Fallback: Wikimedia Commons (CC-licensed, CORS-enabled, always free)
// Swap in a valid Bing key below and the cascade promotes Bing automatically.
const BING_API_KEY = "643c267be4b9b46d212104cbdbc3b31c5433ad527af8ac96a687bc3cb253815c";
const imageCache = new Map<string, string>();

// ── 1. Bing Image Search ──────────────────────────────────────────────────────
async function fetchBingImageDirect(query: string): Promise<string | null> {
  try {
    const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=3&imageType=Photo&safeSearch=Moderate`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY },
    });
    clearTimeout(timer);
    if (!res.ok) return null;   // 401 / quota → silently fall through
    const data = await res.json();
    const images: any[] = data?.value || [];
    for (const img of images) {
      const imgUrl: string | undefined = img?.contentUrl;
      if (imgUrl && /^https?:\/\//i.test(imgUrl)) return imgUrl;
    }
    return null;
  } catch {
    return null;
  }
}

// ── 2. Wikimedia Commons fallback ─────────────────────────────────────────────
async function fetchWikimediaDirect(query: string): Promise<string | null> {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&prop=imageinfo&iiprop=url&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&origin=*`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;
    for (const page of Object.values(pages) as any[]) {
      const imgUrl: string | undefined = page.imageinfo?.[0]?.url;
      if (imgUrl && /\.(jpe?g|png|webp)/i.test(imgUrl)) return imgUrl;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Primary image fetcher.
 * Tries Bing first; if the key is invalid or quota is exceeded,
 * silently falls back to Wikimedia Commons.
 * Results are in-memory cached per session.
 */
export async function fetchBingImage(query: string): Promise<string | null> {
  const cacheKey = query.toLowerCase().trim();
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;
  const result = (await fetchBingImageDirect(query)) ?? (await fetchWikimediaDirect(query));
  if (result) imageCache.set(cacheKey, result);
  return result;
}

/** Alias: fetchWikimediaImage routes through the same cascade */
export async function fetchWikimediaImage(query: string): Promise<string | null> {
  return fetchBingImage(query);
}

/** Alias: fetchOGImage routes through the same cascade */
export async function fetchOGImage(query: string): Promise<string | null> {
  return fetchBingImage(query);
}


export type RemoteArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  source: string;
  url: string;
  readTime: number;
  trending?: boolean;
};

const CATEGORY_TO_SECTION: Record<string, string> = {
  Business: "business",
  Entertainment: "culture",
  Health: "society",
  Science: "science",
  Sports: "sport",
  Tech: "technology",
  World: "world",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "story";
}

function readTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

/**
 * Last-resort image fallback: a REAL stock photo from Picsum, seeded by the article title.
 * NEVER returns a gradient or SVG placeholder.
 */
export function getPicsumFallback(seed: string): string {
  // Create a deterministic hash from the seed so the same title always gets the same photo
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const id = Math.abs(hash) % 1000;
  return `https://picsum.photos/seed/${id}/800/500`;
}

// ── Cache ──
const cache = new Map<string, { at: number; data: RemoteArticle[] }>();
const CACHE_MS = 15 * 60 * 1000;

let articlesBySlug = new Map<string, RemoteArticle>();
if (typeof window !== "undefined") {
  try {
    // Only clear if cache is older than 24 hours to ensure freshness without sacrificing speed
    const savedTime = sessionStorage.getItem("novario-time");
    if (savedTime && Date.now() - parseInt(savedTime) > 24 * 60 * 60 * 1000) {
      sessionStorage.removeItem("novario-articles");
      sessionStorage.removeItem("novario-time");
      cache.clear();
    }
  } catch (e) {}
}

function saveToStorage() {
  if (typeof window !== "undefined") {
    const obj = Object.fromEntries(articlesBySlug.entries());
    try {
      sessionStorage.setItem("novario-articles", JSON.stringify(obj));
      sessionStorage.setItem("novario-time", Date.now().toString());
    } catch (e) {}
  }
}

const BING_PLACEHOLDER = "__bing_pending__";

export async function fetchGuardianNews(query: string, category: string, page = 1): Promise<RemoteArticle[]> {
  const cacheKey = `g:${query}:${category}:${page}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.data;

  try {
    const section = CATEGORY_TO_SECTION[category];
    let url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,bodyText,byline&page=${page}&page-size=30`;
    
    if (section) url += `&section=${section}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    
    // Always use newest to guarantee recent news
    url += `&order-by=newest`;

    const res = await fetch(url);
    if (!res.ok) return [];
    
    const data = await res.json();
    const results = data.response?.results || [];

    // Build articles, using Bing for any that have no thumbnail
    const articles = await Promise.all(results.map(async (item: any, i: number): Promise<RemoteArticle> => {
      const title = item.webTitle;
      const slug = slugify(title) + "-" + item.id.replace(/\//g, "-");
      const bodyText = item.fields?.bodyText || "Full article content is not available for this story.";
      
      // Split by double newline or fallback to chunks if it's one massive block
      let body = bodyText.split(/\n+/).filter(Boolean);
      if (body.length === 1 && body[0].length > 500) {
        body = body[0].match(/.{1,500}(\s|$)/g) || [body[0]];
      }

      const excerpt = body[0]?.substring(0, 150) + "..." || title;

      // Fetch a Bing image using the article title when no Guardian thumbnail is provided
      let image = item.fields?.thumbnail || "";
      if (!image) {
        const bingImg = await fetchBingImage(title);
        image = bingImg || getPicsumFallback(title);
      }

      const article: RemoteArticle = {
        id: item.id,
        slug,
        title,
        excerpt,
        body,
        image,
        category: category || item.sectionName,
        author: item.fields?.byline || "Guardian Staff",
        publishedAt: new Date(item.webPublicationDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        source: "The Guardian",
        url: item.webUrl,
        readTime: readTime(title + " " + bodyText),
        trending: i < 6,
      };
      
      articlesBySlug.set(article.slug, article);
      return article;
    }));

    saveToStorage();
    cache.set(cacheKey, { at: Date.now(), data: articles });
    return articles;
  } catch (e) {
    console.error("Guardian fetch failed", e);
    return [];
  }
}

export async function fetchWikipediaFallback(query: string, category: string): Promise<RemoteArticle[]> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&generator=search&exlimit=1&explaintext=1&piprop=thumbnail&pithumbsize=800&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    
    const pages = data.query?.pages;
    if (!pages) return [];
    
    const pageObj: any = Object.values(pages)[0];
    if (!pageObj) return [];
    
    const title = pageObj.title;
    
    // Check if it's a completely unrelated fuzzy match (e.g. searching "Molly Little" returns "Molly-Mae Hague")
    // The Wikipedia title must contain at least the first word or last word of the query exactly, or vice versa
    const tLower = title.toLowerCase();
    const qLower = query.toLowerCase();
    
    // Very strict match: if it's not a direct substring either way, reject it.
    // E.g. "molly little" and "molly-mae hague" -> rejected.
    // "sydney sweeney" and "Sydney Sweeney" -> accepted.
    // But also allow partial first-word match for people with middle names etc.
    const queryWords = qLower.split(/\s+/).filter(w => w.length >= 4);
    const isPartialMatch = queryWords.some(word => tLower.includes(word));
    
    if (!tLower.includes(qLower) && !qLower.includes(tLower) && !isPartialMatch) {
       return [];
    }
    
    let bodyText = pageObj.extract || "No detailed summary available.";
    
    // TRUNCATE useless bottom sections where links/tables are stripped by the API
    bodyText = bodyText.replace(/==+\s*(Filmography|References|External links|See also|Notes|Bibliography|Discography|Awards and nominations)\s*==+[\s\S]*/gi, "");
    
    // Clean up Wikipedia == Section == headers
    bodyText = bodyText.replace(/==+([^=]+)==+/g, "\n\n$1\n\n");
    
    const slug = slugify(title) + "-wiki-" + pageObj.pageid;
    
    let body = bodyText.split(/\n+/).filter(Boolean);
    if (body.length === 1 && body[0].length > 500) {
      body = body[0].match(/.{1,500}(\s|$)/g) || [body[0]];
    }

    const excerpt = body[0]?.substring(0, 150) + "..." || title;

    // If Wikipedia has no thumbnail, fall back to Bing Image Search
    let wikiImage = pageObj.thumbnail?.source || "";
    if (!wikiImage) {
      const bingImg = await fetchBingImage(title);
      wikiImage = bingImg || getPicsumFallback(query);
    }

    const article: RemoteArticle = {
      id: "wiki-" + pageObj.pageid,
      slug,
      title,
      excerpt,
      body,
      image: wikiImage,
      category: category || "Encyclopedia",
      author: "Wikipedia Contributors",
      publishedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      source: "Wikipedia",
      url: `https://en.wikipedia.org/?curid=${pageObj.pageid}`,
      readTime: readTime(title + " " + bodyText),
      trending: false,
    };
    
    articlesBySlug.set(article.slug, article);
    return [article];
  } catch (e) {
    console.error("Wiki fetch failed", e);
    return [];
  }
}

export async function fetchWebSearchFallback(query: string, category: string): Promise<RemoteArticle[]> {
  try {
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    // Use corsproxy.io to bypass browser CORS restrictions for DuckDuckGo HTML
    const url = `https://corsproxy.io/?${encodeURIComponent(ddgUrl)}`;
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
    if (!res.ok) return [];
    
    const html = await res.text();
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    
    if (!snippetMatch || !titleMatch) return [];
    
    const snippet = snippetMatch[1].replace(/<\/?b>/g, '').trim();
    const title = titleMatch[1].replace(/<\/?b>/g, '').trim();
    
    const slug = slugify(title) + "-ddg-" + Date.now();
    const body = snippet.split(/\n+/).filter(Boolean);
    const excerpt = body[0]?.substring(0, 150) + "..." || title;
    
    const article: RemoteArticle = {
      id: "ddg-" + Date.now(),
      slug,
      title,
      excerpt,
      body,
      image: getPicsumFallback(query),
      category: category || "Web Search",
      author: "DuckDuckGo Results",
      publishedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      source: "Web Search",
      url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
      readTime: readTime(title + " " + snippet),
      trending: false,
    };
    
    articlesBySlug.set(article.slug, article);
    return [article];
  } catch (e) {
    console.error("DDG fetch failed", e);
    return [];
  }
}

// ── Google News RSS ── Free, universal, no API key needed ─────────────────────
// This guarantees recent news for ANY person/topic search, sorted newest first.
// Sentinel to detect "no real image" across all sources
const GENERIC_UNSPLASH_ID = "photo-1504711434969-e33886168f5c";

export async function fetchGoogleNewsRSS(query: string, fallbackImage?: string): Promise<RemoteArticle[]> {
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
    // rss2json.com converts RSS to JSON and handles CORS — free, 10k req/day
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) return [];
    
    // Sort by newest first
    const items = (data.items as any[]).sort((a, b) =>
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    // De-dupe by title
    const seen = new Set<string>();
    const unique = items.filter(item => {
      const key = (item.title || "").toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return await Promise.all(unique.map(async (item: any, i: number): Promise<RemoteArticle> => {
      const title = item.title || "Untitled";
      const slug = slugify(title) + "-gnews-" + i + "-" + Date.now();
      
      // Google News hides thumbnails inside the HTML description. Extract it!
      const imgMatch = (item.description || "").match(/<img[^>]+src="([^">]+)"/i);
      const extractedImg = imgMatch ? imgMatch[1] : null;

      const rawDesc = item.description?.replace(/<[^>]+>/g, "") || "";
      const body = rawDesc ? [rawDesc] : [title];
      const excerpt = rawDesc.substring(0, 150) + "..." || title;
      
      // Priority: RSS enclosure → HTML-embedded img → item.thumbnail → Bing → fallback
      let image: string =
        item.enclosure?.link
          ? item.enclosure.link
          : extractedImg
          ? extractedImg
          : item.thumbnail || "";

      // If we still have no image, use Bing Image Search with the article title
      if (!image || image.includes(GENERIC_UNSPLASH_ID)) {
        const bingImg = await fetchBingImage(title);
        image = bingImg || fallbackImage || getPicsumFallback(title);
      }

      const sourceName = item.author?.split(" - ").pop()?.trim() || item.source?.title || "News";

      const article: RemoteArticle = {
        id: "gnews-" + slugify(title) + i,
        slug,
        title,
        excerpt,
        body,
        image,
        category: sourceName,  // Use actual news source name, not the search query
        author: item.author?.split(" - ")[0]?.trim() || sourceName,
        publishedAt: new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        source: sourceName,
        url: item.link || "#",
        readTime: readTime(title + " " + rawDesc),
        trending: i < 5,
      };

      articlesBySlug.set(article.slug, article);
      return article;
    }));
  } catch (e) {
    console.error("Google News RSS failed", e);
    return [];
  }
}

// Try to fetch a Wikipedia thumbnail image for non-notable people via the REST summary API
async function fetchWikipediaImage(query: string): Promise<string | null> {
  try {
    // Try exact page title first
    const pageName = query.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("_");
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageName)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.thumbnail?.source) return data.thumbnail.source;
    }
    return null;
  } catch {
    return null;
  }
}

// ── Napkin AI for Story Illustrations ──
const NAPKIN_API_KEY = "sk-40491de7962ad41bc114c1af338f3d4afc048da427833061b765eb8fb58a7dba";

export async function fetchNapkinIllustration(query: string, excerpt: string): Promise<string | null> {
  try {
    // Note: Since Napkin AI API is in developer preview, this endpoint might need adjustment.
    // Most standard visual generation APIs use a POST request like this.
    const res = await fetch("https://api.napkin.ai/v1/visuals", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NAPKIN_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: `Create a professional, sleek illustration for: ${query}. Context: ${excerpt}` })
    });
    
    if (res.ok) {
      const data = await res.json();
      // Adjust this based on the actual response structure (e.g. data.url or data.image_url)
      if (data && data.url) return data.url;
    }
    return null;
  } catch (e) {
    console.error("Napkin AI fetch failed", e);
    return null;
  }
}

const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function fetchWithTimeout(url: string, ms = 1500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Fetch massive collection of real celebrity photos, movie posters, and backdrops from TMDB
async function fetchTMDBImages(query: string): Promise<{ profile?: string, newsImages: string[] }> {
  try {
    const cleanQuery = query.toLowerCase().replace(" series", "").replace(" movie", "");
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanQuery)}`;
    const res = await fetchWithTimeout(searchUrl, 1500);
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const topResult = data.results[0];
      const newsImages: string[] = [];
      let profile: string | undefined;
      
      if (topResult.media_type === 'person') {
        const imgRes = await fetchWithTimeout(`https://api.themoviedb.org/3/person/${topResult.id}/images?api_key=${TMDB_API_KEY}`, 1500);
        const imgData = await imgRes.json();
        
        // Save the best portrait for their Bio card
        if (imgData.profiles && imgData.profiles.length > 0) {
           profile = `https://image.tmdb.org/t/p/w780${imgData.profiles[0].file_path}`;
        }

        // Fetch high-quality 16:9 backdrops from their movies/shows to use for news cards
        if (topResult.known_for) {
          for (const media of topResult.known_for) {
             const mediaType = media.media_type || 'movie';
             if (media.backdrop_path) newsImages.push(`https://image.tmdb.org/t/p/w780${media.backdrop_path}`);
             
             // Fetch additional backdrops from this specific movie/show
             try {
               const mediaImgs = await fetchWithTimeout(`https://api.themoviedb.org/3/${mediaType}/${media.id}/images?api_key=${TMDB_API_KEY}`, 1500);
               const mediaImgData = await mediaImgs.json();
               if (mediaImgData.backdrops) {
                  // Grab top 5 backdrops per show to ensure variety
                  mediaImgData.backdrops.slice(0, 5).forEach((b: any) => {
                     newsImages.push(`https://image.tmdb.org/t/p/w780${b.file_path}`);
                  });
               }
             } catch(e) {}
          }
        }
        
        // Fallback to portraits ONLY if we found absolutely no backdrops
        if (newsImages.length === 0 && imgData.profiles) {
           imgData.profiles.forEach((p: any) => newsImages.push(`https://image.tmdb.org/t/p/w780${p.file_path}`));
        }

      } else if (topResult.media_type === 'tv' || topResult.media_type === 'movie') {
        const type = topResult.media_type;
        const imgRes = await fetchWithTimeout(`https://api.themoviedb.org/3/${type}/${topResult.id}/images?api_key=${TMDB_API_KEY}`, 1500);
        const imgData = await imgRes.json();
        
        if (topResult.poster_path) profile = `https://image.tmdb.org/t/p/w780${topResult.poster_path}`;
        if (topResult.backdrop_path) newsImages.push(`https://image.tmdb.org/t/p/w780${topResult.backdrop_path}`);
        
        if (imgData.backdrops) imgData.backdrops.forEach((b: any) => newsImages.push(`https://image.tmdb.org/t/p/w780${b.file_path}`));
      }
      
      // Remove duplicates
      return { profile, newsImages: Array.from(new Set(newsImages)) };
    }
    return { newsImages: [] };
  } catch {
    return { newsImages: [] };
  }
}
export async function getNews(category = "Top", page = 1) {
  // If category doesn't match our standard ones, treat it as a search query
  const standardCats = ["Top", "India", "World", "Business", "Tech", "Sports", "Entertainment", "Science", "Health"];
  
  if (standardCats.includes(category)) {
    // India: query Guardian's world section with India tag for relevant, non-repetitive results
    let articles: RemoteArticle[];
    if (category === "India") {
      articles = await fetchGuardianNews("India", "world", page);
    } else {
      articles = await fetchGuardianNews(category === "Top" ? "" : "", category === "Top" ? "" : category, page);
    }

    // De-duplicate by title similarity
    const seen = new Set<string>();
    articles = articles.filter(a => {
      const normalized = a.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
      const words = normalized.split(/\s+/);
      // Check if >70% of words match any already-seen title
      for (const seenTitle of seen) {
        const seenWords = seenTitle.split(/\s+/);
        const overlap = words.filter(w => seenWords.includes(w)).length;
        if (overlap / Math.max(words.length, 1) > 0.7) return false;
      }
      seen.add(normalized);
      return true;
    });

    return { articles, category };
  } else {
    // ── STRICT RULE: custom search always returns bio first, then recent news ──
    
    if (page === 1) {
      const [wikiResults, googleNews, guardianArticles, tmdbData] = await Promise.all([
        fetchWikipediaFallback(category, "Encyclopedia"),
        fetchGoogleNewsRSS(category),
        fetchGuardianNews(category, "", 1),
        fetchTMDBImages(category), // Fetch TMDB posters and photos
      ]);
      
      const tmdbImages = tmdbData.newsImages;
      const tmdbProfile = tmdbData.profile;

      // Bio: Wikipedia first, DDG fallback, then try Wikipedia REST image API
      let bio = wikiResults;
      let primaryImage: string | undefined;
      
      if (bio.length > 0) {
        // Wikipedia found the article.
        // If Wikipedia didn't have an image (it used the ui-avatars fallback)
        // AND TMDB found a poster/profile, overwrite the avatar with the TMDB image!
        if (bio[0].image.includes("ui-avatars.com")) {
           if (tmdbProfile) {
             bio[0].image = tmdbProfile;
           } else if (tmdbImages.length > 0) {
             bio[0].image = tmdbImages[0];
           }
        }
        primaryImage = bio[0].image;
      } else {
        // Try Wikipedia REST API for image only (more lenient than search API)
        const wikiImg = await fetchWikipediaImage(category);
        bio = await fetchWebSearchFallback(category, "Web Search");
        
        if (bio.length > 0) {
          // If we found a Wiki image, attach it. Otherwise leave the DDG placeholder.
          if (wikiImg) {
            bio[0].image = wikiImg;
          } else if (tmdbProfile) {
            bio[0].image = tmdbProfile;
          } else if (tmdbImages.length > 0) {
            bio[0].image = tmdbImages[0];
          } else {
             // NO STOCK PHOTOS ALLOWED: Use an elegant abstract photo instead
              bio[0].image = getPicsumFallback(category);
          }
          articlesBySlug.set(bio[0].slug, bio[0]);
        }
        primaryImage = bio[0]?.image;
      }

      // Note: Google News articles are already OG-enriched inside fetchGoogleNewsRSS.
      // Here we only override articles that still have no real image after that enrichment.
      const enrichedNews = await Promise.all(googleNews.map(async (a, i) => {
        if (a.image.includes(GENERIC_UNSPLASH_ID) || !a.image) {
           if (tmdbImages.length > 0) {
              const hash = (i + 1) % tmdbImages.length;
              return { ...a, image: tmdbImages[hash] };
           }
           // Last resort: Bing Image Search using the article title
           const bingImg = await fetchBingImage(a.title + " " + category);
           return { ...a, image: bingImg || getPicsumFallback(category + i) };
        }
        return a;
      }));

      // News: Google News RSS is primary (sorted newest first)
      // De-dupe Guardian against Google News
      const gnewsUrls = new Set(enrichedNews.map(a => a.url));
      const guardianOnly = guardianArticles.filter(a => !gnewsUrls.has(a.url));

      // Final order: [Bio] → [Google News, newest first] → [Guardian supplements]
      const articles = [...bio, ...enrichedNews, ...guardianOnly];

      return { articles, category };
    } else {
      // For pagination (page 2+), just load more from Google News + Guardian
      const [googleNews, guardianArticles, tmdbData] = await Promise.all([
        fetchGoogleNewsRSS(category),
        fetchGuardianNews(category, "", page),
        fetchTMDBImages(category)
      ]);
      const tmdbImages = tmdbData.newsImages;
      
      const enrichedNews = await Promise.all(googleNews.map(async (a, i) => {
        if (a.image.includes(GENERIC_UNSPLASH_ID) || !a.image) {
           if (tmdbImages.length > 0) {
              const hash = (i + 10) % tmdbImages.length;
              return { ...a, image: tmdbImages[hash] };
           }
           const bingImg = await fetchBingImage(a.title + " " + category);
           return { ...a, image: bingImg || getPicsumFallback(category + i) };
        }
        return a;
      }));

      const gnewsUrls = new Set(enrichedNews.map(a => a.url));
      const guardianOnly = guardianArticles.filter(a => !gnewsUrls.has(a.url));
      return { articles: [...enrichedNews, ...guardianOnly], category };
    }
  }
}

export async function getHomeFeed() {
  const mainCats = ["Top", "World"];
  const subCats = ["Business", "Tech", "Sports", "Entertainment"];
  
  // Fetch main categories with more items, sub categories with fewer to save time
  const results = await Promise.all([
    ...mainCats.map(c => getNews(c)),
    ...subCats.map(c => getNews(c))
  ]);
  
  const cats = [...mainCats, ...subCats];
  const byCategory: Record<string, RemoteArticle[]> = {};
  cats.forEach((c, i) => { byCategory[c] = results[i].articles; });
  
  const seen = new Set<string>();
  const all: RemoteArticle[] = [];
  for (const res of results) {
    for (const a of res.articles) {
      if (seen.has(a.url)) continue;
      seen.add(a.url);
      all.push(a);
    }
  }
  return { byCategory, all };
}

export async function getArticle(slug: string) {
  if (articlesBySlug.has(slug)) {
    return { article: articlesBySlug.get(slug)! };
  }
  
  // Try to search Guardian for this specific article if not in cache
  // The slug format is `slugified-title-guardian/path/to/article`
  // We can just query the Guardian by the ID if we parse it, but for simplicity we can just search the title or return null.
  // Actually, to make direct links work, we should query Guardian. Let's extract the Guardian ID.
  const idMatch = slug.match(/-(.*)$/);
  if (idMatch && idMatch[1]) {
     // Reconstruct original ID (Guardian IDs have slashes, we replaced them with dashes in slug). 
     // This is tricky because we replaced all non-alphanumeric with dashes in slugify.
     // Safer to just use the search API with the first few words of the slug.
     const queryTerms = slug.split("-").slice(0, 5).join(" ");
     const articles = await fetchGuardianNews(queryTerms, "", 1);
     const hit = articles.find(a => a.slug === slug);
     if (hit) return { article: hit };
     if (articles.length > 0) return { article: articles[0] }; // closest match
  }
  
  if (slug.includes("-wiki-")) {
     const idMatch = slug.match(/-wiki-(.*)$/);
     if (idMatch && idMatch[1]) {
       // A direct fetch for a wiki page might be complex if we just have the ID, 
       // but since Wikipedia fallback is 1 result, we can just search the title part again.
       const queryTerms = slug.split("-wiki-")[0].split("-").join(" ");
       const articles = await fetchWikipediaFallback(queryTerms, "");
       const hit = articles.find(a => a.slug === slug);
       if (hit) return { article: hit };
     }
  }
  return { article: null };
}

export async function getCityNews(city: string) {
  const articles = await fetchGuardianNews(city, "");
  return { articles, city };
}

```

---

## File: src\styles.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
@import "tailwindcss" source(none); /* v1.1.2-premium-chat */
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-breaking: var(--breaking);
  --color-breaking-foreground: var(--breaking-foreground);
  --color-gold: var(--gold);
  --font-serif: "Poppins", "Playfair Display", Georgia, serif;
  --font-sans: "Poppins", "Inter", system-ui, sans-serif;
  
  /* Material Design 3 Tonal Palette (Dark) */
  --m3-surface: oklch(0.16 0.012 250);
  --m3-surface-container-low: oklch(0.14 0.012 250);
  --m3-surface-container: oklch(0.18 0.012 250);
  --m3-surface-container-high: oklch(0.22 0.012 250);
  --m3-primary-container: oklch(0.35 0.12 35);
  --m3-on-primary-container: oklch(0.92 0.04 35);
  --m3-other-container: oklch(0.25 0.05 45);
  --m3-on-other-container: oklch(0.9 0.1 45);
  --m3-secondary-container: oklch(0.25 0.02 250);
  --m3-on-secondary-container: oklch(0.85 0.02 250);
}

/* Poppins for numbers only */
@font-face {
  font-family: 'PoppinsNum';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
  unicode-range: U+0030-0039, U+0025, U+002B, U+002D;
}
@font-face {
  font-family: 'PoppinsNum';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1JlFQ.woff2) format('woff2');
  unicode-range: U+0030-0039, U+0025, U+002B, U+002D;
}
@font-face {
  font-family: 'PoppinsNum';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1JlFQ.woff2) format('woff2');
  unicode-range: U+0030-0039, U+0025, U+002B, U+002D;
}

/* Dark mode default */
:root {
  --radius: 0.5rem;
  --background: oklch(0.16 0.012 250);
  --foreground: oklch(0.96 0.005 250);
  --card: oklch(0.21 0.014 250);
  --card-foreground: oklch(0.96 0.005 250);
  --popover: oklch(0.19 0.014 250);
  --popover-foreground: oklch(0.96 0.005 250);
  --primary: oklch(0.72 0.18 35);
  --primary-foreground: oklch(0.15 0.01 250);
  --secondary: oklch(0.27 0.016 250);
  --secondary-foreground: oklch(0.96 0.005 250);
  --muted: oklch(0.24 0.014 250);
  --muted-foreground: oklch(0.68 0.02 250);
  --accent: oklch(0.3 0.02 250);
  --accent-foreground: oklch(0.96 0.005 250);
  --destructive: oklch(0.62 0.24 27);
  --destructive-foreground: oklch(0.98 0.005 250);
  --border: oklch(0.3 0.014 250 / 60%);
  --input: oklch(0.3 0.014 250);
  --ring: oklch(0.72 0.18 35);
  --breaking: oklch(0.58 0.24 27);
  --breaking-foreground: oklch(0.98 0 0);
  --gold: oklch(0.82 0.13 85);

  --gradient-hero: linear-gradient(180deg, transparent 0%, oklch(0.12 0.01 250 / 0.4) 50%, oklch(0.12 0.01 250 / 0.95) 100%);
  --gradient-orange: linear-gradient(135deg, oklch(0.7 0.18 45), oklch(0.85 0.15 55));
  --shadow-elegant: 0 20px 60px -20px oklch(0.05 0 0 / 0.6);
  --shadow-glow: 0 0 20px oklch(0.72 0.18 35 / 0.3);
  --shadow-glow-orange: 0 0 25px oklch(0.85 0.15 55 / 0.4);
}

@layer base {
  * { border-color: var(--color-border); }

  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  /* ─── Chat root: fills the entire screen, clips everything ─────────────
     This is the single source of truth for viewport containment.
     It uses position:fixed + inset:0 — NOT a JS-driven height.
     On desktop this is all you need. On mobile the component adds
     padding-bottom to push content above the software keyboard.        */
  .ovii-chat-root {
    position: fixed;
    inset: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    /* contain:strict clips paint AND layout — stops drag overflows */
    contain: strict;
    display: flex;
    flex-direction: column;
  }

  /* ─── Chat frame: the visible card/window inside the root ────────────── */
  .ovii-chat-frame {
    /* Mobile default: full-bleed, fill the root */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Desktop: Full screen spread (no centered card) */
  @media (min-width: 1024px) {
    .ovii-chat-root {
      background: var(--color-background);
    }

    .ovii-chat-frame {
      max-width: 100%;
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0;
      border: none;
      box-shadow: none;
    }

  }

  h1, h2, h3, .serif { font-family: var(--font-serif); letter-spacing: -0.01em; }
}

@layer utilities {
  .gradient-hero { background: var(--gradient-hero); }
  .gradient-gold { background: var(--gradient-gold); }
  .shadow-elegant { box-shadow: var(--shadow-elegant); }
  .shadow-glow { box-shadow: var(--shadow-glow); }
  .text-balance { text-wrap: balance; }

  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-ticker { animation: ticker 40s linear infinite; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }
  .animate-pulse-dot { animation: pulse-dot 1.5s ease-in-out infinite; }

  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  @keyframes loading-bar {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(300%); }
  }
  .animate-loading-bar { animation: loading-bar 1.5s ease-in-out infinite; }

  @keyframes waveform-subtle-pulse {
    0%, 100% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 2px var(--color-primary)); }
    50% { transform: scaleY(1.05); opacity: 0.9; filter: drop-shadow(0 0 8px var(--color-primary)); }
  }
  .waveform-playing {
    animation: waveform-subtle-pulse 1.5s ease-in-out infinite;
    transform-origin: center;
  }

  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }

  @keyframes gradient-move {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-move 3s ease infinite;
  }

  @keyframes float-slow {
    0% { transform: translate(0, 0); opacity: 0.2; }
    50% { transform: translate(20px, -40px); opacity: 0.5; }
    100% { transform: translate(0, 0); opacity: 0.2; }
  }
  .animate-float-slow {
    animation: float-slow 15s ease-in-out infinite;
  }
}

/* ─── Global Custom Scrollbar ─── */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  transition: background 0.3s;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Firefox support */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

.dark * {
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

/* From Uiverse.io by JustCode14 */ 
/* Theme Switch */
.switch {
  font-size: 14px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2.2em;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2a2a2a;
  transition: 0.4s;
  border-radius: 30px;
  overflow: hidden;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.2em;
  width: 1.2em;
  border-radius: 20px;
  left: 0.5em;
  bottom: 0.5em;
  transition: 0.4s;
  transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
  box-shadow: inset 8px -4px 0px 0px #fff;
}

.switch input:checked + .slider {
  background-color: #00a6ff;
}

.switch input:checked + .slider:before {
  transform: translateX(1.8em);
  box-shadow: inset 15px -4px 0px 15px #ffcf48;
}

.star {
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  width: 5px;
  transition: all 0.4s;
  height: 5px;
}

.star_1 {
  left: 2.5em;
  top: 0.5em;
}

.star_2 {
  left: 2.2em;
  top: 1.2em;
}

.star_3 {
  left: 3em;
  top: 0.9em;
}

.switch input:checked ~ .slider .star {
  opacity: 0;
}

.cloud {
  width: 3.5em;
  position: absolute;
  bottom: -1.4em;
  left: -1.1em;
  opacity: 0;
  transition: all 0.4s;
}

.switch input:checked ~ .slider .cloud {
  opacity: 1;
}
```

---

## File: test-bing-images.js

```js
// test-bing-images.js  — run with: node test-bing-images.js
const BING_KEY = "643c267be4b9b46d212104cbdbc3b31c5433ad527af8ac96a687bc3cb253815c";

const QUERIES = [
  "Madhya Pradesh industrial growth India",
  "ISRO SpaDeX space docking",
  "RBI repo rate India",
  "India AI compute technology",
  "G20 Cape Town climate summit",
  "Smriti Mandhana cricket India",
  "Busan International Film Festival",
  "Vande Bharat train India",
  "silicon photonics startup Bengaluru",
];

async function bingImage(query) {
  const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=1&imageType=Photo&safeSearch=Moderate`;
  const res = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": BING_KEY },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data?.value?.[0]?.contentUrl || null;
}

(async () => {
  console.log("Testing Bing Image Search API...\n");
  let passed = 0;
  for (const q of QUERIES) {
    try {
      const img = await bingImage(q);
      if (img) {
        console.log(`✅  ${q.substring(0, 50)}`);
        console.log(`    → ${img.substring(0, 80)}...\n`);
        passed++;
      } else {
        console.log(`⚠️  ${q} — no image returned\n`);
      }
    } catch (e) {
      console.log(`❌  ${q} — ${e.message}\n`);
    }
  }
  console.log(`\nResult: ${passed}/${QUERIES.length} queries returned images.`);
})();

```

---

## File: test-cors.js

```js
const query = "Molly Little";
const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
const url = `https://api.allorigins.win/get?url=${encodeURIComponent(ddgUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    const html = data.contents;
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    if (snippetMatch && titleMatch) {
      console.log("Title:", titleMatch[1].replace(/<\/?b>/g, '').trim());
      console.log("Snippet:", snippetMatch[1].replace(/<\/?b>/g, '').trim());
    } else {
      console.log("No match");
    }
  });

```

---

## File: test-cse-scrape.js

```js
async function testCseScrape() {
  const cx = "b04126928d9bb4e1a";
  const query = "Molly Little"; // Unknown person
  
  try {
    // 1. Fetch the cse.js file to extract the token
    console.log("Fetching CSE JS...");
    const jsUrl = `https://cse.google.com/cse.js?cx=${cx}`;
    const jsRes = await fetch(jsUrl);
    const jsText = await jsRes.text();
    
    // The token is usually in a structure like: "cse_token": "..."
    const tokenMatch = jsText.match(/"cse_token":\s*"([^"]+)"/);
    if (!tokenMatch) {
       console.log("Failed to find cse_token in JS file.");
       return;
    }
    const cse_tok = tokenMatch[1];
    console.log("Extracted Token:", cse_tok);
    
    // 2. Build the unauthenticated Google CSE V1 endpoint request
    // rsz=filtered_cse -> results
    // num=10 -> number of results
    // hl=en -> language
    // source=gcsc -> source
    // cx=... -> engine id
    // q=... -> query
    // safe=off -> safe search
    // searchType=image or tbm=isch
    const searchUrl = `https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=en&source=gcsc&gss=.com&cx=${cx}&q=${encodeURIComponent(query)}&safe=off&cse_tok=${cse_tok}&exp=csqr,cc&callback=google.search.cse.api16393&tbm=isch`;
    
    console.log("Fetching Search Results...");
    const searchRes = await fetch(searchUrl);
    const searchText = await searchRes.text();
    
    // The response is JSONP wrapped in the callback, e.g. /*O_o*/\ngoogle.search.cse.api16393({ ... })
    // We can extract the JSON part
    const jsonMatch = searchText.match(/google\.search\.cse\.api\d+\((.*)\);?/s);
    if (jsonMatch) {
       const jsonStr = jsonMatch[1];
       const data = JSON.parse(jsonStr);
       console.log("Success! Found results.");
       if (data.results && data.results.length > 0) {
          console.log(`First image URL: ${data.results[0].image.url}`);
          console.log(`Second image URL: ${data.results[1].image.url}`);
       } else {
          console.log("No results array found.");
       }
    } else {
       console.log("Failed to parse JSONP response.", searchText.substring(0, 200));
    }
    
  } catch (e) {
    console.error("Error:", e);
  }
}

testCseScrape();

```

---

## File: test-cse.js

```js
const cx = "b04126928d9bb4e1a";
const query = "Sydney Sweeney";

// Test unauthenticated direct call (likely requires API key)
const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${cx}&q=${encodeURIComponent(query)}&searchType=image`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    console.log("REST API Response:");
    if (data.error) {
       console.log("Error:", data.error.message);
    } else {
       console.log("Success! Found", data.items?.length, "images");
    }
  })
  .catch(console.error);

```

---

## File: test-ddg-html.js

```js
const query = "Molly Little";
const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

fetch(url)
  .then(r => r.text())
  .then(html => {
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    if (snippetMatch && titleMatch) {
      // Remove b tags
      const snippet = snippetMatch[1].replace(/<\/?b>/g, '').trim();
      const title = titleMatch[1].replace(/<\/?b>/g, '').trim();
      console.log({ title, snippet });
    } else {
      console.log("No results");
    }
  })
  .catch(console.error);

```

---

## File: test-ddg.js

```js
const query = "Molly Little";
const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

fetch(url).then(r => r.json()).then(console.log).catch(console.error);

```

---

## File: test-ddg2.js

```js
const query = "Molly Little";
const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } })
  .then(r => r.text())
  .then(html => {
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    console.log(snippetMatch ? "Found" : "Not Found");
  });

```

---

## File: test-ddg3.js

```js
const query = "Molly Little";
const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } })
  .then(r => r.text())
  .then(html => {
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    if (snippetMatch && titleMatch) {
      console.log("Title:", titleMatch[1].replace(/<\/?b>/g, '').trim());
      console.log("Snippet:", snippetMatch[1].replace(/<\/?b>/g, '').trim());
    } else {
      console.log("No match");
    }
  });

```

---

## File: test-font.js

```js
const https = require('https');
https.get('https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2', (res) => {
  console.log('Status:', res.statusCode);
});

```

---

## File: test-getnews.ts

```ts
import { getNews } from './src/server/newsapi.functions.js';

// Simple mock for fetch since newsapi uses DOM fetch
const originalFetch = global.fetch;

async function runTest() {
  console.log("Testing getNews('Sydney Sweeney')...");
  try {
    const { articles } = await getNews("Sydney Sweeney");
    
    console.log(`✅ Got ${articles.length} articles`);
    
    // Bio should be first
    const bio = articles[0];
    console.log(`\n[BIO CARD]`);
    console.log(`Title: ${bio.title}`);
    console.log(`Image: ${bio.image}`);
    console.log(`Source: ${bio.source}`);
    
    // Check next 3 news articles to ensure images are varied
    console.log(`\n[NEWS CARDS]`);
    articles.slice(1, 4).forEach((a, i) => {
      console.log(`${i+1}. ${a.title}`);
      console.log(`   Img: ${a.image}`);
      console.log(`   Source: ${a.source}`);
    });

  } catch (e) {
    console.error("Test failed:", e);
  }
}

// Since the file is TypeScript and uses ES modules, we need to compile it or use ts-node
// Let's just write a test we can run with ts-node or node --experimental-specifier-resolution=node
runTest();

```

---

## File: test-gnews.js

```js
const query = "Sydney Sweeney";
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.status === "ok") {
      console.log(`✅ Got ${data.items.length} articles for "${query}"`);
      data.items.slice(0, 3).forEach((item, i) => {
        console.log(`${i+1}. [${item.pubDate}] ${item.title} — ${item.source?.title || "?"}`);
      });
    } else {
      console.log("❌ Failed:", data);
    }
  })
  .catch(e => console.error("Error:", e));

```

---

## File: test-guardian.js

```js
const GUARDIAN_API_KEY = "70f3d718-766d-49bd-ae89-44b455129f16";
const query = "Molly Little";
const url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&q=${encodeURIComponent(query)}`;

fetch(url).then(r => r.json()).then(d => console.log(d.response.results.length)).catch(console.error);

```

---

## File: test-image-cascade.js

```js
// test-image-cascade.js — run with: node test-image-cascade.js
const BING_API_KEY = "643c267be4b9b46d212104cbdbc3b31c5433ad527af8ac96a687bc3cb253815c";

const QUERIES = [
  "Madhya Pradesh industrial growth India",
  "ISRO SpaDeX space docking",
  "Smriti Mandhana cricket India",
  "Taylor Swift concert",
  "Elon Musk Tesla",
];

async function fetchBingDirect(query) {
  const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=3&imageType=Photo&safeSearch=Moderate`;
  const res = await fetch(url, { headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY } });
  if (!res.ok) return null;
  const data = await res.json();
  const images = data?.value || [];
  for (const img of images) {
    if (img?.contentUrl && /^https?:\/\//i.test(img.contentUrl)) return img.contentUrl;
  }
  return null;
}

async function fetchWikimediaDirect(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&prop=imageinfo&iiprop=url&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&origin=*`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;
  for (const page of Object.values(pages)) {
    const imgUrl = page.imageinfo?.[0]?.url;
    if (imgUrl && /\.(jpe?g|png|webp)/i.test(imgUrl)) return imgUrl;
  }
  return null;
}

async function fetchImage(query) {
  const bing = await fetchBingDirect(query);
  if (bing) return { url: bing, source: "Bing ✅" };
  const wiki = await fetchWikimediaDirect(query);
  if (wiki) return { url: wiki, source: "Wikimedia (fallback) ✅" };
  return { url: null, source: "None ❌" };
}

(async () => {
  console.log("Testing image cascade (Bing → Wikimedia)...\n");
  let passed = 0;
  for (const q of QUERIES) {
    const { url, source } = await fetchImage(q);
    if (url) {
      console.log(`[${source}] ${q}`);
      console.log(`  → ${url.substring(0, 90)}...\n`);
      passed++;
    } else {
      console.log(`[${source}] ${q}\n`);
    }
  }
  console.log(`Result: ${passed}/${QUERIES.length} queries returned images.`);
})();

```

---

## File: test-img.js

```js
const query = "Sydney Sweeney";
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.status === "ok") {
      data.items.slice(0, 3).forEach((item, i) => {
        console.log(`\nArticle ${i+1}:`, item.title);
        console.log(`Thumbnail:`, item.thumbnail);
        console.log(`Enclosure:`, item.enclosure);
        // Check if image is in description
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        console.log(`Img in desc:`, imgMatch ? imgMatch[1] : null);
        console.log(`Content:`, item.content ? 'has content' : 'no content');
      });
    }
  });

```

---

## File: test-molly.js

```js
const query = "Molly Little";
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.status === "ok") {
      console.log(`✅ Got ${data.items.length} articles for "${query}"`);
      data.items.slice(0, 3).forEach((item, i) => {
        console.log(`${i+1}. [${item.pubDate}] ${item.title}`);
      });
    } else {
      console.log("❌ Failed:", data.message);
    }
  });

```

---

## File: test-og-images.js

```js
// test-og-images.js — run with: node test-og-images.js
// Tests OG image extraction from real article URLs via allorigins.win

const TESTS = [
  {
    label: "The Guardian (tech article)",
    url: "https://www.theguardian.com/technology/2024/nov/20/openai-chatgpt-anniversary",
  },
  {
    label: "Google News RSS link",
    url: "https://news.google.com/rss/search?q=India+AI+technology&hl=en-US&gl=US&ceid=US:en",
  },
  {
    label: "BBC News",
    url: "https://www.bbc.com/news/technology",
  },
];

async function fetchOGImage(articleUrl) {
  if (!articleUrl || articleUrl === "#") return null;
  try {
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(articleUrl)}`;
    const res = await fetch(proxy, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
    return match?.[1] || null;
  } catch (e) {
    return null;
  }
}

(async () => {
  console.log("Testing OG Image Extraction via allorigins.win...\n");
  let passed = 0;
  for (const t of TESTS) {
    const img = await fetchOGImage(t.url);
    if (img) {
      console.log(`✅  ${t.label}`);
      console.log(`    → ${img.substring(0, 90)}...\n`);
      passed++;
    } else {
      console.log(`⚠️  ${t.label} — no og:image found\n`);
    }
  }
  console.log(`Result: ${passed}/${TESTS.length} URLs returned OG images.`);
})();

```

---

## File: test-scrape-gnews.js

```js


async function testGNewsScrape() {
  const query = "Sydney Sweeney";
  const url = `https://news.google.com/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  
  try {
    const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`);
    const html = await res.text();
    
    // Check if we got something
    console.log("HTML length:", html.length);
    
    // We can't easily parse with cheerio in this browser script without installing it, 
    // so let's use regex to find article blocks or images.
    const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/g;
    let match;
    let count = 0;
    while ((match = articleRegex.exec(html)) !== null && count < 5) {
      count++;
      const articleHtml = match[1];
      
      // Extract title
      const titleMatch = articleHtml.match(/<a[^>]*class="JtKRv"[^>]*>([^<]+)<\/a>/);
      const title = titleMatch ? titleMatch[1] : "No title";
      
      // Extract image
      const imgMatch = articleHtml.match(/<img[^>]*src="([^"]+)"/);
      const img = imgMatch ? imgMatch[1] : "No image";
      
      console.log(`\nArticle ${count}: ${title}`);
      console.log(`Image: ${img}`);
    }
    
    if (count === 0) {
      console.log("No <article> tags found. Let's look for images directly.");
      const imgMatches = [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].slice(0, 10);
      imgMatches.forEach((m, i) => console.log(`Img ${i+1}: ${m[1]}`));
    }
    
  } catch (e) {
    console.error(e);
  }
}

testGNewsScrape();

```

---

## File: test-tmdb-backdrops.js

```js
const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function testFetch() {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=sydney+sweeney`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    const topResult = data.results[0];
    
    console.log("Found person:", topResult.name);
    if (topResult.known_for) {
        for (const media of topResult.known_for) {
            console.log("Known for:", media.name || media.title);
            const mediaType = media.media_type || 'movie';
            const mediaImgs = await fetch(`https://api.themoviedb.org/3/${mediaType}/${media.id}/images?api_key=${TMDB_API_KEY}`);
            const mediaImgData = await mediaImgs.json();
            console.log("Backdrops found:", mediaImgData.backdrops?.length || 0);
            if (mediaImgData.backdrops) {
                console.log("Sample:", mediaImgData.backdrops[0].file_path);
            }
        }
    }
}
testFetch();

```

---

## File: test-tmdb-debug.js

```js
const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function testFetch() {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=from+series`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    const topResult = data.results[0];
    
    console.log("Found:", topResult.name || topResult.title);
    console.log("Media type:", topResult.media_type);
    console.log("Poster path:", topResult.poster_path);
}
testFetch();

```

---

## File: test-tmdb-multi.js

```js
const tmdbKey = "3f8af7f1ca1d529dea0f89190639240d";

async function testTmdbMulti(query) {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const topResult = data.results[0];
      console.log(`[${query}] Found: ${topResult.name || topResult.title} (Type: ${topResult.media_type})`);
      
      let images = [];
      
      if (topResult.media_type === 'person') {
        const imgRes = await fetch(`https://api.themoviedb.org/3/person/${topResult.id}/images?api_key=${tmdbKey}`);
        const imgData = await imgRes.json();
        if (imgData.profiles) images.push(...imgData.profiles.map(p => p.file_path));
        if (topResult.known_for) {
           topResult.known_for.forEach(m => {
              if (m.backdrop_path) images.push(m.backdrop_path);
              if (m.poster_path) images.push(m.poster_path);
           });
        }
      } else if (topResult.media_type === 'tv' || topResult.media_type === 'movie') {
        const type = topResult.media_type;
        const imgRes = await fetch(`https://api.themoviedb.org/3/${type}/${topResult.id}/images?api_key=${tmdbKey}`);
        const imgData = await imgRes.json();
        if (imgData.backdrops) images.push(...imgData.backdrops.map(b => b.file_path));
        if (imgData.posters) images.push(...imgData.posters.map(p => p.file_path));
      }
      
      console.log(`Found ${images.length} total images!`);
      images.slice(0, 3).forEach(img => console.log(` - https://image.tmdb.org/t/p/w780${img}`));
      
    } else {
      console.log(`[${query}] No result.`);
    }
  } catch (e) {
    console.error(e);
  }
}

testTmdbMulti("from series");
testTmdbMulti("sydney sweeney");

```

---

## File: test-tmdb-sunny.js

```js
const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function fetchWithTimeout(url, ms = 1500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchTMDBImages(query) {
  try {
    const cleanQuery = query.toLowerCase().replace(" series", "").replace(" movie", "");
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanQuery)}`;
    console.log("Searching TMDB:", searchUrl);
    const res = await fetchWithTimeout(searchUrl, 5000);
    const data = await res.json();
    
    console.log(`TMDB returned ${data.results?.length} results`);
    if (data.results && data.results.length > 0) {
      const topResult = data.results[0];
      console.log("Top result type:", topResult.media_type, topResult.name || topResult.title);
      
      const newsImages = [];
      let profile = undefined;
      
      if (topResult.media_type === 'person') {
        const imgRes = await fetchWithTimeout(`https://api.themoviedb.org/3/person/${topResult.id}/images?api_key=${TMDB_API_KEY}`, 5000);
        const imgData = await imgRes.json();
        
        if (imgData.profiles && imgData.profiles.length > 0) {
           profile = `https://image.tmdb.org/t/p/w780${imgData.profiles[0].file_path}`;
        }

        if (topResult.known_for) {
          for (const media of topResult.known_for) {
             const mediaType = media.media_type || 'movie';
             if (media.backdrop_path) newsImages.push(`https://image.tmdb.org/t/p/w780${media.backdrop_path}`);
             
             try {
               const mediaImgs = await fetchWithTimeout(`https://api.themoviedb.org/3/${mediaType}/${media.id}/images?api_key=${TMDB_API_KEY}`, 5000);
               const mediaImgData = await mediaImgs.json();
               if (mediaImgData.backdrops) {
                  mediaImgData.backdrops.slice(0, 5).forEach((b) => {
                     newsImages.push(`https://image.tmdb.org/t/p/w780${b.file_path}`);
                  });
               }
             } catch(e) {}
          }
        }
        
        if (newsImages.length === 0 && imgData.profiles) {
           imgData.profiles.forEach((p) => newsImages.push(`https://image.tmdb.org/t/p/w780${p.file_path}`));
        }
      }
      return { profile, newsImages: Array.from(new Set(newsImages)) };
    }
    return { newsImages: [] };
  } catch (err) {
    console.error(err);
    return { newsImages: [] };
  }
}

fetchTMDBImages("Sunny Deol").then(res => {
  console.log("Result:", JSON.stringify(res, null, 2));
});

```

---

## File: test-tmdb.js

```js
const tmdbKey = "3f8af7f1ca1d529dea0f89190639240d";
const query = "Sydney Sweeney";

async function testTmdb() {
  // 1. Search for person
  const searchUrl = `https://api.themoviedb.org/3/search/person?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const person = data.results[0];
      console.log(`Found: ${person.name} (ID: ${person.id})`);
      
      // 2. Fetch all their images (profiles)
      const imagesUrl = `https://api.themoviedb.org/3/person/${person.id}/images?api_key=${tmdbKey}`;
      const imgRes = await fetch(imagesUrl);
      const imgData = await imgRes.json();
      
      console.log(`\nFound ${imgData.profiles?.length || 0} profile photos`);
      if (imgData.profiles) {
         imgData.profiles.slice(0, 3).forEach((p, i) => {
           console.log(`Photo ${i+1}: https://image.tmdb.org/t/p/w500${p.file_path}`);
         });
      }
      
      // 3. Look at movies they are known for, to get movie posters!
      console.log(`\nFound ${person.known_for?.length || 0} known-for movies/shows`);
      if (person.known_for) {
        person.known_for.forEach((m, i) => {
          console.log(`Poster ${i+1}: ${m.title || m.name} -> https://image.tmdb.org/t/p/w500${m.poster_path}`);
          if (m.backdrop_path) {
             console.log(`Backdrop ${i+1}: https://image.tmdb.org/t/p/w780${m.backdrop_path}`);
          }
        });
      }
      
    } else {
      console.log("No person found.");
    }
  } catch (e) {
    console.error("TMDB error:", e);
  }
}

testTmdb();

```

---

## File: test-tvmaze.js

```js
async function testTvMaze() {
  const query = "Sydney Sweeney";
  const url = `https://api.tvmaze.com/search/people?q=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Found ${data.length} results`);
    if (data.length > 0) {
       console.log("Image:", data[0].person.image);
    }
  } catch (e) {
    console.error(e);
  }
}
testTvMaze();

```

---

## File: test-wiki-img.js

```js
const query = "Sydney Sweeney";
const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      console.log(`✅ Found ${pages.length} images for ${query}`);
      pages.forEach((p, i) => {
        if (p.imageinfo && p.imageinfo[0]) {
           console.log(`Image ${i+1}: ${p.imageinfo[0].url}`);
        }
      });
    } else {
      console.log("❌ No images found.");
    }
  });

```

---

## File: test-wiki.js

```js
const query = "Molly Little";
const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&generator=search&exlimit=1&explaintext=1&piprop=thumbnail&pithumbsize=800&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&origin=*`;

fetch(url).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2))).catch(console.error);

```

---

## File: test-wikimedia.js

```js
// test-wikimedia.js — run with: node test-wikimedia.js
// Tests Wikimedia Commons image search (no API key needed)

const QUERIES = [
  "Madhya Pradesh industrial India",
  "ISRO spacecraft satellite",
  "Reserve Bank of India building",
  "artificial intelligence technology",
  "G20 climate summit",
  "cricket India women team",
  "Bollywood film festival",
  "Vande Bharat train",
  "silicon photonics technology",
];

async function fetchWikimediaImage(query) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&prop=imageinfo&iiprop=url&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&origin=*`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;

    // Find first result with a valid image URL (jpg/png/webp, skip SVG/PDF)
    for (const page of Object.values(pages)) {
      const imgUrl = page.imageinfo?.[0]?.url;
      if (imgUrl && /\.(jpe?g|png|webp)/i.test(imgUrl)) {
        return imgUrl;
      }
    }
    return null;
  } catch {
    return null;
  }
}

(async () => {
  console.log("Testing Wikimedia Commons Image Search...\n");
  let passed = 0;
  for (const q of QUERIES) {
    const img = await fetchWikimediaImage(q);
    if (img) {
      console.log(`✅  ${q}`);
      console.log(`    → ${img.substring(0, 90)}\n`);
      passed++;
    } else {
      console.log(`⚠️  ${q} — no image found\n`);
    }
  }
  console.log(`\nResult: ${passed}/${QUERIES.length} queries returned images.`);
})();

```

---

## File: tsconfig.json

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "vite.config.ts", "eslint.config.js"],
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],

    /* Bundler mode */
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "noEmit": true,

    /* Linting */
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

---

## File: vercel.json

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

```

---

## File: vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

```

---

