import React from 'react';
import PropTypes from 'prop-types';

const FavouriteStar = ({
  isFavourited,
  onRemoveFromFavourites,
  onAddToFavourites,
}) => {
  const starClassName = isFavourited
    ? 'glyphicon glyphicon-star'
    : 'glyphicon glyphicon-star-empty';

  const toggleFromFavourites = () => (
    isFavourited ? onRemoveFromFavourites() : onAddToFavourites()
  );

  return (
    <span
      role="button"
      tabIndex={0}
      className={starClassName}
      onKeyPress={toggleFromFavourites}
      onClick={toggleFromFavourites}
    />
  );
};

FavouriteStar.propTypes = {
  isFavourited: PropTypes.bool.isRequired,
  onRemoveFromFavourites: PropTypes.func.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
};

export default FavouriteStar;
