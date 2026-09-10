import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import ToastContainer from '@/components/ui/Toast';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ProfilePage from '@/pages/ProfilePage';
import CitizenDashboard from '@/pages/citizen/CitizenDashboard';
import BookPickup from '@/pages/citizen/BookPickup';
import TrackPickup from '@/pages/citizen/TrackPickup';
import History from '@/pages/citizen/History';
import Rewards from '@/pages/citizen/Rewards';
import KabadiwalaDashboard from '@/pages/kabadiwala/KabadiwalaDashboard';
import PickupRequests from '@/pages/kabadiwala/PickupRequests';
import ActivePickups from '@/pages/kabadiwala/ActivePickups';
import CompletedPickups from '@/pages/kabadiwala/CompletedPickups';
import Earnings from '@/pages/kabadiwala/Earnings';
import CollectorPickupDetails from '@/pages/kabadiwala/CollectorPickupDetails';
import RecyclerDashboard from '@/pages/recycler/RecyclerDashboard';
import Materials from '@/pages/recycler/Materials';
import Collections from '@/pages/recycler/Collections';
import RecyclerAnalytics from '@/pages/recycler/RecyclerAnalytics';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminPickups from '@/pages/admin/AdminPickups';
import AdminRecyclers from '@/pages/admin/AdminRecyclers';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* Citizen */}
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/book-pickup" element={<BookPickup />} />
          <Route path="/citizen/track-pickup" element={<TrackPickup />} />
          <Route path="/citizen/history" element={<History />} />
          <Route path="/citizen/rewards" element={<Rewards />} />
          <Route path="/citizen/profile" element={<ProfilePage />} />
          {/* Kabadiwala */}
          <Route path="/kabadiwala/dashboard" element={<KabadiwalaDashboard />} />
          <Route path="/kabadiwala/requests" element={<PickupRequests />} />
          <Route path="/kabadiwala/active" element={<ActivePickups />} />
          <Route path="/kabadiwala/completed" element={<CompletedPickups />} />
          <Route path="/kabadiwala/earnings" element={<Earnings />} />
          <Route path="/kabadiwala/pickup/:id" element={<CollectorPickupDetails />} />
          <Route path="/kabadiwala/profile" element={<ProfilePage />} />
          {/* Recycler */}
          <Route path="/recycler/dashboard" element={<RecyclerDashboard />} />
          <Route path="/recycler/materials" element={<Materials />} />
          <Route path="/recycler/collections" element={<Collections />} />
          <Route path="/recycler/analytics" element={<RecyclerAnalytics />} />
          <Route path="/recycler/profile" element={<ProfilePage />} />
          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/pickups" element={<AdminPickups />} />
          <Route path="/admin/recyclers" element={<AdminRecyclers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
