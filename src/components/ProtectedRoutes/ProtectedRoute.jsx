import { Navigate } from 'react-router-dom';
// import { role } from '../../constants/constant';
import { jwtDecode } from "jwt-decode";
import { accessToken } from '../../constants/constant';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token_ = localStorage.getItem(accessToken);
  console.log("protected"+token_);
  const token = jwtDecode(token_);
  console.log(token);
  const currentTime = Date.now() / 1000; // convert to seconds

  // console.log('check+'+ currRole + token.exp +" " + token.role +" ");
  // console.log(allowedRoles==currRole);
  console.log('isexp '+(token.exp < currentTime))
  if(token.exp < currentTime) return <Navigate to="/login" replace />;

  if (!token.role ) return <Navigate to="/login" replace />;
  console.log('role check' +allowedRoles +  " "+token.role)
  if (!(allowedRoles == (token.role))) return <Navigate to="/login" replace />;
  // console.log( "returning child");
  return children;
};

export default ProtectedRoute;
