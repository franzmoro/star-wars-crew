import React from 'react';
import PropTypes from 'prop-types';

const Character = (props) => {
  // TODO star if its a favorite
  const {
    name,
    gender,
    birthYear,
    height,
    mass,
    eyeColor,
    hairColor,
    skinColor,
    numFilms,
    numVehicles,
  } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{birthYear}</td>
      <td>{height}</td>
      <td>{mass}</td>
      <td>{eyeColor}</td>
      <td>{hairColor}</td>
      <td>{skinColor}</td>
      <td>{numFilms}</td>
      <td>{numVehicles}</td>
    </tr>
  );
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthYear: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  mass: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  eyeColor: PropTypes.string.isRequired,
  hairColor: PropTypes.string.isRequired,
  skinColor: PropTypes.string.isRequired,
  numFilms: PropTypes.number.isRequired,
  numVehicles: PropTypes.number.isRequired,
};

export default Character;
