import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import BrandImage from '../../assets/images/brand/logo_cofic.png';

function Header() {
  const [isOpen, setIsOpen] = useState();
  const { userCredentials } = useSelector((store) => store.credentials);

  const toggleNavigationBar = () => setIsOpen(!isOpen);
  const closeNavigationBar = () => setIsOpen(false);

  useEffect(() => {}, [userCredentials.active]);

  return (
    <header id="header" className="w-full bg-white z-[1001]">
      <div className="container flex flex-wrap items-center justify-between max-w-screen-lg gap-3 px-4 py-4 mx-auto lg:px-0 lg:py-6">
        <a
          href="https://maps.app.goo.gl/LRxm7ESpvsyR2iwq9"
          target="_blank"
          rel="noopener noreferrer"
          className="grid text-center"
        >
          <img
            className="object-cover w-44"
            src={BrandImage}
            alt="Merkauto brand logo"
            id="brandImage"
          />
        </a>
        {userCredentials.active && (
          <>
            <button
              onClick={toggleNavigationBar}
              type="button"
              className="text-2xl sm:hidden"
            >
              <span className="hidden">Toggle</span>
              <i className="fa-solid fa-bars" />
            </button>
            <div className="w-full sm:hidden">
              {isOpen && (
                <NavBar
                  variant="items-center p-0 text-sm list-none sm:hidden md:text-sm grid bg-gray-200 px-3 py-2 rounded-md"
                  linksVariant="md:hover:-translate-y-0.5 md:transition p-2 md:hover:bg-gray-500 md:hover:text-white print:hidden w-full flex items-center gap-1.5 rounded-md"
                  method={closeNavigationBar}
                />
              )}
            </div>
            <NavBar
              variant="items-center hidden gap-3 p-0 text-xs list-none sm:flex md:text-sm"
              linksVariant="md:hover:-translate-y-0.5 md:transition bg-gray-200 p-2  md:hover:bg-gray-500 md:hover:text-white rounded-md print:hidden flex items-center gap-1.5 font-semibold "
              method={() => {}}
            />
          </>
        )}
        {!userCredentials.active && (
          <NavLink
            to="/"
            className="md:hover:-translate-y-0.5 md:transition bg-gray-200 p-2  md:hover:bg-gray-500 md:hover:text-white rounded-md print:hidden flex items-center gap-2 font-semibold"
          >
            Iniciar Sesión
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
