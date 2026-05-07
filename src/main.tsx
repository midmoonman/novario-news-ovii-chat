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
