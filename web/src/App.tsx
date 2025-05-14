// Imports
import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpcomingAppointments from './pages/UpcomingAppointments';
import DoctorCreation from './pages/DoctorCreation';
import AdminCreation from './pages/AdminCreation';
import AdminProfile from './pages/AdminProfile';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const PatientProfile = lazy(() => import('./pages/PatientProfile'));
/**
 * React function to render the core APP and handle app routing
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={(<h2>Loading...</h2>)}>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Eventually these will need to be merged */}
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/admin-profile" element={<AdminProfile />}/>

        <Route path="/appointments/" element={<UpcomingAppointments />}/>
        <Route path="/create-doctor/" element={<DoctorCreation />}/>
        <Route path="/create-admin/" element={<AdminCreation />}/>
      </Routes>
    </Suspense>
  );
};

export default App
