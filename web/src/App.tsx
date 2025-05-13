// Imports
import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpcomingAppointments from './pages/UpcomingAppointments';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));

/**
 * React function to render the core APP and handle app routing
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={(<h2>Loading...</h2>)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments/" element={<UpcomingAppointments />}/>
      </Routes>
    </Suspense>
  );
};

export default App
