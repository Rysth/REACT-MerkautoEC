import PropTypes from 'prop-types';

function SearchForm({ searchData, handleSearchData }) {
  return (
    <div className="flex items-center gap-2 py-2 text-sm sm:py-3">
      <input
        type="text"
        aria-label={`Search Bar Value: ${searchData}`}
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
        placeholder="Buscar..."
        onChange={handleSearchData}
        onPaste={handleSearchData}
      />
    </div>
  );
}

SearchForm.propTypes = {
  searchData: PropTypes.string.isRequired,
  handleSearchData: PropTypes.func.isRequired,
};

export default SearchForm;
