import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../../stores/useAuthStore';

function NavBar({ variant, linksVariant, method }) {
	const logout = useAuthStore((store) => store.logout);
	const logOut = () => {
		logout();
		method();
	};

	return (
		<nav className={variant}>
			<NavLink
				to='/orden'
				className={linksVariant}
				onClick={method}
			>
				<i className='w-4 text-center fa-solid fa-clipboard' />
				Nueva Orden
			</NavLink>
			{/* <NavLink
				to='/listado'
				className={linksVariant}
				onClick={method}
			>
				<i className='w-4 text-center fa-solid fa-list' />
				Listado de Ordenes
			</NavLink> */}
			<button
				type='button'
				className={`${linksVariant} !bg-red-400`}
				onClick={logOut}
			>
				<i className='w-4 text-center fa-solid fa-key' />
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
