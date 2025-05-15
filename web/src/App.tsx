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
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App
