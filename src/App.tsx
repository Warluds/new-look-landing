import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import About from "./pages/About.tsx";
import Career from "./pages/Career.tsx";
import Contacts from "./pages/Contacts.tsx";
import Cooperation from "./pages/Cooperation.tsx";
import Education from "./pages/Education.tsx";
import Import from "./pages/Import.tsx";
import Index from "./pages/Index.tsx";
import Marketing from "./pages/Marketing.tsx";
import News from "./pages/News.tsx";
import NewsAdmin from "./pages/NewsAdmin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/import" element={<Import />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/cooperation" element={<Cooperation />} />
            <Route path="/education" element={<Education />} />
            <Route path="/news" element={<News />} />
            <Route path="/abis-admin-9f3k" element={<NewsAdmin />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contacts" element={<Contacts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
