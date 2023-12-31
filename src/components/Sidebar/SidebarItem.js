import PropTypes from 'prop-types';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

/* eslint-disable */
function SidebarItem({ route, text, icon, context, method }) {
  const { expanded } = useContext(context);
  return (
    <li className="grid text-gray-800">
      <NavLink
        to={route}
        className="flex items-center w-full gap-2 p-2"
        onClick={method}
      >
        <i className={`w-4 text-center fa-solid ${icon}`} />
        <span
          className={`overflow-hidden transition-all text-sm ${
            expanded ? 'w-full' : 'hidden'
          }`}
        >
          {text}
        </span>
      </NavLink>
    </li>
  );
}

SidebarItem.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  context: PropTypes.any.isRequired,
  method: PropTypes.func.isRequired,
};

export default SidebarItem;
