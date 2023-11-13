import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to="/" />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  /* eslint-disable */
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
