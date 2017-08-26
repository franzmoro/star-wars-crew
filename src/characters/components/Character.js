import React from 'react';
import PropTypes from 'prop-types';

const Character = (props) => {
  const {
    characterId,
    isFavourited,
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
    onAddToFavourites,
    onRemoveFromFavourites,
  } = props;

  const starClassName = isFavourited
    ? 'glyphicon glyphicon-star'
    : 'glyphicon glyphicon-star-empty';

  const toggleFromFavourites = () => (
    isFavourited ? onRemoveFromFavourites(characterId) : onAddToFavourites(characterId)
  );

  return (
    <tr>
      <td>{
        <span
          role="button"
          tabIndex={0}
          className={starClassName}
          onKeyPress={toggleFromFavourites}
          onClick={toggleFromFavourites}
        />
      }</td>
      {
        [
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
        ].map((field, idx) => (
          <td key={`${characterId}-${field}-${idx}`}>
            {field}
          </td>
        ))
      }
    </tr>
  );
};

Character.propTypes = {
  characterId: PropTypes.string.isRequired,
  isFavourited: PropTypes.bool.isRequired,
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
  onAddToFavourites: PropTypes.func.isRequired,
  onRemoveFromFavourites: PropTypes.func.isRequired,
};

export default Character;
