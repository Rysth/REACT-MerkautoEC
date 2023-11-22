import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import BrandImage from '../../assets/images/brand/brand.png';

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
            className="object-cover w-36 sm:w-48"
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
            {isOpen && (
              <div className="w-full sm:hidden">
                <NavBar
                  variant="items-center p-0 text-sm list-none sm:hidden md:text-sm grid bg-gray-200 p-3 rounded-md  grid gap-1"
                  linksVariant="md:hover:scale-105 md:transition p-2 md:hover:bg-gray-500 md:hover:text-white print:hidden w-full flex items-center gap-1.5 rounded-md"
                  method={closeNavigationBar}
                />
              </div>
            )}
            <NavBar
              variant="items-center hidden gap-3 p-0 text-xs list-none sm:flex md:text-sm"
              linksVariant="md:hover:scale-105 md:transition bg-gray-300 p-2 bg-gray-200 md:hover:bg-gray-500 md:hover:text-white rounded-md print:hidden flex items-center gap-1.5 font-semibold "
              method={() => {}}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
