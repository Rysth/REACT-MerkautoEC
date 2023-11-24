import { createContext, useState } from 'react';
import SidebarItem from './SidebarItem';
import MerkautoImage from '../../assets/images/brand/brand.png';

/* eslint-disable */
const sidebarItems = [
  { id: 1, route: '/', text: 'Inicio', icon: 'fa-home' },
  { id: 2, route: '/ordenes', text: 'Ordenes', icon: 'fa-list' },
];
/* eslint-enable */

const SidebarContext = createContext();
function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav
        className={`flex flex-col h-full p-3 bg-white transition-all ${
          expanded ? 'w-[16rem]' : 'w-[3.5rem]'
        }`}
      >
        <picture className="relative flex justify-center py-4 border-b h-[4rem]">
          <img
            src={MerkautoImage}
            alt="MerkautoEC's brand logo"
            className={`w-40  transition-all ${
              expanded ? 'w-44' : 'object-contain'
            }`}
          />
          <button
            onClick={() => {
              setExpanded(!expanded);
            }}
            className="absolute w-10 h-10 text-white bg-[var(--CL-primary-blue)] border-2 border-white rounded-full bottom-3 -right-8 md:hover:bg-black md:transition md:active:scale-95 md:hover:shadow-2xl z-50"
            type="button"
            aria-label="Toggle Sidebar "
          >
            <i
              className={`text-xl fa-solid  ${
                expanded ? 'fa-arrow-left' : 'fa-arrow-right'
              }`}
            />
          </button>
        </picture>
        <ul className="flex flex-col flex-1 gap-1 py-3 rounded-lg">
          <SidebarContext.Provider value={{ expanded }}>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.id}
                route={item.route}
                text={item.text}
                icon={item.icon}
                context={SidebarContext}
              />
            ))}
          </SidebarContext.Provider>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
