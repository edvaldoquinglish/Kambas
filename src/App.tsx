
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Explore from './pages/Explore';
import Onboarding from './pages/Onboarding';
import PendingApproval from './pages/PendingApproval';
import Dashboard from './pages/Dashboard';
import GigDetails from './pages/GigDetails';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const isNewUser = !!user && (!profile || !profile.onboarded);
  const isNotVerified = !!user && !!profile && profile.onboarded && !profile.isVerified;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/u/:uid" element={<Profile />} />
          <Route 
            path="/messages" 
            element={user ? <Messages /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/explore" 
            element={isNotVerified ? <Navigate to="/pending-approval" replace /> : <Explore />} 
          />
          <Route 
            path="/gig/:id" 
            element={isNotVerified ? <Navigate to="/pending-approval" replace /> : <GigDetails />} 
          />
          <Route 
            path="/onboarding" 
            element={user ? (profile?.onboarded ? <Navigate to="/dashboard" replace /> : <Onboarding />) : <Navigate to="/" replace />} 
          />
          <Route 
            path="/pending-approval" 
            element={user ? (profile?.isVerified ? <Navigate to="/dashboard" replace /> : <PendingApproval />) : <Navigate to="/" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                isNewUser ? <Navigate to="/onboarding" replace /> : 
                isNotVerified ? <Navigate to="/pending-approval" replace /> :
                <Dashboard />
              ) : <Navigate to="/" replace />
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

