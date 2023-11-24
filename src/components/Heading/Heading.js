import PropTypes from 'prop-types';

function Heading({ text }) {
  return (
    <header>
      <h2 className="text-xl font-semibold sm:text-3xl lg:text-4xl">{text}</h2>
    </header>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
