import MerkautoImage from '../../assets/images/brand/brand.png';

function Sidebar() {
  return (
    <aside className="h-screen ">
      <nav className="flex flex-col h-full border max-w-[16rem] p-3 bg-white">
        <picture className="relative flex justify-center py-4 border-b">
          <img
            src={MerkautoImage}
            alt="MerkautoEC's brand logo"
            className="w-40 sm:w-48"
          />
          <button
            className="absolute w-10 h-10 text-white bg-[var(--CL-primary-blue)] border border-white rounded-full bottom-3 -right-8 md:hover:bg-black md:transition md:active:scale-95 md:hover:shadow-2xl"
            type="button"
            aria-label="Toggle Sidebar "
          >
            <i className="text-xl fa-solid fa-arrow-left" />
          </button>
        </picture>
      </nav>
    </aside>
  );
}

export default Sidebar;
