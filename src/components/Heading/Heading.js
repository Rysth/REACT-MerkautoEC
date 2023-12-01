import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { destroySession } from '../../redux/slices/loginDataSlice';

function Heading({ text }) {
  const { userCredentials, authToken } = useSelector(
    (store) => store.credentials,
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(destroySession(authToken));
  };

  return (
    <header className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold sm:text-4xl">{text}</h2>
      <span className="flex items-center gap-2">
        <h3 className="text-sm sm:text-base">{userCredentials.name}</h3>
        <button
          type="button"
          className="btn btn-danger "
          onClick={() => handleLogout()}
        >
          Cerrar Sesión
        </button>
      </span>
    </header>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
