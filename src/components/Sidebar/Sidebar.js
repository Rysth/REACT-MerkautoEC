import { createContext, useState } from 'react';
import SidebarItem from './SidebarItem';
import MerkautoImage from '../../assets/images/brand/brand.png';
import RysthImage from '../../assets/images/brand/logo_rysthcraft.png';
import CoficImage from '../../assets/images/brand/logo_cofic.png';

/* eslint-disable */
const sidebarItems = [{ id: 1, route: '/', text: 'Clientes', icon: 'fa-user' }];
/* eslint-enable */

const SidebarContext = createContext();
function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`${expanded ? 'h-screen' : 'h-max sm:h-screen'}`}>
      <nav
        className={`flex flex-col p-4 py-2 bg-white transition-all h-full ${
          expanded
            ? 'fixed w-full sm:relative sm:w-[12rem] lg:w-[14rem] z-50'
            : 'z-0 w-full pt-2 pb-0 sm:w-[4rem]'
        }
        `}
      >
        <picture className="relative flex justify-between sm:justify-center sm:py-4 border-b py-2 sm:h-[4.5rem] sm:px-4">
          <img
            src={MerkautoImage}
            alt="MerkautoEC's brand logo"
            className="w-48 transition-all sm:object-contain"
          />
          <button
            onClick={() => {
              setExpanded(!expanded);
            }}
            className="absolute right-0 grid place-items-center bottom-1.5 sm:bottom-4 h-10 w-10 text-white bg-[var(--CL-primary-blue)] border-2 border-white rounded-full  sm:-right-[2.25rem] md:hover:bg-black md:transition md:active:scale-95 md:hover:shadow-2xl z-50"
            type="button"
            aria-label="Toggle Sidebar Button"
          >
            <i
              className={`text-xl fa-solid   ${
                expanded ? 'fa-minus' : 'fa-plus'
              }`}
            />
          </button>
        </picture>
        <ul
          className={`flex flex-col flex-1 gap-1 py-3 rounded-lg ${
            !expanded && 'hidden sm:inline-block'
          }`}
        >
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
        <div className={`flex justify-between gap-5 ${!expanded && 'hidden'}`}>
          <a
            href="https://www.asvesot.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Asvesot Website"
          >
            <img src={CoficImage} alt="Cofic logo" className="w-20" />
          </a>
          <a
            href="https://react-rysthcraft.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ysthcraft Portfolio Website"
          >
            <img src={RysthImage} alt="Rysthcraft logo" className="w-16" />
          </a>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
