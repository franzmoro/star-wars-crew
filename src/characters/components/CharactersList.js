import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Spinner from 'react-loader';

import Character from './Character';
import * as globalSelectors from '../../app/index.selectors';
import * as charactersActionCreators from '../index.actionCreators';
import * as preferencesActionCreators from '../../preferences/index.actionCreators';
import { sortCharacters } from '../../_utility/formatting.utils';
import {
  SORTING_DIMENSIONS,
  SORTING_ORDERS,
  HEADER_NAMES,
} from '../../preferences/index.constants';

class CharactersList extends Component {
  constructor() {
    super();
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

  rearrangeCharacters(dimension, isCurrentlyAscending) {
    const { setSortingOrder, setSortingDimension } = this.props;
    const newSortingOrder = isCurrentlyAscending ? 'descending' : 'ascending';

    setSortingDimension(dimension);
    setSortingOrder(newSortingOrder);
  }

  render() {
    // TODO refresh button
    // TODO modal for expanded character info
    // TODO Favorite character filter??
    const {
      characters,
      // favouriteCharacterIds,
      isLoading,
      loadingError,
      // expandedCharacterId,
      sortingDimension,
      sortingOrder,
    } = this.props;

    const sortedCharacterIds = sortCharacters(characters, sortingDimension, sortingOrder);
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
                <tr>{
                  HEADER_NAMES.map((headerName, index) => {
                    const isCurrentDimension = sortingDimension === SORTING_DIMENSIONS[headerName];
                    let className;

                    if (isCurrentDimension) {
                      className = isAscendingOrder
                        ? 'glyphicon glyphicon-triangle-top'
                        : 'glyphicon glyphicon-triangle-bottom';
                    } else {
                      className = 'glyphicon glyphicon-triangle-top';
                    }

                    return (
                      <th key={`header-item-${headerName}`}>
                        {headerName}
                        <span
                          role="menuitem"
                          tabIndex={index + 1}
                          className={className}
                          onKeyPress={(e) => {
                            if (e.keyCode === 13) {
                              this.rearrangeCharacters(headerName, isAscendingOrder);
                            }
                          }}
                          onClick={() => this.rearrangeCharacters(headerName, isAscendingOrder)}
                        />
                      </th>
                    );
                  })
                }
                </tr>
              </thead>
              <tbody>
                {sortedCharacterIds.map((characterId) => {
                  const character = characters[characterId];
                  return <Character key={characterId} {...character} />;
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
  setSortingDimension: dimension => dispatch(preferencesActionCreators.setSortingDimension(dimension)),
  setSortingOrder: order => dispatch(preferencesActionCreators.setSortingOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
