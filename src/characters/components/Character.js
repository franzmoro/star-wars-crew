import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FavouriteStar from './FavouriteStar';
import { HEADER_NAMES, SORTING_DIMENSIONS } from '../../index.constants';

const Character = (props) => {
  const {
    isFavourited,
    onAddToFavourites,
    onRemoveFromFavourites,
    onOpenModal,
  } = props;

  const characterProperties = HEADER_NAMES.slice(1).map((headerName) => {
    const fieldName = SORTING_DIMENSIONS[headerName];
    return props[fieldName];
  });

  return (
    <tr>
      <td>
        <FavouriteStar {...{ isFavourited, onRemoveFromFavourites, onAddToFavourites }} />
      </td>
      {characterProperties.map((field, idx) => (
        <td key={`${field}-${idx}`}>{field}</td>
      ))}
      <Button bsStyle="primary" bsSize="small" onClick={onOpenModal}>
        +
      </Button>
    </tr>
  );
};

Character.propTypes = {
  isFavourited: PropTypes.bool.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  onRemoveFromFavourites: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Character;
