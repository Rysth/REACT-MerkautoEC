import PropTypes from 'prop-types';

/* eslint-disable */
function TextArea({ name, label, method }) {
  return (
    <fieldset className="w-full mt-5 text-center">
      <header className="mb-3 text-center">
        <h2 className="text-base font-bold md:text-lg">{label}</h2>
      </header>
      <textarea
        {...method(name)}
        className="w-full p-2 bg-gray-100 border rounded-md outline-none resize-none h-28 md:p-4 focus:border-gray-500 focus:bg-white"
      />
    </fieldset>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  method: PropTypes.func.isRequired,
};

export default TextArea;
