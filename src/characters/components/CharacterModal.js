import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Button } from 'react-bootstrap';
import FavouriteStar from './FavouriteStar';
import tableStyle from '../styles/table.style';
import { MODAL_FIELDS } from '../../index.constants';

const CharacterModal = (props) => {
  const {
    name,
    isFavourited,
    isModalOpen,
    onDismissModal,
    onAddToFavourites,
    onRemoveFromFavourites,
  } = props;

  return (
    <Modal show={isModalOpen} onHide={onDismissModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {name}
          <FavouriteStar {...{ isFavourited, onRemoveFromFavourites, onAddToFavourites }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={tableStyle.modal}>
        <Table bordered style={tableStyle.main}>
          <tbody>{
            Object.keys(MODAL_FIELDS).map(headerName => (
              <tr key={headerName}>
                <td><strong>{headerName}</strong></td>
                <td>{props[MODAL_FIELDS[headerName]]}</td>
              </tr>
            ))
          }</tbody>
        </Table>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={isFavourited ? onRemoveFromFavourites : onAddToFavourites}>
          {isFavourited ? 'REMOVE FROM FAVOURITES' : 'ADD TO FAVOURITES'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CharacterModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  isFavourited: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onDismissModal: PropTypes.func.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  onRemoveFromFavourites: PropTypes.func.isRequired,
};

CharacterModal.defaultProps = {
  name: 'STAR WARS CHARACTER',
};

export default CharacterModal;
