import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@/lib/i18n';
import VisitTracker from '@/components/VisitTracker';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Overview = lazy(() => import('@/pages/dashboard/Overview'));
const Projects = lazy(() => import('@/pages/dashboard/Projects'));
const TeamPage = lazy(() => import('@/pages/dashboard/TeamPage'));
const Messages = lazy(() => import('@/pages/dashboard/Messages'));
const DashSettings = lazy(() => import('@/pages/dashboard/DashSettings'));
const VisitorsPage = lazy(() => import('@/pages/dashboard/VisitorsPage'));
const ShortsPage = lazy(() => import('@/pages/dashboard/ShortsPage'));
const PartnersPage = lazy(() => import('@/pages/dashboard/PartnersPage'));
const PageNotFound = lazy(() => import('./lib/PageNotFound'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <VisitTracker />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Overview />} />
                <Route path="projects" element={<Projects />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="messages" element={<Messages />} />
                <Route path="visitors" element={<VisitorsPage />} />
                <Route path="shorts" element={<ShortsPage />} />
                <Route path="partners" element={<PartnersPage />} />
                <Route path="settings" element={<DashSettings />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App
