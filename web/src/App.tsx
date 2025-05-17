// Imports
import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/security/ProtectedRoute';
import PageLoading from './components/core/PageLoading';
import PageAccessDenied from './components/core/PageAccessDenied';

// Lazy load pages
const Login = lazy(() => import('./pages/login/Login'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const HomePage = lazy(() => import('./pages/Home'));
const UpcomingAppointments = lazy(() => import('./pages/UpcomingAppointments'));
const DoctorCreation = lazy(() => import('./pages/DoctorCreation'));
const PatientCreation = lazy(() => import('./pages/PatientCreation'));
const AdminCreation = lazy(() => import('./pages/AdminCreation'));
const AdminProfile = lazy(() => import('./pages/AdminProfile'));
const DoctorProfile = lazy(() => import('./pages/DoctorProfile'));
const PatientProfile = lazy(() => import('./pages/PatientProfile'));

/**
 * React function to render the core APP and handle app routing
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={(<h2>Loading...</h2>)}>
      <Routes>
        {
          //* Global Routes
        }
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        {
          //* Protected Routes
        }
        <Route element={<ProtectedRoute
          requiredRank="Any"
          loading={<PageLoading/>}
          fallback={<PageAccessDenied/>}
        />}>
          <Route path="/profile" Component={Profile}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/patient-profile" element={<PatientProfile />}/>
          <Route path="/doctor-profile" element={<DoctorProfile />}/>
          <Route path="/admin-profile" element={<AdminProfile />}/>
          <Route path="/appointments" element={<UpcomingAppointments />}/>
          <Route path="/create-patient" element={<PatientCreation />}/>
          <Route path="/create-doctor" element={<DoctorCreation />}/>
          <Route path="/create-admin" element={<AdminCreation />}/>
        </Route>
        {
          //* Admin Only Routes
        }
        <Route element={<ProtectedRoute
          requiredRank="Admin"
          loading={<PageLoading/>}
          fallback={<PageAccessDenied/>}
        />}>
          {
            //TODO Add Admin Only Routes Here
          }
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App
