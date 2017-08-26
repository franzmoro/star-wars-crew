import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Spinner from 'react-loader';
import Character from './Character';
import * as globalSelectors from '../../app/index.selectors';
import * as charactersActionCreators from '../index.actionCreators';
import * as preferencesActionCreators from '../../preferences/index.actionCreators';
import { sortCharacters, sortByFavourites } from '../../_utility/formatting.utils';
import {
  SORTING_DIMENSIONS,
  SORTING_ORDERS,
  HEADER_NAMES,
} from '../../preferences/index.constants';

class CharactersList extends Component {
  constructor() {
    super();
    this.getSortingIconClassName = this.getSortingIconClassName.bind(this);
    this.rearrangeCharacters = this.rearrangeCharacters.bind(this);
  }

  componentDidMount() {
    const {
      characters,
      retrieveCharacters,
    } = this.props;

    const characterIds = Object.keys(characters);
    if (!characterIds.length) {
      retrieveCharacters();
    }
  }

  getSortingIconClassName(headerName) {
    const { sortingDimension, sortingOrder } = this.props;

    const isCurrentDimension = sortingDimension === SORTING_DIMENSIONS[headerName];
    const isSortingByFavourites = sortingDimension === SORTING_DIMENSIONS.Favourite;
    const isAscendingOrder = sortingOrder === SORTING_ORDERS.ascending;

    if (isSortingByFavourites && headerName === 'Favourite') {
      return 'glyphicon glyphicon-triangle-bottom';
    }
    if (isCurrentDimension) {
      return isAscendingOrder
        ? 'glyphicon glyphicon-triangle-top'
        : 'glyphicon glyphicon-triangle-bottom';
    }
    return 'glyphicon glyphicon-triangle-top';
  }

  rearrangeCharacters(dimension, isCurrentlyAscending) {
    const { setSortingOrder, setSortingDimension } = this.props;
    const newSortingOrder = isCurrentlyAscending ? 'descending' : 'ascending';

    setSortingDimension(dimension);
    setSortingOrder(newSortingOrder);
  }

  render() {
    // TODO modal for expanded character info
    const {
      characters,
      favouriteCharacterIds,
      isLoading,
      loadingError,
      addToFavourites,
      removeFromFavourites,
      // expandedCharacterId,
      sortingDimension,
      sortingOrder,
    } = this.props;

    const isSortingByFavourites = (sortingDimension === SORTING_DIMENSIONS.Favourite);
    const sortedCharacterIds = isSortingByFavourites
      ? sortByFavourites(characters, favouriteCharacterIds)
      : sortCharacters(characters, sortingDimension, sortingOrder);

    sortCharacters(characters, sortingDimension, sortingOrder, favouriteCharacterIds);
    const isAscendingOrder = sortingOrder === SORTING_ORDERS.ascending;

    const showTable = Boolean(sortedCharacterIds.length);
    return (
      <div>
        {isLoading && <p>Jumping to Hyperspace...</p>}
        <Spinner loaded={!isLoading} />
        {loadingError
          ? (
            <div>
              <p>{'Sorry, there has been an error. We won\'t fail you again!'}</p>
              <img alt="Error" src="https://lumiere-a.akamaihd.net/v1/images/at-at-bio-6_a45b18ea.jpeg" />
            </div>
          )
          : (showTable &&
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  {HEADER_NAMES.map((headerName, index) => (
                    <th key={`header-item-${headerName}`}>
                      {headerName}
                      <span
                        role="menuitem"
                        tabIndex={index + 1}
                        className={this.getSortingIconClassName(headerName)}
                        onKeyPress={() => this.rearrangeCharacters(headerName, isAscendingOrder)}
                        onClick={() => this.rearrangeCharacters(headerName, isAscendingOrder)}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedCharacterIds.map((characterId, index) => {
                  const character = characters[characterId];
                  const isFavourited = favouriteCharacterIds.includes(characterId);

                  return (
                    <Character
                      key={`character-${characterId}`}
                      index={index}
                      characterId={characterId}
                      isFavourited={isFavourited}
                      onAddToFavourites={addToFavourites}
                      onRemoveFromFavourites={removeFromFavourites}
                      {...character}
                    />
                  );
                })}
              </tbody>
            </Table>
          )
        }
      </div>
    );
  }
}

CharactersList.propTypes = {
  characters: PropTypes.object.isRequired,
  favouriteCharacterIds: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingError: PropTypes.string,
  expandedCharacterId: PropTypes.number,
  retrieveCharacters: PropTypes.func.isRequired,
  sortingDimension: PropTypes.string.isRequired,
  sortingOrder: PropTypes.string.isRequired,

  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  setSortingDimension: PropTypes.func.isRequired,
  setSortingOrder: PropTypes.func.isRequired,
};

CharactersList.defaultProps = {
  loadingError: undefined,
  expandedCharacterId: undefined,
};

const mapStateToProps = state => ({
  characters: globalSelectors.getCharacters(state),
  favouriteCharacterIds: globalSelectors.getFavouriteCharacterIds(state),
  isLoading: globalSelectors.isLoadingCharacters(state),
  loadingError: globalSelectors.getLoadingError(state),
  expandedCharacterId: globalSelectors.getExpandedCharacterId(state),
  sortingDimension: globalSelectors.getSortingDimension(state),
  sortingOrder: globalSelectors.getSortingOrder(state),
});

const mapDispatchToProps = dispatch => ({
  retrieveCharacters: () => dispatch(charactersActionCreators.retrieveCharacters()),
  addToFavourites: order => dispatch(charactersActionCreators.addToFavourites(order)),
  removeFromFavourites: order => dispatch(charactersActionCreators.removeFromFavourites(order)),

  setSortingDimension: dimension => dispatch(preferencesActionCreators.setSortingDimension(dimension)),
  setSortingOrder: order => dispatch(preferencesActionCreators.setSortingOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
