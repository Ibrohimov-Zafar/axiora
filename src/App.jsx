import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { I18nProvider } from '@/lib/i18n';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Overview from '@/pages/dashboard/Overview';
import Projects from '@/pages/dashboard/Projects';
import TeamPage from '@/pages/dashboard/TeamPage';
import Messages from '@/pages/dashboard/Messages';
import DashSettings from '@/pages/dashboard/DashSettings';
import VisitorsPage from '@/pages/dashboard/VisitorsPage';
import ShortsPage from '@/pages/dashboard/ShortsPage';
import PartnersPage from '@/pages/dashboard/PartnersPage';
import VisitTracker from '@/components/VisitTracker';

function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <VisitTracker />
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
        </Router>
        <Toaster />
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App