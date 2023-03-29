import {
  Navigate,
  Outlet,
} from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to={'/verifyemail'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;