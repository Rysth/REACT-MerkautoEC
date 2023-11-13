import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginDataActions } from '../../redux/slices/loginDataSlice';

function NavBar({ variant, linksVariant, method }) {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(loginDataActions.logoutFromApp());
    method();
  };

  return (
    <nav className={variant}>
      <NavLink to="/orden" className={linksVariant} onClick={method}>
        <i className="w-4 text-center fa-solid fa-clipboard" />
        Generar Orden
      </NavLink>
      <NavLink to="/consultar" className={linksVariant} onClick={method}>
        <i className="w-4 text-center fa-solid fa-car-side" />
        Consultar Vehículo
      </NavLink>
      <button
        type="button"
        className={`${linksVariant} bg-red-200`}
        onClick={logOut}
      >
        <i className="w-4 text-center fa-solid fa-key" />
        Cerrar Sesión
      </button>
    </nav>
  );
}

NavBar.propTypes = {
  variant: PropTypes.string.isRequired,
  linksVariant: PropTypes.string.isRequired,
  method: PropTypes.func.isRequired,
};

export default NavBar;
