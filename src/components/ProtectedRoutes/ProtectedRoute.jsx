import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  console.log('check+'+role);
  console.log(allowedRoles==role);

  if (!role) return <Navigate to="/login" replace />;

  if (!allowedRoles.toLocaleLowerCase === (role.toLocaleLowerCase)) return <Navigate to="/login" replace />;
  // console.log( "returning child");
  return children;
};

export default ProtectedRoute;
