// Imports
import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages
const Login = lazy(() => import('./pages/login/Login'));

/**
 * React function to render the core APP and handle app routing
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={(<h2>Loading...</h2>)}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Suspense>
  );
};

export default App
