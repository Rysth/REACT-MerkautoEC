import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function SidebarItem({ route, text, icon }) {
  return (
    <li className="grid">
      <NavLink
        to={route}
        className="flex items-center w-full gap-2 p-2 px-2 text-sm"
      >
        <i className={`fa-solid ${icon}`} />
        {text}
      </NavLink>
    </li>
  );
}

SidebarItem.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default SidebarItem;
