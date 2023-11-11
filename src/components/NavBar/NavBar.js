import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavBar({ variant, linksVariant, method }) {
  return (
    <nav className={variant}>
      <NavLink to="/" className={linksVariant} onClick={method}>
        <i className="w-4 text-center fa-solid fa-clipboard" />
        Generar Orden
      </NavLink>
      <NavLink to="/consultar" className={linksVariant} onClick={method}>
        <i className="w-4 text-center fa-solid fa-car-side" />
        Consultar Vehículo
      </NavLink>
    </nav>
  );
}

NavBar.propTypes = {
  variant: PropTypes.string.isRequired,
  linksVariant: PropTypes.string.isRequired,
  method: PropTypes.func.isRequired,
};

export default NavBar;
