import PropTypes from 'prop-types';

function Heading({ text }) {
  return (
    <header>
      <h2 className="text-2xl font-semibold sm:text-4xl">{text}</h2>
    </header>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
