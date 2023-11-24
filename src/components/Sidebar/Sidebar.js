import SidebarItem from './SidebarItem';
import MerkautoImage from '../../assets/images/brand/brand.png';

/* eslint-disable */
const sidebarItems = [
  { id: 1, route: '/', text: 'Inicio', icon: 'fa-home' },
  { id: 2, route: '/ordenes', text: 'Ordenes', icon: 'fa-list' },
];
/* eslint-enable */

function Sidebar() {
  return (
    <aside className="h-screen">
      <nav className="flex flex-col h-full border min-w-[15rem] p-3 bg-white">
        <picture className="relative flex justify-center py-4 border-b">
          <img
            src={MerkautoImage}
            alt="MerkautoEC's brand logo"
            className="w-40 sm:w-44"
          />
          <button
            className="absolute w-10 h-10 text-white bg-[var(--CL-primary-blue)] border-2 border-white rounded-full bottom-3 -right-8 md:hover:bg-black md:transition md:active:scale-95 md:hover:shadow-2xl"
            type="button"
            aria-label="Toggle Sidebar "
          >
            <i className="text-xl fa-solid fa-arrow-left" />
          </button>
        </picture>
        <ul className="flex flex-col flex-1 gap-1 py-3 rounded-lg">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              route={item.route}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
