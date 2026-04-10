import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const NosotrosPage = lazy(() => import("./pages/NosotrosPage"));
const ServiciosPage = lazy(() => import("./pages/ServiciosPage"));
const EquipoPage = lazy(() => import("./pages/EquipoPage"));
const NuestraHistoriaPage = lazy(() => import("./pages/NuestraHistoriaPage"));
const NuestrosSociosPage = lazy(() => import("./pages/NuestrosSociosPage"));
const NuestraVisionPage = lazy(() => import("./pages/NuestraVisionPage"));
const VentajasPage = lazy(() => import("./pages/VentajasPage"));
const MVPPage = lazy(() => import("./pages/MVPPage"));
const GVVPage = lazy(() => import("./pages/GVVPage"));
const GestionPatrimonialPage = lazy(() => import("./pages/GestionPatrimonialPage"));
const TrendratingPage = lazy(() => import("./pages/TrendratingPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nosotros" element={<Suspense fallback={null}><NosotrosPage /></Suspense>} />
            <Route path="/servicios" element={<Suspense fallback={null}><ServiciosPage /></Suspense>} />
            <Route path="/nuestro-equipo" element={<Suspense fallback={null}><EquipoPage /></Suspense>} />
            <Route path="/quienes-somos/historia" element={<Suspense fallback={null}><NuestraHistoriaPage /></Suspense>} />
            <Route path="/quienes-somos/socios" element={<Suspense fallback={null}><NuestrosSociosPage /></Suspense>} />
            <Route path="/metodologia/vision" element={<Suspense fallback={null}><NuestraVisionPage /></Suspense>} />
            <Route path="/metodologia/ventajas" element={<Suspense fallback={null}><VentajasPage /></Suspense>} />
            <Route path="/que-hacemos/mvp" element={<Suspense fallback={null}><MVPPage /></Suspense>} />
            <Route path="/que-hacemos/gvv" element={<Suspense fallback={null}><GVVPage /></Suspense>} />
            <Route path="/que-hacemos/gestion-patrimonial" element={<Suspense fallback={null}><GestionPatrimonialPage /></Suspense>} />
            <Route path="/que-hacemos/trendrating" element={<Suspense fallback={null}><TrendratingPage /></Suspense>} />
            <Route path="/admin/login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
            <Route path="/admin" element={<Suspense fallback={null}><AdminPanel /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
